import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { AuthService } from '../services/auth/auth.service';
import { EvenementService } from '../services/EvenementService/evenement.service';
import { Evenement } from './evenement';

@Component({
  selector: 'app-evenments',
  templateUrl: './evenments.component.html',
  styleUrls: ['./evenments.component.css']
})
export class EvenmentsComponent implements OnInit {
  
  public events: Evenement[] = [];
  displayedColumns: string[] =['id','date','titre','lieu','action'];

  constructor(private evenementService:EvenementService,public authService: AuthService, private dialog: MatDialog) {
    
   }

  ngOnInit(): void {
    this.getEvenement();
  }
  public getEvenement():void{
    this.evenementService.getEvenements().subscribe((data:Evenement[])=>{
      this.events= data;
      console.log(this.events)
    },
    (error:HttpErrorResponse)=>{
      alert(error.message);
    });
  }
  Onremove(id: number): void {
    const DialogRef = this.dialog.open(ConfirmDialogComponent, {});
    DialogRef.afterClosed().pipe().subscribe(isDeteConfirmed => {
      if (isDeteConfirmed) {
        console.log("hello")
        this.evenementService.deleteEvenement(id).subscribe(() => this.getEvenement())
      }
    })    


  }
  

}
