import { Component, OnInit } from '@angular/core';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  faLock = faLock;
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });
  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['cms/']);
    }
  }

  onSubmit(): void {
    console.log(this.loginForm.value);
    this.auth.login(this.loginForm.value).subscribe({
      next: (res) => {
        if (res) {
          this.router.navigate(['/cms']);
        }
      },
      error: (err) => {
        console.log(err);
        alert(JSON.stringify(err.error.message));
      }
    });
  }
}
