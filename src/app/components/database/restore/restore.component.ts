// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-restore',
//   templateUrl: './restore.component.html',
//   styleUrls: ['./restore.component.css']
// })
// export class RestoreComponent {
//  backupName: string = '';
//   backupHistory = [
//     { date: '2025-10-10', name: 'initial_backup', size: '2.4MB', status: 'Success' }
//   ];

//   restoreDB(file: any) {
//     alert("Database restore triggered: " + file?.name);
//     this.backupHistory.push({ date: new Date().toISOString().slice(0,10), name: file.name, size: '2MB', status: 'Success' });
//   }

//   createBackup() {
//     const name = this.backupName || 'unnamed_backup';
//     alert("Backup process started: " + name);
//     this.backupHistory.push({ date: new Date().toISOString().slice(0,10), name, size: '1.8MB', status: 'Success' });
//     this.backupName = '';
//   }

//   executeProcess() {
//     alert("Executing combined Flyway/Backup scripts...");
//   }
// }
