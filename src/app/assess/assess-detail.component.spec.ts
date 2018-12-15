import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessDetailComponent } from './assess-detail.component';

describe('AssessDetailComponent', () => {
  let component: AssessDetailComponent;
  let fixture: ComponentFixture<AssessDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
