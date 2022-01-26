import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/app/members/member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private apiServerURL = 'http://localhost:8081';

  constructor(private httpClient: HttpClient) { }

  public getMembers(): Observable<Member[]> {
    return this.httpClient.get<Member[]>(`${this.apiServerURL}/membres/`)
  }
  public getEnseigant(): Observable<Member[]> {
    return this.httpClient.get<Member[]>(`${this.apiServerURL}/enseignant/`)
  }

  public addEnseigant(event: Member): Observable<Member> {
    console.log(event)
    return this.httpClient.post<Member>(`${this.apiServerURL}/membres/enseignant`, event);
  }
  public getMember(memberID: number) {
    return this.httpClient.get<Member>(`${this.apiServerURL}/membres/${memberID}`)
  }
  public addEtudiant(event: Member): Observable<Member> {
    console.log(event)
    return this.httpClient.post<Member>(`${this.apiServerURL}/membre/etudiant`, event);
  }

  public updateEtudiant(member: Member): Observable<Member> {
    return this.httpClient.put<Member>(`${this.apiServerURL}/member/etudiant/${member.id}`, member);
  }

  public updateEnseigant(member: Member): Observable<Member> {
    return this.httpClient.put<Member>(`${this.apiServerURL}/membres/enseignant/${member.id}`, member);
  }

  public deleteMember(memberID: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiServerURL}/membres/${memberID}`);
  }
  public getDetailMember(memberID: number): Observable<Member> {
    return this.httpClient.get<Member>(`${this.apiServerURL}/fullmembe/${memberID}`);
  }
  
  public assignMentor(idetd: number, idens: number): Observable<Member> {
    let params = new HttpParams();
    params.set('idetd', idetd);
    params.set('idens', idens);
    return this.httpClient.put<Member>(`${this.apiServerURL}/membre/etudiant`, { params: params });
  }
  public publish(idAut: number, idPub: number) {
    
    return this.httpClient.put<void>(`${this.apiServerURL}/membres/${idAut}/publication/${idPub}`,{});
  }


}
