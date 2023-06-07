import { AppDataSource } from "../data-source";
import { Subject } from "../entities/subject";

export const subjectRepository = AppDataSource.getRepository(Subject)