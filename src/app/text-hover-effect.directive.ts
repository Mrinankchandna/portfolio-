import { Directive, ElementRef, HostListener, Renderer2, Input } from '@angular/core';

@Directive({
  selector: '[appTextHoverEffect]',
})
export class TextHoverEffectDirective {
  @Input() hoverColors: string[] = ['yellow', 'red', 'blue', 'cyan', 'violet']; // Default gradient colors
  @Input() maskSize: string = '20%'; // Size of the mask
  @Input() duration: number = 0.2; // Animation duration

  private svgElement!: SVGElement; // Use definite assignment assertion
  private textElement!: SVGTextElement; // Use definite assignment assertion

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.createSvgElement();
  }

  private createSvgElement() {
    // Create the SVG element
    this.svgElement = this.renderer.createElement('svg', 'http://www.w3.org/2000/svg');
    this.renderer.setAttribute(this.svgElement, 'width', '100%');
    this.renderer.setAttribute(this.svgElement, 'height', '100%');
    this.renderer.setAttribute(this.svgElement, 'viewBox', `0 0 ${this.el.nativeElement.offsetWidth} ${this.el.nativeElement.offsetHeight}`);
    this.renderer.setAttribute(this.svgElement, 'class', 'select-none');

    // Create the text element
    this.textElement = this.renderer.createElement('text', 'http://www.w3.org/2000/svg');
    this.renderer.setAttribute(this.textElement, 'x', '50%');
    this.renderer.setAttribute(this.textElement, 'y', '50%');
    this.renderer.setAttribute(this.textElement, 'text-anchor', 'middle');
    this.renderer.setAttribute(this.textElement, 'dominant-baseline', 'middle');
    this.renderer.setAttribute(this.textElement, 'stroke-width', '0.3');
    this.renderer.setAttribute(this.textElement, 'class', 'text-effect');
    this.renderer.setProperty(this.textElement, 'textContent', this.el.nativeElement.textContent);

    // Append the text element to the SVG
    this.renderer.appendChild(this.svgElement, this.textElement);

    // Replace the original element with the SVG
    this.renderer.appendChild(this.el.nativeElement, this.svgElement);
    this.renderer.setProperty(this.el.nativeElement, 'textContent', ''); // Clear the original text
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.applyHoverEffect();
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.removeHoverEffect();
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.updateMaskPosition(event);
  }

  private applyHoverEffect() {
    const gradientId = 'textGradient';
    const maskId = 'revealMask';

    // Create gradient
    const gradient = this.renderer.createElement('linearGradient', 'http://www.w3.org/2000/svg');
    this.renderer.setAttribute(gradient, 'id', gradientId);
    this.renderer.setAttribute(gradient, 'gradientUnits', 'userSpaceOnUse');
    this.renderer.setAttribute(gradient, 'cx', '50%');
    this.renderer.setAttribute(gradient, 'cy', '50%');
    this.renderer.setAttribute(gradient, 'r', '25%');

    this.hoverColors.forEach((color, index) => {
      const stop = this.renderer.createElement('stop', 'http://www.w3.org/2000/svg');
      this.renderer.setAttribute(stop, 'offset', `${(index / (this.hoverColors.length - 1)) * 100}%`);
      this.renderer.setAttribute(stop, 'stop-color', color);
      this.renderer.appendChild(gradient, stop);
    });

    // Create mask
    const mask = this.renderer.createElement('mask', 'http://www.w3.org/2000/svg');
    this.renderer.setAttribute(mask, 'id', maskId);

    const rect = this.renderer.createElement('rect', 'http://www.w3.org/2000/svg');
    this.renderer.setAttribute(rect, 'x', '0');
    this.renderer.setAttribute(rect, 'y', '0');
    this.renderer.setAttribute(rect, 'width', '100%');
    this.renderer.setAttribute(rect, 'height', '100%');
    this.renderer.setAttribute(rect, 'fill', 'url(#revealMask)');
    this.renderer.appendChild(mask, rect);

    // Append gradient and mask to defs
    const defs = this.renderer.createElement('defs', 'http://www.w3.org/2000/svg');
    this.renderer.appendChild(defs, gradient);
    this.renderer.appendChild(defs, mask);
    this.renderer.appendChild(this.svgElement, defs);

    // Apply gradient and mask to text
    this.renderer.setAttribute(this.textElement, 'stroke', `url(#${gradientId})`);
    this.renderer.setAttribute(this.textElement, 'mask', `url(#${maskId})`);
  }

  private removeHoverEffect() {
    this.renderer.removeAttribute(this.textElement, 'stroke');
    this.renderer.removeAttribute(this.textElement, 'mask');
  }

  private updateMaskPosition(event: MouseEvent) {
    const svgRect = this.svgElement.getBoundingClientRect();
    const cxPercentage = ((event.clientX - svgRect.left) / svgRect.width) * 100;
    const cyPercentage = ((event.clientY - svgRect.top) / svgRect.height) * 100;

    const mask = this.svgElement.querySelector('#revealMask');
    if (mask) {
      this.renderer.setAttribute(mask, 'cx', `${cxPercentage}%`);
      this.renderer.setAttribute(mask, 'cy', `${cyPercentage}%`);
    }
  }
}