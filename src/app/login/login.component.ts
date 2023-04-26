import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { SWEET_TYPE_ICON, SWEET_TYPE_TITLE, sweetAlertNotification } from '../alerts/sweet';
import { NgModule } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private _api: UsersService,
    private router: Router,
    private _formBuilder: FormBuilder,
  ) { }
  
  ngOnInit(): void {
    this.form = this.createForm();
  }

  createForm(): FormGroup {
    return this._formBuilder.group({
      email: [''],
      password: [''],
    });
  }

  login() {
    console.log(this.form.value);
    this._api.login(this.form.value.password, this.form.value.email).subscribe({
      next: data => {
        this.router.navigate(['/usuarios']);
        this._api.saveUser(data.u);
      },
      error: error =>  {
        sweetAlertNotification(SWEET_TYPE_ICON.ERROR, SWEET_TYPE_TITLE.ERROR, error);
      }
    });
  }

}
