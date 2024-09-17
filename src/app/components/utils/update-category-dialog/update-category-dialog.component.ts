import { Component, Inject, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { Category } from '../../../interfaces/category.interface';
import { LocalstorageService } from '../../../services/localstorage.service';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-update-category-dialog',
  standalone: true,
  imports: [MatIconModule, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './update-category-dialog.component.html',
  styleUrl: './update-category-dialog.component.scss',
})
export class UpdateCategoryDialogComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<UpdateCategoryDialogComponent>);
  name = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private localStorageService: LocalstorageService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.name = this.data.selectedCategory.name;
  }

  updateCategoory(category: Category) {
    category.name = this.name;
    this.localStorageService.updateCategory(category);
    console.log('Category Updated : ', category);
    this.closeDialog();
    this.commonService.openSuccessDialog(
      'The category have been updated successfully'
    );
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
