import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeSettingsButton } from './theme-settings-button';

describe('ThemeSettingsButton', () => {
  let component: ThemeSettingsButton;
  let fixture: ComponentFixture<ThemeSettingsButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeSettingsButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemeSettingsButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
