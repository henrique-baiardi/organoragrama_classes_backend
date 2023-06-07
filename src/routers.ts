import { Router } from "express";
import { SubjectController } from "./controllers/SubjetionController";
import { RoomController } from "./controllers/RoomController";


const routes = Router()

routes.post('/subjetion', new SubjectController().create)
routes.post('/room', new RoomController().create)
routes.post('/room/:idRoom/create', new RoomController().createVideo)
routes.post('/room/:idRoom/subject', new RoomController().roomSubject)
routes.get('/room', new RoomController().list)

export default routes