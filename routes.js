const express = require("express")
const connect = require("./database")
const router = express.Router();
router.get("/", function(req,res){
    res.json({
        status: 1,
        message : "hello world"
    })
})

router.get("/workout-logs/:id",   (req,res) => {
    let userId = req.params.id
    // let batchNum = req.body.batchNum
    console.log(typeof userId)
    console.log(req)
    
    connect.query("SELECT * FROM workoutLogs WHERE userId = (?) ORDER BY lastOpened DESC", [userId],(err,data)=>{
        if(err){
            res.json({
                status: false,
                message : "Error getting workout Logs"
            })
            
        }else{
            console.log('no error getting logs')
            res.json({
                status: true,
                message: 'success getting logs',
                logs: data
               })
            
        }
    })
})

router.put("/update-timestamp/:id",(req,res)=>{
    let logId = req.params.id
    console.log(typeof logId)
    connect.query("UPDATE workoutLogs SET lastOpened = CURRENT_TIMESTAMP WHERE logId = (?)",[logId],(err,data)=>{
            if(err){
                res.json({
                    status:false,
                    message: 'error updating timestamp'
                })
            }else{
                res.json({
                    status:true,
                    message: 'Success updating timestamp'
                })
            }
    })
})

router.get('/get-logdata/:id',(req,res) =>{
    let logId = req.params.id
    


    connect.query('SELECT * FROM logData WHERE logId = (?) ORDER BY idx', [logId], (err,data)=>{
        if(err){
            console.log(err)
            res.json({
                status: false,
                message:'error getting log data'
            })
        }else{
            res.json({
                status: true,
                message:'success getting log data',
                data : data
            })
        }
    })
})

router.post('/add-logdata/:id',(req,res) =>{
    let logId = req.params.id
    // let batchNum = req.body.batchNum
    let idx =  req.body.idx
    let exerciseName = req.body.exerciseName
    let weight = req.body.weight
    let sets = req.body.sets
    let reps = req.body.reps
    connect.query('INSERT INTO logData(logId,idx,exerciseName,weight,sets,reps) VALUES (?,?,?,?,?,?)',[logId,idx,exerciseName,weight,sets,reps],(err,data)=>{
            if(err){
                console.log(err)
                res.json({
                    status:false,
                    message: 'failed to add data'
                })
            }else{
                res.json({
                    status: true,
                    message: 'success to adding data'
                    
                })
            }
    })
})

router.put('/update-single-logdata/:id',(req,res)=>{
    let movementId = req.params.id
    let exerciseName = req.body.exerciseName
    let weight = req.body.weight
    let sets = req.body.sets
    let reps = req.body.reps

    connect.query('UPDATE logData SET exerciseName = (?),  weight = (?),  sets = (?),  reps = (?) WHERE movementId = (?)',[exerciseName,weight,sets,reps,movementId],(err,data) =>{
            if(err){
                console.log(err)
                res.json({
                    status: false,
                    message: 'failed to update log data'
                })
            }else{
                res.json({
                    status:true,
                    message:'success to updating log data'
                })
            }
    })
})

router.delete('/delete-single-logdata/:id',(req,res)=>{
    let movementId = req.params.id
    connect.query('DELETE FROM logData WHERE movementId = (?)',[movementId],(err,data)=>{
            if(err){
                console.log(err)
                res.json({
                    status:false,
                    message: 'failed to delete log data'
                })
            }else{
                res.json({
                    status:true,
                    message: 'success to delete log data'
                })
            }
    })
})

router.delete('/delete-single-log/:id',(req,res) =>{
    let logId = req.params.id
    connect.query('DELETE FROM workoutLogs WHERE logId = (?)',[logId],(err,data)=>{
        if(err){
            console.log(err)
            res.json({
                status:false,
                message:'failed to delete log'
            })
        }else{
            res.json({
                status: true,
                message:'success in deleting the log'
            })
        }
    })
})

router.post('/add-log/:id',(req,res)=>{
    let userId = req.params.id
    let logName = req.body.logName
    connect.query('INSERT INTO workoutLogs(userId,logName) VALUES (?,?)',[userId,logName],(err,data)=>{
        if(err){
            console.log(err)
            res.json({
                status:false,
                message:'failed to add new log'
            })
        }else{
                res.json({
                    status:true,
                    message: 'success creating new log'
                })
        }
    })
})

router.put('/update-single-log/:id',(req,res)=>{
    let logId = req.params.id
    let logName = req.body.logName
    connect.query('UPDATE workoutLogs SET logName=(?) WHERE logId = (?)',[logName,logId],(err,data)=>{
        if(err){
            res.json({
                status:false,
                message:'error updating workout log'
            })
        }else{
            res.json({
                status:true,
                message: 'success updating  workout log'
            })
        }
    })
})

module.exports = router;