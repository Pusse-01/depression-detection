const User  = require('../models/user')
const {use} = require("express/lib/router");

exports.addUser =  async  (req,res) => {
    const {fullName,address,contactNo,email,password} = req.body

    if(fullName===""||address===""||contactNo===""||email===""||password===""){
        res.json({Status: "Unsuccessful", Message: "All the data must be entered."})
    }else{
        const user = new User({
            fullName,
            address,
            contactNo,
            email,
            password
        })

        user.save()
            .then(result=>{
                res.json({
                    Status: "Successful",
                    Message: 'User has been saved successfully.',
                    Session: result
                })
            })
            .catch(error=>{
                res.json({
                    Status: "Unsuccessful",
                    Message: "Happened saving the user in " +
                        "DB.",
                    error: error
                })
            })
    }
}

exports.getUsers = async (req,res) =>{
    User.find()
        .then(users=>{
            res.json({
                "Status":"Successful",
                "Users": users
            })
        })
        .catch(error=>{
            res.json({
                "Status":"Unsuccessful",
                "Error": error
            })
        })
}