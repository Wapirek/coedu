import { TestBed } from '@angular/core/testing';
import { SpaService } from './spa.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';

describe('SpaService', () => {
  let service: SpaService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SpaService]
    });

    service = TestBed.inject(SpaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // ensures no outstanding HTTP requests are pending
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should upload files successfully', () => {
    const file = new File([''], 'testfile.txt');
    const mockResponse = { message: 'File uploaded successfully' };

    service.uploadFiles(file).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    // Check that the correct POST request was made
    const req = httpMock.expectOne(`${environment.apiUrl}/upload`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body.has('file')).toBeTrue();

    // Respond with mock data
    req.flush(mockResponse);
  });

  it('should get uploaded files successfully', () => {
    const mockFiles = ['file1.txt', 'file2.txt'];

    service.getUploadedFiles().subscribe(files => {
      expect(files).toEqual(mockFiles);
    });

    // Check that the correct GET request was made
    const req = httpMock.expectOne(`${environment.apiUrl}/files`);
    expect(req.request.method).toBe('GET');

    // Respond with mock data
    req.flush(mockFiles);
  });

  it('should remove an uploaded file successfully', () => {
    const codeName = 'file1.txt';
    const mockResponse = { message: 'File deleted successfully' };

    service.removeUploadedFile(codeName).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    // Check that the correct DELETE request was made
    const req = httpMock.expectOne(`${environment.apiUrl}/download/${codeName}`);
    expect(req.request.method).toBe('DELETE');

    // Respond with mock data
    req.flush(mockResponse);
  });
});
