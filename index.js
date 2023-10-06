const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// mahbubjhankar11
// password = XXXXXXXXXXXX

// const uri = "mongodb://localhost:27017";
const uri =
  'mongodb+srv://tfoysalahmed:faysal111@cluster0.shxl6g9.mongodb.net/';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const categoryCollection = client.db('pcBuilder').collection('categories');
    const productsCollection = client.db('pcBuilder').collection('products');

    app.get('/products', async (req, res) => {
      try {
        const cursor = productsCollection.find();
        const result = await cursor.toArray();
        res.status(200).json({ status: 'Success', data: result });
      } catch (error) {
        res.status(400).json({ status: 'false', error: error });
      }
    });
    app.get('/products/:category', async (req, res) => {
      try {
        const { category } = req.params;
        const cursor = productsCollection.find({ category });
        const result = await cursor.toArray();
        res.status(200).json({ status: 'Success', data: result });
      } catch (error) {
        res.status(400).json({ status: 'false', error: error });
      }
    });
    app.get('/productDetails/:id', async (req, res) => {
      try {
        const { id } = req.params;
        const result = await productsCollection.findOne({
          _id: new ObjectId(id),
        });
        res.status(200).json({ status: 'Success', data: result });
      } catch (error) {
        res.status(400).json({ status: 'false', error: error });
      }
    });

    app.get('/categories/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await userCollection.findOne(query);
      res.status(200).json({ status: 'Success', data: result });
    });

    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 });
    console.log('You successfully connected to MongoDB!');
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('SIMPLE CRUD IS RUNNING');
});

app.listen(port, () => {
  console.log(`SIMPLE CRUD is running on port, ${port}`);
});
