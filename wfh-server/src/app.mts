import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const URI = "mongodb://localhost";

async function connectToMongoDB(connectionString: string){
    await mongoose.connect(connectionString);
    console.log('Connected to MongoDB.');
}

try {
    await connectToMongoDB(URI);
} catch (error) {
    console.log("Error connecting to DB: ", error);
}

const PORT = 8000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(cookieParser());

app.get('/', (req,res) => {
    res.status(200).send('Hello, world!');
});

app.listen(PORT, ()=>{
    console.log(`App is listening on port ${PORT}`);
})