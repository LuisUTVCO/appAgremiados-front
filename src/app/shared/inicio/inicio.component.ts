import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent  implements OnInit {

  constructor(private authS: AuthService, private router: Router) { }

  ngOnInit() {}

  logout(){
    this.authS.logout();
    console.log('¡Sesión cerrada exitosamente!');
    this.router.navigate(['/login']);
  }

}
