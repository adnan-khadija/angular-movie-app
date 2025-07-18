import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [CommonModule,RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {
currentYear: number = new Date().getFullYear();
}
