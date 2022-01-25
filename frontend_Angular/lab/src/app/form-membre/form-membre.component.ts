import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OutilService } from '../services/OutilService/outil.service';
import { saveAs } from 'file-saver';
import { FileService } from '../services/FileService/file.service';
import { MemberService } from '../services/MemberService/member.service';

@Component({
  selector: 'app-form-membre',
  templateUrl: './form-membre.component.html',
  styleUrls: ['./form-membre.component.css']
})
export class FormMembreComponent implements OnInit {

  selectedFiles: File[] = [];
  form: any;
  filenames: string[] = [];
  fileStatus = { status: '', requestType: '', percent: 0 };

  constructor(private memberService: MemberService, private router: Router, private fs: FileService) { }
  ngOnInit(): void {
    this.intform(null)
  }
  intform(item: any): void {
    this.form = new FormGroup({
      cin: new FormControl(item?.cin, [Validators.required]),
      nom: new FormControl(item?.nom, [Validators.required]),
      prenom: new FormControl(item?.prenom, [Validators.required]),
      dateNaissance: new FormControl(item?.date, [Validators.required]),
      photo: new FormControl(item?.photo, [Validators.required]),
      cv: new FormControl(item?.cv, [Validators.required]),
      email: new FormControl(item?.email, [Validators.required]),
      password: new FormControl(item?.password, [Validators.required]),
      grade: new FormControl(item?.grade, [Validators.required]),
      etablissement: new FormControl(item?.etablissement, [Validators.required]),
    })
  }

  OnSubmit(): void {
    let outil = { ...this.form.value, "photo": this.form.value.photo?.split("\\").pop(),"cv": this.form.value.cv?.split("\\").pop() }
    this.memberService.addEnseigant(outil).subscribe(
      (data) => {
        this.router.navigate(["./outils"])
      },
      (error: HttpErrorResponse) => { alert(error.message) },

    );
  }
  onUploadFiles(event: any): void {
    console.log(event);
    this.selectedFiles = <File[]>event.target.files;
    const formData = new FormData();
    formData.append('files', this.selectedFiles[0], this.selectedFiles[0].name)
    this.fs.upload(formData).subscribe(
      event => {
        console.log(event);
        this.resportProgress(event);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }




  private resportProgress(httpEvent: HttpEvent<string[] | Blob>): void {
    switch (httpEvent.type) {
      case HttpEventType.UploadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Uploading... ');
        break;
      case HttpEventType.DownloadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Downloading... ');
        break;
      case HttpEventType.ResponseHeader:
        console.log('Header returned', httpEvent);
        break;
      case HttpEventType.Response:
        if (httpEvent.body instanceof Array) {
          this.fileStatus.status = 'done';
          for (const filename of httpEvent.body) {
            this.filenames.unshift(filename);
          }
        } else {
          saveAs(new File([httpEvent.body!], httpEvent.headers.get('File-Name')!,
            { type: `${httpEvent.headers.get('Content-Type')};charset=utf-8` }));
          // saveAs(new Blob([httpEvent.body!], 
          //   { type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}),
          //    httpEvent.headers.get('File-Name'));
        }
        this.fileStatus.status = 'done';
        break;
      default:
        console.log(httpEvent);
        break;

    }
  }

  private updateStatus(loaded: number, total: number, requestType: string): void {
    this.fileStatus.status = 'progress';
    this.fileStatus.requestType = requestType;
    this.fileStatus.percent = Math.round(100 * loaded / total);
  }



}
