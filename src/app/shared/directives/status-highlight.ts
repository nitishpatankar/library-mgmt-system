import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appStatusHighlight]',
  standalone: true
})
export class StatusHighlightDirective implements OnChanges {
  @Input('appStatusHighlight') isAvailable: boolean | undefined;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges() {
    // Applies green background if available, red/pink if not
    const color = this.isAvailable ? '#d4edda' : '#f8d7da';
    const textColor = this.isAvailable ? 'green' : 'red';
    
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', color);
    this.renderer.setStyle(this.el.nativeElement, 'color', textColor);
    this.renderer.setStyle(this.el.nativeElement, 'padding', '4px 8px');
    this.renderer.setStyle(this.el.nativeElement, 'borderRadius', '4px');
    this.renderer.setStyle(this.el.nativeElement, 'fontWeight', 'bold');
  }
}