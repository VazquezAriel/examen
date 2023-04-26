import { Component, Inject, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../interfaces/user-interface';
import { SWEET_TYPE_BUTTON, SWEET_TYPE_ICON, SWEET_TYPE_TITLE, sweetAlertNotification } from '../alerts/sweet';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css']
})
export class UserModalComponent implements OnInit {

  form!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public userSelected: User,
    private _dialogRef: MatDialogRef<UserModalComponent>,
    private _fb: FormBuilder,
    private _apiUser: UsersService
  ) { }

  ngOnInit(): void {
    this.form = this.createForm();
  }

  closeModal() {
    this._dialogRef.close();
  }

  createForm(): FormGroup {
    return this._fb.group({
      name: [],
      lastName: [],
      age: [],
      gender: [],
      educationLevel: [],
      nationality: [],
      email: [],
      password: [],
    });
  }

  createUser(){

    console.log(this.form.value);
    
    this._apiUser.postUser(this.form.value).subscribe({
      next: () => {
        sweetAlertNotification(SWEET_TYPE_ICON.SUCCESS, SWEET_TYPE_TITLE.SUCCESS, "Usuario creado con exito");
        this.closeModal();
      },
      error: error => {
        sweetAlertNotification(SWEET_TYPE_ICON.ERROR, SWEET_TYPE_TITLE.ERROR, error, 'Aceptar', SWEET_TYPE_BUTTON.ERROR);
      }
    });
  }

}
