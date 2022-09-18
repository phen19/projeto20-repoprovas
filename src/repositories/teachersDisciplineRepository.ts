import { prisma } from "../database/database";

export async function findTeachersDisciplineId(
  teacherId: number,
  disciplineId: number
) {
  return prisma.teachersDisciplines.findFirst({
    where: { disciplineId: disciplineId, teacherId: teacherId },
  });
}
