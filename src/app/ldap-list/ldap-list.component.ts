import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTableDataSource } from '@angular/material/table';
import { LDAP_USERS } from '../model/ldap-mock-data';
import { UserLdap } from '../model/user-ldap';

@Component({
  selector: 'app-ldap-list',
  templateUrl: './ldap-list.component.html',
  styleUrls: ['./ldap-list.component.css']
})
export class LdapListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['nomComplet', 'mail', 'employeNumero'];
  dataSource = new MatTableDataSource<UserLdap>([]);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor() { }

  ngOnInit(): void {
    //console.log('Values on ngOnInit():');
    this.dataSource.paginator= this.paginator;
    //console.log("Mat Paginator :", this.paginator);
    this.dataSource.filterPredicate = (data: UserLdap, filter: string) => this.filterPredicate(data, filter);

    this.getUsers();
  }

  filterPredicate(data, filter) : boolean {
    return !filter || data.nomComplet.toLowerCase().startsWidth(filter);
  }

  unactiveSelected = false;

  private getUsers(): void {
    this.dataSource.data = LDAP_USERS;
    if(this.unactiveSelected) {
      this.dataSource.data = this.dataSource.data.filter( user => user.active === false
        );
    }
  }

  unactiveChanged($event : MatSlideToggleChange) : void {
    this.unactiveSelected = $event.checked;
    this.getUsers();
  }

  applyFilter($event: KeyboardEvent): void {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() : void {
    console.log('Values on ngOnInit():');
    console.log("Mat Paginator :", this.paginator);


  }


}
