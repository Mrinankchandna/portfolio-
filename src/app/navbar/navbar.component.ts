import { Component } from '@angular/core';
import { FloatingNavbarComponent } from '../floating-navbar/floating-navbar.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [FloatingNavbarComponent]
})
export class NavbarComponent {
  navItems = [
    { name: 'Home', link: '#header' },
    { name: 'About', link: '#about' },
    { name: 'Education', link: '#education' },
    { name: 'Skills', link: '#skills' },
    { name: 'Work Experience', link: '#work-experience' },
    { name: 'Projects', link: '#projects' }
  ];
}