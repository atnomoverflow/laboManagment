import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Publication } from 'src/app/publications/publication';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  private apiServerURL = 'http://localhost:8083';

  constructor(private httpClient: HttpClient) { }

  public getPublications(): Observable<Publication[]> {
    return this.httpClient.get<Publication[]>(`${this.apiServerURL}/publications/`)
  }

  public addPublication(publication: Publication): Observable<Publication> {
    return this.httpClient.post<Publication>(`${this.apiServerURL}/publication/add`, publication);
  }

  public updatePublication(publication: Publication): Observable<Publication> {
    return this.httpClient.put<Publication>(`${this.apiServerURL}/publication/update/${publication.id}`, publication);
  }
  public getPublicationByID(id: number) {
    return this.httpClient.get<Publication[]>(`${this.apiServerURL}/publication/${id}`)
  }
  public deletePublication(publicationID: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiServerURL}/publication/delete/${publicationID}`);
  }
}

