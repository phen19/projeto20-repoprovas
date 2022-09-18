import { findManyCategories } from "../repositories/categoriesRepository";
import * as examRepository from "../repositories/examsRepository";
import * as categoriesRepository from "../repositories/categoriesRepository";
import * as disciplineRepository from "../repositories/disciplineRepository";
import * as teachersRepository from "../repositories/teachesRepository";
import * as teachersDisciplineRepository from "../repositories/teachersDisciplineRepository";
import { findManyTeachers } from "../repositories/teachesRepository";
import { findManyTerms } from "../repositories/termsRepository";
import { ExamData, ExamBody } from "../types/examsType";

async function createExam(examBody: ExamBody) {
  if (!isNaN(Number(examBody.discipline))) {
    examBody.discipline = Number(examBody.discipline);
  }
  if (!isNaN(Number(examBody.teacher))) {
    examBody.teacher = Number(examBody.teacher);
  }
  if (!isNaN(Number(examBody.category))) {
    examBody.category = Number(examBody.category);
  }

  const existingCategory = await categoriesRepository.findCategory(
    examBody.category
  );

  if (!existingCategory) {
    throw { code: "NotFound", message: "Category not found" };
  }

  const existingTeacher = await teachersRepository.findTeacher(
    examBody.teacher
  );
  if (!existingTeacher) {
    throw { code: "NotFound", message: "Teacher not found" };
  }

  const existingDiscipline = await disciplineRepository.findDiscipline(
    examBody.discipline
  );
  if (!existingDiscipline) {
    throw { code: "NotFound", message: "Discipline not found" };
  }
  const teachersDiscipline =
    await teachersDisciplineRepository.findTeachersDisciplineId(
      existingTeacher.id,
      existingDiscipline.id
    );
  if (!teachersDiscipline) {
    throw {
      code: "NotFound",
      message: "Relation between teacher and discipline not found",
    };
  }
  const examData: ExamData = {
    name: examBody.name,
    pdfUrl: examBody.pdfUrl,
    categoryId: existingCategory.id,
    teachersDisciplineId: teachersDiscipline!.id,
  };

  await examRepository.createExam(examData);
}

async function getExamsByDisciplines() {
  const terms = await findManyTerms();
  const examsByTerms = await Promise.all(
    terms.map(async (term) => {
      const categories = await findManyCategories();
      const result = {
        number: term.id,
        disciplines: term.Disciplines.map((discipline) => {
          return {
            name: discipline.name,
            categories: categories.map((category) => {
              return {
                category: category.name,
                tests: category.Tests.flatMap((test) => {
                  if (test.teachersDiscipline.disciplineId === discipline.id) {
                    return {
                      id: test.id,
                      name: test.name,
                      pdfUrl: test.pdfUrl,
                      teacher: test.teachersDiscipline.teachers.name,
                    };
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
  const teachers = await findManyTeachers();
  const examsByTeacher = await Promise.all(
    teachers.map(async (teacher) => {
      const categories = await findManyCategories();
      return {
        ...teacher,
        tests: categories.map((category) => {
          return {
            category: category.name,
            tests: category.Tests.flatMap((tests) => {
              if (tests.teachersDiscipline.teachers.name === teacher.name) {
                return {
                  id: tests.id,
                  name: tests.name,
                  pdfUrl: tests.pdfUrl,
                  discipline: tests.teachersDiscipline.disciplines.name,
                };
              } else {
                return [];
              }
            }),
          };
        }),
      };
    })
  );

  return examsByTeacher;
}
export { createExam, getExamsByDisciplines, getExamsByTeacher };
