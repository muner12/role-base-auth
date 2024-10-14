const express=require('express');
const router=express.Router();




const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    completed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Todo = mongoose.model('Todo', todoSchema);

// CRUD Endpoints

// 1. Create a new Todo (POST)


router.get('/testing', (req, res) => {
    res.send('Hello, World!');
})
router.post('/todos', async (req, res) => {
    try {
        const { title, description } = req.body;
        const newTodo = new Todo({
            title,
            description
        });
        const savedTodo = await newTodo.save();
        res.status(201).json(savedTodo);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create todo' });
    }
});

// 2. Get all Todos (GET)
router.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve todos' });
    }
});

// 3. Get a single Todo by ID (GET)
app.get('/todos/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ error: 'Todo not found' });
        res.json(todo);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve todo' });
    }
});

// 4. Update a Todo by ID (PUT)
app.put('/todos/:id', async (req, res) => {
    try {
        const { title, description, completed } = req.body;
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            { title, description, completed },
            { new: true }
        );
        if (!updatedTodo) return res.status(404).json({ error: 'Todo not found' });
        res.json(updatedTodo);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update todo' });
    }
});

// 5. Delete a Todo by ID (DELETE)
router.delete('/todos/:id', async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
        if (!deletedTodo) return res.status(404).json({ error: 'Todo not found' });
        res.json({ message: 'Todo deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete todo' });
    }
});



module.exports=router