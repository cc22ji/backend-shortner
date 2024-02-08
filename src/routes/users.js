import { Router } from 'express';
import { newUserRegistration, userLogin, Authentication } from '../controllers/user.js';
import authorization from '../middlewares/authentication.js';


const router = Router();

router.use("/auth",authorization)

// signup route  /api/v1/user/signup
router.post('/signup',newUserRegistration)

//login route
router.post('/login',userLogin)

router.get('/auth', Authentication)

export default router;

