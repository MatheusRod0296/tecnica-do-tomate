import { Component, OnDestroy } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, Subject, Subscription, timer } from 'rxjs';
import { ConfigurationInterface } from '../interface/configuration-interface';
import { CounterInterface } from '../interface/counter-interface';
import { ConfigurationState } from '../ngxs-store/configuration.state';
import { ConfigCounter, Play, CounterState, Pause } from '../ngxs-store/counter.state';
import { Store } from '@ngxs/store';
import { takeUntil } from 'rxjs/operators';

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

  showPlayButton: boolean;

  constructor(private store: Store) {
    this.showPlayButton = true;

    this.configuration$
    .pipe(takeUntil(this.unsubscribeSignal.asObservable()),)
    .subscribe( x => { this.config = x; } );

    this.counter$
    .pipe(takeUntil(this.unsubscribeSignal.asObservable()),)
    .subscribe( x => { this.alarm(x.value) } );

    this.setTime(this.config.pomodoro);
  }

  start(){
    this.store.dispatch(new Play());
    this.showButton();
  }

  pause(){
    this.store.dispatch(new Pause());
    this.showButton();
  }

  setTime(value:number){
    this.store.dispatch(new ConfigCounter(value));
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
