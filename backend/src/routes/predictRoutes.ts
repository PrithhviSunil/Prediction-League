import { Router } from "express";
import { predictionHandler } from "../controllers/predictionController";
import { authenticate } from "../middleware/authMiddleware";


const router = Router()
router.post('/predictions', authenticate ,predictionHandler)

export default router