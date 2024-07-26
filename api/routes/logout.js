import express from "express";

const router = express.Router();
router.post("/",async (req, res) => {

res.clearCookie("jwt",{sameSite:"none",secure:true})
.status(200).json({ message: 'User has been logged out'})

})
export default router;