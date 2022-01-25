import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FileService } from '../services/FileService/file.service';
import { PublicationService } from '../services/PublicationService/publication.service';
import { saveAs } from 'file-saver';
import { MemberService } from '../services/MemberService/member.service';
import { Member } from '../members/member';

@Component({
  selector: 'app-publication-form',
  templateUrl: './publication-form.component.html',
  styleUrls: ['./publication-form.component.css']
})
export class PublicationFormComponent implements OnInit {

  selectedFiles: File[] = [];
  form: any;
  filenames: string[] = [];
  membres: Member[]=[];

  fileStatus = { status: '', requestType: '', percent: 0 };
  constructor(private publicationService: PublicationService, private fs: FileService,private memberService:MemberService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getMembres();
    this.intform(null)
  }
  private getMembres(){
    this.memberService.getMembers().subscribe(data =>{
      this.membres=data;
    })
  }
  intform(item: any): void {
    this.form = new FormGroup({
      date: new FormControl(item?.date, [Validators.required]),
      type: new FormControl(item?.type, [Validators.required]),
      titre: new FormControl(item?.titre, [Validators.required]),
      lien: new FormControl(item?.lien, [Validators.required]),
      sourcePdf: new FormControl(item?.sourcePdf, [Validators.required]),
      auteur:new FormControl(null, [Validators.required]),
    })
  }
  OnSubmit(): void {
    console.log(this.form.value);
    let publication = { ...this.form.value, "sourcePdf": this.form.value.sourcePdf?.split("\\").pop() }
    this.publicationService.addPublication(publication).subscribe(
      (data) => {
        this.affectToAuter(this.form.value.auteur,data.id)
      },
      (error: HttpErrorResponse) => { alert(error.message) }
    );
  }
  affectToAuter(idAuteur:number,idPublication:number) {
    this.memberService.publish(idAuteur,idPublication).subscribe(
      data => {
        console.log(data)
        this.router.navigate(["./publications"])
      }
    )
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
