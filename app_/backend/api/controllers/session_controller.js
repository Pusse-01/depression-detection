const Session  = require('../models/session')

exports.addSession =  async  (req,res) => {
    const {sessionName} = req.body

    if(sessionName===""||sessionName===null|| req.file === null){
        res.json({Status: "Unsuccessful", Message: "All the data must be entered."})
    }else{
        const newSession = new Session({
            sessionName,
            video:req.file.path
        })

        newSession.save()
            .then(result=>{
                res.json({
                    Status: "Successful",
                    Message: 'Session has been added successfully.',
                    Session: result
                })
            })
            .catch(error=>{
                res.json({
                    Status: "Unsuccessful",
                    Message: "Happened saving the session in " +
                        "DB.",
                    error: error
                })
            })
    }
}

exports.getSessions = async (req,res) =>{
    Session.find()
        .then(sessions=>{
            res.json({
                "Status":"Successful",
                "Sessions": sessions
            })
        })
        .catch(error=>{
            res.json({
                "Status":"Unsuccessful",
                "Error": error
            })
        })
}