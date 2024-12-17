import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class DataGeneratorService {
  private apiUrl = 'http://localhost:2972/';
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
