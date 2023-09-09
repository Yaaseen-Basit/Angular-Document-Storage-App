import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocumentserviceService } from '../documentservice/documentservice.service';
import { filter } from 'rxjs/operators'; // Import the filter operator
import { Document } from '../shared/interfaces/document.interface'; // Import the Document interface
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DocumentuploadSService } from '../documentupload-s.service';
import { FileUpload } from '../models/fileupload';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-documentdetails',
  templateUrl: './documentdetails.component.html',
  styleUrls: ['./documentdetails.component.css']
})

export class DocumentdetailsComponent implements OnInit {
  ngOnInit(): void {
    // this.route.paramMap.subscribe((params) => {
    //   this.documentId = params.get('id');
    // });
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id !== null) {
        this.documentId = id;
      } else {
        // Handle the case when 'id' is null, e.g., set a default value
        this.documentId = '1';
      }
    });

    this.route.queryParams.subscribe((params) => {
      this.documentName = params['name'];
      this.documentUrl = params['url'];
      console.log("IN queryParams",this.documentUrl );
    });
  }

  safeDocumentUrl: SafeResourceUrl;
  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer, private firestore: AngularFirestore) {
    this.safeDocumentUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.documentUrl);
    console.log("safeDocumentUrl",this.safeDocumentUrl );
    console.log("IN Constructor",this.documentUrl );


  }
  documentName: string = '';
  documentDetails: any;
  documentId: string = '';

  // ngOnInit(): void {
  //   this.route.paramMap.subscribe((params) => {
  //     this.documentName = params.get('name');

  //     this.DocumentuploadSService.getDocumentDetailsByName(this.documentName).subscribe((details) => {
  //       this.documentDetails = details;
  //     });
  //   });
  // }

  documentUrl: string = '';

 
  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}