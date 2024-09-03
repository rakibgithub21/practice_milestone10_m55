const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// Middle Ware
app.use(cors())
app.use(express.json())


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://practice01:vBjkeH9jnxQdgPjO@cluster0.cohmvbf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
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
        // await client.connect();
        const userCollections = client.db('UserDb').collection('users')

        app.get('/users', async (req, res) => {
            const result = await userCollections.find().toArray()
            res.send(result)
        })

        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await userCollections.insertOne(user)
            res.send(result)
            console.log(user);
        })

        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            console.log('please delete', id);
            const query = { _id: new ObjectId(id) }
            const result = await userCollections.deleteOne(query)
            res.send(result)
        })

        
        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('simple crud server is running')
})

app.listen(port, () => {
    console.log(`simple crud is running on port,${port}`);
})