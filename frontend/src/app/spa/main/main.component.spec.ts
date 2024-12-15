import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainComponent } from './main.component';
import { SpaService } from '../spa.service';
import { of } from 'rxjs';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let spaServiceMock: jasmine.SpyObj<SpaService>;

  beforeEach(() => {
    // Create a spy object for the SpaService
    spaServiceMock = jasmine.createSpyObj('SpaService', ['getUploadedFiles', 'uploadFiles', 'removeUploadedFile']);
    spaServiceMock.getUploadedFiles.and.returnValue(of(['file1.txt', 'file2.txt']));
    spaServiceMock.uploadFiles.and.returnValue(of(null)); // mock uploadFiles
    spaServiceMock.removeUploadedFile.and.returnValue(of(null)); // mock removeUploadedFile

    // Set up TestBed with the component and mock service
    TestBed.configureTestingModule({
      declarations: [MainComponent],
      providers: [
        { provide: SpaService, useValue: spaServiceMock }
      ]
    });

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getFiles on ngOnInit', () => {
    const spy = spyOn(component, 'getFiles');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should set the files$ BehaviorSubject correctly when getFiles is called', () => {
    component.getFiles();
    component.files$.subscribe(files => {
      expect(files.length).toBe(2);
      expect(files[0].codeName).toBe('file1.txt');
    });
  });

  it('should remove file from the list when removeFromFileList is called', () => {
    // Simulate the existing file list
    component['files'] = [
      { codeName: 'file1.txt', saved: true, link: 'url' },
      { codeName: 'file2.txt', saved: true, link: 'url' }
    ];
    component.files$.next(component['files']);

    // Remove a file
    component.removeFromFileList('file1.txt');

    component.files$.subscribe(files => {
      expect(files.length).toBe(1);
      expect(files[0].codeName).toBe('file2.txt');
    });

    // Check if removeUploadedFile method of SpaService was called
    expect(spaServiceMock.removeUploadedFile).toHaveBeenCalledWith('file1.txt');
  });
});
