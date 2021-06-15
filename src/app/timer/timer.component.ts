import { Component, OnDestroy } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, Subscription, timer } from 'rxjs';
import { ConfigurationInterface } from '../interface/configuration-interface';
import { ConfigurationState } from '../ngs-store/configuration.state';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnDestroy {
  @Select(ConfigurationState) configuration$!: Observable<ConfigurationInterface>;

  subscription: Subscription = new Subscription;
  countDown: Subscription = new Subscription;
  config!: ConfigurationInterface;

  counter!: number;
  tick = 1000;

  showPlayButton: boolean;
  constructor() {
    this.showPlayButton = true;

    this.subscription = this.configuration$.subscribe(
      x => {
        this.config = x;
        this.counter = this.config.pomodoro;
      },
      err => console.log('erro')
    );

  }

  start(){
    this.countDown = timer(0, this.tick).subscribe(() =>{
      if(this.counter <= 0){
        this.countDownUnsubscribe();
        this.showButton();
        return;
      }
      --this.counter
    } );
    this.showButton();
  }

  pause(){
    this.countDownUnsubscribe();
    this.showButton();
  }

  setTime(value:number){
    this.countDownUnsubscribe();
    this.counter = value;
    this.showButtonPlay()
  }

  private showButton(){
    this.showPlayButton = !this.showPlayButton;
  }

  private showButtonPlay(){
    this.showPlayButton = true;
  }

  private countDownUnsubscribe(){
    this.countDown.unsubscribe();
  }

  ngOnDestroy(){
    this.countDown.unsubscribe();
    this.subscription.unsubscribe();
  }

}




