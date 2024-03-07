const express = require("express");
const app = express();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('sqlite.db');


app.use(express.json());

app.get('/catalog/info/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    
    db.get("SELECT * FROM book WHERE id = ?", [id], (err, row) => {
        if (err) {
            res.status(500).send('Error querying the database');
            return;
        }
        
        if (row) {
            res.json(row);
        } else {
            res.status(404).send('not found');
        }
    });
});

app.get('/catalog/search', (req, res) => {
    
    if (Object.keys(req.query).length === 0) {
        
        db.all("SELECT * FROM book", (err, rows) => {
            if (err) {
                res.status(500).send('Error querying the database');
                return;
            }
            
            if (rows.length > 0) {
                res.json(rows);
            } else {
                res.status(404).send('Books not found');
            }
        });
    } else {
       
        res.status(400).send('This endpoint currently supports fetching all books without query parameters.');
    }
});








app.listen(3000,()=>{
    console.log("im 30000");
})