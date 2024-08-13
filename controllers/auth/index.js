const ValidationSchema = require("./validations");
const bcrypt = require ('bcrypt');
const jwt= require("jsonwebtoken")
const {r} = require("../../database");
const Boom = require("boom");
const registerUser =async (req,res,next) =>{
    const newUsers=req.body;
    const hashedPassword =await bcrypt.hash(newUsers.password,10);
    const {error}=ValidationSchema.validate(newUsers);
    //console.log("newUsers",newUsers);
    const isUserExist = await r
    .db("users")
    .table("user")
    .filter({
        "userName": newUsers.userName
    })
    .run();
    //console.log(isUserExist);
    if(error) {
        res.statusCode = 400;
        return res.send({
            message:Boom.badRequest(error.details[0].message).message,
            code:400,

        });
    }
    else if(isUserExist.length){
        res.statusCode = 400;
        return res.send({
            message:"User Name already exists",
            code:400,
        })
    }
    else{
       r.db("users")
            .table("user")
            .insert(newUsers)
            .then((newUsers)=>{
                res.statusCode=201,
                res.send({
                    message:"Eklendi.",
                    code: 201,
                    payload:newUsers
                }); 
            })
            .catch((err) => {
                res.statusCode = 500;
                res.send({
                    message: err.message,
                    code: 500,
                    payload: err,
                });
            })
    }

};
const loginUser = async(req,res,next) =>{
        const users=req.body;
        const user=await r
        .db("users")
        .table("user")
        .filter({
            "userName": users.userName
        })
        .run();
        //console.log("user",user[0].userName);
        console.log("req",users);
        if(!user.length){
            res.statusCode=400;
            return  res.send({
                message: "User Name not found",
                code: 400,
            })
            
        }
        if(users.password !== user[0].password){
            res.statusCode=400;
            return res.send({
                message: "Password is incorrect",
                code: 400,
            })
            
        }
            const newToken=await jwt.sign(
                users,
                "jwtPrivateKey",
                { 
                    expiresIn: "24h" 
                });
        return(
            res.status(200).send({
            message:"Giriş Başarılı.",
            code: 200,
            data:{
                token:newToken,
                id:users.id,
                userName:users.userName,
                email:user.email
            }
        })
        )
   
        
    

};

module.exports={
    registerUser,
    loginUser
}