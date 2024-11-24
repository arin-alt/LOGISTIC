"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = connectToDatabase;
const mongodb_1 = require("mongodb");
const uri = process.env.MONGODB_URI || "mongodb+srv://gupitmarinel27:rRK0stII4gLDH5TR@cluster0.tqyhw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new mongodb_1.MongoClient(uri);
function connectToDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            console.log("Connected to MongoDB!");
            return client.db("ClusterO"); // Replace with your database name
        }
        catch (error) {
            console.error("MongoDB connection failed:", error);
            throw error;
        }
    });
}
