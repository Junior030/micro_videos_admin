import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoryModel } from '@core/category/infra/db/sequelize/category.model';
import { CATEGORY_PROVIDER } from './categories.providers';

@Module({
  imports: [SequelizeModule.forFeature([CategoryModel])],
  controllers: [CategoriesController],
  providers: [
    ...Object.values(CATEGORY_PROVIDER.REPOSITORIES),
    ...Object.values(CATEGORY_PROVIDER.USE_CASES),
  ],
})
export class CategoriesModule {}
