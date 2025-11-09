import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageSettingsButton } from './language-settings-button';

describe('LanguageSettingsButton', () => {
  let component: LanguageSettingsButton;
  let fixture: ComponentFixture<LanguageSettingsButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguageSettingsButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LanguageSettingsButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
