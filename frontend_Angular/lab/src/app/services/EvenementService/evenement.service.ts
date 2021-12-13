import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evenement } from 'src/app/evenments/evenement';

@Injectable({
  providedIn: 'root'
})
export class EvenementService {
  private apiServerApi ='http://localhost:9000';

  constructor(private httpClient : HttpClient) { }

  public getEvenements(): Observable<Evenement[]>{
    return this.httpClient.get<Evenement[]>("http://localhost:9000/EVENEMENT-SERVICE/evenements")
  }
  public addEvenement(event:Evenement): Observable<Evenement>{
    console.log(event)
    return this.httpClient.post<Evenement>(`${this.apiServerApi}/EVENEMENT-SERVICE/evenement/add`,event);
  }
  public updateEvenement(event:Evenement): Observable<Evenement>{
    return this.httpClient.put<Evenement>(`${this.apiServerApi}/EVENEMENT-SERVICE/evenement/update/${event.id}`,event);
  }
  public deleteEvenement(eventid:number): Observable<void>{
    return this.httpClient.delete<void>(`${this.apiServerApi}/EVENEMENT-SERVICE/evenement/delete/${eventid}`);
  }

}
