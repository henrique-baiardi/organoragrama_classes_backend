import { Request, Response } from "express";
import { subjectRepository } from "../repositories/SubjetionRepository";

export class SubjectController {
    async create(req: Request, res: Response) {
        const { name } = req.body
        if (!name) {
            return res.status(400).json({ message: 'Campo nome Obrigatorio!' })
        }

        try {
            const newSubject = subjectRepository.create({
                name: name
            })
            console.log(newSubject)

            await subjectRepository.save(newSubject)

            return res.status(201).json(newSubject)

        }catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Internal Server Error' })
        }
    }
}