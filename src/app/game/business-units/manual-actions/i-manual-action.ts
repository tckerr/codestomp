export interface IManualAction {
   id: string;
   visible: boolean;
   disabled: boolean;
   value: number;
   execute: () => void;
   label: string;
   popoverContents: string;
   buttonTheme: string;
   iconClass: string;
   
}
