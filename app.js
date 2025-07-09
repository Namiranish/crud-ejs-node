const express = require('express');
const path = require('path');
const app = express();
const userModel = require('./models/usermodel')

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));


app.get('/',(req,res)=>{
    res.render('index')
})

app.post('/create', async (req,res)=>{
    let{name,mail,image} = req.body; 
    console.log(req);
    try{
       const createdUser = await userModel.create({
        name:name,  
        mail:mail,
        image:image
       });


       res.status(200).redirect('/read');
    }catch(err){
        res.status(400).json({error:err.message});
    }
})

app.get('/read',async(req,res)=>{
    const users = await userModel.find()
    res.render('read',{users})
})

app.get('/edit/:id',async(req,res)=>{
    const editUser = await userModel.findById({_id: req.params.id});
    res.render('edit', {editUser})
})

app.patch('/update/:id',async(req,res)=>{
    let {name, image, mail} = req.body;
    const updateduser = await userModel.findByIdAndUpdate({_id: req.params.id}, {name,mail,image});
    const updatedData = await userModel.findById(updateduser)
    res.redirect('/read');
    // res.json(updatedData);
})

app.get('/delete/:id', async(req,res)=>{
    try{
       const cx = await userModel.findByIdAndDelete({_id: req.params.id});
       res.redirect('/read');
    }catch(err){
        res.status(400).json({error: error.message});
    }
})

app.listen(4001)
