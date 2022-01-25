import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { PublicationService } from '../services/PublicationService/publication.service';
import { Publication } from './publication';
import { saveAs } from 'file-saver';
import { FileService } from '../services/FileService/file.service';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css']
})
export class PublicationsComponent implements OnInit {

  public publications:Publication [] = [];
  displayedColumns: string[] = ['id', 'date', 'titre', 'type', 'lien','sourcePdf','action'];
  filenames: string[] = [];
  fileStatus = { status: '', requestType: '', percent: 0 };

  constructor(private publicationService: PublicationService, private dialog: MatDialog,private fs:FileService) {

  }

  ngOnInit(): void {
    this.getPublications();
  }
  public getPublications(): void {
    this.publicationService.getPublications().subscribe((data: Publication[]) => {
      this.publications = data;
      console.log(this.publications)
    },
      (error: HttpErrorResponse) => {
        alert(error.message);
      });
  }
  Onremove(id: number): void {
    const DialogRef = this.dialog.open(ConfirmDialogComponent, {});
    DialogRef.afterClosed().pipe().subscribe(isDeteConfirmed => {
      if (isDeteConfirmed) {
        this.publicationService.deletePublication(id).subscribe(() => this.getPublications())
      }
    })


  }
  onDownloadFile(filename: string): void {
    this.fs.download(filename).subscribe(
      event => {
        console.log(event);
        this.resportProgress(event,filename);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
  private resportProgress(httpEvent: HttpEvent<string[] | Blob>,filename:string): void {
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
         console.log(httpEvent.headers.get('File-Name'))
          saveAs(new File([httpEvent.body!], filename!,
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
