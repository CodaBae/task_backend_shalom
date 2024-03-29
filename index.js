// packages
const express = require('express')
const app = express()

const mongoose = require('mongoose')

const bodyParser = require('body-parser')


const cors = require('cors');
app.use(cors({
    origin: '*'
}));


app.use(bodyParser.urlencoded({extended:false}))
app.use(express.json())



// file import
const taskSchema = require('./model/Task')

const Task = mongoose.model("Tasks", taskSchema)

const mongoDBAccess = 'mongodb+srv://shalom:shalom123@cluster0.i5xwlr1.mongodb.net/?retryWrites=true&w=majority'

mongoose.set('strictQuery', false);
mongoose.connect(mongoDBAccess, { useNewUrlParser: true }).then(() => {
    console.log('you app has been connected to mongoDB')
}).catch((err) => {
    console.log(err)
})


// creating new task to the DB

// const Task2 = new Task( {
//     name:'new task testing delete',
//     date: '26/01/2023',
//     isCompleted: false
// })

// Task2.save()

// Read task from the DB

// Task.find((err,tasks)=>{
//     if(err){
//         console.log(err)
//     }
//     console.log(tasks)
// })

// Update a task in the DB

// Task.findOneAndUpdate({name:'task 2'}, {date:'30/01/2023'}, (err,task)=>{
//     if(err){
//         console.log(err)
//     }
//     console.log(task)
// })

// Delete a task

// Task.findOneAndDelete({_id:'63d840303a464f33ec4a1670'},(err,task)=>{
//     if (err) {
//         console.log(err)
//     }
//     else{
//         console.log(task, 'task deleted')
//     }
// })

// Get all task

app.get('/task', (req, res) => {
    Task.find((err, task) => {
        if (err) {
            res.send(err)
        }
        res.send(task)
    })
})

// Get task by ID

app.get('/task/:id',(req, res)=>{
Task.findById(req.params.id,(err, task)=>{
    if(err){
        res.send(err)
    }
    res.send(task)
})
})


// Post task

app.post('/task', (req, res) => {
    const newTask = new Task({
        name: req.body.name,
        date: req.body.date,
        isCompleted: req.body.isCompleted
    })

    console.log(newTask)

    newTask.save().then((task) => res.send('task created')).catch((err) => res.send(err))

})

// Update task

app.patch("/task/:id",(req,res)=>{
  Task.findOneAndUpdate({_id : req.params.id},{name:req.body.name},(err,task)=>{
    if(err){
       res.send(err)
    }
    res.send(task)
})

})

app.put("/task/:id",(req,res)=>{
    Task.findByIdAndUpdate(req.params.id,{isCompleted:req.body.isCompleted,name:req.body.name,date:req.body.date},(err,task)=>{
      if(err){
          res.send(err)
      }
      res.send(task)
  })
  
})
  
// Delete task

app.delete("/task/:id", (req,res)=>{
    Task.findByIdAndDelete(req.params.id,(err,task)=>{
        if (err){
            res.send(err)
        }
        res.send({message:"succes",data: task})
    })

})


const port = 3001

app.listen(port, () => {
    console.log(` we are in port ${port}`)
})







