const express = require('express')
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
 require('dotenv').config();
const app = express()
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json())

const uri=`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ieavp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });


  async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
      const database=client.db('coffeDB');
      const coffeeCollection=database.collection('coffee');
      app.get('/coffee',async(req,res)=>{
        const cursor=coffeeCollection.find();
        const result=await cursor.toArray();
        res.send(result);
      });
      app.get('/coffee/:id', async (req, res) => {
        const { id } = req.params;
        
        // Validate ID before proceeding
        if (!id || id.length !== 24) {
            return res.status(400).json({ error: "Invalid ObjectId" });
        }
    
        try {
            const query = { _id: new ObjectId(id) };
            const result = await coffeeCollection.findOne(query);
    
            if (!result) {
                return res.status(404).json({ error: "Coffee not found" });
            }
    
            res.send(result);
        } catch (error) {
            console.error("Error fetching coffee:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
    
    app.put('/coffee/:id', async (req, res) => {
        const { id } = req.params;
        
        if (!id || id.length !== 24) {
            return res.status(400).json({ error: "Invalid ObjectId" });
        }
    
        try {
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updatedDoc = { $set: req.body };
    
            const result = await coffeeCollection.updateOne(filter, updatedDoc, options);
    
            res.send(result);
        } catch (error) {
            console.error("Error updating coffee:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
    
    app.delete('/coffee/:id', async (req, res) => {
        const { id } = req.params;
    
        if (!id || id.length !== 24) {
            return res.status(400).json({ error: "Invalid ObjectId" });
        }
    
        try {
            const query = { _id: new ObjectId(id) };
            const result = await coffeeCollection.deleteOne(query);
    
            if (result.deletedCount === 0) {
                return res.status(404).json({ error: "Coffee not found" });
            }
    
            res.send({ message: "Coffee deleted successfully" });
        } catch (error) {
            console.error("Error deleting coffee:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
    
    } finally {
      // Ensures that the client will close when you finish/error
    //   await client.close();
    }
  }
  run().catch(console.dir);
app.get('/', (req, res) => {
  res.send('HOt Hot coffe')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})