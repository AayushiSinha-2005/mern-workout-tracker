const express=require('express');

//User Controllers functions
const {signupUser,loginUser}=require('../controllers/userController');

const router=express.Router();

//login routes
router.post('/login',loginUser)

//signup routes
router.post('/signup',signupUser)

module.exports=router;