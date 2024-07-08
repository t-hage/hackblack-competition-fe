import {Component} from '@angular/core';
import {NgForOf} from "@angular/common";
import {TimeAgoPipe} from "../time-ago.pipe";
import {OcrService} from "../ocr.service";
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-track-data',
  standalone: true,
    imports: [
        NgForOf,
        TimeAgoPipe
    ],
  templateUrl: './track-data.component.html',
  styleUrl: './track-data.component.css'
})
export class TrackDataComponent {
  private ocrService: OcrService;
  private timesUrl = 'https://hackblack-competition.s3.eu-west-1.amazonaws.com/silverstone/times.json';

  constructor(private _ocrService: OcrService, private http: HttpClient) {
    this.ocrService = _ocrService;
    this.http.get<any[]>(this.timesUrl).subscribe(data => {
      this.trackData = data;
    })

    this.ocrService.getnewLapTimeObservable().subscribe(time => {
      this.addNewLapTime(time);

    })
  }

  private addNewLapTime(time: string | null) {
    if (time) {
      this.trackData.push({
        time: time,
        name: 'Tom Cruiser',
        timestamp: new Date().toISOString()
      });
    }

    this.trackData = this.trackData.sort((a, b) => {
      // Convert time strings to sortable format (total milliseconds)
      const timeA = this.convertTimeToMilliseconds(a.time);
      const timeB = this.convertTimeToMilliseconds(b.time);

      // Compare converted times
      return timeA - timeB;
    });
  }

  private convertTimeToMilliseconds(timeStr: string): number {
    const [hoursMinutes, milliseconds] = timeStr.split('.');
    const [hours, minutes] = hoursMinutes.split(':').map(Number);
    return (hours * 3600 + minutes * 60) * 1000 + Number(milliseconds);
  }

  trackData = [
    { time: '01:27.002', name: 'Max Verstappen', timestamp: '2024-07-08 14:51:00' },
    { time: '01:30.455', name: 'Lewis Hamilton', timestamp: '2024-07-07 14:30:00' },
    { time: '01:31.156', name: 'Charles Leclerc', timestamp: '2024-07-05 14:32:00' },
    { time: '01:41.010', name: 'Logan Sargeant', timestamp: '2024-07-07 14:37:00' },
    { time: '01:52.112', name: 'Sergio Pérez', timestamp: '2024-07-04 14:34:00' },
  ];



}
