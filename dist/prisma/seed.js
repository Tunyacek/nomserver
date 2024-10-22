'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const client_1 = require('@prisma/client')
const prisma = new client_1.PrismaClient()
async function main() {
  const user1 = await prisma.users.upsert({
    where: { id: '1' },
    update: {},
    create: {
      id: '1',
      email: 'some@email.xyz',
      password: 'somehashedpassword',
      username: 'someusername',
    },
  })
  const category1 = await prisma.category.upsert({
    where: { id: '1' },
    update: {},
    create: {
      id: '1',
      title: 'Polévky',
      userId: user1.id,
    },
  })
  const category2 = await prisma.category.upsert({
    where: { id: '2' },
    update: {},
    create: {
      id: '2',
      title: 'Omáčky',
      userId: user1.id,
    },
  })
  const recipe1 = await prisma.recipe.upsert({
    where: { id: '1' },
    update: {},
    create: {
      id: '1',
      title: 'Bramborová polévka',
      summary: 'Tradiční česká bramborová polévka s houbami a klobásou.',
      ingredients: ['500g brambor, 200g hub, 150g klobásy, cibule, česnek, sůl, pepř'],
      instructions: [
        'Oloupejte a nakrájejte brambory, orestujte cibuli a česnek, přidejte houby a klobásu, vařte do měkka.',
      ],
      rating: client_1.Rating.FOUR,
      image_url: 'https://unsplash.com/photos/brown-tabby-cat-7GX5aICb5i4',
      prep_time: 20,
      cook_time: 40,
      portions: 4,
      userId: user1.id,
    },
  })
  const recipe2 = await prisma.recipe.upsert({
    where: { id: '2' },
    update: {},
    create: {
      id: '2',
      title: 'Svíčková na smetaně',
      summary: 'Klasické české jídlo s hovězím masem, zeleninou a smetanovou omáčkou.',
      ingredients: [
        '500g hovězího masa, 200ml smetany, mrkev, petržel, celer, cibule, houskový knedlík',
      ],
      instructions: [
        'Uvařte maso se zeleninou, připravte omáčku ze smetany a podávejte s knedlíkem.',
      ],
      rating: client_1.Rating.FIVE,
      image_url:
        'https://unsplash.com/photos/orange-tabby-cat-in-black-and-white-jacket-yJozLVBxNA0',
      prep_time: 30,
      cook_time: 120,
      portions: 4,
      userId: user1.id, // Linking recipe to user1
    },
  })
  const recipeCategory1 = await prisma.recipeCategory.create({
    data: {
      recipeId: recipe1.id,
      categoryId: category1.id,
    },
  })
  const recipeCategory2 = await prisma.recipeCategory.create({
    data: {
      recipeId: recipe2.id,
      categoryId: category2.id,
    },
  })
  console.log(
    'Created or updated recipes, categories, and user:',
    JSON.stringify(
      { recipe1, recipe2, category1, category2, recipeCategory1, recipeCategory2, user1 },
      null,
      2
    )
  )
}
main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
