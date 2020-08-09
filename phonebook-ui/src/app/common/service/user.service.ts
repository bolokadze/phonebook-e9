import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable, Subscription} from 'rxjs'
import {User} from '../interface/user.interface'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: User;


  constructor(private http: HttpClient) {
  }

  registerNewUser(user: User) {
    return this.http.post<User>('/api/user/registration', user)
  }

  sendRequestToRegisterConfirm(token: string) {
    return this.http.get(`/api/user/confirmation?token=${token}`)
  }

  recoveryPassword(user: User): Observable<User> {
    return this.http.post<User>('/api/user/reset-password', user)
  }

  resetPassword(user: User, token: string): Observable<User> {
    return this.http.put<User>(`/api/user/password?token=${token}`, user)
  }

  loginUser(user: User): Observable<any> {
    return this.http.post<User>('/api/user/login', user, {observe: 'response'});

  }

  get(): Observable<string> {
    return this.http.get<string>('/api/phone/get');
  }

  getUser(): Subscription {
    return this.http.get<any>('/api/user/user', {observe: 'response'})
      .subscribe(resp => console.log(resp.headers));
  }

  showConfigResponse(user: User) {
    this.loginUser(user)
      .subscribe(resp => {
          const keys = resp.headers.keys();
          console.log(keys);
        }
      );
  }
}
