import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { FileService } from '../services/FileService/file.service';
import { OutilService } from '../services/OutilService/outil.service';
import { Outil } from './outils';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-outils',
  templateUrl: './outils.component.html',
  styleUrls: ['./outils.component.css']
})
export class OutilsComponent implements OnInit {
  public outils: Outil[] = [];
  displayedColumns: string[] = ['id', 'date', 'source', 'action'];

  filenames: string[] = [];
  fileStatus = { status: '', requestType: '', percent: 0 };


  constructor(private outilService: OutilService, private dialog: MatDialog, private fs: FileService) {

  }

  ngOnInit(): void {
    this.getOutils();
  }
  public getOutils(): void {
    this.outilService.getOutils().subscribe((data: Outil[]) => {
      this.outils = data;
      console.log(this.outils)
    },
      (error: HttpErrorResponse) => {
        alert(error.message);
      });
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

  Onremove(id: number): void {
    const DialogRef = this.dialog.open(ConfirmDialogComponent, {});
    DialogRef.afterClosed().pipe().subscribe(isDeteConfirmed => {
      if (isDeteConfirmed) {
        console.log("hello")
        this.outilService.deleteOutil(id).subscribe(() => this.getOutils())
      }
    })


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
