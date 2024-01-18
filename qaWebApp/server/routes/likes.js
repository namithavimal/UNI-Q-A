import  express  from "express";
import { getLikes, addLikes, deleteLikes} from "../controller/like.js";

const router = express.Router()

router.get("/",getLikes)
router.post("/", addLikes)
router.delete("/", deleteLikes)


export default router