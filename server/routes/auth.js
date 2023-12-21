const express = require('express');
const User = require('../models/User')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser') 

const JWT_SECRET = process.env.SECRET

//Route 1: Create a user using POST "/api/auth/createuser". No login reqd
router.post('/createuser',
    body('firstName').isLength({min:3}),
    body('lastName').isLength({min:2}),
    body('email').isEmail(),
    body('password').isLength({min:5})
,async (req,res) =>{
    const errors = validationResult(req);
    let success=false
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }
    //Check whether the user with this email exists already
    try{
        let user = await User.findOne({email:req.body.email})
        if(user){
            return res.status(200).json({success,error:"Sorry, a user with this email already exists"})
        }
        
        const salt =await bcrypt.genSalt(5)
        const secPass =await bcrypt.hash(req.body.password,salt)

        user = await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,      
            password: secPass,
        })
        const data ={
            user:{
                id:user.id
            }
        }
        const authToken = jwt.sign(data,JWT_SECRET)
        res.json({success:true,user,authToken})
    }catch(error){
       console.error(error.message)
       res.status(500).send("Some error occured")
    }

})


//Route 2:Authenticate a user using Post "/api/auth/login". No login reqd
router.post('/login',
    body('email','Enter a valid Email').isEmail(),
    body('password','Password can not be blank').exists()
,async (req,res)=>{
    const success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array()});
    }
    const {email,password} = req.body
    try {
        const user = await User.findOne({email:email})
        if(!user){
            return res.status(200).json({success,error:"Email not Found!"})
        }
        const passwordCompare = await bcrypt.compare(password, user.password)
        if(!passwordCompare){
            return res.status(200).json({success,error:"Wrong Password"})
        }
        const data ={
            user:{
                id:user.id
            }
        }
        const authToken = jwt.sign(data,JWT_SECRET)
        res.json({success:true,user,authToken})

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
}
)

//Route 3:Get login user details using Post "/api/auth/getuser". Login reqd
router.post('/getuser',fetchuser,async (req,res)=>{
    const errors = validationResult(req);
    let success=false
    if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
    }
    try {
        const userId = req.user.id
        const user = await User.findById(userId)
        res.send({success:true,user})
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
}
)
module.exports = router;