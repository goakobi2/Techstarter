const express = require('express');
const app = express();
const port = 3000;

// Middleware für JSON-Parsing
app.use(express.json());

// Simulierte Datenbank
let todos = [
    {
        id: 1,
        title: "Node.js lernen",
        completed: false,
        createdAt: new Date()
    }
];

// GET /api/todos - Alle Todos abrufen
app.get('/api/todos', (req, res) => {
    res.json(todos);
});

// GET /api/todos/:id - Einzelnes Todo abrufen
app.get('/api/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) {
        return res.status(404).json({ error: "Todo nicht gefunden" });
    }
    res.json(todo);
});

// POST /api/todos - Neues Todo erstellen
app.post('/api/todos', (req, res) => {
    if (!req.body.title) {
        return res.status(400).json({ error: "Title ist erforderlich" });
    }

    const todo = {
        id: todos.length + 1,
        title: req.body.title,
        completed: false,
        createdAt: new Date()
    };

    todos.push(todo);
    res.status(201).json(todo);
});

// DELETE /api/todos/:id - Todo löschen
app.delete('/api/todos/:id', (req, res) => {
    const todoIndex = todos.findIndex(t => t.id === parseInt(req.params.id));
    if (todoIndex === -1) {
        return res.status(404).json({ error: "Todo nicht gefunden" });
    }

    todos.splice(todoIndex, 1);
    res.json({ message: "Todo erfolgreich gelöscht" });
});

app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});