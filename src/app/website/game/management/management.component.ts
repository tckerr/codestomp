import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {GameStorageService} from '../../../services/game-storage.service';
import {UnlocksService} from '../../../services/unlocks.service';
import {SpecialEventGeneratorService} from '../../../services/generators/special-events/special-event-generator.service';
import {Subscription} from 'rxjs/Subscription';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TickService} from '../../../services/tick/tick.service';
import {SpecialEvent} from '../../../models/special-event';

@Component({
   selector: 'app-management',
   templateUrl: './management.component.html',
   styleUrls: ['./management.component.less']
})
export class ManagementComponent implements OnInit, OnDestroy {

   private sub: Subscription;
   @ViewChild('container') container: ElementRef;
   @ViewChild('specialEventModal') specialEventModal: ElementRef;
   private specialEventModalViewData: SpecialEvent;

   constructor(
      private gameStorageService: GameStorageService,
      private specialEventGeneratorService: SpecialEventGeneratorService,
      private modalService: NgbModal,
      private tickService: TickService,
      private unlocksService: UnlocksService) {
   }

   ngOnInit() {

      this.sub = this.specialEventGeneratorService.pipeline
         .subscribe((eventData: SpecialEvent) => {
            if(eventData.isModal)
               this.openSpecialEventModal(eventData);
         });
   }

   private openSpecialEventModal(eventData: SpecialEvent) {
      this.specialEventModalViewData = eventData;
      this.tickService.stop();
      this.modalService
         .open(this.specialEventModal).result
         .then(closed => this.tickService.start())
         .catch(reason => this.tickService.start());
   }

   ngOnDestroy(): void {
      this.sub && this.sub.unsubscribe();
   }

   public get hiringUnlocked(){
      return this.unlocksService.unlocks.devHiring > 0;
   }

   private get company() {
      return this.gameStorageService.game.company;
   }

   private get activeBusinessUnits() {
      let results = [];
      this.company.businessUnits.forEach(u => {
         if (u.active)
            results.push(u);
      });
      return results;
   }
}
