import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/web/blog.model';
import { environment } from 'src/environments/environment.prod';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private readonly POST = 'webcontent/posts';

  constructor( private httpClient: HttpClient ) { }

  getPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${environment.api}${this.POST}`)
      .pipe(
        map( (data: any) => data.records )
      );
  }

  setPost( data: Post ): Observable<any> {
    return this.httpClient.post<Post>(`${environment.api}${this.POST}`, data, {
      reportProgress: true,
      observe: 'events'
    });
  }

  updatePost( id: string, data: Post ): Observable<any> {
    return this.httpClient.put<Post>(`${environment.api}${this.POST}/${id}`, data, {
      reportProgress: true,
      observe: 'body'
    });
  }

  deletePost( id: string ): Observable<string> {
    return this.httpClient.delete<string>(`${environment.api}${this.POST}/${id}`);
  }
}
