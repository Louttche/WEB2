import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WEB 2';
  router: Router;
  constructor(private r: Router){
    this.router = r;
  }

  ngDoCheck(): void {
    if (this.router.url == null)
      this.router.navigate(['dashboard']);
  }
}