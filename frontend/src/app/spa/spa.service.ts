import { Injectable } from '@angular/core';
import { delay, Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({ providedIn: 'root' })
export class SpaService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  uploadFiles(file: File): Observable<any> {
    return of({}).pipe(
      delay(6000)
    );
  }

  getUploadedFiles() {
    return this.http.get(this.apiUrl + "/upload");
  }
}
