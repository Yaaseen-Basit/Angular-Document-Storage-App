import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot,Router  } from '@angular/router';
import { DocumentserviceService } from './documentservice/documentservice.service';
import { Observable , of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DocumentResolver implements Resolve<Document | null> { // Update the resolver interface
    constructor(
      private documentService: DocumentserviceService,
      private router: Router
    ) {}
  
    resolve(route: ActivatedRouteSnapshot): Observable<Document | null> { // Update the return type
      const documentId = route.paramMap.get('id');
  
      if (documentId) {
        return this.documentService.getDocumentById(documentId).pipe(
          catchError((error: any) => {
            console.error('Error fetching document:', error);
  
            // Redirect to the "Page Not Found" component
            this.router.navigate(['/page-not-found']);
  
            // Return null for the resolver
            return of<Document | null>(null);
          })
        );
      } else {
        // Handle the case where 'documentId' is null or undefined
        // Redirect to the "Page Not Found" component
        this.router.navigate(['/page-not-found']);
  
        // Return null for the resolver
        return of<Document | null>(null);
      }
    }
  }