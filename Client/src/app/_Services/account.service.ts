import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { IUser } from '../-models/user';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'http://localhost:56811/api/';

  private currentUserSource = new ReplaySubject<IUser | null>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) {}

  login(model: any): Observable<void> {
    return this.http.post<IUser>(`${this.baseUrl}Account/Login`, model).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    );
  }

  setCurrentUser(user: IUser | null): void {
    this.currentUserSource.next(user);
  }

  logout(): void {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  Register(model:any)
  {
    return this.http.post(this.baseUrl+'Account/register',model).pipe(
      map((user:any)=>{
        if(user)
          {
            localStorage.setItem('user',JSON.stringify(user));
            this.currentUserSource.next(user);
          }
  
      })
    )

  }
}
