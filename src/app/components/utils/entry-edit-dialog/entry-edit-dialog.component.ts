import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LocalstorageService } from '../../../services/localstorage.service';
import { CommonService } from '../../../services/common.service';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-entry-edit-dialog',
  standalone: true,
  imports: [
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './entry-edit-dialog.component.html',
  styleUrl: './entry-edit-dialog.component.scss',
})
export class EntryEditDialogComponent {
  readonly dialogRef = inject(MatDialogRef<EntryEditDialogComponent>);
  entryDescription = '';
  requestHeader = '';
  requestBody = '';
  responseBody = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private localStorageService: LocalstorageService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.entryDescription = this.data.endPoint.values.desription;
    this.requestHeader = this.data.endPoint.values.requestHeader;
    this.requestBody = this.data.endPoint.values.requestBody;
    this.responseBody = this.data.endPoint.values.responseBody;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  updateEntry() {
    this.data.endPoint.values.desription = this.entryDescription;
    this.data.endPoint.values.requestHeader = this.requestHeader;
    this.data.endPoint.values.requestBody = this.requestBody;
    this.data.endPoint.values.responseBody = this.responseBody;
    this.localStorageService.updateEndPoint(this.data.endPoint);
    this.dialogRef.close();
    this.commonService.openSuccessDialog(
      'The Entry has been updated successfully'
    );
    console.log('Updated endPoint : ', this.data.endPoint);
  }

  handleIndentation(event: KeyboardEvent): void {
    const textarea = event.target as HTMLTextAreaElement;
    const start = textarea.selectionStart ?? 0;
    const end = textarea.selectionEnd ?? 0;

    const insertText = (text: string, cursorOffset: number) => {
      textarea.value =
        textarea.value.substring(0, start) +
        text +
        textarea.value.substring(end);
      textarea.selectionStart = textarea.selectionEnd = start + cursorOffset;
    };

    if (event.key === 'Enter') {
      const currentLine =
        textarea.value.substring(0, start).split('\n').pop() || '';
      const indent = currentLine.match(/^\s*/)![0];
      const closingBracket = this.getClosingBracketForSelection();

      if (closingBracket) {
        insertText(
          `\n${indent}\n${indent}${closingBracket}`,
          indent.length + 1
        );
      } else {
        insertText(`\n${indent}`, indent.length + 1);
      }

      event.preventDefault();
    } else if (['(', '{', '[', '"', "'"].includes(event.key)) {
      event.preventDefault();
      insertText(event.key + this.getClosingBracket(event.key), 1);
    } else if (event.key === 'Tab') {
      event.preventDefault();
      insertText('  ', 2);
    }
  }

  getClosingBracket(openingBracket: string): string {
    switch (openingBracket) {
      case '(':
        return ')';
      case '{':
        return '}';
      case '[':
        return ']';
      case '"':
        return '"';
      case "'":
        return "'";
      default:
        return '';
    }
  }

  getClosingBracketForSelection(): string {
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    const textBeforeCursor = textarea.value.substring(
      0,
      textarea.selectionStart
    );
    const lastOpeningBracket = textBeforeCursor.match(/[\(\{\[]$/);
    if (lastOpeningBracket) {
      return this.getClosingBracket(lastOpeningBracket[0]);
    }
    return '';
  }
}
