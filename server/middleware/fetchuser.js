const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.SECRET

const fetchuser=(req,res,next)=>{
    //Get the user from jwt token and add id to req object
    const token = req.header('auth-token') 
    if(!token){
        res.status(401).send({error:"Access Denied"})
    }
    try {       
        const data = jwt.verify(token,JWT_SECRET)
        req.user = data.user
        next()
    } catch (error) {
        console.error(error.message)
       res.status(500).send("Some error occured")
    }
}

module.exports = fetchuser