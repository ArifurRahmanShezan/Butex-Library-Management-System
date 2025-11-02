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
      routerLink: 'dashboard',
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
        { label: 'Request Processing', routerLink: 'Request-Processing' },
        { label: 'On-Approval Supplies', routerLink: 'On-Approval-Supplies' },
        { label: 'Firm Orders', routerLink: 'firm-order' },
        { label: 'Gifts', routerLink: 'gift' },
        { label: 'Accessioning', routerLink: 'accesssioning' },
        { label: 'Invoice Payments', routerLink: 'invoice-payment' },
        { label: 'Claims', routerLink: 'claim' },
        { label: 'Budget & Vendor', routerLink: 'budget-vendor' },
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
        
        
      ]
    },
    {
      id: 'technical',
      label: 'Technical Processing',
      icon: 'technical processing',
      isDropdown: true,
      subItems: [
        { label: 'Material Type', routerLink: 'material-type' },
        { label: 'Marc Template', routerLink: 'marc-template' },
        { label: 'Authority Files', routerLink: 'authority-files-management'},
        { label: 'Catalog Records', routerLink: 'catalog-records'},
        { label: 'Copy Cataloging', routerLink: 'copy-cataloging'},
        { label: 'Items For Processing', routerLink: 'items-for-processing'},

      ]
    },
    {
      id: 'Circulation',
      label: 'Circulation',
      icon: 'circulation',
      isDropdown: true,
      subItems: [
        { label: 'Check-out', routerLink: 'checkout' },
        { label: 'Check-in', routerLink: 'checkin' },
        { label: 'Reservations', routerLink: '' },
        { label: 'Renewals', routerLink: 'renewals'},
        { label: 'Binding', routerLink: 'Binding'},
        { label: 'Overdues/Loss', routerLink: 'overdues'},
        { label: 'Patron Previleges', routerLink: 'patronprevilege'},

      ]
    },
    {
      id: 'serial',
      label: 'Serial Management',
      icon: 'Serial Management',
      isDropdown: true,
      subItems: [
        { label: 'Subscriptions', routerLink: 'subscriptions' },
        { label: 'Order & Invoices', routerLink: 'orderinvoice' },
        { label: 'Register Issues', routerLink: 'registerissues' },
        { label: 'Binding', routerLink: 'Binding'},
        { label: 'Renewals', routerLink: 'renewals'},
        { label: 'Binders', routerLink: 'binders'},
        

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