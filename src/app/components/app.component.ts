import { Component } from '@angular/core';
import {PhotoCaptureComponent} from "./photo-capture/photo-capture.component";
import {CommonModule} from "@angular/common";
import {TimeAgoPipe} from "./time-ago.pipe";
import {TrackDataComponent} from "./track-data/track-data.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    PhotoCaptureComponent,
    CommonModule,
    TimeAgoPipe,
    TrackDataComponent
  ],
  styleUrls: ['./app.component.css']
})
export class AppComponent {

}
