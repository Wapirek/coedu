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

  ngOnInit(): void {
  }

  uploadFiles = (file: any) => {
    const fileConvert: File = (file.target?.files as FileList)[0];

    this.updateFileList(fileConvert.name);

    this.spaService.uploadFiles(fileConvert).pipe(
      first()
    ).subscribe(
      () => this.updateFileList(fileConvert.name),
      () => this.removeFromFileList(fileConvert.name)
    );
  }

  private updateFileList(fileName: string): void {
    const index: number = this.files.findIndex(f => f.codeName === fileName);

    if (index === -1) {
      // add loading file
      this.files.push({ codeName: fileName, saved: false });
    } else {

      // if exist only change flag
      this.files[index].saved = true;
    }

    this.files$.next(this.files);
  }

  private removeFromFileList(fileName: string): void {
    const index: number = this.files.findIndex(f => f.codeName === fileName);
    this.files.splice(index, 1);
    this.files$.next(this.files);
  }
}
