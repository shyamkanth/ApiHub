import { Injectable } from '@angular/core';
import { Registry } from '../interfaces/regsitry.interface';
import { Category } from '../interfaces/category.interface';
import { Endpoint } from '../interfaces/endpoint.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  private readonly registriesKey = 'Registries';
  private readonly categoriesKey = 'Categories';
  private readonly endpointsKey = 'EndPoints';
  private registriesSubject = new BehaviorSubject<Registry[]>(
    this.getRegisteries()
  );
  private categoriesSubject = new BehaviorSubject<Category[]>(
    this.getCategories()
  );
  private endPointSubject = new BehaviorSubject<Endpoint[]>(
    this.getEndPoints()
  );

  constructor() {}

  //GET DATA FROM LOCALSTORAGE
  getRegisteries(): Registry[] {
    const registries = localStorage.getItem(this.registriesKey);
    return registries ? JSON.parse(registries) : [];
  }

  getCategories(): Category[] {
    const categories = localStorage.getItem(this.categoriesKey);
    return categories ? JSON.parse(categories) : [];
  }

  getEndPoints(): Endpoint[] {
    const endPoints = localStorage.getItem(this.endpointsKey);
    return endPoints ? JSON.parse(endPoints) : [];
  }

  // SET DATA TO LOCALSTORAGE
  createRegistry(name: string, description: string, baseUrl: string) {
    const registries = this.getRegisteries();
    const newRegistryId = registries.length
      ? Math.max(...registries.map((registry) => registry.id)) + 1
      : 1;
    const newRegistry: Registry = {
      id: newRegistryId,
      name: name,
      description: description,
      baseUrl: baseUrl,
    };
    registries.push(newRegistry);
    localStorage.setItem(this.registriesKey, JSON.stringify(registries));
    this.registriesSubject.next(registries);
    return newRegistry;
  }

  createCategory(newCategory: Category) {
    const categories = this.getCategories();
    categories.push(newCategory);
    localStorage.setItem(this.categoriesKey, JSON.stringify(categories));
    this.categoriesSubject.next(categories);
  }

  createEndPoints(
    method: string,
    parentRegistry: string,
    parentCategory: string,
    endPoint: string
  ) {
    const endPoints = this.getEndPoints();
    const newEndPointId = endPoints.length
      ? Math.max(...endPoints.map((endPoint) => endPoint.id)) + 1
      : 1;
    const newEndPoint: Endpoint = {
      id: newEndPointId,
      method: method,
      endPoint: endPoint,
      parentCategory: parentCategory,
      parentRegistry: parentRegistry,
      values: {
        desription: null,
        requestHeader: null,
        requestBody: null,
        responseBody: null,
      },
    };
    endPoints.push(newEndPoint);
    localStorage.setItem(this.endpointsKey, JSON.stringify(endPoints));
    this.endPointSubject.next(endPoints);
  }

  // Update Items in localstorage

  updateRegistry(registryNew: Registry) {
    const registries = this.getRegisteries();
    const categories = this.getCategories();
    const endPoints = this.getEndPoints();

    const index = registries.findIndex(
      (registry) => registry.id === registryNew.id
    );
    if (index != -1) {
      categories.forEach((category) => {
        if (category.parentRegistry === registries[index].name) {
          category.parentRegistry = registryNew.name;
        }
      });
      endPoints.forEach((endPoint) => {
        if (endPoint.parentRegistry === registries[index].name) {
          endPoint.parentRegistry = registryNew.name;
        }
      });

      registries[index] = registryNew;
    }
    localStorage.setItem(this.registriesKey, JSON.stringify(registries));
    localStorage.setItem(this.categoriesKey, JSON.stringify(categories));
    localStorage.setItem(this.endpointsKey, JSON.stringify(endPoints));
    this.registriesSubject.next(registries);
    this.categoriesSubject.next(categories);
    this.endPointSubject.next(endPoints);
  }

  updateCategory(categoryNew: Category) {
    const categories = this.getCategories();
    const endPoints = this.getEndPoints();
    const index = categories.findIndex(
      (category) =>
        category.id === categoryNew.id &&
        category.parentRegistry === categoryNew.parentRegistry
    );
    if (index != -1) {
      endPoints.forEach((endPoint) => {
        if (
          endPoint.parentCategory === categories[index].name &&
          endPoint.parentRegistry === categories[index].parentRegistry
        ) {
          endPoint.parentCategory = categoryNew.name;
        }
      });
      categories[index] = categoryNew;
    }

    localStorage.setItem(this.categoriesKey, JSON.stringify(categories));
    localStorage.setItem(this.endpointsKey, JSON.stringify(endPoints));
    this.categoriesSubject.next(categories);
    this.endPointSubject.next(endPoints);
  }

  updateEndPoint(newEndPoint: Endpoint) {
    const endPoints = this.getEndPoints();
    const endPointIndex = endPoints.findIndex(
      (ep) =>
        ep.id === newEndPoint.id &&
        ep.parentCategory === newEndPoint.parentCategory &&
        ep.parentRegistry === newEndPoint.parentRegistry
    );
    if (endPointIndex != -1) {
      endPoints[endPointIndex] = newEndPoint;
    }
    localStorage.setItem(this.endpointsKey, JSON.stringify(endPoints));
    this.endPointSubject.next(endPoints);
  }

  // DELETE DATA FROM LOCAL STORAGE
  deleteChildEntry(childId: number) {
    const endPoints = this.getEndPoints();
    const updatedEndPoints = endPoints.filter(
      (endpoint) => endpoint.id !== childId
    );
    this.saveEndPoints(updatedEndPoints);
  }

  saveEndPoints(endPoints: Endpoint[]) {
    localStorage.setItem(this.endpointsKey, JSON.stringify(endPoints));
    this.endPointSubject.next(endPoints);
  }

  deleteCategory(categoryId: number) {
    const categories = this.getCategories();
    const endPoints = this.getEndPoints();

    const categoryToDelete = categories.find(
      (category) => category.id === categoryId
    );
    if (categoryToDelete) {
      const updatedCategories = categories.filter(
        (category) => category.id !== categoryId
      );
      const updatedEndPoints = endPoints.filter(
        (endpoint) =>
          endpoint.parentCategory !== categoryToDelete.name ||
          endpoint.parentRegistry !== categoryToDelete.parentRegistry
      );
      this.saveCategories(updatedCategories);
      this.saveEndPoints(updatedEndPoints);
    }
  }

  saveCategories(categories: Category[]) {
    localStorage.setItem(this.categoriesKey, JSON.stringify(categories));
    this.categoriesSubject.next(categories);
  }

  deleteParentRegistry(registryId: number) {
    const registries = this.getRegisteries();
    const categories = this.getCategories();
    const endPoints = this.getEndPoints();

    const registryToDelete = registries.find(
      (registry) => registry.id === registryId
    );
    if (registryToDelete) {
      const updatedRegistries = registries.filter(
        (registry) => registry.id !== registryId
      );
      const updatedCategories = categories.filter(
        (category) => category.parentRegistry !== registryToDelete.name
      );
      const updatedEndPoints = endPoints.filter(
        (endpoint) => endpoint.parentRegistry !== registryToDelete.name
      );

      this.saveRegistries(updatedRegistries);
      this.saveCategories(updatedCategories);
      this.saveEndPoints(updatedEndPoints);
    }
  }

  saveRegistries(registries: Registry[]) {
    localStorage.setItem(this.registriesKey, JSON.stringify(registries));
    this.registriesSubject.next(registries);
  }

  // GET DATA OSERVABLES
  getRegistriesObservable() {
    return this.registriesSubject.asObservable();
  }
  getCategoriesObservable() {
    return this.categoriesSubject.asObservable();
  }
  getEndPointsObservable() {
    return this.endPointSubject.asObservable();
  }
}
