import { Component } from '@angular/core';

@Component({
  selector: 'app-password-strength',
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.css']
})
export class PasswordStrengthComponent {
  password: string = '';
  passwordStrength: 'empty' | 'weak' | 'medium' | 'strong' = 'empty';
  showPassword: boolean = false;

  onPasswordInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.password = input.value;
    this.passwordStrength = this.calculatePasswordStrength(this.password);
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  calculatePasswordStrength(password: string): 'empty' | 'weak' | 'medium' | 'strong' {
    if (password.length === 0) {
      return 'empty'; 
    }

    if (password.length < 8) {
      return 'weak'; 
    }

    const hasLetters = /[a-zA-Zа-яА-Я]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSymbols = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (hasLetters && hasNumbers && hasSymbols) {
      return 'strong'; 
    } else if ((hasLetters && hasNumbers) || (hasLetters && hasSymbols) || (hasNumbers && hasSymbols)) {
      return 'medium'; 
    } else {
      return 'weak';
    }
  }

  getSectionClass(section: number): string {
    if (this.passwordStrength === 'empty') {
      return 'grey';
    }

    if (this.password.length < 8) {
      return 'red';
    }

    switch (this.passwordStrength) {
      case 'weak':
        return section === 1 ? 'red' : 'grey';
      case 'medium':
        return section <= 2 ? 'yellow' : 'grey';
      case 'strong':
        return 'green';
      default:
        return 'grey';
    }
  }
}
