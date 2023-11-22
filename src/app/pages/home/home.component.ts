import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  implements OnInit {

  agremiados: any[] = []; // Ajusta el tipo de datos según la estructura de tus agremiados

  constructor(private authS: AuthService, private router: Router) { }

  ngOnInit() {}

  logout(){
    this.authS.logout();
    console.log('¡Sesión cerrada exitosamente!');
    this.router.navigate(['/login']);
  }

}
