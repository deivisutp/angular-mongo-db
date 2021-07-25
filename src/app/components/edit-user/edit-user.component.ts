import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/api.service';
import { Location } from '@angular/common';
import { UserDTO } from 'src/app/core/model/userDTO';
import { MessageService } from 'src/app/core/message.service';

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
              private messageService: MessageService,
              private location: Location) { }

  ngOnInit(): void {
    this.idUser = this.route.snapshot.paramMap.get('id') || '';
    this.apiService.getUserById(this.idUser).subscribe(user => {
      this.user = user;
    }, error => {
      this.messageService.showError('Erro', 'Não foi possível atualizar o usuário!');
    })
  }

  update(): void {
    this.user.id = this.idUser;
    this.apiService.updateUser(this.user).subscribe(() => {
      this.messageService.showSuccess('Atualizado', 'Usuário atualizado com sucesso!');
      this.goBack();
    }, error => {
      this.messageService.showError('Erro', 'Não foi possível atualizar o usuário!');
    });
  }

  goBack() {
    this.location.back();
  }
}
