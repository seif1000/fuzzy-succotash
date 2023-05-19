
import express ,{Application,Request,Response} from "express"
import { router } from "./routes/user.routes";

const app:Application= express()

app.use(express.json())

app.get("/", (req:Request, res:Response) => {   

    res.status(200).send("server is healthy")
 })

app.use("/api/v1/users",router)



export default app