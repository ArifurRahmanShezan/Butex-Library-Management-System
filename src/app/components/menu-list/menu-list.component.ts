import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent {

  activeMenuId: string | null = null;

  constructor(private router: Router) {}

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
        { label: 'Restore / Backup', routerLink: '/database-restore' }
      ]
    },
    {
      id: 'acq',
      label: 'Acquisitions',
      icon: 'acquisitions',
      isDropdown: true,
      subItems: [
        { label: 'Request Processing', routerLink: '/Request-Processing' },
        { label: 'On-Approval Supplies', routerLink: '/On-Approval-Supplies' },
        { label: 'Firm Orders', routerLink: '/firm-order' },
        { label: 'Gifts', routerLink: '/gift' },
        { label: 'Accessioning', routerLink: '/accesssioning' },
        { label: 'Invoice Payments', routerLink: '/invoice-payment' },
        { label: 'Claims', routerLink: '/claim' },
        { label: 'Budget & Vendor', routerLink: '/budget-vendor' },
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
        { label: 'Patron Previleges', routerLink: 'patronprevilege'},
        { label: 'Overdues', routerLink: 'overdues'},
        { label: 'Loss', routerLink: 'loss'},

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
        { label: 'Binding', routerLink: 'Binding-Management'},
        { label: 'Renewals', routerLink: 'renewals'},
        { label: 'Binders', routerLink: 'binders'},
        
        

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
        { label: 'Administration Module', routerLink: 'administration-module' },
        { label: 'Patron Management', routerLink: 'patron-management' },
        { label: 'Server Config', routerLink: 'server-config' },
        
        
      ]
    },
    {
        id: 'other',
      label: 'Others',
      icon: 'others',
      isDropdown: true,
      subItems: [
        { label: 'Cataloging Template', routerLink: 'Cataloging-Template' },
        { label: 'Audit Report', routerLink: 'Audit-Report' },
        { label: 'Acquisitions Report', routerLink: 'Acquisitions-Report' },  
        { label: 'patrone category', routerLink: 'patrone-category' },  
        { label: 'patron', routerLink: 'Patron' },
        { label: 'req-admin', routerLink: 'request-admin' },
        { label:'publisher',routerLink:'publisher'},
        
      ]
    },

    
  ];

  onMenuClick(item: any) {
    if (!item.isDropdown && item.routerLink) {
      this.router.navigate([item.routerLink]);
    } else {
      this.toggleSubmenu(item.id);
    }
  }

  toggleSubmenu(menuId: string) {
    this.activeMenuId = this.activeMenuId === menuId ? null : menuId;
  }

  logout() {
    console.log('Logout clicked');
  }
}

  // // Use a string to store the ID of the currently active/open submenu
  // activeMenuId: string | null = 'dashboard';

  // // Define the menu structure for easy iteration and routing
  // menuItems = [
  //   {
  //     id: 'dashboard',
  //     label: 'Dashboard',
  //     icon: 'dashboard',
  //     routerLink: '/dashboard',
  //     isDropdown: false,
  //     subItems: []
  //   },
  //   {
  //     id: 'database',
  //     label: 'Database',
  //     icon: 'database',
  //     isDropdown: true,
  //     subItems: [
  //       // Ensure this route matches your AppRoutingModule entry (e.g., /database/restore-backup or /database/restore)
  //       { label: 'Restore / Backup', routerLink: 'database-restore' }, 
  //     ]
  //   },
  //   {
  //     id: 'acq',
  //     label: 'Acquisitions',
  //     icon: 'acquisitions',
  //     isDropdown: true,
  //     subItems: [
  //       { label: 'Request Processing', routerLink: 'Request-Processing' },
  //       { label: 'On-Approval Supplies', routerLink: 'On-Approval-Supplies' },
  //       { label: 'Firm Orders', routerLink: 'firm-order' },
  //       { label: 'Gifts', routerLink: 'gift' },
  //       { label: 'Accessioning', routerLink: 'accesssioning' },
  //       { label: 'Invoice Payments', routerLink: 'invoice-payment' },
  //       { label: 'Claims', routerLink: 'claim' },
  //       { label: 'Budget & Vendor', routerLink: 'budget-vendor' },
  //     ]
  //   },
  //   {
  //     id: 'admin',
  //     label: 'Administration',
  //     icon: 'administration',
  //     isDropdown: true,
  //     subItems: [
  //       { label: 'Request Processing', routerLink: 'letters-holidays-form' },
  //       { label: 'EOD Process', routerLink: 'eod' },
  //       { label: 'RSS Feeds', routerLink: 'rss' },
        
        
  //     ]
  //   },
  //   {
  //     id: 'technical',
  //     label: 'Technical Processing',
  //     icon: 'technical processing',
  //     isDropdown: true,
  //     subItems: [
  //       { label: 'Material Type', routerLink: 'material-type' },
  //       { label: 'Marc Template', routerLink: 'marc-template' },
  //       { label: 'Authority Files', routerLink: 'authority-files-management'},
  //       { label: 'Catalog Records', routerLink: 'catalog-records'},
  //       { label: 'Copy Cataloging', routerLink: 'copy-cataloging'},
  //       { label: 'Items For Processing', routerLink: 'items-for-processing'},

  //     ]
  //   },
  //   {
  //     id: 'Circulation',
  //     label: 'Circulation',
  //     icon: 'circulation',
  //     isDropdown: true,
  //     subItems: [
  //       { label: 'Check-out', routerLink: 'checkout' },
  //       { label: 'Check-in', routerLink: 'checkin' },
  //       { label: 'Reservations', routerLink: '' },
  //       { label: 'Renewals', routerLink: 'renewals'},
  //       { label: 'Binding', routerLink: 'Binding'},
  //       { label: 'Overdues/Loss', routerLink: 'overdues'},
  //       { label: 'Patron Previleges', routerLink: 'patronprevilege'},

  //     ]
  //   },
  //   {
  //     id: 'serial',
  //     label: 'Serial Management',
  //     icon: 'Serial Management',
  //     isDropdown: true,
  //     subItems: [
  //       { label: 'Subscriptions', routerLink: 'subscriptions' },
  //       { label: 'Order & Invoices', routerLink: 'orderinvoice' },
  //       { label: 'Register Issues', routerLink: 'registerissues' },
  //       { label: 'Binding', routerLink: 'Binding'},
  //       { label: 'Renewals', routerLink: 'renewals'},
  //       { label: 'Binders', routerLink: 'binders'},
        

  //     ]
  //   },
    
  // ];

  // toggleSubmenu(id: string) {
  //   // If the clicked menu is already open, close it (set to null)
  //   // Otherwise, set the activeMenuId to the clicked ID
  //   this.activeMenuId = this.activeMenuId === id ? null : id;
  // }

  // logout() {
  //   // Implement your logout logic here
  //   console.log('Logging out...');
  //   // Typically, this would involve routing to the login page
  //   // or calling an AuthService.
  // }
