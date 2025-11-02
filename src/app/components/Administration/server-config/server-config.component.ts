import { Component } from '@angular/core';

interface Server {
  url: string;
  user: string;
  pass: string;
}

@Component({
 selector: 'app-server-config',
  templateUrl: './server-config.component.html',
  styleUrls: ['./server-config.component.css']
})
export class ServerConfigComponent {
  server: Server = { url: '', user: '', pass: '' };
  servers: Server[] = [];
  message: string = '';

  addServer() {
    if (!this.server.url || !this.server.user || !this.server.pass) return;

    this.servers.push({ ...this.server });

    this.message = '✅ Server added!';
    setTimeout(() => this.message = '', 2000);

    this.server = { url: '', user: '', pass: '' };
  }
}
