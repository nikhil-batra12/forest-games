import { Component } from '@angular/core';
import {
  Router, RouterEvent,
  NavigationStart, NavigationEnd, NavigationCancel, NavigationError,
  ActivatedRoute, Params
} from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
}
