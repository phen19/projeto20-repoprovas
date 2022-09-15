import { prisma } from '../src/database/database';

async function main() {
  const terms = [{number: 1}, {number: 2}, {number: 3}, {number: 4}, {number: 5}, {number: 6}];
  await prisma.$transaction(
    terms.map((cur,index) =>
      prisma.terms.upsert({
        where: { id: index+1},
        update: {},
        create: { number: cur.number },
      })
    )
  )

  const categories = [{name: "Projeto"}, {name: "Prática"}, {name:"Recuperação"}];
  await prisma.$transaction(
    categories.map((cur,index) =>
      prisma.categories.upsert({
        where: { id: index+1},
        update: {},
        create: { name: cur.name },
      })
    )
  )

  const teachers = [{name: "Diego Pinho"}, {name: "Bruna Hamori"}];
  await prisma.$transaction(
    teachers.map((cur,index) =>
      prisma.teachers.upsert({
        where: { id: index+1},
        update: {},
        create: { name: cur.name },
      })
    )
  )

  const disciplines = [{name: "HTML e CSS", termId: 1}, {name: "JavaScript", termId: 2}, {name: "React", termId: 3},
                        {name: "Humildade", termId: 1}, {name: "Planejamento", termId: 2}, {name:"Autoconfiança", termId:3}];
  await prisma.$transaction(
    disciplines.map((cur,index) =>
      prisma.disciplines.upsert({
        where: { id: index+1},
        update: {},
        create: { name: cur.name, termId: cur.termId },
      })
    )
  )

    const teacherDisciplines = [{teacherId: 1, disciplineId: 1}, {teacherId: 1, disciplineId: 2}, {teacherId: 1, disciplineId: 3},
                        {teacherId: 2, disciplineId: 4}, {teacherId: 2, disciplineId: 5}, {teacherId: 2, disciplineId:6}];
  await prisma.$transaction(
    teacherDisciplines.map((cur,index) =>
      prisma.teachersDisciplines.upsert({
        where: { id: index+1},
        update: {},
        create: { teacherId: cur.teacherId, disciplineId: cur.disciplineId },
      })
    )
  )
} 

main()
  .catch(e => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });