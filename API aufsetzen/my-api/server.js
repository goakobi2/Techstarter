const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test-Route
app.get('/', (req, res) => {
    res.json({ message: 'Willkommen zur API!' });
});

// Beispiel-Route für Users
app.get('/api/users', (req, res) => {
    res.json([
        { id: 1, name: 'Max Mustermann' },
        { id: 2, name: 'Erika Musterfrau' }
    ]);
});

// Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Server starten
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
});