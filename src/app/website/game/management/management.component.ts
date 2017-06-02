import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {GameStorageService} from '../../../services/game-storage.service';
import {UnlocksService} from '../../../services/unlocks.service';
import {SpecialEventGeneratorService} from '../../../services/generators/special-events/special-event-generator.service';
import {Subscription} from 'rxjs/Subscription';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TickService} from '../../../services/tick/tick.service';
import {SpecialEvent} from '../../../models/special-event';
import {isNullOrUndefined} from 'util';
import {ActivatedRoute, Router} from '@angular/router';

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
   private lastNavigatedBusinessUnit: string = "development"; //todo: :(

   constructor(private gameStorageService: GameStorageService,
               private specialEventGeneratorService: SpecialEventGeneratorService,
               private modalService: NgbModal,
               private router: Router,
               private tickService: TickService,
               private unlocksService: UnlocksService) {
   }

   ngOnInit() {
      this.sub = this.specialEventGeneratorService.pipeline
         .subscribe((eventData: SpecialEvent) => {
            if (eventData.isModal)
               this.openSpecialEventModal(eventData);
         });
      // TODO: a better way
      this.router.events.subscribe((s: any) => this.lastNavigatedBusinessUnit = s.url.toString().split("/").reverse()[0]);
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

   public get hiringActive() {
      if(isNullOrUndefined(this.activeBusinessUnit))
         return false;
      let hiring = this.unlocksService.unlocks.hiring;
      for (var key in hiring) {
         if (hiring[key] > 0)
            {
               return true;
            }
      }
      return false;
   }

   public get activeBusinessUnit() {
      return this.lastNavigatedBusinessUnit;
   }

   private get company() {
      return this.gameStorageService.game.company;
   }

   private get activeBusinessUnits() {
      let results = [];
      this.company.businessUnits.$asList().forEach(u => {
         if (u.active)
            results.push(u);
      });
      return results;
   }
}
