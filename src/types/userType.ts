import {Users} from "@prisma/client";

export type UserData = Omit<Users, "id">;