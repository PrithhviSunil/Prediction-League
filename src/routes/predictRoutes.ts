import { Router } from "express";
import { predictionHandler } from "../controllers/predictionController";

const router = Router()
router.post('/predictions', predictionHandler)

export default router