import { HttpClient, HttpEvent, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Outil } from 'src/app/outils/outils';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OutilService {
  private apiServerURL = 'http://localhost:8082';

  constructor(private httpClient: HttpClient) { }

  public getOutils(): Observable<Outil[]> {
    return this.httpClient.get<Outil[]>(`${this.apiServerURL}/outils/`)
  }

  public addOutil(outil: Outil) {
    return this.httpClient.post<Outil>(`${this.apiServerURL}/outil/add`, outil);
  }

  public updateOutil(outil: Outil): Observable<Outil> {
    return this.httpClient.put<Outil>(`${this.apiServerURL}/outil/update/${outil.id}`, outil);
  }

  public deleteOutil(outilID: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiServerURL}/outil/delete/${outilID}`);
  }
  // define function to download files
  public downloadOutil(filename: string) {
    return this.httpClient.get(`${this.apiServerURL}/outil/download/${filename}/`);
  }

  public getOutilByID(id: number) {
    return this.httpClient.get<Outil>(`${this.apiServerURL}/outil/${id}`,);
  }
}
