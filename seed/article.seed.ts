import { myDataSource } from "../src/core/database/config/data-source.config";
import { Article } from "../src/core/database/entity/article.entity";
import { Category } from "../src/core/database/entity/category.entity";
import { faker } from "@faker-js/faker";

async function createArticles() {
    await myDataSource.initialize();
    const articleRepository = myDataSource.getRepository(Article);
    const categoryRepository = myDataSource.getRepository(Category);

    // Assuming you have already some categories in your database
    const categories = await categoryRepository.find();
    if (categories.length === 0) {
        throw new Error("No categories found. Please add some categories first.");
    }

    const articles: any = [];
    for (let i = 0; i < 20; i++) {
        articles.push({
            content: faker.lorem.text(),
            title: faker.lorem.sentence(),
            description: faker.lorem.sentence(),
            keyword: faker.lorem.word(),
            imageUrl: faker.image.url(),
            published: faker.datatype.boolean(),
            author: faker.person.fullName(),
            view: faker.number.int({ min: 10, max: 100 }),
            categoryId: categories[0].id
        });
    }

    for (const articleData of articles) {
        const article = articleRepository.create(articleData);
        await articleRepository.save(article);
    }

    await myDataSource.destroy();
}

createArticles().then(() => {
    console.log("Articles created");
}).catch(error => console.error(error));
