import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';

import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ToolBarComponent } from './tool-bar/tool-bar.component';
import { TimerComponent } from './timer/timer.component';
import {MatButtonModule} from '@angular/material/button';
import { FormatTimePipe } from './pipe/format-time-pipe';
import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { CounterState } from './ngxs-store/counter.state';
import { ConfigurationState } from './ngxs-store/configuration.state';

@NgModule({
  declarations: [
    AppComponent,
    ToolBarComponent,
    TimerComponent,
    FormatTimePipe
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,

    NgxsModule.forRoot([ConfigurationState, CounterState], {
      developmentMode: !environment.production
    })

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
