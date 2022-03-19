import { HttpClient, HttpHeaders } from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { LDAP_USERS } from '../model/ldap-mock-data';
import { UserLdap } from '../model/user-ldap';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  //Liste des utilisateurs

  users: UserLdap[] = LDAP_USERS;
  static users: any;
  private usersUrl = 'api/users';
  private httpOptions = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  getUsers(): Observable<UserLdap[]> {
    return this.http.get<UserLdap[]>(this.usersUrl);
  }

  addUser(user: UserLdap): Observable<UserLdap> {
    //Ajout dans la liste
    return this.http.post<UserLdap>(this.usersUrl, user, {
      headers: this.httpOptions,
    });
  }

  getUser(id: number): Observable<UserLdap> {
    return this.http.get<UserLdap>(this.usersUrl + '/' + id);
  }

  updateUser(user: UserLdap): Observable<UserLdap> {
    //Modification de l'user
    return this.http.put<UserLdap>(this.usersUrl + '/' + identifierModuleUrl, {
      headers: this.httpOptions,
    });
  }

  deleteUser(id: number): Observable<UserLdap> {
    return this.http.delete<UserLdap>(this.usersUrl + '/' + id, {
      headers: this.httpOptions,
    });
  }
}
