const express = require('express');
const path = require('path');
const termData = require('./db/db.json');
const PORT = 3000;

const app = express();

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(express.static('./public'));

app.get('/', (req, res) => res.send('Navigate to /index or /notes'));

// GET Route for homepage
app.get('/index', (req, res) =>
	res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes page
app.get('/notes', (req, res) =>
	res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Pulls notes from db.json file.
app.get('/api/notes', (req, res) => res.json(termData));

// Server setup to listen.
app.listen(PORT, () => 
	console.log(`App listening at https://localhost:${PORT}`)
);
