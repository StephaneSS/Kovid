import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ClipboardService {

  constructor() { }

  private copyInputToClipboard(inputElement: HTMLInputElement): void {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

  private copyStringToClipboard(val: string): void {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  copyToClipboard(value: HTMLInputElement | string) {
    if (typeof value === 'string') {
      this.copyStringToClipboard(value);
    }
    if (value instanceof HTMLInputElement) {
      this.copyInputToClipboard(value);
    }
  }

  notifyCopy(snackBar: MatSnackBar, txt: string = ''): void {
    snackBar.open(`${txt} copied to clipboard`, "Dismiss", {
      duration: 500,
    });
  }

}
