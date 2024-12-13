import { Component} from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })

  router = inject(Router);
  snackBar = inject(MatSnackBar);
  onLogin(){
    if(this.loginForm.get('username')?.value == "admin" && this.loginForm.get('password')?.value == "1234"){
      this.snackBar.open('Login successful', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
      });
      this.router.navigate(['/cars']);
    }
    else{
      this.snackBar.open('Invalid username or password', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
      });
      this.loginForm.reset();

    }
  }
}

export class loginUser{
  username: string;
  password: string;
  constructor(){
    this.username = "";
    this.password = "";
  }
}