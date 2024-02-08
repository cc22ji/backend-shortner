import { Router } from 'express';
import authorization from '../middlewares/authentication.js';
import { GenerateURL, Redirect, Analytics, Deleteitem } from '../controllers/url.js';

const router = Router();
//for authorization through middleware
router.use("/url",authorization)
router.use("/:id",authorization)
router.use("/url/all",authorization)
router.use("/url/delete/:shortId",authorization)


// protected routes  for all sensitive data
router.post("/url",GenerateURL)
router.get("/:id",Redirect)
router.get("/url/all",Analytics)
router.delete("/url/delete/:shortId",Deleteitem)

export default router;