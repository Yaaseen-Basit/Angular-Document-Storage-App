export class FileUpload {
    key: string = '';
    name: string = '';
    url: string = '';
    Type: string = '';
    file: File;
  
    constructor(file: File) {
      this.file = file;
    }
  }
  