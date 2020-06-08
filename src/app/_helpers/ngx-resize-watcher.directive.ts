import { Directive, ChangeDetectorRef, HostListener } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
declare var $;

@Directive({
  selector: '[ngx-resize-watcher]'
})
export class NgxResizeWatcherDirective {

  constructor(private table: DatatableComponent, public ref: ChangeDetectorRef) { }

  private latestWidth: number;

  @HostListener('window:resize', ['$event']) onResize(event) {
    this.fixColumnResize();
  }

  @HostListener('window:fix-ngx-columns', ['$event']) onFix(event) {
    this.fixColumnResize();
  }

  fixColumnResize() {
    setTimeout(() => {
      this.ngAfterContentChecked();
    }, 250);
  }

  ngAfterContentChecked() {
    if (this.table && this.table.element.clientWidth !== this.latestWidth) {
      this.latestWidth = this.table.element.clientWidth;
      this.table.recalculate();
      this.ref.markForCheck();
    }
  }

}
