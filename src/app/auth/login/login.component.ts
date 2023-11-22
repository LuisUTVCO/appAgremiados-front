import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { LoginService } from 'src/app/services/login.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  NUE: string = '';
  password: string = '';
  loginForm!: FormGroup;

  constructor(private loginService: LoginService, private router: Router, private formBuilder: FormBuilder,
    private authS: AuthService) { }

  ngOnInit() {
    this.loginForm! = this.formBuilder.group({
      NUE: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  login() {
    const { NUE, password } = this.loginForm.value;
    if (!NUE || !password) {
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Por favor ingrese su NUE y contraseña',
        showConfirmButton: true
      });
    } else {
      this.loginService.login(NUE, password).subscribe(
        (response: any) => {
          const token = response.token;
          const user = response;

          console.log('Valor de objeto:', user);

          this.authS.setToken(token);
          this.authS.setUser(user);
          this.authS.setLoggedInFlag(true);

          if (user.id_rol === 1) {
            console.log('¡Inicio de sesión exitoso!');
            this.router.navigate(['/homeAdmin']);
            // Swal.fire({
            //   icon: 'success',
            //   title: 'Hola!',
            //   text: 'Bienvenido usuario Administrador',
            //   showConfirmButton: true
            // });
          } else if (user.id_rol === 2) {
            console.log('¡Inicio de sesión exitoso!');
            this.router.navigate(['/home']);
            // Swal.fire({
            //   icon: 'success',
            //   title: 'Hola!',
            //   text: 'Bienvenido usuario Agremiado',
            //   showConfirmButton: true
            // });
          } else {
            console.log('Rol no reconocido');
            Swal.fire({
              icon: 'error',
              title: '¡Error!',
              text: 'Credenciales inválidas',
              showConfirmButton: true
            });
          }
        },
        (error) => {
          console.error('Credenciales incorrectas', error);
          Swal.fire({
            icon: 'error',
            title: '¡Error!',
            text: 'Credenciales incorrectas',
            showConfirmButton: true
          });
        }
      );
    }
  }


  NUE1() {
    return this.loginForm.get('NUE')?.touched || this.loginForm.get('NUE')?.dirty;
  }

  NUEV() {
    return this.loginForm.get('NUE')?.valid;
  }

  passwordT() {
    return this.loginForm.get('password')?.touched || this.loginForm.get('password')?.dirty;
  }

  passwordV() {
    return this.loginForm.get('password')?.valid;
  }
}  