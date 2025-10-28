import request from 'supertest';
import { ICategoryRepository } from '@core/category/domain/category.repository';
import { startApp } from '@nest-modules/shared-module/testing/helpers';
import { CreateCategoryFixture } from '@nest-modules/categories-module/testing/category-fixture';
import { CATEGORY_PROVIDER } from '@nest-modules/categories-module/categories.providers';

describe('CategoriesController (e2e)', () => {
  const appHelper = startApp();
  let categoryRepository: ICategoryRepository;

  beforeEach(async () => {
    categoryRepository = appHelper.app.get<ICategoryRepository>(
      CATEGORY_PROVIDER.REPOSITORIES.CATEGORY_REPOSITORY.provide,
    );
  });

  describe('/categories (POST)', () => {
    const arrange = CreateCategoryFixture.arrangeForCreate();
    test.each(arrange)(
      'when body is $send_data',
      async ({ send_data, expected }) => {
        const res = await request(appHelper.app.getHttpServer())
          .post('/categories')
          .send(send_data)
          .expect(201);

        const keysInResponse = CreateCategoryFixture.keysInResponse;

        expect(Object.keys(res.body)).toStrictEqual(['data']);
        // const presenter = await controller.create(send_data);
        // const entity = await categoryRepository.findById(
        //   new Uuid(presenter.id),
        // );
        // expect(entity!.toJSON()).toStrictEqual({
        //   category_id: presenter.id,
        //   created_at: presenter.created_at,
        //   updated_at: presenter.updated_at,
        //   ...expected,
        // });
        // const output = CategoryOutputMapper.toOutput(entity!);
        // expect(presenter).toEqual(new CategoryPresenter(output));
      },
    );
  });
  describe('', () => {});
  describe('', () => {});
  describe('', () => {});

  // beforeEach(async () => {
  //   console.log(process.env.NODE_ENV);

  //   const moduleFixture: TestingModule = await Test.createTestingModule({
  //     imports: [AppModule],
  //   }).compile();

  //   app = moduleFixture.createNestApplication();
  //   await app.init();
  // });

  // it('/ (GET)', () => {
  //   return request(app.getHttpServer())
  //     .get('/')
  //     .expect(200)
  //     .expect('Hello World!');
  // });
});
