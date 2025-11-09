import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverModule } from 'primeng/popover';
import { ButtonModule } from 'primeng/button';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { TooltipModule } from 'primeng/tooltip';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { ThemeService } from '../../core/services/theme.service';
import { ApplicationThemeConfig } from '../../themes/theme';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-theme-settings-button',
  standalone: true,
  imports: [
    CommonModule,
    PopoverModule,
    ButtonModule,
    ToggleSwitchModule,
    TooltipModule,
    FormsModule,
    TranslatePipe
  ],
  templateUrl: './theme-settings-button.html',
  styleUrls: ['./theme-settings-button.scss']
})
export class ThemeSettingsButton implements OnInit {
  darkMode = false;
  selectedPalette = environment.defaultTheme;
  paletteOptions: { name: string; color: string }[] = [];
  env = environment;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.darkMode = this.themeService.isDarkMode();
    this.selectedPalette = this.themeService.getPrimaryPalette()
    this.loadPaletteOptions();
  }

  toggleDarkMode(event: any): void {
    this.darkMode = event.checked;
    this.themeService.setDarkMode(this.darkMode);
  }

  selectPalette(name: string): void {
    this.selectedPalette = name;
    this.themeService.setPrimaryPalette(name);
  }

  private loadPaletteOptions(): void {
    const primitives = (ApplicationThemeConfig as any).primitive;
    this.paletteOptions = Object.keys(primitives)
      .filter(c => primitives[c]?.[500])
      .map(c => ({
        name: c,
        color: primitives[c][500]
      }));
  }
}
