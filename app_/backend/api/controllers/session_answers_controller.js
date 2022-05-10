const SessionAnswer  = require('../models/sessionAnswers')

exports.addSessionAnswer =  async  (req,res) => {
    const {user,session,date,video} = req.body

    if(user===""||user===null||session===""||session===null||req.files === null){
        res.json({Status: "Unsuccessful", Message: "All the data must be entered."})
    }else{
        var videos = [];
        for(var i=0;i<req.files.length;i++){
            videos[i]=req.files[i].path
        }
        const newSessionAnswer = new SessionAnswer({
            user,
            session,
            videos:videos
        })

        newSessionAnswer.save()
            .then(result=>{
                res.json({
                    Status: "Successful",
                    Message: 'Session answers has been recorded successfully.',
                    Session: result
                })
            })
            .catch(error=>{
                res.json({
                    Status: "Unsuccessful",
                    Message: "Happened saving the record in " +
                        "DB.",
                    error: error
                })
            })
    }
}