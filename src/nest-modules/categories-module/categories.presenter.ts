import { ListCategoriesOutput } from '@core/category/application/use-cases/list-category/list-category.use-case';
import { Transform } from 'class-transformer';
import { CollectionPresenter } from '../shared-module/collection.presenter';

export class CategoriesPresenter {
  id: string;
  name: string;
  description: string;
  @Transform(({ value }: { value: Date }) => value.toISOString())
  created_at: Date;
  @Transform(({ value }: { value: Date }) => value.toISOString())
  updated_at: Date;

  constructor(output: any) {
    this.id = output.id;
    this.name = output.name;
    this.description = output.description;
    this.created_at = output.created_at;
    this.updated_at = output.updated_at;
  }
}

export class CategoryCollectionPresenter extends CollectionPresenter {
  data: CategoriesPresenter[];

  constructor(output: ListCategoriesOutput) {
    const { items, ...paginationProps } = output;
    super(paginationProps);
    this.data = items.map((item) => new CategoriesPresenter(item));
  }
}
