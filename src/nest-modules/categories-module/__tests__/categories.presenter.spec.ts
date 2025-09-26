// categories.presenter.test.ts

import {
  CategoriesPresenter,
  CategoryCollectionPresenter,
} from '../categories.presenter';

describe('CategoriesPresenter', () => {
  it('should correctly assign properties from output', () => {
    const now = new Date();
    const output = {
      id: '123',
      name: 'Category Name',
      description: 'Category Description',
      created_at: now,
      updated_at: now,
    };
    const presenter = new CategoriesPresenter(output);

    expect(presenter.id).toBe(output.id);
    expect(presenter.name).toBe(output.name);
    expect(presenter.description).toBe(output.description);
    expect(presenter.created_at).toBe(output.created_at);
    expect(presenter.updated_at).toBe(output.updated_at);
  });
});

describe('CategoryCollectionPresenter', () => {
  it('should correctly assign pagination and data', () => {
    const now = new Date();
    const items = [
      {
        id: '1',
        name: 'Cat 1',
        description: 'Desc 1',
        is_active: true,
        created_at: now,
        updated_at: now,
      },
      {
        id: '2',
        name: 'Cat 2',
        description: 'Desc 2',
        is_active: true,
        created_at: now,
        updated_at: now,
      },
    ];
    const output = {
      items,
      current_page: 1,
      per_page: 10,
      last_page: 1,
      total: 2,
    };
    const collection = new CategoryCollectionPresenter(output);

    expect(collection.meta.current_page).toBe(output.current_page);
    expect(collection.meta.per_page).toBe(output.per_page);
    expect(collection.meta.last_page).toBe(output.last_page);
    expect(collection.meta.total).toBe(output.total);
    expect(Array.isArray(collection.data)).toBe(true);
    expect(collection.data).toHaveLength(items.length);

    collection.data.forEach((item, idx) => {
      expect(item).toBeInstanceOf(CategoriesPresenter);
      expect(item.id).toBe(items[idx].id);
      expect(item.name).toBe(items[idx].name);
      expect(item.description).toBe(items[idx].description);
      expect(item.created_at).toBe(items[idx].created_at);
      expect(item.updated_at).toBe(items[idx].updated_at);
    });
  });
});
