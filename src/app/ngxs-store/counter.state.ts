import { Injectable, OnDestroy } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { Subscription, timer } from "rxjs";
import { CounterInterface } from "./interface/counter-interface";

export class ConfigCounter {
  static readonly type = 'Add counter configuration';
  constructor(public counter: number) {}
}

export class Play {
  static readonly type = 'play Counter';
  constructor() {}
}

export class Pause {
  static readonly type = 'pause Counter';
  constructor() {}
}

@State<CounterInterface>({
  name: 'counter',
  defaults: {
    value: 0,
  }
})

@Injectable()
export class CounterState implements OnDestroy{
  subscription: Subscription = new Subscription;

  @Action(ConfigCounter)
  configCounter(ctx: StateContext<CounterInterface>,  action :ConfigCounter) {
    this.unsubscribe();
    const state = ctx.getState();
    ctx.setState({
      ...state,
      value: action.counter,
    });
  }

  @Action(Play)
  play(ctx: StateContext<CounterInterface>) {
    this.subscription = timer(0, 1000).subscribe(() =>{
      const state = ctx.getState()
      if(state.value <= 0){
        this.unsubscribe();
        return
      }

      ctx.patchState({
        value: state.value -1
      });
    });
  }

  @Action(Pause)
  pause(ctx: StateContext<CounterInterface>) {
    this.unsubscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  private unsubscribe(){
    this.subscription.unsubscribe();
  }
}
