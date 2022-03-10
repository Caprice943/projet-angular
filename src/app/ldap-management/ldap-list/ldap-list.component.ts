import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserLdap } from '../../model/user-ldap';
import { UsersService } from '../../service/users.service';

@Component({
  selector: 'app-ldap-list',
  templateUrl: './ldap-list.component.html',
  styleUrls: ['./ldap-list.component.css'],
})
export class LdapListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['nomComplet', 'mail', 'employeNumero'];
  dataSource = new MatTableDataSource<UserLdap>([]);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private usersService: UsersService, private router: Router) {}

  ngOnInit(): void {
    //console.log('Values on ngOnInit():');
    this.dataSource.paginator = this.paginator;
    //console.log("Mat Paginator :", this.paginator);
    //this.dataSource.filterPredicate = (data: UserLdap, filter: string) => this.filterPredicate(data, filter);

    this.getUsers();
  }

  addUser() {
    this.router.navigate(['/users/add']).then((e) => {
      if (!e) {
        console.log('Navigation has failed !');
      }
    });
  }

  filterPredicate(data, filter): boolean {
    return !filter || data.nomComplet.toLowerCase().startsWidth(filter);
  }

  unactiveSelected = false;

  private getUsers(): void {
    this.usersService.getUsers().subscribe((users) => {
      if (this.unactiveSelected) {
        this.dataSource.data = users.filter((user) => user.active === false);
      } else {
        this.dataSource.data = users;
      }
    });
  }

  unactiveChanged($event: MatSlideToggleChange): void {
    this.unactiveSelected = $event.checked;
    this.getUsers();
  }

  applyFilter($event: KeyboardEvent): void {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit(): void {
    console.log('Values on ngOnInit():');
    console.log('Mat Paginator :', this.paginator);
  }

  edit(login: string) {
    this.router.navigate(['/users', login]).then((e) => {
      if (!e) {
        console.log('Navigation has failed !');
      }
    });
  }
}
