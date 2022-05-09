const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require("mongodb");

app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://dbuser1:DBuser1@cluster0.yrfnd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    await client.connect();
    const medicineCollection = client
      .db("medicineWarehouse")
      .collection("medicine");
    app.get("/products", async (req, res) => {
      const query = {};
      const cursor = medicineCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (rq, res) => {
  res.send("server is running");
});

app.listen(port, () => {
  console.log("Server is running ", port);
});
