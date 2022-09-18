import { prisma } from "../database/database";
import { ExamData } from "../types/examsType";

async function findByName(name: string) {
  return prisma.tests.findFirst({
    where: { name },
  });
}

async function createExam(examData: ExamData) {
  await prisma.tests.create({
    data: examData,
  });
}

export { findByName, createExam };
