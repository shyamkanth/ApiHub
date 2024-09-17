export const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
  OPTIONS: 'OPTIONS',
};

export const REGISTRIES = [
  {
    id: 1,
    name: 'Registry one',
    description:
      'This API registry is a centralized repository that serves as a catalog for managing and documenting APIs within an organization. It provides a single point of reference where developers can discover, access, and understand the APIs available for integration. The registry typically includes metadata about each API, such as endpoints, request/response schemas, versioning, security protocols, and usage policies, ensuring consistency, governance, and easier maintenance across the API ecosystem.',
    baseUrl: 'https://dev.api.com',
  },
  { id: 2, name: 'Registry two', description: '', baseUrl: '' },
];

export const CATEGORIES = [
  { name: 'Category one', parentRegistry: 'Registry one' },
  { name: 'Category two', parentRegistry: 'Registry one' },
  { name: 'Category three', parentRegistry: 'Registry one' },
  { name: 'Category one', parentRegistry: 'Registry two' },
  { name: 'Category two', parentRegistry: 'Registry two' },
  { name: 'Category three', parentRegistry: 'Registry two' },
];

export const ENDPOINTS = [
  {
    method: METHODS.GET,
    endPoint: '/api/v2/get',
    parentCategory: 'Category one',
    parentRegistry: 'Registry one',
  },
  {
    method: METHODS.POST,
    endPoint: '/api/v2/post',
    parentCategory: 'Category one',
    parentRegistry: 'Registry one',
  },
  {
    method: METHODS.PUT,
    endPoint: '/api/v2/put',
    parentCategory: 'Category one',
    parentRegistry: 'Registry one',
  },
  {
    method: METHODS.GET,
    endPoint: '/api/v2/get',
    parentCategory: 'Category one',
    parentRegistry: 'Registry one',
  },
  {
    method: METHODS.DELETE,
    endPoint: '/api/v2/delete',
    parentCategory: 'Category two',
    parentRegistry: 'Registry one',
  },
  {
    method: METHODS.PATCH,
    endPoint: '/api/v2/patch',
    parentCategory: 'Category two',
    parentRegistry: 'Registry one',
  },
  {
    method: METHODS.OPTIONS,
    endPoint: '/api/v2/options',
    parentCategory: 'Category two',
    parentRegistry: 'Registry one',
  },
  {
    method: METHODS.POST,
    endPoint: '/api/v2/post',
    parentCategory: 'Category three',
    parentRegistry: 'Registry one',
  },
  {
    method: METHODS.PUT,
    endPoint: '/api/v2/put',
    parentCategory: 'Category three',
    parentRegistry: 'Registry one',
  },
  {
    method: METHODS.DELETE,
    endPoint: '/api/v2/delete',
    parentCategory: 'Category three',
    parentRegistry: 'Registry one',
  },
  {
    method: METHODS.DELETE,
    endPoint: '/api/v2/delete',
    parentCategory: 'Category one',
    parentRegistry: 'Registry one',
  },
  {
    method: METHODS.GET,
    endPoint: '/api/v2/get',
    parentCategory: 'Category one',
    parentRegistry: 'Registry one',
  },
  {
    method: METHODS.PUT,
    endPoint: '/api/v2/put',
    parentCategory: 'Category three',
    parentRegistry: 'Registry one',
  },
  {
    method: METHODS.PUT,
    endPoint: '/api/v2/put',
    parentCategory: 'Category three',
    parentRegistry: 'Registry one',
  },
  {
    method: METHODS.PUT,
    endPoint: '/api/v2/put',
    parentCategory: 'Category two',
    parentRegistry: 'Registry one',
  },
  {
    method: METHODS.POST,
    endPoint: '/api/v2/post',
    parentCategory: 'Category three',
    parentRegistry: 'Registry one',
  },
  {
    method: METHODS.PATCH,
    endPoint: '/api/v2/patch',
    parentCategory: 'Category two',
    parentRegistry: 'Registry one',
  },
  {
    method: METHODS.PATCH,
    endPoint: '/api/v2/patch',
    parentCategory: 'Category two',
    parentRegistry: 'Registry one',
  },
  {
    method: METHODS.OPTIONS,
    endPoint: '/api/v2/options',
    parentCategory: 'Category one',
    parentRegistry: 'Registry one',
  },
  {
    method: METHODS.OPTIONS,
    endPoint: '/api/v2/options',
    parentCategory: 'Category one',
    parentRegistry: 'Registry one',
  },
  {
    method: METHODS.POST,
    endPoint: '/api/v2/post',
    parentCategory: 'Category two',
    parentRegistry: 'Registry one',
  },
  {
    method: METHODS.POST,
    endPoint: '/api/v2/post',
    parentCategory: 'Category three',
    parentRegistry: 'Registry one',
  },
  {
    method: METHODS.DELETE,
    endPoint: '/api/v2/delete',
    parentCategory: 'Category three',
    parentRegistry: 'Registry one',
  },
  {
    method: METHODS.PUT,
    endPoint: '/api/v2/put',
    parentCategory: 'Category two',
    parentRegistry: 'Registry one',
  },
  {
    method: METHODS.OPTIONS,
    endPoint: '/api/v2/options',
    parentCategory: 'Category two',
    parentRegistry: 'Registry one',
  },
  {
    method: METHODS.POST,
    endPoint: '/api/v2/post',
    parentCategory: 'Category three',
    parentRegistry: 'Registry one',
  },
  {
    method: METHODS.GET,
    endPoint: '/api/v2/get',
    parentCategory: 'Category one',
    parentRegistry: 'Registry one',
  },
  {
    method: METHODS.GET,
    endPoint: '/api/v2/get',
    parentCategory: 'Category one',
    parentRegistry: 'Registry one',
  },
  {
    method: METHODS.PATCH,
    endPoint: '/api/v2/patch',
    parentCategory: 'Category two',
    parentRegistry: 'Registry one',
  },
  {
    method: METHODS.PUT,
    endPoint: '/api/v2/put',
    parentCategory: 'Category two',
    parentRegistry: 'Registry one',
  },
  {
    method: METHODS.DELETE,
    endPoint: '/api/v2/delete',
    parentCategory: 'Category three',
    parentRegistry: 'Registry one',
  },
  {
    method: METHODS.OPTIONS,
    endPoint: '/api/v2/options',
    parentCategory: 'Category three',
    parentRegistry: 'Registry one',
  },
  {
    method: METHODS.GET,
    endPoint: '/api/v2/get',
    parentCategory: 'Category three',
    parentRegistry: 'Registry one',
  },
  {
    method: METHODS.POST,
    endPoint: '/api/v2/post',
    parentCategory: 'Category two',
    parentRegistry: 'Registry one',
  },
  {
    method: METHODS.PUT,
    endPoint: '/api/v2/put',
    parentCategory: 'Category two',
    parentRegistry: 'Registry two',
  },
  {
    method: METHODS.DELETE,
    endPoint: '/api/v2/delete',
    parentCategory: 'Category one',
    parentRegistry: 'Registry two',
  },
  {
    method: METHODS.PATCH,
    endPoint: '/api/v2/patch',
    parentCategory: 'Category one',
    parentRegistry: 'Registry two',
  },
  {
    method: METHODS.POST,
    endPoint: '/api/v2/post',
    parentCategory: 'Category three',
    parentRegistry: 'Registry two',
  },
];
