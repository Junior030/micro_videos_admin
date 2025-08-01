import { InMemorySearchableRepository } from "../../../../../shared/db/in-memory/in-memory.repository";
import { SortDirection } from "../../../../../shared/domain/repository/search-params";
import { Uuid } from "../../../../../shared/domain/value-objects/uuid.vo";
import { Category } from "../../../category.entity";
import {
  CategoryFilter,
  ICategoryRepository,
} from "../../../category.repository";

export class CategoryInMemoryRepository
  extends InMemorySearchableRepository<Category, Uuid>
  implements ICategoryRepository
{
  sortableFields: string[] = ["name", "created_at"];
  protected async applyFilter(
    items: Category[],
    filter: CategoryFilter
  ): Promise<Category[]> {
    if (!filter) {
      return items;
    }

    return items.filter((i) => {
      return i.name.toLowerCase().includes(filter.toLowerCase());
    });
  }

  getEntity(): new (...args: any[]) => Category {
    return Category;
  }

  findByIds(ids: Uuid[]): Promise<Category[]> {
    throw new Error("Method not implemented.");
  }
  existsById(ids: Uuid[]): Promise<{ exists: Uuid[]; not_exists: Uuid[] }> {
    throw new Error("Method not implemented.");
  }

  protected applySort(
    items: Category[],
    sort: string,
    sort_dir: SortDirection | null
  ): Category[] {
    return sort
      ? super.applySort(items, sort, sort_dir)
      : super.applySort(items, "created_at", "desc");
  }
}
