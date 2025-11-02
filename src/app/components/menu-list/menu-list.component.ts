import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent {
  // Use a string to store the ID of the currently active/open submenu
  activeMenuId: string | null = 'dashboard';

  // Define the menu structure for easy iteration and routing
  menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'dashboard',
      routerLink: '/dashboard',
      isDropdown: false,
      subItems: []
    },
    {
      id: 'database',
      label: 'Database',
      icon: 'database',
      isDropdown: true,
      subItems: [
        // Ensure this route matches your AppRoutingModule entry (e.g., /database/restore-backup or /database/restore)
        { label: 'Restore / Backup', routerLink: 'database-restore' }, 
      ]
    },
    {
      id: 'acq',
      label: 'Acquisitions',
      icon: 'acquisitions',
      isDropdown: true,
      subItems: [
        { label: 'Request Processing', routerLink: '/acquisitions/request' },
        { label: 'On-Approval Supplies', routerLink: '/acquisitions/approval' },
        { label: 'Firm Orders', routerLink: '/acquisitions/firm-orders' },
        { label: 'Gifts', routerLink: '/acquisitions/gifts' },
        { label: 'Accessioning', routerLink: '/acquisitions/accessioning' },
        { label: 'Invoice Payments', routerLink: '/acquisitions/payments' },
        { label: 'Claims', routerLink: '/acquisitions/claims' },
        { label: 'Budget & Vendor', routerLink: '/acquisitions/budget-vendor' },
      ]
    },
    {
      id: 'admin',
      label: 'Administration',
      icon: 'administration',
      isDropdown: true,
      subItems: [
        { label: 'Request Processing', routerLink: 'letters-holidays-form' },
        { label: 'EOD Process', routerLink: 'eod' },
        { label: 'RSS Feeds', routerLink: 'rss' },
        { label: 'Gifts', routerLink: 'gifts'}
        
      ]
    },
    
  ];

  toggleSubmenu(id: string) {
    // If the clicked menu is already open, close it (set to null)
    // Otherwise, set the activeMenuId to the clicked ID
    this.activeMenuId = this.activeMenuId === id ? null : id;
  }

  logout() {
    // Implement your logout logic here
    console.log('Logging out...');
    // Typically, this would involve routing to the login page
    // or calling an AuthService.
  }
}