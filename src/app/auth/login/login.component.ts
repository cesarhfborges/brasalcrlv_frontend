import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  loading= false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    this.form = new FormGroup({
      email: new FormControl('chborges@brasal.com.br', [Validators.required, Validators.email]),
      password: new FormControl('password', [Validators.required, Validators.minLength(4)]),
      remember: new FormControl(false, [Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.authService.login(this.form.value).subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/home']);
        },
        error => {
          console.log(error);
        }
      );
    } else {

    }
  }
}
