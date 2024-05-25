import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  // Importar el Router

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router) { }  // Inyectar el Router

  ngOnInit() {
  }

  navigateToTabs() {
    this.router.navigate(['/tabs']);  // Navegar a la página de tabs
  }
}

