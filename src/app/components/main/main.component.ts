import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { METHODS } from '../../../constants';
import { CommonService } from '../../services/common.service';
import { Registry } from '../../interfaces/regsitry.interface';
import { Category } from '../../interfaces/category.interface';
import { Endpoint } from '../../interfaces/endpoint.interface';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
  @Input() selectedRegistry: any | null = null;
  registries: Registry[] = [];
  categories: Category[] = [];
  endPoints: Endpoint[] = [];
  methods = METHODS;
  openedEntries = new Set<string>();
  placeholder = 'No enpoint available';

  constructor(
    private commonService: CommonService,
    private localStorageService: LocalstorageService
  ) {}

  ngOnInit(): void {
    this.localStorageService.getRegistriesObservable().subscribe((res) => {
      this.registries = res;
    });

    this.localStorageService.getCategoriesObservable().subscribe((res) => {
      this.categories = res;
    });
    this.localStorageService.getEndPointsObservable().subscribe((res) => {
      this.endPoints = res;
    });
  }

  toggleEntry(categoryIndex: number, endPointIndex: number): void {
    const entryKey = this.getEntryKey(categoryIndex, endPointIndex);
    if (this.openedEntries.has(entryKey)) {
      this.openedEntries.delete(entryKey);
    } else {
      this.openedEntries.add(entryKey);
    }
  }

  isEntryOpened(categoryIndex: number, endPointIndex: number): boolean {
    return this.openedEntries.has(
      this.getEntryKey(categoryIndex, endPointIndex)
    );
  }

  private getEntryKey(categoryIndex: number, endPointIndex: number): string {
    return `${categoryIndex}-${endPointIndex}`;
  }

  collapseAllEntry() {
    this.openedEntries.clear();
  }

  copyToClipboard(text: string) {
    this.commonService.copyToClipboard(text);
  }

  getCategoriesForSelectedRegistry(): any[] {
    return this.categories.filter(
      (category) => category.parentRegistry === this.selectedRegistry.name
    );
  }

  getEndPointsForSelectedRegistry(): any[] {
    return this.endPoints.filter(
      (endpoint) => endpoint.parentRegistry === this.selectedRegistry.name
    );
  }

  getEndPointsForCategory(categoryName: string): any[] {
    return this.endPoints.filter(
      (endpoint) =>
        endpoint.parentCategory === categoryName &&
        endpoint.parentRegistry === this.selectedRegistry.name
    );
  }

  openCreateEntryDialog() {
    let categories: any[] = this.getCategoriesForSelectedRegistry();
    this.commonService
      .openCreateEntryDialog(this.selectedRegistry, categories)
      .subscribe((res) => {
        console.log(res);
      });
  }

  openUpdateCategoryDailog(category: Category) {
    this.commonService.openUpdateCategoryDialog(category).subscribe((res) => {
      console.log(res);
    });
  }

  deleteCategory(category: Category) {
    this.commonService.openDeleteDialog(category).subscribe((res) => {
      console.log(res);
    });
  }

  getMethodClass(method: string): string {
    switch (method) {
      case this.methods.POST:
        return 'entry-type-post';
      case this.methods.GET:
        return 'entry-type-get';
      case this.methods.PUT:
        return 'entry-type-put';
      case this.methods.PATCH:
        return 'entry-type-patch';
      case this.methods.DELETE:
        return 'entry-type-delete';
      case this.methods.OPTIONS:
        return 'entry-type-options';
      default:
        return '';
    }
  }

  openEditEntryDialog(endPoint: Endpoint) {
    this.commonService.openEntryEditDialog(endPoint).subscribe((res) => {
      console.log(res);
    });
  }

  deleteEndPoint(endPoint: any) {
    this.commonService.openDeleteDialog(endPoint);
  }
}
