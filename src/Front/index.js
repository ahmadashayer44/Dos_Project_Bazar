const express = require("express");
const axios = require("axios");
const app = express();
app.use(express.json());
app.get("/info/:id", async (req, res) => {
  const bookId = req.params.id;
  try {
    const response = await axios.get(
      `http://localhost:3003/catalog/info/${bookId}`
    );
    res.send(response.data);
  } catch (error) {
    res.status(500).send({ error: "Not Found!" });
  }
});

app.get("/search/:Topic", async (req, res) => {
  const topic = req.params.Topic;
  try {
    const response = await axios.get(
      `http://localhost:3003/catalog/search/${topic}`
    );
    res.send(response.data);
  } catch (error) {
    res.status(500).send({ error: "Not Found!" });
  }
});

app.get("/search", async (req, res) => {
  try {
    const response = await axios.get(`http://localhost:3003/catalog/search`);
    res.send(response.data);
  } catch (error) {
    res.status(500).send({ error: "Not Found!" });
  }
});

app.post("/purchase/:id", async (req, res) => {
  const orderId = req.params.id;
  console.log(orderId);
  try {
    const response = await axios.post(
      `http://localhost:3002/purchase/${orderId}`
    );
    const message = response.data;
    res.status(200).send({ message });
  } catch (error) {
    res.status(400).send({ message });
  }
});

app.listen(3004, () => {
  console.log("listening on Port 3004");
});
