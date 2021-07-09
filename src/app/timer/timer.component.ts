import { Component, OnDestroy } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, Subject} from 'rxjs';
import { ConfigurationInterface } from '../ngxs-store/interface/configuration-interface';
import { CounterInterface } from '../ngxs-store/interface/counter-interface';
import { ConfigurationState, UpdateCurrentTimer } from '../ngxs-store/configuration.state';
import { ConfigCounter, Play, CounterState, Pause } from '../ngxs-store/counter.state';
import { Store } from '@ngxs/store';
import { takeUntil } from 'rxjs/operators';
import { CurrentTimer } from '../enums/type.enum';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnDestroy {
  @Select(ConfigurationState) configuration$!: Observable<ConfigurationInterface>;
  @Select(CounterState) counter$!: Observable<CounterInterface>;

  unsubscribeSignal: Subject<void> = new Subject();
  config!: ConfigurationInterface;
  counter!: CounterInterface;
  showPlayButton: boolean;
  typeToHtml = CurrentTimer;

  constructor(private store: Store) {
    this.showPlayButton = true;

    this.configuration$
    .pipe(takeUntil(this.unsubscribeSignal.asObservable()),)
    .subscribe( x => {
      this.config = x;

      switch (this.config.currentTimer) {
        case CurrentTimer.ShortBreak:
          this.setTimeAtFirst(this.config.shortBreak,this.config.currentTimer);
          break;
        case CurrentTimer.LongBreak:
          this.setTimeAtFirst(this.config.longBreak, this.config.currentTimer);
          break;

        default:
          this.setTimeAtFirst(this.config.pomodoro, this.config.currentTimer);
          break;
      }
    });

    this.counter$
    .pipe(takeUntil(this.unsubscribeSignal.asObservable()),)
    .subscribe( x => {
      this.counter = x;
      this.alarm(x.value)
      }
    );
  }

  start(){
    this.store.dispatch(new Play());
    this.showButton();
  }

  pause(){
    this.store.dispatch(new Pause());
    this.showButton();
  }

  private setTimeAtFirst(value:number, type: CurrentTimer){
    this.store.dispatch(new ConfigCounter(value));
    this.showButtonPlay()
  }

  setTime(value:number, type: CurrentTimer){
    this.store.dispatch(new ConfigCounter(value));
    this.store.dispatch(new UpdateCurrentTimer(type));
    this.showButtonPlay()
  }

  private showButton(){
    this.showPlayButton = !this.showPlayButton;
  }

  private showButtonPlay(){
    this.showPlayButton = true;
  }

  private alarm(time:number){
    if(time <= 0){
      const alarm = new Audio(`assets/audios/${this.config.audio}`);
      alarm.play();
    }
  }

  ngOnDestroy(){
    this.unsubscribeSignal.next();
    this.unsubscribeSignal.unsubscribe();
  }
}
