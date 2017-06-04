import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {GameStorageService} from '../../../persistence/game-storage.service';
import {UnlocksService} from '../../../services/unlocks.service';
import {Subscription} from 'rxjs/Subscription';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TickService} from '../../../time/tick.service';
import {SpecialEvent} from '../../../models/messaging/special-event';
import {Router} from '@angular/router';
import {AchievementsService} from '../../../services/achievements/achievements.service';
import * as Enumerable from 'linq';
import {SpecialEventGeneratorService} from '../../../services/tick-subscribers/automatic/generators/special-event-generator.service';

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

   constructor(private gameStorageService: GameStorageService,
               private specialEventGeneratorService: SpecialEventGeneratorService,
               private modalService: NgbModal,
               private achievementsService: AchievementsService,
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

   private get company() {
      return this.gameStorageService.game.company;
   }

   private get activeBusinessUnits() {
      return Enumerable
         .from(this.company.businessUnits.$asList())
         .where(u => u.active)
         .toArray();
   }

   private get achievementTracks() {
      return Enumerable
         .from(this.achievementsService.tracks)
         .where(t => t.unlocked)
         .toArray();
   }
}
