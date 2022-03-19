import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { LDAP_USERS } from '../model/ldap-mock-data';
import { UserLdap } from '../model/user-ldap';

@Injectable({
  providedIn: 'root',
})
export class InMemoryUsersService implements InMemoryDbService {
  createDb() {
    console.log('InMemoryUsersService.createDb');
    const users: UserLdap[] = LDAP_USERS;
    return { users };
  }

  //Overrides the genId method to ensure that a user always has an Id
  //if the users array is empty
  //the method below returns the initial numbers(4)
  //if not empty returns the highest user id + 1
  genId(users: UserLdap[]): number {
    console.log('InMemoryUsersService.genId');
    return users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 4;
  }

  constructor() {}
}
