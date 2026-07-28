import { Directive, ElementRef, HostListener, Input, inject } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true,
})
export class HighlightDirective {
  private el = inject(ElementRef<HTMLElement>);

  // Configurable colour: <app-course-card appHighlight="lightblue">
  @Input() appHighlight = 'yellow';

  // @HostListener binds to host element events without manually adding or
  // removing event listeners - Angular manages the cleanup automatically.
  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.el.nativeElement.style.backgroundColor = this.appHighlight;
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.el.nativeElement.style.backgroundColor = '';
  }
}
