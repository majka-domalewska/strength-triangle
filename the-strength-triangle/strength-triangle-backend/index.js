const express = require('express');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

// MongoDB URI from environment variable
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

app.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    try {
        await client.connect();
        const database = client.db('strength_triangle');
        const usersCollection = database.collection('users');
        
        const result = await usersCollection.insertOne({ email, password });
        res.status(200).json({ success: result.acknowledged });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    } finally {
        await client.close();
    }
});

const result = await response.json();
console.log(result);  // Logs the server response


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
