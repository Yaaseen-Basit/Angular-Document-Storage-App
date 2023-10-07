import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire//compat/storage';
import { Observable ,map} from 'rxjs';
import { finalize ,filter} from 'rxjs/operators';
import { FileUpload } from './models/fileupload';
import { ToastrService } from 'ngx-toastr'; 
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DocumentuploadSService {

  private basePath = '/docuploads';

  constructor(private db: AngularFireDatabase, private router:Router,private storage: AngularFireStorage,private toastr: ToastrService ) { }
  async deleteFileByName(fileName: string): Promise<void> {
    try {
      // Create a storage reference to the file by name
      const fileRef = this.storage.ref(fileName);

      // Delete the file from Firebase Storage
      await fileRef.delete().toPromise();

      // Show a success toast notification
      this.toastr.success(`File '${fileName}' deleted successfully`, 'Success');
    } catch (error) {
      const castedError = error as Error; // Cast error to the 'Error' type
      // Show an error toast notification
      this.toastr.error(`Error deleting file: ${castedError.message}`, 'Error');
      throw castedError;    }
  }

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
          this.toastr.success(`File '${fileUpload.file.name}' uploaded successfully`, 'Success');
          this.router.navigate(['/dashboard']); 

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
