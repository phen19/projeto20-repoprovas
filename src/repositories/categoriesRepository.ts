import { prisma } from "../database/database";

export async function findManyCategories() {
  return await prisma.categories.findMany({
    select: {
      name: true,
      Tests: {
        select: {
          id: true,
          name: true,
          pdfUrl: true,
          teachersDiscipline: {
            select: {
              disciplineId: true,
              disciplines: {
                select: { name: true },
              },
              teachers: {
                select: { name: true },
              },
            },
          },
        },
      },
    },
  });
}

export async function findCategory(category: number | string) {
  if (typeof category === "number") {
    return prisma.categories.findFirst({
      where: { id: category },
    });
  }
  if (typeof category === "string") {
    return prisma.categories.findFirst({
      where: { name: category },
    });
  }
}
