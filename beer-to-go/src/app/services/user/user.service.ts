import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private mockUser: User = {
    id: '1',
    name: 'João Silva Santos',
    address: 'Rua das Flores, 123 - Jardim Paulista, São Paulo - SP, 01452-001',
    email: 'joao.silva@email.com.br',
    telephone: '(11) 99999-9999',
  };

  getCurrentUser(): Observable<User> {
    return of(this.mockUser);
  }
}
