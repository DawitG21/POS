import { Creator } from "./creator.model";

export class ActivityLogs {
  id!: string;
  name!: string;
  action!: string;
  actionOn!: string;
  creator!: Creator;  
}