import {Component, OnInit} from '@angular/core';
import {CodeService} from '../../../../../../game/resource-services/code.service';

@Component({
   selector: 'app-code-breakdown',
   templateUrl: './code-breakdown.component.html',
   styleUrls: ['./code-breakdown.component.css']
})
export class CodeBreakdownComponent implements OnInit {

   constructor(private codeService: CodeService) {
   }

   ngOnInit() {
   }

   public get pushedPercent(): number {
      return 100 * this.codeService.pushed.balance / (this.codeService.total || 1);
   }

   public get deployingPercent(): number {
      return 100 * this.codeService.deploying.balance / (this.codeService.total || 1);
   }

   public get prodPercent(): number {
      return 100 * this.codeService.prod.balance / (this.codeService.total || 1);
   }

   public get testedPercent(): number {
      return 100 * this.codeService.tested.balance / (this.codeService.total || 1);
   }

   public get bugsPercent(): number {
      return 100 * this.codeService.bugs.balance / (this.codeService.total || 1);
   }

   public get pushed() {
      return this.codeService.pushed.balance;
   }

   public get deploying() {
      return this.codeService.deploying.balance;
   }

   public get prod() {
      return this.codeService.prod.balance;
   }

   public get tested() {
      return this.codeService.tested.balance;
   }

   public get bugs() {
      return this.codeService.bugs.balance;
   }

}
