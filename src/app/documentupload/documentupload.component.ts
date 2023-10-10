import { Component ,Input} from '@angular/core';
import { DocumentserviceService } from '../documentservice/documentservice.service';
import { DocumentuploadSService } from '../documentupload-s.service';
import { FileUpload } from '../models/fileupload';
import {CdkDrag} from '@angular/cdk/drag-drop';
import { ToastrService } from 'ngx-toastr'; 



@Component({
  selector: 'app-documentupload',
  templateUrl: './documentupload.component.html',
  styleUrls: ['./documentupload.component.css']
})
export class DocumentuploadComponent {
  selectedFile: File | null = null; // Initialize selectedFile property
   @Input() fileUpload: FileUpload;
  selectedFiles: FileList | undefined;
  currentFileUpload: FileUpload | null = null; // Initialize it with null or an appropriate default value
  percentage: number;
  constructor(private toastr: ToastrService, private uploadService: DocumentuploadSService) {
        this.selectedFiles = undefined; // or this.selectedFiles = new FileList(); if you prefer an empty FileList
        this.percentage = 0; //
        this.fileUpload = new FileUpload(new File([], 'sampleFile')); // Replace with your actual 'File' object
  }

  ngOnInit(): void {
  }
  selectFile(event: Event): void {
   
    var inputElement = event.target as HTMLInputElement;
    var files = inputElement.files;
  
    if (files) {
      this.selectedFiles = files;
    }
  }
  upload(): void {
    if (this.selectedFiles) {
      var file = this.selectedFiles.item(0);
  
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
        this.toastr.error('No file selected. ' );

      }
    }
  }
  
  
}
