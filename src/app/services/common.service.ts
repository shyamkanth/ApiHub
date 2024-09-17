import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateRegistryDialogComponent } from '../components/utils/create-registry-dialog/create-registry-dialog.component';
import { CreateEntryDialogComponent } from '../components/utils/create-entry-dialog/create-entry-dialog.component';
import { METHODS } from '../../constants';
import { Registry } from '../interfaces/regsitry.interface';
import { UpdateRegistryDialogComponent } from '../components/utils/update-registry-dialog/update-registry-dialog.component';
import { Category } from '../interfaces/category.interface';
import { UpdateCategoryDialogComponent } from '../components/utils/update-category-dialog/update-category-dialog.component';
import { GenericDeleteDialogComponent } from '../components/utils/generic-delete-dialog/generic-delete-dialog.component';
import { GenericSuccessDialogComponent } from '../components/utils/generic-success-dialog/generic-success-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EntryEditDialogComponent } from '../components/utils/entry-edit-dialog/entry-edit-dialog.component';
import { Endpoint } from '../interfaces/endpoint.interface';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {}

  // Function to show toast message
  showToast(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // 3 seconds
      verticalPosition: 'bottom', // or 'top'
      horizontalPosition: 'right', // 'start', 'center', 'end', 'left', 'right'
    });
  }

  // Function to copy content to clipboard
  async copyToClipboard(text: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
      this.showToast('Copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }

  openCreateRegistryDialog() {
    const dialogRef = this.dialog.open(CreateRegistryDialogComponent, {
      height: 'fit-content',
      width: '800px',
      panelClass: 'custom-dialog-container',
    });
    return dialogRef.afterClosed();
  }

  openCreateEntryDialog(selectedRegistry: any, categories: any[]) {
    console.log(categories);
    const dialogRef = this.dialog.open(CreateEntryDialogComponent, {
      height: 'fit-content',
      width: '800px',
      panelClass: 'custom-dialog-container',
      data: {
        selectedRegistry: selectedRegistry,
        categories: categories,
        methods: Object.keys(METHODS),
      },
    });
    return dialogRef.afterClosed();
  }

  openUpdateRegistryDialog(registry: Registry) {
    const dialogRef = this.dialog.open(UpdateRegistryDialogComponent, {
      height: 'fit-content',
      width: '800px',
      panelClass: 'custom-dialog-container',
      data: {
        selectedRegistry: registry,
      },
    });
    return dialogRef.afterClosed();
  }

  openUpdateCategoryDialog(category: Category) {
    const dialogRef = this.dialog.open(UpdateCategoryDialogComponent, {
      height: 'fit-content',
      width: '800px',
      panelClass: 'custom-dialog-container',
      data: {
        selectedCategory: category,
      },
    });
    return dialogRef.afterClosed();
  }

  openDeleteDialog(property: any) {
    const dialogRef = this.dialog.open(GenericDeleteDialogComponent, {
      height: 'fit-content',
      width: '800px',
      data: {
        property: property,
      },
      panelClass: 'custom-dialog-container',
    });
    return dialogRef.afterClosed();
  }

  openSuccessDialog(successActionString: string) {
    const dialogRef = this.dialog.open(GenericSuccessDialogComponent, {
      height: 'fit-content',
      width: 'fit-content',
      data: {
        action: successActionString,
      },
      panelClass: 'custom-dialog-container',
    });
    return dialogRef.afterClosed();
  }

  openEntryEditDialog(endPoint: Endpoint) {
    const dialogRef = this.dialog.open(EntryEditDialogComponent, {
      height: 'fit-content',
      width: '800px',
      data: {
        endPoint: endPoint,
      },
      panelClass: 'custom-dialog-container',
    });
    return dialogRef.afterClosed();
  }
}
