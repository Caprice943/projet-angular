import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LdapDetailComponent } from './ldap-detail/ldap-detail.component';

import { LdapListComponent } from './ldap-list/ldap-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'users/list', component: LdapListComponent },
  { path: 'user/:id', component: LdapDetailComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
