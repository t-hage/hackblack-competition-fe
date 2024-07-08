import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {OcrService} from "../ocr.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-photo-capture',
  templateUrl: './photo-capture.component.html',
  standalone: true,
  styleUrls: ['./photo-capture.component.css'],
  imports: [
    CommonModule
  ],
})
export class PhotoCaptureComponent {
  private ocrService: OcrService;

  constructor(private _ocrService: OcrService) {
    this.ocrService = _ocrService;
  }

  photo: string | ArrayBuffer | null = null;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.photo = reader.result;

        this.ocrService.recognize(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }
}
