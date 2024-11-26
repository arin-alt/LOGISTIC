import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb+srv://gupitmarinel27:rRK0stII4gLDH5TR@cluster0.tqyhw.mongodb.net/ClusterO?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

async function connectToDatabase() {
    try {
        await client.connect();
        console.log("Connected to MongoDB!");
        return client.db("ClusterO"); // Replace with your database name
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        throw error;
    }
}

export { connectToDatabase };
