const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
app.use(cors());
app.use(express.json());



// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.p2sr91x.mongodb.net/?retryWrites=true&w=majority`;

const uri = "mongodb+srv://dbUser1:XKcorDR8Qb80Kfed@cluster0.p2sr91x.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const ageCollection = client.db('simpleNode').collection('ageCollections');
        const orderCollection = client.db('simpleNode').collection('order');

        app.get('/ages', async (req, res) => {
            const query = {};
            const ages = await ageCollection.find(query).toArray();
            res.send(ages);
        })

        app.put('/order/:phone', async (req, res) => {
            const phone = req.params.phone;
            const order = req.body;
            const filter = { phone: phone };
            const options = { upsert: true };
            const updateDoc = {
                $set: order
            }
            const result = await orderCollection.updateOne(filter, updateDoc, options);

            res.send({ result });
        });


    }
    finally {

    }
}
run().catch(err => console.log(err));


app.get('/', (req, res) => {
    res.send('simple node server running')
});



app.listen(port, () => {
    console.log(`simple node server running on port ${port}`)
})

//userName:- dbUser1
//password:- XKcorDR8Qb80Kfed