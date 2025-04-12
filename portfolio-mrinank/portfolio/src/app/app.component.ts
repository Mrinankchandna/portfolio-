import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as AOS from 'aos';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
})
export class AppComponent implements OnInit {
  title = 'Mrinank Chandna - Software Developer';

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Initialize AOS only in the browser
      AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
      });
    }
  }
}
