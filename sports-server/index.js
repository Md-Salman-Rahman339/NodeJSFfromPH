const express = require('express')
const app = express()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config()
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
        await client.connect();
        console.log("Connected to MongoDB!");

        const database = client.db('SportsDB');
        const sportsCollection = database.collection('sports');
        const userCollection=client.db('SportsDB').collection('users')
        app.post('/users', async (req, res) => {
            const newUsers = req.body;
            console.log('Adding new Users', newUsers);
            const result = await userCollection.insertOne(newUsers);
            res.send(result);
        });











         app.get('/sports',async(req,res)=>{
            const cursor=sportsCollection.find();
            const result=await cursor.toArray();
            res.send(result);
         })
        app.post('/sports', async (req, res) => {
            const newSports = req.body;
            console.log('Adding new Sports item', newSports);

            const result = await sportsCollection.insertOne(newSports);
            res.send(result);
        });
        app.get('/sports/:id', async (req, res) => {
            console.log("Received request for ID:", req.params.id); 
            const id = req.params.id;
        
            if (!id || id.length !== 24) {
                return res.status(400).json({ error: "Invalid ID format" });
            }
        
            try {
                const query = { _id: new ObjectId(id) };
                const result = await sportsCollection.findOne(query);
                console.log("Query result:", result);
        
                if (!result) {
                    return res.status(404).json({ error: "Item not found" });
                }
        
                res.json(result);
            } catch (error) {
                console.error("Error fetching sports item:", error);
                res.status(500).json({ error: "Internal server error" });
            }
        });
        app.put('/sports/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updatedDoc = {
                $set: req.body
            }

            const result = await sportsCollection.updateOne(filter, updatedDoc, options )

            res.send(result);
        })

        app.delete('/sports/:id',async(req,res)=>{
            console.log("going to delete",req.params.id);
            const id=req.params.id;
            const query={_id:new ObjectId(id)}
            const result=await sportsCollection.deleteOne(query)
            res.send(result)
        })

    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
}

run();
app.get('/', (req, res) => {
  res.send('Hello')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})