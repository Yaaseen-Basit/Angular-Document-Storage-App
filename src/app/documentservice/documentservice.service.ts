import { Injectable } from '@angular/core';
import { AngularFireStorage,AngularFireUploadTask } from '@angular/fire/compat/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import {switchMap, finalize } from 'rxjs/operators'; // Import the finalize operator
import { map } from 'rxjs/operators';
import { Document } from '../shared/interfaces/document.interface'; 

@Injectable({
  providedIn: 'root'
})
export class DocumentserviceService {
  private documentsCollection: AngularFirestoreCollection<Document>;
  documents: Observable<Document[]>;

  constructor( private storage: AngularFireStorage,    private firestore: AngularFirestore  ) {
    this.documentsCollection = firestore.collection<Document>('documents');
    this.documents = this.documentsCollection.valueChanges();
  }
  getDocuments(): Observable<any[]> {
    // Replace 'your_collection_name' with the actual name of your Firestore collection
    return this.firestore.collection('dscollection').valueChanges();
  }

  getDocumentById(documentId: string): Observable<Document | undefined> {
    return this.firestore.doc<Document>(`documents/${documentId}`)
      .valueChanges()
      .pipe(
        map((document: Document | undefined) => {
          if (document) {
            return document; // Document found, return it
          } else {
            return { id: '',
            title: 'No Document Found',
            content: '', } as Document;
          }
        })
      );
  }
  uploadDocument(file: File): Observable<string> {
    const filePath = `documents/${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task: AngularFireUploadTask = this.storage.upload(filePath, file);

    return task.snapshotChanges().pipe(
      finalize(() => {
        return fileRef.getDownloadURL();
      }),
      switchMap(downloadURL => {
        // Store the download URL in Firestore or perform other actions
        console.log('File uploaded. Download URL:', downloadURL);
        return new Observable<string>(observer => {
          // observer.next(downloadURL);
          observer.complete();
        });
      })
    );
  }}
