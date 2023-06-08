import express from 'express';
import {registerController,loginController,singleUser} from '../controllers/authController.js'

const router = express.Router();

router.post('/register',registerController)
router.post('/login',loginController)
router.get("/singleUser/:id",singleUser)
export default router