import { InMemorySearchableRepository } from "../../../../shared/db/in-memory/in-memory.repository";
import { SortDirection } from "../../../../shared/domain/repository/search-params";
import { Uuid } from "../../../../shared/domain/value-objects/uuid.vo";
import { Category } from "../../category.entity";

export class CategoryInMemoryRepository extends InMemorySearchableRepository<
  Category,
  Uuid
> {
  sortableFields: string[] = ["name", "created_at"];
  protected async applyFilter(
    items: Category[],
    filter: string
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
