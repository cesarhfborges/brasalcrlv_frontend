import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";
import {NbToastrService} from "@nebular/theme";

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
    private toastrService: NbToastrService,
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
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.loading = true;
      this.form.disable();
      this.authService.login(this.form.value).subscribe(
        response => {
          this.loading = false;
          this.form.enable();
          this.router.navigate(['/home']);
        },
        e => {
          console.log(e);
          this.loading = false;
          this.form.enable();
          this.toastrService.danger(e.errors, 'Ops', {
            duration: 3000,
            destroyByClick: true,
          })
        }
      );
    } else {
      this.toastrService.warning('Verifique os campos, e tente novamente', 'Ops', {
        duration: 3000,
        destroyByClick: true,
      })
    }
  }
}
