import {Injectable} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {environment} from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class TitleService {
  constructor(
    private titleService: Title
  ) {
  }

  setTitle(title: string): void {
    this.titleService.setTitle(`${title} | ${environment.app.name}`);
  }

  getTitle(): string {
    return this.titleService.getTitle();
  }
}
