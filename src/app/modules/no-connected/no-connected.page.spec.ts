import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NoConnectedPage } from './no-connected.page';

describe('NoConnectedPage', () => {
  let component: NoConnectedPage;
  let fixture: ComponentFixture<NoConnectedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoConnectedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NoConnectedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
