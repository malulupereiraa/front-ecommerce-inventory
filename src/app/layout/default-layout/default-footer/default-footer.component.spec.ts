import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultFooterComponent } from './default-footer.component';

describe('DefaultFooterComponent', () => {
  let component: DefaultFooterComponent;
  let fixture: ComponentFixture<DefaultFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [DefaultFooterComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render text "Desenvolvido com amor por" in a div tag', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('div.ms-auto').textContent).toContain('Desenvolvido com ❤️ por');
  });

  it('should render dev name in a span tag', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('span.devname').textContent).toContain(' Maria Luiza Pereira');
  });
});
