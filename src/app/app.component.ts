import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs/internal/Observable';
import { CounterInterface } from './interface/counter-interface';
import { CounterState } from './ngxs-store/counter.state';
import { FormatTimePipe } from './pipe/format-time-pipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tecnica-do-tomate';
  private titleService: Title;
  @Select(CounterState) counter$!: Observable<CounterInterface>;

  public constructor(titleService: Title) {
    this.titleService = titleService;
    this.setTitle();
  }

  public setTitle() {
    this.counter$.subscribe(
      x => {
        this.title = new FormatTimePipe().transform(x.value);
        this.titleService.setTitle(this.title);
      }
    )
  }

}
