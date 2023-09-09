import { Component ,Input} from '@angular/core';
import { DocumentserviceService } from '../documentservice/documentservice.service';
import { DocumentuploadSService } from '../documentupload-s.service';
import { FileUpload } from '../models/fileupload';
import {CdkDrag} from '@angular/cdk/drag-drop';



@Component({
  selector: 'app-documentupload',
  templateUrl: './documentupload.component.html',
  styleUrls: ['./documentupload.component.css']
})
export class DocumentuploadComponent {
  selectedFile: File | null = null; // Initialize selectedFile property
  // maxSizeInBytes = 5 * 1024 * 1024; // 5MB
  // allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf']; // Allowed file types

  // constructor(private documentuploadService: DocumentuploadSService) { }

  // onFileSelected(event: any) {
  //   const file = event.target.files[0];
  //   if (this.isValidFileType(file) && this.isValidFileSize(file)) {
  //     this.selectedFile = file;
  //   } else {
  //     // Display an error message to the user
  //     alert('Invalid file type or size. Please select a valid file.');
  //     // Optionally, you can reset the file input
  //     event.target.value = null;
  //   }
  // }

  // uploadDocument() {
  //   if (this.selectedFile) {
  //     // this.documentService.uploadDocument(this.selectedFile);
  //     this.documentuploadService.uploadDocument(this.selectedFile);

  //   } else {
  //     // Display an error message to the user
  //     alert('Please select a file to upload.');
  //   }
  // }

  // private isValidFileType(file: File): boolean {
  //   return this.allowedFileTypes.includes(file.type);
  // }

  // private isValidFileSize(file: File): boolean {
  //   return file.size <= this.maxSizeInBytes;
  // }
  @Input() fileUpload: FileUpload;

    selectedFiles: FileList | undefined;
  currentFileUpload: FileUpload | null = null; // Initialize it with null or an appropriate default value
  percentage: number;
  constructor(private uploadService: DocumentuploadSService) {
        this.selectedFiles = undefined; // or this.selectedFiles = new FileList(); if you prefer an empty FileList
        this.percentage = 0; //
        this.fileUpload = new FileUpload(new File([], 'sampleFile')); // Replace with your actual 'File' object

  }

  ngOnInit(): void {
  }

  // selectFile(event): void {
  //   this.selectedFiles = event.target.files;
  // }
  selectFile(event: Event): void {
   
  // selectFile(event: ChangeEvent<HTMLInputElement>): void {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files;
  
    if (files) {
      this.selectedFiles = files;
    }
  }
  upload(): void {
    if (this.selectedFiles) {
      const file = this.selectedFiles.item(0);
  
      if (file) {
        this.selectedFiles = undefined;
        
        this.currentFileUpload = new FileUpload(file);
        this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
          percentage => {
            this.percentage = Math.round(percentage);
          },
          error => {
            console.log(error);
          }
        );
      } else {
        // Handle the case where 'file' is null (no file selected)
        console.error("No file selected.");
      }
    }
  }
  
  
}
