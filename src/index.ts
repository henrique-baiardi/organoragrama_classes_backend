import express from "express";
import { AppDataSource } from "./data-source";


// const app = express();
// app.listen(3000, () => console.log("Server is runnig"));


AppDataSource.initialize().then(() => {
    const app = express()

    app.use(express.json())
    
    app.get('/', (req, res) => {
        return res.json('tudo certo')
    })

    return app.listen(process.env.PORT)
})