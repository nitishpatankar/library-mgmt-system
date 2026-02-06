import { Directive, ElementRef, inject, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appStatusHighlight]',
  standalone: true
})
export class StatusHighlightDirective implements OnChanges {
  @Input('appStatusHighlight') isAvailable: boolean | undefined;

  private _el = inject(ElementRef);
  private _renderer = inject(Renderer2);

  ngOnChanges() {
    // Applies green background if available, red/pink if not
    const color = this.isAvailable ? '#d4edda' : '#f8d7da';
    const textColor = this.isAvailable ? 'green' : 'red';
    
    this._renderer.setStyle(this._el.nativeElement, 'backgroundColor', color);
    this._renderer.setStyle(this._el.nativeElement, 'color', textColor);
    this._renderer.setStyle(this._el.nativeElement, 'padding', '4px 8px');
    this._renderer.setStyle(this._el.nativeElement, 'borderRadius', '4px');
    this._renderer.setStyle(this._el.nativeElement, 'fontWeight', 'bold');
  }
}
