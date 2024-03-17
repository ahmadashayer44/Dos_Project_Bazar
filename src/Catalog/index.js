const express = require("express");
const app = express();
const sqlite3 = require("sqlite3").verbose();
const dbPath = "/app/src/Catalog/sqlite.db";
const db = new sqlite3.Database(dbPath);

app.use(express.json());

app.get("/catalog/info/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);

  db.get("SELECT * FROM book WHERE id = ?", [id], (err, row) => {
    if (err) {
      res.status(500).send("Error querying the database");
      return;
    }

    if (row) {
      res.json(row);
    } else {
      res.status(404).send("not found");
    }
  });
});

app.get("/catalog/search", (req, res) => {
  if (Object.keys(req.query).length === 0) {
    db.all("SELECT * FROM book", (err, rows) => {
      if (err) {
        res.status(500).send("Error querying the database");
        return;
      }

      if (rows.length > 0) {
        res.json(rows);
      } else {
        res.status(404).send("Books not found");
      }
    });
  } else {
    res
      .status(400)
      .send(
        "This endpoint currently supports fetching all books without query parameters."
      );
  }
});

app.get("/catalog/search/:Topic", (req, res) => {
  const Topic = req.params.Topic;
  if (!Topic) {
    res.status(400).send("The topic of the Book You need is Required!");
    return;
  }
  db.all("SELECT * FROM book WHERE Topic = ?", [Topic], (err, rows) => {
    if (err) {
      res.status(500).send("Error in entering the DataBase");
      return;
    }

    if (rows.length > 0) {
      res.json(rows);
    } else {
      res
        .status(404)
        .send(`These Books with Topic:-- '${Topic}' Are Not Found!`);
    }
  });
});

////////////////////////////////////////////////

//This part for ordering,it handled between Catalog and Order.
app.post("/catalog/order/:id", (req, res) => {
  const Id = parseInt(req.params.id, 10);
  if (!Id) {
    res.status(400).send("Need Book ID for This Operation");
    return;
  }
  db.get("SELECT * FROM book WHERE id = ?", [Id], (err, row) => {
    if (err) {
      res.status(500).send("Error in entering the DataBase");
      return;
    }
    if (row) {
      const itemName = row.Name;
      if (row.Quantity != 0) {
        db.run(
          "UPDATE book SET Quantity = Quantity - 1 WHERE id = ?",
          [Id],
          (err) => {
            if (err) {
              res.send("Error in editing on the DataBase");
            } else {
              res.status(200).send(`bought book ${itemName}`);
            }
          }
        );
      } else {
        res.send(`No more ${itemName} item for sale!`);
      }
    } else {
      res.send(`Book with ID:${Id} not found`);
    }
  });
});

app.listen(3003, () => {
  console.log("in 3003");
});
