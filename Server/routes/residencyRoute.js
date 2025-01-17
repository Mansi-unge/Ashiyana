import express, { Router } from 'express';
import { createResidency , getAllResidencies , getResidency , searchResidencies } from '../controllers/residencyController.js';


const router  = express.Router()


router.post("/create" , createResidency)
router.get("/allresidencies" , getAllResidencies)
// Search residencies endpoint
router.get('/search', searchResidencies);
router.get("/:id" , getResidency)


export {router as residencyRoute} 