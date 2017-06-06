export interface ISkillAction {
   skillId: string;
   visible: boolean;
   disabled: boolean;
   value: number;
   execute: () => void;
   label: string;
   popoverContents: string;
   buttonTheme: string;
   iconClass: string;

   improve: () => void;
   improveCost: number;
   improveAmount: number;
   canImprove: boolean;
}
