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
      this.authService.login(this.form.value).subscribe(
        response => {
          if (response) {
            this.router.navigate(['/home']);
          } else {
            this.toastrService.danger('Verifique seu usuário e senha e tente novamente.', 'Ops', {
              duration: 3000,
              destroyByClick: true,
              preventDuplicates: true,
            })
          }
        },
        error => {
          console.log(error);
          this.toastrService.danger('parece que houve um problema de comunicação, tente novamente mais tarde!', 'Ops', {
            duration: 3000,
            destroyByClick: true,
            preventDuplicates: true,
          })
        }
      );
    } else {
      this.toastrService.warning('Verifique os campos, e tente novamente', 'Ops', {
        duration: 3000,
        destroyByClick: true,
        preventDuplicates: true,
      })
    }
  }
}
