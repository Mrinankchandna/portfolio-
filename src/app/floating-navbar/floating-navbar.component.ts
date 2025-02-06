import { Component, Input, OnInit, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';

@Component({
  selector: 'app-floating-navbar',
  templateUrl: './floating-navbar.component.html',
  styleUrls: ['./floating-navbar.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class FloatingNavbarComponent implements OnInit {
  @Input() navItems: { name: string; link: string }[] = [];
  visible = false;
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (this.isBrowser) {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      this.visible = scrollY > 50;
    }
  }

  ngOnInit() {}
}