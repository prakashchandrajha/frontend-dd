import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private showModalSource = new Subject<boolean>();
  public showModal$ = this.showModalSource.asObservable();

  openCreateUserModal() {
    this.showModalSource.next(true);
  }
}