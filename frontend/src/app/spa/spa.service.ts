import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({ providedIn: 'root' })
export class SpaService {

  public apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  uploadFiles(file: File): Observable<any> {
    const formData = new FormData();
    formData.append("file", file);

    return this.http.post(this.apiUrl+'/upload', formData);
  }

  getUploadedFiles(): Observable<any> {
    return this.http.get(this.apiUrl + '/files');
  }

  removeUploadedFile(codeName: string): Observable<any> {
    return this.http.delete(this.apiUrl + "/download/" + codeName);
  }
}
