import { Request, Response } from "express";
import { roomRepository } from "../repositories/roomRepository";
import { videoRepository } from "../repositories/videoRepository";
import { subjectRepository } from "../repositories/SubjetionRepository";

export class RoomController {
    async create(req: Request, res: Response) {
        const { name, description } = req.body
        if (!name) {
            return res.status(400).json({ message: 'Campo nome Obrigatorio!' })
        }
        if (!description) {
            return res.status(400).json({ message: 'Campo descricao Obrigatorio!' })
        }

        try {
            const newRoom = roomRepository.create({
                name: name,
                description: description
            })
            console.log(newRoom)

            await roomRepository.save(newRoom)

            return res.status(201).json(newRoom)

        }catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Internal Server Error' })
        }
    }

    async createVideo(req: Request, res: Response) {
        const { title, url } = req.body
        const { idRoom } = req.params
        if (!title) {
            return res.status(400).json({ message: 'Campo nome Obrigatorio!' })
        }
        if (!url) {
            return res.status(400).json({ message: 'Campo descricao Obrigatorio!' })
        }

        try {
            const room = await roomRepository.findOneBy({id: Number(idRoom)})
            if( !room){ 
                return res.status(404).json({ message: 'Room not exist'})
            }

            const newVideo = videoRepository.create({
                title: title,
                url: url,
                room: room
            })
            console.log(newVideo)

            await videoRepository.save(newVideo)

            return res.status(201).json(newVideo)

        }catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Internal Server Error' })
        }
    }

    async roomSubject(req: Request, res: Response) {
        const { subject_id } = req.body
        const { idRoom } = req.params

        try {
            const room = await roomRepository.findOneBy({id: Number(idRoom)})
            if( !room){ 
                return res.status(404).json({ message: 'Room not exist'})
            }

            const subject = await subjectRepository.findOneBy({id: Number(subject_id)})
            if( !subject){ 
                return res.status(404).json({ message: 'Subject not exist'})
            }

            const roomUpdate =  {
                ...room,
                subjects: [ subject ],
            }

            await roomRepository.save(roomUpdate)

            return res.status(200).json(room)

        }catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Internal Server Error' })
        }
    }

    async list(req: Request, res: Response) {
        try{
            const rooms = await roomRepository.find({
                relations: {
                    subjects: true
                }
            })
            return res.status(200).json(rooms)

        }catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Internal Server Error' })
        }
    }

}