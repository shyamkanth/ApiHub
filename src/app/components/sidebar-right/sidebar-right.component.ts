import { Component } from '@angular/core';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'app-sidebar-right',
  standalone: true,
  imports: [],
  templateUrl: './sidebar-right.component.html',
  styleUrl: './sidebar-right.component.scss',
})
export class SidebarRightComponent {
  totalRegistryCount!: number;
  totalCategoriesCount!: number;
  totalEntryCount!: number;
  constructor(private localStrorageService: LocalstorageService) {}

  ngOnInit(): void {
    this.localStrorageService.getRegistriesObservable().subscribe((res) => {
      this.totalRegistryCount = res.length;
    });
    this.localStrorageService.getCategoriesObservable().subscribe((res) => {
      this.totalCategoriesCount = res.length;
    });
    this.localStrorageService.getEndPointsObservable().subscribe((res) => {
      this.totalEntryCount = res.length;
    });
  }
}
