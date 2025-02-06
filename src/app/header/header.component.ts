import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpotlightComponent } from '../spotlight/spotlight.component';
import { TextHoverEffectDirective } from '../text-hover-effect.directive'; // Import the directive

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, SpotlightComponent, TextHoverEffectDirective], // Add the directive here
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {}