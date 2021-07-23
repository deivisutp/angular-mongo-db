import { Component, Input, OnInit, Output, ViewChild, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-delete-user-modal',
  templateUrl: './delete-user-modal.component.html',
  styleUrls: ['./delete-user-modal.component.scss']
})
export class DeleteUserModalComponent implements OnInit {

  @ViewChild('deleteUserModal') public deleteUserModal: any;
  @Input() recebeItem: any;
  @Output() resposta = new EventEmitter();
  recebeTitulo = 'Curso de Spring Boot e Angular 7';
  recebePergunta = 'Deseja realmente deletar este usuário?';

  constructor() { }

  ngOnInit(): void {
  }

  onClose(event: any) {
    console.log(event);
  }

  show() {
    this.deleteUserModal.show();
  }

  delete() {
    this.resposta.emit(this.recebeItem);
    this.deleteUserModal.hide();
  }
}
