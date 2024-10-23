const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
// const uri = "mongodb+srv://pihkoi:MfrGm39Qj9TO8j5y@cluster0.fnypd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
var uri = "mongodb+srv://user:passwordqwerty@pizzeria.xorjs.mongodb.net/?retryWrites=true&w=majority&appName=Pizzeria" ;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

// Sample pizza menu
const pizzaMenu = [
    { "type": "Pepperoni", "price": "12.90", "description": "Original dough, With sauce, Cheese, Pepperoni", "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMDbvohJ2KYuQP5TT_h3XQhhnr7mPVx2e1AnI0l7EjWV9OnlcStMF2Ar2BksfV8tdRGBc&usqp=CAU" },
    { "type": "Bianca", "price": "10.90", "description": "Original dough, No sauce, Cheese", "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrMuL0UO0MhQV9CPDA-R15yfak1TqP0JkrWcFauigPPY0t88d5WXdmjdYAOli9yRYWiXI&usqp=CAU" },
    { "type": "Mushrooms", "price": "11.90", "description": "Original dough, With sauce, Cheese, Mushrooms", "image": "https://www.shutterstock.com/image-photo/delicious-savory-porcini-mushroom-pizza-260nw-2484910843.jpg" }
];

app.use("/html", express.static('views'));

app.get('/', (req, res) => {
  res.send("Root of the app!");
});

// Read all pizza menus
app.get('/readMenu', (req, res) => {
    readAllPizzas().then(z => res.send(z));
});



// Reset pizza menu (delete all and insert fresh pizza list)
app.get('/reset', (req, res) => {
    console.log(pizzaMenu)
    resetPizzaMenu().then(() => {
        res.status(200).send("Pizza menu has been reset.");
    });
});

// MongoDB Functions for Pizza Operations
async function readAllPizzas() {
    console.log("readAllPizzas started");
    const options = {
        sort: { price: 1 }, // Sort by price
        projection: { _id: 1, type: 1, price: 1, description: 1, image: 1 },
    };
    try {
        let pizzas = [];
        await client.connect();
        const result = client.db("pizzadb").collection("menu").find({}, options);
        for await (const doc of result) {
            pizzas.push(doc);
        }
        return pizzas;
    } catch (e) {
        console.log("Exception:", e);
    } finally {
        await client.close();
    }
}

// Delete one pizza by ID
app.delete('/deleteonepizza/:id', (req, res) => {
    const id = req.params['id'];
    console.log("id= " + id);
    deleteOnePizza(id).then(ok => {
        console.log("After delete ok=" + ok);
        if (ok) {
            readAllPizzas().then(z => { res.status(200).send(z); });
        } else {
            res.status(404).send("Pizza not found!");
        }
    });
});

// Delete one pizza by ID
async function deleteOnePizza(id) {
    console.log("deleteOnePizza started");
    let ok = false;
    try {
        const deleteQuery = { "_id": new ObjectId("" + id) };
        await client.connect();
        ok = await client.db("pizzadb").collection("menu").deleteOne(deleteQuery).then(result => {
            return result.deletedCount == 1;
        });
        console.log("ok=" + ok);
    } catch (e) {
        console.log("Delete Exception:", e);
    } finally {
        await client.close();
    }
    return ok;
}


async function resetPizzaMenu() {
    console.log("resetPizzaMenu started");
    try {
        await client.connect();
        const db = client.db("pizzadb");
        // Clear the existing menu collection
        await db.collection("menu").deleteMany({});
        // Insert the predefined pizza menu
        await db.collection("menu").insertMany(pizzaMenu);
        console.log("Pizza menu reset successful.");
    } catch (e) {
        console.log("Reset Exception:", e);
    } finally {
        await client.close();
    }
}

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});