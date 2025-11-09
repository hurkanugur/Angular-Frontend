import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LocalizationService } from './core/services/localization.service';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit{

  constructor(
    private localizationService: LocalizationService,
    private themeService: ThemeService
  ) {
    
  }

  ngOnInit(): void {
    this.themeService.refreshTheme();
    this.localizationService.refreshLanguage();
  }

}
