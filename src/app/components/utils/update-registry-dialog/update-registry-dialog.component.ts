import { Component, Inject, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { Registry } from '../../../interfaces/regsitry.interface';
import { CommonService } from '../../../services/common.service';
import { LocalstorageService } from '../../../services/localstorage.service';

@Component({
  selector: 'app-update-registry-dialog',
  standalone: true,
  imports: [MatIconModule, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './update-registry-dialog.component.html',
  styleUrl: './update-registry-dialog.component.scss',
})
export class UpdateRegistryDialogComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<UpdateRegistryDialogComponent>);
  name = '';
  description = '';
  baseUrl = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private localStorageService: LocalstorageService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.name = this.data.selectedRegistry.name;
    this.description = this.data.selectedRegistry.description;
    this.baseUrl = this.data.selectedRegistry.baseUrl;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  updateRegistry(registry: Registry) {
    registry.id = this.data.selectedRegistry.id;
    registry.name = this.name;
    registry.description = this.description;
    registry.baseUrl = this.baseUrl;
    this.localStorageService.updateRegistry(registry);
    this.closeDialog();
    this.commonService.openSuccessDialog(
      'The registry have been updated successfully'
    );
  }
}
