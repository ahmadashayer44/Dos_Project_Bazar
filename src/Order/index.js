const axios = require("axios");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/purchase/:id", async (req, res) => {
  const orderId = req.params.id;
  console.log("Reached");
  try {
    const response = await axios.post(
      `http://localhost:3003/catalog/order/${orderId}`
    );
    const message = response.data;
    res.status(200).send({ message });
  } catch (err) {
    res.send({ message });
  }
});

app.get("/test", (req, res) => {
  res.send({ Message: "Message Arrived Successfully!" });
});

app.listen(3002, () => {
  console.log("Order Service is listening on Port 3002");
});
