import { Transform } from 'class-transformer';

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
