import { CurrentTimer } from "src/app/enums/type.enum";

export interface ConfigurationInterface {
  pomodoro:number;
  shortBreak:number;
  longBreak:number;
  currentTimer: CurrentTimer;
  audio:string;
}
