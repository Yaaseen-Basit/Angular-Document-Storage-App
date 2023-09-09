import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire//compat/storage';
import { Observable ,map} from 'rxjs';
import { finalize ,filter} from 'rxjs/operators';
import { FileUpload } from './models/fileupload';
@Injectable({
  providedIn: 'root'
})
export class DocumentuploadSService {


  // uploadDocument(file: File): AngularFireUploadTask {
  //   const filePath = `documentscollection/${file.name}`;
  //   const fileRef = this.storage.ref(filePath);
  //   return this.storage.upload(filePath, file);

    // Monitor the upload progress and handle completion or errors
  // task.snapshotChanges().subscribe(
  //   (snapshot) => {
  //     if (snapshot.state === 'success') {
  //       // File uploaded successfully
  //       console.log('Upload complete');
  //     }
  //   },
  //   (error) => {
  //     // Handle the error
  //     console.error('Upload error:', error);
  //   }
  // );
  private basePath = '/docuploads';

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) { }

  // pushFileToStorage(fileUpload: FileUpload): Observable<number> {
  //   const filePath = `${this.basePath}/${fileUpload.file.name}`;
  //   const storageRef = this.storage.ref(filePath);
  //   const uploadTask = this.storage.upload(filePath, fileUpload.file);

  //   uploadTask.snapshotChanges().pipe(
  //     finalize(() => {
  //       storageRef.getDownloadURL().subscribe(downloadURL => {
  //         fileUpload.url = downloadURL;
  //         fileUpload.name = fileUpload.file.name;
  //         this.saveFileData(fileUpload);
  //       });
  //     })
  //   ).subscribe();

  //   return uploadTask.percentageChanges();
  // }
  pushFileToStorage(fileUpload: FileUpload): Observable<number> {
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);
  
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          this.saveFileData(fileUpload);
        });
      })
    ).subscribe();
  
    // Use the filter operator to filter out undefined values
    return uploadTask.percentageChanges().pipe(
      filter(percentage => percentage !== undefined), // Filter out undefined values
      map(percentage => percentage as number) // Cast to number
    );
  }
  
  private saveFileData(fileUpload: FileUpload): void {
    this.db.list(this.basePath).push(fileUpload);
  }

  getFiles(numberItems: number): AngularFireList<FileUpload> {
    return this.db.list(this.basePath, ref =>
      ref.limitToLast(numberItems));
  }

  deleteFile(fileUpload: FileUpload): void {
    this.deleteFileDatabase(fileUpload.key)
      .then(() => {
        this.deleteFileStorage(fileUpload.name);
      })
      .catch(error => console.log(error));
  }

  private deleteFileDatabase(key: string): Promise<void> {
    return this.db.list(this.basePath).remove(key);
  }

  private deleteFileStorage(name: string): void {
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(name).delete();
  }

  }
