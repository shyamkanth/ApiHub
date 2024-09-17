import { Component } from '@angular/core';
import { SidebarLeftComponent } from '../sidebar-left/sidebar-left.component';
import { SidebarRightComponent } from '../sidebar-right/sidebar-right.component';
import { MainComponent } from '../main/main.component';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SidebarLeftComponent,
    SidebarRightComponent,
    MainComponent,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  selectedRegistry = '';
  onRegistrySelected(event: any) {
    console.log('Selected Registry is : ', event);
    this.selectedRegistry = event;
  }

  scrollToTop(id: string) {
    const mainElement = document.getElementById(id);
    if (mainElement) {
      mainElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
