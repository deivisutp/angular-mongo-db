import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/api.service';
import { UserDTO } from 'src/app/core/model/userDTO';
import { Location } from '@angular/common';
import { MessageService } from 'src/app/core/message.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  public user = new UserDTO();
  private unsubscribeMessage = new Subject();
  submitted: boolean = false;

  constructor(private apiService: ApiService,
              private location: Location,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.messageService.notfyObservable$.pipe(takeUntil(this.unsubscribeMessage)).subscribe(result => {
      if (result === true) {
        this.submitted = false;
      }
    });
  }

  save(): void {
    this.submitted = true;
    this.apiService.registerUser(this.user).subscribe(data => {
      this.messageService.showSuccess('Cadastro de Usuário',
     'Usuário regsitrado com sucesso, favor ferificar o seu e-mail para confirmar o seu cadastro!');
      this.goBack();
    }, error => {
      this.submitted = false;
      this.messageService.showError('Cadastro de usuário', 'Falha ao tentar registrar!');
      console.log('Error ao criar usuário', error);
    });
  }

  goBack() {
    this.location.back();
  }
  ngOnDestroy() {
    this.unsubscribeMessage.next();
    this.unsubscribeMessage.complete();
  }
}
