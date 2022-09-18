import { prisma } from "../database/database";

export async function findManyTerms() {
  return await prisma.terms.findMany({
    select: {
      number: true,
      id: true,
      Disciplines: { select: { id: true, name: true } },
    },
  });
}
