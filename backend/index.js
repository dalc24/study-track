require('dotenv').config();
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');

// MongoDB connection URI
const uri = process.env.MONGO_URI;


// express appp
const app = express();
app.use(cors());
// parse JSON body
app.use(express.json()); 

// initialize client
const client = new MongoClient(uri);

async function main() {
    try {
        // connect to MongoDB cluster
        await client.connect();
        console.log('MongoDB connected');
        // get database
        const database = client.db('studytrack');
        // get collections
        const todosCollection = database.collection('todos');
        const notesCollection = database.collection('notes'); 

        // rotes for todos 
        app.get('/todos', async (req, res) => {
            try {
                const todos = await todosCollection.find().toArray();
                res.json(todos);
            } catch (error) {
                res.status(500).send("Internal Server Error");
            }
        });

        app.post('/todos', async (req, res) => {
            const { task, completed } = req.body;
        
            if (!task) {
                return res.status(400).send("Task is required");
            }
        
            const newTodo = { task, completed: completed || false };
        
            try {
                const result = await todosCollection.insertOne(newTodo);
                const insertedTodo = await todosCollection.findOne({ _id: result.insertedId });
                res.status(201).json(insertedTodo);
            } catch (error) {
                console.error("Error adding todo:", error);
                res.status(500).send("Error adding todo");
            }
        });

        app.put('/todos/:id', async (req, res) => {
            const { id } = req.params;
            // get both fields of text
            const { task, completed } = req.body; 
            // holds fields to update
            const updates = {};  
        
            // checkpoint: process the 'completed' field if present
            if (completed !== undefined) {
                if (typeof completed !== 'boolean') {
                    return res.status(400).send("Completed field must be a boolean");
                }
                // add completed fields to updates object
                updates.completed = completed; 
            }

            // checkpoint: process the 'task' field if present
            if (task !== undefined) {
                if (task.trim() === "") {
                    return res.status(400).send("Task cannot be empty");
                }
                // add task field to updates object 
                updates.task = task;  
            }
        
            // checkpoint: check if error
            if (Object.keys(updates).length === 0) {
                return res.status(400).send("Either task or completed must be provided for update");
            }
        
            try {
                // convert id to objectId for mongodb 
                const objectId = new ObjectId(id);
                const result = await todosCollection.updateOne(
                    //update only fields provided
                    { _id: objectId },
                    { $set: updates }
                );
        
                if (result.modifiedCount === 0) {
                    return res.status(404).send("Todo not found");
                }
        
                const updatedTodo = await todosCollection.findOne({ _id: objectId });
                //updates todo 
                res.status(200).json(updatedTodo);
            } catch (error) {
                console.error("Error updating todo:", error);
                res.status(500).send("Error updating todo");
            }
        });
        

        app.delete('/todos/:id', async (req, res) => {
            const { id } = req.params;
            try {
                const result = await todosCollection.deleteOne({ _id: new ObjectId(id) });
                if (result.deletedCount === 0) {
                    return res.status(404).send({ message: "Todo not found" });
                }
                res.status(200).send({ message: "Todo deleted successfully" });
            } catch (error) {
                res.status(500).send({ message: "Internal server error" });
            }
        });

        // routes for notes collection
        app.get('/notes', async (req, res) => {
            try {
                const notes = await notesCollection.find().toArray();
                res.json(notes);
            } catch (error) {
                res.status(500).send("Internal Server Error");
            }
        });
        app.post('/notes', async (req, res) => {
            const { text } = req.body;
        
            if (!text || text.trim() === "") {
                return res.status(400).json({ error: "Text is required" });
            }
        
            const newNote = { text };
        
            try {
                const result = await notesCollection.insertOne(newNote);
                const insertedNote = await notesCollection.findOne({ _id: result.insertedId });
                res.status(201).json(insertedNote);
            } catch (error) {
                console.error("Error adding note:", error);
                res.status(500).json({ error: "Error adding note" });
            }
        });

        app.put('/notes/:id', async (req, res) => {
            const { id } = req.params;
            const { text } = req.body;
        
            if (!text || text.trim() === "") {
                return res.status(400).json({ error: "Text is required" });
            }
        
            try {
                const result = await notesCollection.updateOne(
                    { _id: new ObjectId(id) },
                    { $set: { text } }
                );
        
                if (result.modifiedCount === 0) {
                    return res.status(404).json({ error: "Note not found" });
                }
        
                res.status(200).json({ message: "Note updated" });
            } catch (error) {
                console.error("Error updating note:", error);
                res.status(500).json({ error: "Error updating note" });
            }
        });
        

        app.delete('/notes/:id', async (req, res) => {
            const { id } = req.params;
            try {
                const result = await notesCollection.deleteOne({ _id: new ObjectId(id) });
                if (result.deletedCount === 0) {
                    return res.status(404).send({ message: "Note not found" });
                }
                res.status(200).send({ message: "Note deleted successfully" });
            } catch (error) {
                res.status(500).send({ message: "Internal server error" });
            }
        });

        // start server
        app.listen(5000, () => {
            console.log('Server is running on http://localhost:5000');
        });
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
}

// main funct
main().catch(console.error);
