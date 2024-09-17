import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { LocalstorageService } from '../../../services/localstorage.service';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-generic-delete-dialog',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './generic-delete-dialog.component.html',
  styleUrl: './generic-delete-dialog.component.scss',
})
export class GenericDeleteDialogComponent {
  readonly dialogRef = inject(MatDialogRef<GenericDeleteDialogComponent>);
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private localStorageService: LocalstorageService,
    private commomService: CommonService
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    const array = Object.keys(this.data.property);
    console.log(array.length);
  }

  closeDialog() {
    this.dialogRef.close();
  }

  delete() {
    const array = Object.keys(this.data.property);
    if (array.length == 4) {
      this.localStorageService.deleteParentRegistry(this.data.property.id);
      this.dialogRef.close(true);
      this.commomService.openSuccessDialog(
        'The Registry have been deleted successfuly.'
      );
    } else if (array.length == 3) {
      this.localStorageService.deleteCategory(this.data.property.id);
      this.dialogRef.close(true);
      this.commomService.openSuccessDialog(
        'The Category have been deleted successfuly.'
      );
    } else if (array.length == 6) {
      this.localStorageService.deleteChildEntry(this.data.property.id);
      this.dialogRef.close(true);
      this.commomService.openSuccessDialog(
        'The Entry has been Deleted Successfully.'
      );
    }
  }
}
