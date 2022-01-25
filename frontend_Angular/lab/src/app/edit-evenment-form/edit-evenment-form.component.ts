import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Evenement } from '../evenments/evenement';
import { EvenementService } from '../services/EvenementService/evenement.service';


@Component({
  selector: 'app-edit-evenment-form',
  templateUrl: './edit-evenment-form.component.html',
  styleUrls: ['./edit-evenment-form.component.css']
})
export class EditEvenmentFormComponent implements OnInit {

  form: any;
  constructor(private evenementService:EvenementService,private router : Router,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.params['id'];

    this.evenementService.getEventByID(id).subscribe(data => {
      this.intform(data)
    }, error => console.log(error));
  }
  intform(item : any): void {
    this.form = new FormGroup({
      id:new FormControl(item?.id),
      titre : new FormControl (item?.titre,[Validators.required]), //item?.cin,
      date : new FormControl (item?.date,[Validators.required]),
      lieu : new FormControl (item?.lieu,[Validators.required]),
      
    })
  }
  OnSubmit() : void{
    console.log(this.form.value);
    this.evenementService.updateEvenement(this.form.value).subscribe(
      (data)=>{
        this.router.navigate(["./evenments"])
      },
      (error:HttpErrorResponse)=>{alert(error.message)}
      );
  }
}
