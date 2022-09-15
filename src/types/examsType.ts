import {Tests} from "@prisma/client";

export type ExamData = Omit<Tests, "id">;

