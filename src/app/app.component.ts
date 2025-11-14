import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  mobileSidebarOpen = false;

  toggleSidebar() {
    this.mobileSidebarOpen = !this.mobileSidebarOpen;
  }
}
