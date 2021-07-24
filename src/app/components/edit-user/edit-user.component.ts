import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/api.service';
import { Location } from '@angular/common';
import { UserDTO } from 'src/app/core/model/userDTO';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  user = new UserDTO();
  idUser?: string;

  constructor(private apiService: ApiService,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit(): void {
    this.idUser = this.route.snapshot.paramMap.get('id') || '';
    this.apiService.getUserById(this.idUser).subscribe(user => {
      this.user = user;
    }, error => {
      console.log('Erro ao pegar id do usuário.', error);
    })
  }

  update(): void {
    this.user.id = this.idUser;
    this.apiService.updateUser(this.user).subscribe(() => {
      this.goBack();
    }, error => {
      console.log('Erro ao atualizar usuário.', error);
    });
  }

  goBack() {
    this.location.back();
  }
}
