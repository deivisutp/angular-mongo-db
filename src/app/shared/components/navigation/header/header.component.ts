import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private apiService: ApiService,
              private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.apiService.logout().subscribe(() => {
      this.clearLocalStore();
      this.router.navigate(['login']);
    }, error => {
      console.log("Erro ao fazer logout.", error);
    });
  }

  clearLocalStore() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('currentUser');
  }

  isAutenticated(): Observable<boolean> {
    return this.apiService.isAuthenticated();
  }

}
