import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { CurrentTimer } from '../enums/type.enum';
import { ConfigurationInterface } from './interface/configuration-interface';

export class AddConfiguration {
  static readonly type = 'Add Configuration';
  constructor(public config: ConfigurationInterface) {}
}

export class UpdateCurrentTimer {
  static readonly type = 'updt currente timer';
  constructor(public type: CurrentTimer) {}
}

@State<ConfigurationInterface>({
  name: 'configuration',
  defaults: {
    pomodoro: 1500,
    shortBreak: 300,
    longBreak: 900,
    currentTimer: CurrentTimer.Pomodoro,
    audio: 'audio1.mp3'
  }
})
@Injectable()
export class ConfigurationState {

  @Action(AddConfiguration)
  configurePomodoro(ctx: StateContext<ConfigurationInterface>, action:AddConfiguration) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      pomodoro : action.config.pomodoro,
      shortBreak: action.config.shortBreak,
      longBreak: action.config.longBreak,
      audio: action.config.audio
    });
  }

  @Action(UpdateCurrentTimer)
  updateCurrentTimer(ctx: StateContext<ConfigurationInterface>, action:UpdateCurrentTimer) {
    const state = ctx.getState();
    ctx.patchState({
      currentTimer: action.type,
    });
  }
}
