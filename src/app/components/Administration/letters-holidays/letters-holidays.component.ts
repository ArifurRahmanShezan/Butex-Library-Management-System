import { Component } from '@angular/core';

@Component({
  selector: 'app-letters-holidays',
  templateUrl: './letters-holidays.component.html',
  styleUrls: ['./letters-holidays.component.css']
})
export class LettersHolidaysComponent {
  activeForm: 'letters' | 'holidays' = 'letters';
  message: string = '';

  // Letters
  letters: { name: string, content: string }[] = [];
  letterName: string = '';
  letterContent: string = '';

  // Holidays
  holidays: { date: string, desc: string }[] = [];
  holidayDate: string = '';
  holidayDesc: string = '';

  switchForm(form: 'letters' | 'holidays') {
    this.activeForm = form;
  }

  addLetter() {
    if (!this.letterName || !this.letterContent) return;
    this.letters.push({ name: this.letterName, content: this.letterContent });
    this.message = '✅ Letter template added!';
    this.letterName = '';
    this.letterContent = '';
    setTimeout(() => this.message = '', 2000);
  }

  addHoliday() {
    if (!this.holidayDate || !this.holidayDesc) return;
    this.holidays.push({ date: this.holidayDate, desc: this.holidayDesc });
    this.message = '✅ Holiday added!';
    this.holidayDate = '';
    this.holidayDesc = '';
    setTimeout(() => this.message = '', 2000);
  }
}
