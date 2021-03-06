export class StaffCategory {
   public static readonly Developer = 'developer';
   public static readonly QA = 'qaAnalyst';
   public static readonly DevOps = 'devops';
   public static readonly TalentScout = 'talentScount';
   public static readonly Recruiter = 'recruiter';
   public static readonly Trainer = 'trainer';
   public static readonly EmployeeRetainer = 'employeeRetainer';
}

export enum ExperienceLevel {
   None,
   Intern,
   Associate,
   Junior,
   Senior
}

export enum StaffType {
   BenefitsSpecialist,
   CorporateTrainer,
   TalentAcquisitionManager,
   Recruiter,
   TalentScout,
   DevOpsEngineer,
   QaAutomationEngineer,
   SeniorQaAnalyst,
   JuniorQaAnalyst,
   AssociateQaAnalyst,
   SeniorDeveloper,
   JuniorDeveloper,
   AssociateDeveloper,
   DevelopmentIntern,
}
