import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/api.service';
import { MessageService } from 'src/app/core/message.service';
import { UserDTO } from 'src/app/core/model/userDTO';

@Component({
  selector: 'app-resend-registration-token',
  templateUrl: './resend-registration-token.component.html',
  styleUrls: ['./resend-registration-token.component.scss']
})
export class ResendRegistrationTokenComponent implements OnInit {

  public user = new UserDTO();

  constructor(private apiService: ApiService,
              private messageService: MessageService,
              private router: Router) { }

  ngOnInit(): void {
  }

  resendToken() {
    this.apiService.resendRegisterToken(this.user).subscribe(data => {
      this.messageService.showSuccess('Token de verificação', 'Novo token enviado com sucesso');
      this.router.navigate(['login']);
    }, error => {
      console.log('Error ao solicitar novo token de acesso.', error);
      this.messageService.showError('Falha de Solicitação de Token', 'Falha ao enviar o novo token');
    })
  }
}
