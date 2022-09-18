import { prisma } from "../database/database";
import { ExamData } from "../types/examsType";

async function findByName(name: string) {
  return prisma.tests.findFirst({
    where: { name },
  });
}

async function findCategory(category: number | string) {
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

async function findTeacher(teacher: number | string) {
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

async function findDiscipline(discipline: number | string) {
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

async function findTeachersDisciplineId(
  teacherId: number,
  disciplineId: number
) {
  return prisma.teachersDisciplines.findFirst({
    where: { disciplineId: disciplineId, teacherId: teacherId },
  });
}

async function createExam(examData: ExamData) {
  await prisma.tests.create({
    data: examData,
  });
}

async function getExamsByDisciplines() {
  const terms = await prisma.terms.findMany({
    select: {
      number: true,
      id: true,
      Disciplines: { select: { id: true, name: true } },
    },
  });

  const examsByTerms = await Promise.all(
    terms.map(async (term) => {
      const categories = await prisma.categories.findMany({
        select: {
          name: true,
          Tests: {
            select: {
              id: true,
              name: true,
              pdfUrl: true,
              categories: {
                select: { name: true },
              },
              teachersDiscipline: {
                select: {
                  disciplineId: true,
                  teachers: {
                    select: { name: true },
                  },
                },
              },
            },
          },
        },
      });
      const result = {
        number: term.id,
        disciplines: term.Disciplines.map((discipline) => {
          return {
            id: discipline.id,
            name: discipline.name,
            categories: categories.map((category) => {
              return {
                id: category.name,
                tests: category.Tests.flatMap((test) => {
                  if (test.teachersDiscipline.disciplineId === discipline.id) {
                    return test;
                  } else {
                    return [];
                  }
                }),
              };
            }),
          };
        }),
      };
      return result;
    })
  );

  return examsByTerms;
}

async function getExamsByTeacher() {
  const teachers = await prisma.teachers.findMany({
    select: { name: true, id: true },
  });
  const examsByTeacher = await Promise.all(
    teachers.map(async (teacher) => {
      const result = await prisma.categories.findMany({
        select: {
          name: true,
          Tests: {
            distinct: ["categoryId"],
            select: {
              categories: {
                select: {
                  id: true,
                  Tests: {
                    distinct: ["teachersDisciplineId"],
                    select: {
                      teachersDiscipline: {
                        select: {
                          id: true,
                          Tests: {
                            select: {
                              name: true,
                              teachersDiscipline: {
                                select: {
                                  disciplines: {
                                    select: { name: true },
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            where: { teachersDiscipline: { teacherId: teacher.id } },
          },
        },
      });
      return {
        ...teacher,
        tests: result.map((category) => {
          return {
            category: category.name,
            tests: category.Tests.flatMap((tests) =>
              tests.categories.Tests.flatMap((tests) => {
                return tests.teachersDiscipline.Tests;
              })
            ),
          };
        }),
      };
    })
  );

  return examsByTeacher;
}

export {
  findByName,
  findCategory,
  findTeacher,
  findDiscipline,
  findTeachersDisciplineId,
  createExam,
  getExamsByDisciplines,
  getExamsByTeacher,
};
