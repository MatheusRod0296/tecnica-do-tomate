import { Component, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Select } from '@ngxs/store';
import { takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { CounterInterface } from './ngxs-store/interface/counter-interface';
import { CounterState } from './ngxs-store/counter.state';
import { FormatTimePipe } from './pipe/format-time-pipe';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy{
  title = 'tecnica-do-tomate';
  private titleService: Title;
  @Select(CounterState) counter$!: Observable<CounterInterface>;

  unsubscribeSignal: Subject<void> = new Subject();

  public constructor(titleService: Title) {
    this.titleService = titleService;
    this.setTitle();
  }

  public setTitle() {
    this.counter$
    .pipe(
      takeUntil(this.unsubscribeSignal.asObservable()),
   )
    .subscribe(
      x => {
        this.title = new FormatTimePipe().transform(x.value);
        this.titleService.setTitle(this.title);
      }
    )
  }

  ngOnDestroy(): void {
    this.unsubscribeSignal.next();
    this.unsubscribeSignal.unsubscribe();
  }



}
