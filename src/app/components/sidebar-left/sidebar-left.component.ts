import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { REGISTRIES } from '../../../constants';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CreateRegistryDialogComponent } from '../utils/create-registry-dialog/create-registry-dialog.component';
import { CommonService } from '../../services/common.service';
import { LocalstorageService } from '../../services/localstorage.service';
import { Registry } from '../../interfaces/regsitry.interface';

@Component({
  selector: 'app-sidebar-left',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './sidebar-left.component.html',
  styleUrl: './sidebar-left.component.scss',
})
export class SidebarLeftComponent implements OnInit {
  public registries: Registry[] = [];
  @Output() selectedRegistry = new EventEmitter();
  selectedRegistryName: string | null = null;

  constructor(
    private commonService: CommonService,
    private localStorageService: LocalstorageService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.localStorageService
      .getRegistriesObservable()
      .subscribe((registries) => {
        this.registries = registries;
      });
  }

  selectRegistry(registryName: any) {
    this.selectedRegistryName = registryName.name;
    this.selectedRegistry.emit(registryName);
  }

  openCreateRegistryDialog() {
    this.commonService.openCreateRegistryDialog().subscribe((result) => {
      if (result) {
        this.selectedRegistryName = result.name;
        this.selectedRegistry.emit(result);
      }
    });
  }

  openUpdateRegistryDialog(registry: Registry) {
    this.commonService.openUpdateRegistryDialog(registry).subscribe((res) => {
      console.log(res);
    });
  }

  deleteRegistry(registry: Registry) {
    this.commonService.openDeleteDialog(registry).subscribe((result) => {
      if (result) {
        const allRegistries = this.localStorageService.getRegisteries();
        const registryExists = allRegistries.some(
          (r) => r.name === this.selectedRegistryName
        );

        if (!registryExists) {
          this.selectedRegistry.emit(null);
        }
      } else {
        console.log('Delete canceled');
      }
    });
  }
}
