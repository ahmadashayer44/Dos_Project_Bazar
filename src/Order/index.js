const axios = require("axios");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/purchase/:id/", async (req, res) => {
  const order = {
    id: req.params.id,
  };

  try {
    const response = await axios.post(
      `http://catalog/order/${order.id}`,
      order
    );
    res.send({ message: "Sending the request to Catalog" });
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err.message });
  }
});

app.get("/test", (req, res) => {
  res.send({ Message: "Message Arrived Successfully!" });
});

app.listen(3000, () => {
  console.log("Order Service is listening on Port 3000");
});
