import {Injectable} from '@angular/core';
import {createWorker, PSM} from 'tesseract.js';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OcrService {
  private recognitionResultSubject: Subject<string | null> = new Subject<string | null>();
  private newLapTimeSubject: Subject<string | null> = new Subject<string | null>();

  constructor() {
    this.recognitionResultSubject.next(null); // Initialize with null result
    this.recognitionResultSubject
      .subscribe(result => {
        this.handleResult(result)
      });
  }

  private handleResult(result: string | null){
    console.log('Recognition result:', result);

    const regex = /\b\d{2}:\d{2,3}\.\d{3}\b/g;
    const matches = result?.match(regex);

    if (matches) {
      console.log('Found matches:');
      console.log(matches);
      let fastest = this.getFastest(matches);
      console.log('Fastest time:', fastest);
      this.newLapTimeSubject.next(fastest);
    } else {
      console.log('No matches found.');
    }
  }

  private getFastest(matches: string[]): string {
    let fastest = matches[0];
    matches.forEach(time => {
      if (time < fastest) {
        fastest = time;
      }
    });
    return fastest;
  }

  async recognize(imageUrl: string): Promise<void> {
    const worker = await createWorker('eng');
    worker.setParameters({'tessedit_char_blacklist': "!?@#$%&*()<>_=/;'\"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"});
    // worker.setParameters({'tessedit_char_whitelist': " -+:.,0123456789"});
    worker.setParameters({'tessedit_pageseg_mode': PSM.SINGLE_COLUMN});

    try {
      const ret = await worker.recognize(imageUrl);
      const resultText = ret.data.text;
      this.recognitionResultSubject.next(resultText); // Notify subscribers with the result
    } catch (error) {
      console.error('Error recognizing image:', error);
      this.recognitionResultSubject.next(null); // Notify subscribers of error (null result)
    } finally {
      await worker.terminate();
    }
  }

  getnewLapTimeObservable(): Observable<string | null> {
    return this.newLapTimeSubject.asObservable();
  }
}
