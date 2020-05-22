const express = require("express");

const app = express();

const cors = require("cors");

const conn = require("./db");


app.use(express.json());   
app.use(express.urlencoded()); 


//create a todo
app.post("/todos", async (req, res) => {
    try{
        const {description} = req.body;
        const newtodo = await conn.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [description]);
        res.json(newtodo.rows[0]);
    }
    catch(err){
        console.log(err.message)
    }
});

//get all todos
app.get("/todos", async(req, res) => {
    try{
        const allTodos = await conn.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    }
    catch(err){
        console.log(err.message);
    }
});

//get a todo
app.get("/todos/:id", async(req, res) => {
    try{
        const id = req.params.id;
        console.log(id);
        const todo = await conn.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
        res.json(todo.rows[0]);
    }
    catch(err){
        console.log(err.message);
    }
}); 

//update a todo
app.put('/todos/:id', async(req, res) => {
    try{
        const {id} = req.params;
        const {description} = req.body;
        const updatetodo = await conn.query("UPDATE todo SET description = $1 WHERE todo_id = $2", 
        [description, id]);

        res.json("Object updated!!");

    }
    catch(err){
        console.log(err.message);
    }
});

app.use(cors());

app.listen(5000, () => {
    console.log("Server has started on port 5000");
});
