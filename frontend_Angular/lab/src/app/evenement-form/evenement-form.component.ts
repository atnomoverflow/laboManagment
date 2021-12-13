import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Evenement } from '../evenments/evenement';
import { EvenementService } from '../services/EvenementService/evenement.service';

@Component({
  selector: 'app-evenement-form',
  templateUrl: './evenement-form.component.html',
  styleUrls: ['./evenement-form.component.css']
})
export class EvenementFormComponent implements OnInit {
  form: any;
  constructor(private evenementService:EvenementService,private router : Router) { }

  ngOnInit(): void {
    this.intform(null);
  }
  intform(item : any): void {
    this.form = new FormGroup({
      titre : new FormControl (item?.titre,[Validators.required]), //item?.cin,
      date : new FormControl (item?.date,[Validators.required]),
      lieu : new FormControl (item?.lieu,[Validators.required]),
      
    })
  }
  OnSubmit() : void{
    console.log(this.form.value);
    this.evenementService.addEvenement(this.form.value).subscribe(
      (data)=>{
        this.router.navigate(["./evenments"])
        
      },
      (error:HttpErrorResponse)=>{alert(error.message)}
      );
  }

}
