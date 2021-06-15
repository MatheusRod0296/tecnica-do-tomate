import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { ConfigurationInterface } from '../interface/configuration-interface';
import { AddConfiguration } from './configuration.actions';

@State<ConfigurationInterface>({
  name: 'configuration',
  defaults: {
    pomodoro: 1500,
    shortBrak: 300,
    longBreak: 900,
  }
})
@Injectable()
export class ConfigurationState {
  @Action(AddConfiguration)
  feedAnimals(ctx: StateContext<ConfigurationInterface>) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
    });
  }
}
