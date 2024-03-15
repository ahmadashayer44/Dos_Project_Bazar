const express = require("express");
const axios = require("axios");
const app = express();
app.use(express.json());
app.get("/catalog/info/:id", async (req, res) => {
  const bookId = req.params.id;
  try {
    const response = await axios.get(
      `http://localhost:3003/catalog/info/${bookId}`
    );
    res.send(response.data);
  } catch (error) {
    res.status(500).send({ error: "Error in some case of the server!" });
  }
});

app.get("/catalog/search", async (req, res) => {
  try {
    const response = await axios.get(`http://localhost:3003/catalog/search`, {
      params: req.query,
    });
    res.send(response.data);
  } catch (error) {
    res.status(500).send({ error: "Error in some case of the server!" });
  }
});

app.get("/catalog/search/:topic", async (req, res) => {
  const topic = req.params.topic;
  try {
    const response = await axios.get(
      `http://localhost:3003/catalog/search/${topic}`
    );
    res.send(response.data);
  } catch (error) {
    res.status(500).send({ error: "Error in some case of the server!" });
  }
});

app.post("/purchase/:id", async (req, res) => {
  const orderId = req.params.id;
  console.log(orderId);
  try {
    const response = await axios.post(
      `http://localhost:3002/purchase/${orderId}`,
      req.body
    );
    res.send(response.data);
  } catch (error) {
    res.status(500).send({ error: "Error in some case of the server!" });
  }
});

app.listen(3004, () => {
  console.log("listening on Port 3004");
});