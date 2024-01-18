import  express  from "express";
import { updateStd } from "../controller/student.js";

const router = express.Router()

router.put("/",updateStd)

export default router