import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaketestComponent } from './maketest.component';

describe('MaketestComponent', () => {
  let component: MaketestComponent;
  let fixture: ComponentFixture<MaketestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaketestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaketestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
