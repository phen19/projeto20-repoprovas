import {Tests} from "@prisma/client";

export type ExamData = Omit<Tests, "id">;

export interface ExamBody {
    name: string,
    pdfUrl: string,
    category: number | string,
    discipline : number | string,
    teacher: number | string,
}