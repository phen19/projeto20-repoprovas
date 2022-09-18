import { prisma } from "../database/database";

export async function findDiscipline(discipline: number | string) {
  if (typeof discipline === "number") {
    return prisma.disciplines.findFirst({
      where: { id: discipline },
    });
  }
  if (typeof discipline === "string") {
    return prisma.disciplines.findFirst({
      where: { name: discipline },
    });
  }
}
