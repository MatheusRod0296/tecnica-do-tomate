import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CurrentTimer } from 'src/app/enums/type.enum';
import { AddConfiguration, ConfigurationState } from 'src/app/ngxs-store/configuration.state';
import { ConfigurationInterface } from 'src/app/ngxs-store/interface/configuration-interface';
import { ConfigurationFormInterface } from './interfaces/configuration-form-interface';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  configurationForm!: ConfigurationFormInterface;
  @Select(ConfigurationState) configuration$!: Observable<ConfigurationInterface>;

  unsubscribeSignal: Subject<void> = new Subject();

  constructor(public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfigurationInterface,
    private store: Store) {
      this.data = {
        pomodoro:0,
        longBreak:0,
        shortBreak:0,
        currentTimer: CurrentTimer.Pomodoro,
        audio: ''
      }

      this.configurationForm = {
        pomodoro: undefined,
        shortBreak: undefined,
        longBreak: undefined,
        currentTimer:undefined,
        audio:''
      }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save():void{
    this.data.pomodoro = this.configurationForm.pomodoro == null? 0  : this.configurationForm.pomodoro * 60;
    this.data.shortBreak = this.configurationForm.shortBreak == null? 0  : this.configurationForm.shortBreak * 60;
    this.data.longBreak = this.configurationForm.longBreak == null? 0  : this.configurationForm.longBreak * 60;

    this.data.audio = this.configurationForm.audio;

    this.store.dispatch(new AddConfiguration(this.data));

    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.configuration$
    .pipe(takeUntil(this.unsubscribeSignal.asObservable()),)
    .subscribe( x => {
      this.configurationForm.pomodoro = x.pomodoro /60;
      this.configurationForm.shortBreak = x.shortBreak /60;
      this.configurationForm.longBreak = x.longBreak /60;
      this.configurationForm.currentTimer = x.currentTimer
      this.configurationForm.audio = x.audio
    });
  }
}
