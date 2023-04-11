import Express from "express";
import { signin, signup } from "../controllers/user.js";

const router = Express.Router();

router.post("/signUp", signup);
router.post("/signIn", signin);


export default router;