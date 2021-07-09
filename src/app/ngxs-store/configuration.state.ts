import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { ConfigurationInterface } from '../interface/configuration-interface';

export class AddConfiguration {
  static readonly type = 'Add Configuration';
  constructor(public config: ConfigurationInterface) {}
}

@State<ConfigurationInterface>({
  name: 'configuration',
  defaults: {
    pomodoro: 1500,
    shortBrak: 300,
    longBreak: 900,
    audio: 'audio1.mp3'
  }
})
@Injectable()
export class ConfigurationState {
  @Action(AddConfiguration)
  configurePomodoro(ctx: StateContext<ConfigurationInterface>) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
    });
  }
}



