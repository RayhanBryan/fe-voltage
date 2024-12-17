import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class DataGeneratorService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getRandomTypeList(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}dummy/data/list-random-data-type`
    );
  }

  downloadFile(fileSize: number, osType: string, data: any): Observable<Blob> {
    return this.http.post(
      `${this.apiUrl}dummy/data/file/generator?requireSize=${fileSize}&osType=${osType}`,
      data,
      {
        responseType: 'blob', // Mendapatkan file sebagai Blob
      }
    );
  }
}
