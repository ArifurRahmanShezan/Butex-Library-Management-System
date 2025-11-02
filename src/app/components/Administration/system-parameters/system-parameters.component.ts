import { Component } from '@angular/core';

@Component({
  selector: 'app-system-parameters',
  templateUrl: './system-parameters.component.html',
  styleUrls: ['./system-parameters.component.css']
})
export class SystemParametersComponent {
  activeForm: string = 'form1';
  msg: string = '';

  statuses = {
    generalStatus: '❌',
    acqStatus: '❌',
    techStatus: '❌',
    circStatus: '❌',
    serialsStatus: '❌'
  };

  switchForm(formId: string) {
    this.activeForm = formId;
  }

  submitForm(statusKey: keyof typeof this.statuses) {
    this.statuses[statusKey] = '✅';
    const friendlyName = statusKey.replace('Status', '');
    this.msg = `✅ ${friendlyName} settings updated!`;
    setTimeout(() => (this.msg = ''), 2000);
  }
}
