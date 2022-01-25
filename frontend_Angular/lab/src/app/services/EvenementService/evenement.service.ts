import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evenement } from 'src/app/evenments/evenement';

@Injectable({
  providedIn: 'root'
})
export class EvenementService {
  private apiServerURL = 'http://localhost:8084';

  constructor(private httpClient: HttpClient) { }

  public getEvenements(): Observable<Evenement[]> {
    return this.httpClient.get<Evenement[]>(`${this.apiServerURL}/evenements/`)
  }
  public addEvenement(event: Evenement): Observable<Evenement> {
    console.log(event)
    return this.httpClient.post<Evenement>(`${this.apiServerURL}/evenement/add`, event);
  }
  public updateEvenement(event: Evenement): Observable<Evenement> {
    return this.httpClient.put<Evenement>(`${this.apiServerURL}/evenement/update/${event.id}`, event);
  }
  public deleteEvenement(eventid: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiServerURL}/evenement/delete/${eventid}`);
  }
  public getEventByID(id: number) {
    return this.httpClient.get(`${this.apiServerURL}/evenements/${id}`);
}
}
