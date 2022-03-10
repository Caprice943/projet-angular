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

  constructor() {}

  getUsers(): Observable<UserLdap[]> {
    return of(this.users);
  }

  addUser(user: UserLdap): Observable<UserLdap> {
    //Ajout dans la liste
    UsersService.users.push(user);
    return of(user);
  }

  getUser(login: string): Observable<UserLdap> {
    return of(this.users.find((user) => user.login === login));
  }

  updateUser(userToUpdate: UserLdap): Observable<UserLdap> {
    //Modification de l'user
    const user = UsersService.users.find((u) => u.login === userToUpdate.login);
    if (user) {
      //Modif
      user.nom = userToUpdate.nom;
      user.prenom = userToUpdate.prenom;
      user.nomComplet = user.nom + '' + user.prenom;
      user.motDePasse = userToUpdate.motDePasse;

      return of(userToUpdate);
    }
    return throwError('Utilisateur non trouvé');
  }
}
