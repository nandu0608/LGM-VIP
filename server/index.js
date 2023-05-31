const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/lgm-task-2');
  console.log('db connected')
}
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    contact:Number
});

const User = mongoose.model('User', userSchema);

const server = express();

server.use(cors());
server.use(bodyParser.json());

// CRUD - Create
server.post('/api/adduser',async (req,res)=>{
     
    let user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.contact = req.body.contact;
    const doc = await user.save();

    console.log(doc);
    res.json(doc);
})

server.get('/api/getuser',async (req,res)=>{
    const docs = await User.find({});
    res.json(docs)
})

server.listen(8080,()=>{
    console.log('server started')
})
