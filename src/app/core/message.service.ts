import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private notify = new Subject();
  public notfyObservable$ = this.notify.asObservable();

  constructor(private toastrService: ToastrService) { }

  showSuccess(title: string, message?: string) {
    this.toastrService.success(title, message);
    this.notify.next(true);
  }

  showWarning(title: string, message?: string) {
    this.toastrService.warning(title, message);
    this.notify.next(true);
  }

  showError(title: string, message?: string) {
    this.toastrService.error(title, message);
    this.notify.next(true);
  }
}
