import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BlockerComponent } from './blocker.component';

describe('BlockerComponent', () => {
  let component: BlockerComponent;
  let fixture: ComponentFixture<BlockerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockerComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BlockerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
