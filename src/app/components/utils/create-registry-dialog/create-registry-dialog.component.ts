import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogRef } from '@angular/material/dialog';
import { LocalstorageService } from '../../../services/localstorage.service';
import { FormsModule } from '@angular/forms';
import { CommonService } from '../../../services/common.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-registry-dialog',
  standalone: true,
  imports: [
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './create-registry-dialog.component.html',
  styleUrl: './create-registry-dialog.component.scss',
})
export class CreateRegistryDialogComponent {
  readonly dialogRef = inject(MatDialogRef<CreateRegistryDialogComponent>);
  name = '';
  description = '';
  baseUrl = '';
  isRegistryExist = false;
  isFieldEmpty = false;

  constructor(
    private localStorageService: LocalstorageService,
    private commonService: CommonService
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }

  createRegistry() {
    if (this.name == '' || this.description == '' || this.baseUrl == '') {
      this.showRequiredMessage();
    } else {
      const allRegistries = this.localStorageService.getRegisteries();
      const regsitry = allRegistries.find(
        (reg) => reg.name.toLowerCase() === this.name.toLowerCase()
      );
      if (regsitry) {
        console.log('Registry already available');
        this.showErrorMessage();
      } else {
        const newRegistry = this.localStorageService.createRegistry(
          this.name,
          this.description,
          this.baseUrl
        );
        this.dialogRef.close(newRegistry);
        this.commonService.openSuccessDialog(
          'The Registry have been created successfully.'
        );
      }
    }
  }

  showErrorMessage(): void {
    this.isRegistryExist = true;
    setTimeout(() => {
      this.isRegistryExist = false;
    }, 2000);
  }

  showRequiredMessage(): void {
    this.isFieldEmpty = true;
    setTimeout(() => {
      this.isFieldEmpty = false;
    }, 2000);
  }
}
