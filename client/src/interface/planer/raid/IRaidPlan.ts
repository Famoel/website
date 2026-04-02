export interface IRaidPlan {
  id: number;
  raidListId: number;
  start: string;
  startToday?: boolean;
  createdFrom: string;
  isDeleted: number;
  name?: string;
  mode?: string;
}
