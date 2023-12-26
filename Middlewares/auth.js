const jwt = require('jsonwebtoken')
const User = require('../Models/user')

const authMiddleware = async (req, res, next) =>{
    const token = req.header('Authorization')
    if(!token) {
        return res.status(401).json({message: 'Unauthorized'})
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.userId)
        if(!user){
            return res.status(401).json({message:'Unauthorized'})
        }
        req.user = user
        next()
    }
    catch(error){
        console.log(error)
    }
}
module.exports = authMiddleware