import { LoaderComponent } from './components/loader/loader.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './components/notification/notification.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LoaderComponent, NotificationComponent],
  exports: [LoaderComponent, NotificationComponent]
})
export class CoreModule { }
