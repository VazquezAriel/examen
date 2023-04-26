import { Injectable } from '@angular/core';
import { User } from '../interfaces/user-interface';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public currentUser!: User;
  
  constructor( private http:HttpClient ) { }

  logout() {
    const loginTime = localStorage.getItem('loginTime');
    const logoutTime = new Date().getTime();
    let duration = Math.floor((logoutTime - parseInt(loginTime ? loginTime : "0")) / 1000);
    duration = duration + (this.currentUser.time ? this.currentUser.time : 0);
    this.patchUser(this.currentUser._id, duration).subscribe(data => console.log(data));
    localStorage.clear();
  }

  saveUser(user:User) {
    this.currentUser = user
    const now = new Date().getTime();
    localStorage.setItem('loginTime', now.toString());
  }

  postUser(user:User) {
    const url = `http://localhost:3000/client`;
    return this.http.post<any>(url, user).pipe(
      catchError(this.handleError)
    );
  }

  getUsers(page:number=1, itemsPage:number=20, word:string=""): Observable<any> {

    const params =  new HttpParams()
      .set('pagina', page)
      .set('limite', itemsPage)
      .set('termino', word);

    const url = `http://localhost:3000/client`;

    return this.http.get<any>(url, { params }).pipe(
      catchError(this.handleError)
    );
  }

  patchUser(id:string, tiempo:number): Observable<any> {

    const url = `http://localhost:3000/client/${id}`;

    return this.http.patch<any>(url, {tiempoInteraccion: tiempo}).pipe(
      catchError(this.handleError)
    );
  }

  login(password:string, email:string) {
    const url = `http://localhost:3000/login`;
    return this.http.post<any>(url, {password, email}).pipe(
      catchError(this.handleError)
    )
  }

  getPDF() {
    const url = `http://localhost:3000/client/pdf`;
    return this.http.get(url, { responseType: 'blob' });
  }

  private handleError(error: HttpErrorResponse) {

    console.log(error);

    let errorMessage:string;
    
    switch (error.error.statusCode) {
      case 400: 
        errorMessage = "Credenciales incorrectas";
        console.log(error);
        break;

      case 404: 
        errorMessage = "Credenciales incorrectas";
        break;

      case 409: 
        errorMessage = "Credenciales incorrectas";
        break;

      case 500: 
        errorMessage = "Ha ocurrido un error en el servidor";
        break;

      default: 
        errorMessage = "Ha ocurrido un error desconocido";
        console.log(error);
        break;
    }

    return throwError(() => errorMessage);
  }
}
