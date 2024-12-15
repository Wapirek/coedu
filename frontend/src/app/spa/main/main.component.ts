import { Component, OnInit } from '@angular/core';
import { SpaService } from "../spa.service";
import { FileModel } from "../_models/file.model";
import { BehaviorSubject, first } from "rxjs";

@Component({
  selector: 'app-main',
  standalone: false,
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {

  private files: FileModel[] = [];
  files$: BehaviorSubject<FileModel[]> = new BehaviorSubject<FileModel[]>([]);

  constructor(private spaService: SpaService) {}

  ngOnInit(): void { this.getFiles(); }

  uploadFiles = (file: any) => {
    const fileConvert: File = (file.target?.files as FileList)[0];
    this.updateFileList(fileConvert.name);
    this.spaService.uploadFiles(fileConvert).pipe(first()).subscribe();
  }

  getFiles(): void {
    this.spaService.getUploadedFiles().subscribe(
        (res: string[]) => {
          this.files = res.map((r: string) => {
            return {
              codeName: r,
              saved: true,
              link: this.spaService.apiUrl + '/download/' + r
            } as FileModel;
          });

          this.files$.next(this.files);
        }
    );
  }

  private updateFileList(fileName: string): void {

    // add loading file
    this.files.push({
      codeName: fileName,
      saved: true,
      link: this.spaService.apiUrl + '/download/' + fileName
    });

    this.files$.next(this.files);
  }

  removeFromFileList(fileName: string): void {
    const index: number = this.files.findIndex(f => f.codeName === fileName);
    this.files.splice(index, 1);
    this.files$.next(this.files);

    this.spaService.removeUploadedFile(fileName).pipe(first()).subscribe(
        () => {}
    )
  }
}
