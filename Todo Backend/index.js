import express from "express"
import cors from "cors"

const app = express()
const port = 3000

app.use(cors())
app.use(express.json());

// middleware
// function hello(req, res, next) {
//     // user logged ? data dena : mana krdena
//     console.log("middleware called")
//     next()
// }

// app.get("/", hello, (req, res) => {
//     res.send("<h1>hello world</h1>")
// })
const arr = [];

// Sample Route
app.get('/', (req, res) => {
    res.send('Welcome to the backend server!!!');
});


// ADD todo
app.post('/todo', (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(404).json({ message: "title is required" });
    }
    const obj = { title, id: Date.now() }; 
    arr.push(obj); 
    res.json({ message: "todo added successfully", todo: obj });
});


// DELETE todo
app.delete('/todo/:id', (req, res) => {
    const { id } = req.params;
    const index = arr.findIndex(todo => todo.id === parseInt(id)); 
    if (index === -1) {
        return res.status(404).json({ message: "todo not found" });
    }
    arr.splice(index, 1);
    res.json({ message: "todo deleted successfully", index });
});


// EDIT todo
app.put('/todo/:id', (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    const updateTodo = arr.find(todo => todo.id === parseInt(id)); 
    if (!updateTodo) {
        return res.status(404).json({ message: "todo not found" });
    }
    if (!title) {
        return res.status(404).json({ message: "title is required"  });
    }
    updateTodo.title = title;
    res.json({ message: "todo updated successfully", updateTodo });
});


// SHOW all todo's
app.get('/allTodos', (req, res)=>{
    res.json(arr);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});