import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import * as fileSaver from 'file-saver';
import { SWEET_TYPE_BUTTON, SWEET_TYPE_ICON, SWEET_TYPE_TITLE, sweetAlertNotification } from '../alerts/sweet';
import { User } from '../interfaces/user-interface';
import { MatDialog } from '@angular/material/dialog';
import { UserModalComponent } from '../user-modal/user-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users!: User[];
  displayedColumns: string[] = ['name', 'lastName', 'age', 'gender'];

  constructor(
    private _api: UsersService,
    public dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loadUsers()
  }

  loadUsers() {
    this._api.getUsers()
      .subscribe( data => {
        this.users = data.client;
      }
    );
  }

  donwloadPDF() {
    this._api.getPDF().subscribe({
      next: (response) => {
        fileSaver.saveAs(response, `Reporte.pdf`);
      },
      error: (error: any) => {
        console.log('Error while downloading the file', error);
        sweetAlertNotification(SWEET_TYPE_ICON.ERROR, SWEET_TYPE_TITLE.ERROR, error, 'Aceptar', SWEET_TYPE_BUTTON.ERROR);
      }
    })
  }

  openAddDialog(){
    const dialogRef = this.dialog.open(UserModalComponent, { width: '45%', height: '75%' });
    dialogRef.afterClosed().subscribe(() => {
      this.loadUsers();
    });
  }

  logout() {
    this.router.navigate(['/login']);
    this._api.logout();
  }

}
