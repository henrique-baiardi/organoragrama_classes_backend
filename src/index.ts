import express from "express";
import { AppDataSource } from "./data-source";
import routes from "./routers";


// const app = express();
// app.listen(3000, () => console.log("Server is runnig"));


AppDataSource.initialize().then(() => {
    const app = express()

    app.use(express.json())

    app.use(routes)

    return app.listen(process.env.PORT)
})