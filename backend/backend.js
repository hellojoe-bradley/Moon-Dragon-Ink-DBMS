const express = require('express');
const app = express();
const mysql = require('mysql');

// Create a connection to the database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Bunzingtonthe3rd!',  // Replace with your MySQL password
  database: 'moon_dragon_ink'  // Replace with your database name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database.');
});

app.use(express.json()); // Middleware to parse JSON bodies

// Route to fetch all designs
app.get('/api/flash', (req, res) => {
  db.query('SELECT * FROM flash', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Route to add a new design
app.post('/api/flash', (req, res) => {
  const { design_description, creation_date, availability, sold_date, sold_price } = req.body;
  const query = `
    INSERT INTO flash (design_description, creation_date, availability, sold_date, sold_price)
    VALUES (?, ?, ?, ?, ?)`;
  db.query(query, [design_description, creation_date, availability, sold_date, sold_price], (err, result) => {
    if (err) {
      console.error('Error executing query:', err); // Detailed error logging
      return res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
    res.status(201).send({ design_id: result.insertId });
  });
});

// Route to update an existing design
app.put('/api/flash/:id', (req, res) => {
  const { id } = req.params;
  const { design_description, creation_date, availability, sold_date, sold_price } = req.body;
  const query = `
    UPDATE flash 
    SET design_description = ?, creation_date = ?, availability = ?, sold_date = ?, sold_price = ?
    WHERE design_id = ?`;
  db.query(query, [design_description, creation_date, availability, sold_date, sold_price, id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'Design updated successfully' });
  });
});

// Route to delete a design
app.delete('/api/flash/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM flash WHERE design_id = ?';
  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'Design deleted successfully' });
  });
});

// Start the server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
