import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-generic-success-dialog',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './generic-success-dialog.component.html',
  styleUrl: './generic-success-dialog.component.scss',
})
export class GenericSuccessDialogComponent {
  readonly dialogRef = inject(MatDialogRef<GenericSuccessDialogComponent>);
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
  closeDialog() {
    this.dialogRef.close();
  }
}
