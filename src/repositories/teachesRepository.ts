import { prisma } from "../database/database";

export async function findManyTeachers() {
  return await prisma.teachers.findMany({
    select: { name: true, id: true },
  });
}

export async function findTeacher(teacher: number | string) {
  if (typeof teacher === "number") {
    return prisma.teachers.findFirst({
      where: { id: teacher },
    });
  }
  if (typeof teacher === "string") {
    return prisma.teachers.findFirst({
      where: { name: teacher },
    });
  }
}
