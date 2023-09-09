
import { DocumentserviceService } from '../documentservice/documentservice.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DocumentuploadSService } from '../documentupload-s.service';
import {AfterViewInit, Component,OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // documents: any[] = [];

  // constructor(private documentService: DocumentserviceService) { }

  // ngOnInit() {
  //   this.documentService.getDocuments().subscribe(documents => {
  //     this.documents = documents;
  //   });
  // }
  // documents$!: Observable<any[]>;

  // constructor(private firestore: AngularFirestore) { }

  // ngOnInit(): void {
  //   this.documents$ = this.firestore.collection('documentscollection').valueChanges();
  //   console.log("this.documents$>>>>>",this.documents$)
  // }
  // fileUploads: any[];
  
  fileUploads: any[] = []; 
  constructor(private uploadService: DocumentuploadSService,private router:Router) { }

  ngOnInit(): void {
    this.uploadService.getFiles(6).snapshotChanges().pipe(
      map(changes =>
        // store the key
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(fileUploads => {
      this.fileUploads = fileUploads;
      console.log("this.fileUploads ", this.fileUploads );
      this.dataSource.data = this.fileUploads;

    });
  }

  displayedColumns: string[] = ['SrNo', 'name','Action' ];

  public dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator :any = MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  viewdetails() {

  this.router.navigate(['/details']); 
  }
  
}
