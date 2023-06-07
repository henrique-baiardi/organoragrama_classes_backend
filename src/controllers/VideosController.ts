import { Request, Response } from "express";
import { videoRepository } from "../repositories/videoRepository";

export class VideoController {
    async create(req: Request, res: Response) {
        const { title, url } = req.body
        const { idRoom } = req.params
        if (!title) {
            return res.status(400).json({ message: 'Campo nome Obrigatorio!' })
        }
        if (!url) {
            return res.status(400).json({ message: 'Campo descricao Obrigatorio!' })
        }

        try {
            const newRoom = videoRepository.create({
                title: title,
                url: url
            })
            console.log(newRoom)

            await videoRepository.save(newRoom)

            return res.status(201).json(newRoom)

        }catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Internal Server Error' })
        }
    }
}