const express = require("express");
const bodyParser = require("body-parser");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json())

const PORT = 3000;


app.get("/",(req,res)=>
{
    res.sendFile("index.html");
})

app.get("/user",async(req,res)=>
{
    const users = await prisma.user.findMany();
    res.json(users);
})

app.get("/user/:id",async (req,res) =>
{
    const userId = parseInt(req.params.id);
    console.log(userId);
    const user = await prisma.user.findUnique(
        {
            where : { id : userId}
        }
    );
    res.json(user);
})


app.post("/user",async (req,res)=>
{
    const {name,age} = req.body;
    const createdUser = await prisma.user.create(
        {
            data : {
                name,
                age
            }
        }
    )
    res.json(createdUser);
})

app.patch("/user/:id",async (req,res)=>
{
    const {name,age} = req.body;
    const userId     = req.params.id;
    const updatedUser = await prisma.user.update(
        {
            where : { userId },
            data : {
                name,
                age
            }
        }
    )
    res.json(updatedUser);
})

app.delete("/:id",async(req,res)=>
{   
    const deletedUser = await prisma.user.delete(
        {
            where : { userId}
        });
        res.json(deletedUser);
})


app.listen(PORT||process.env.PORT,()=>
{
    console.log(`Server is running on ${PORT}`);
});