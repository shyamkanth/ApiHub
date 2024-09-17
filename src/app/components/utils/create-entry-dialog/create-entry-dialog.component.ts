import { Component, Inject, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { LocalstorageService } from '../../../services/localstorage.service';
import { FormsModule } from '@angular/forms';
import { Category } from '../../../interfaces/category.interface';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-create-entry-dialog',
  standalone: true,
  imports: [
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './create-entry-dialog.component.html',
  styleUrl: './create-entry-dialog.component.scss',
})
export class CreateEntryDialogComponent {
  readonly dialogRef = inject(MatDialogRef<CreateEntryDialogComponent>);
  method = '';
  parentRegistry = this.data.selectedRegistry.name;
  parentCategory = '';
  endPoint = '';
  categoryName = '';
  newCategory: Category | null = null;
  isFieldEmpty = false;
  isCategoryExist = false;
  isCategoryEmpty = false;
  isCategoryAdded = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private localStorageService: LocalstorageService,
    private commonService: CommonService
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }

  addCategory() {
    if (this.categoryName == '') {
      this.showCategoryEmptyErrorMessage();
    } else {
      let allCategories = this.localStorageService.getCategories();
      let category = allCategories.find(
        (cat) =>
          cat.name.toLowerCase() === this.categoryName.toLowerCase() &&
          cat.parentRegistry === this.data.selectedRegistry
      );
      if (category) {
        this.showErrorMessage();
      } else {
        if (allCategories.length == 0) {
          this.newCategory = {
            id: 1,
            name: this.categoryName,
            parentRegistry: this.data.selectedRegistry.name,
          };
        } else {
          this.newCategory = {
            id: allCategories.length + 1,
            name: this.categoryName,
            parentRegistry: this.data.selectedRegistry.name,
          };
        }
        this.data.categories.push(this.newCategory);
        this.categoryName = '';
        this.showCategoryAddedSuccessMessage();
      }
    }
  }

  addEntry() {
    if (this.method == '' || this.parentCategory == '' || this.endPoint == '') {
      this.showRequiredMessage();
    } else {
      if (this.newCategory != null) {
        this.localStorageService.createCategory(this.newCategory!);
      }
      this.localStorageService.createEndPoints(
        this.method,
        this.parentRegistry,
        this.parentCategory,
        this.endPoint
      );
      this.closeDialog();
      this.commonService.openSuccessDialog(
        'The entry has been created successfully.'
      );
    }
  }

  showErrorMessage(): void {
    this.isCategoryExist = true;
    setTimeout(() => {
      this.isCategoryExist = false;
    }, 3000);
  }
  showCategoryEmptyErrorMessage(): void {
    this.isCategoryEmpty = true;
    setTimeout(() => {
      this.isCategoryEmpty = false;
    }, 3000);
  }
  showCategoryAddedSuccessMessage(): void {
    this.isCategoryAdded = true;
    setTimeout(() => {
      this.isCategoryAdded = false;
    }, 3000);
  }

  showRequiredMessage(): void {
    this.isFieldEmpty = true;
    setTimeout(() => {
      this.isFieldEmpty = false;
    }, 3000);
  }
}
