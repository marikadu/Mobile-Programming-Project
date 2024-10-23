const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// This middleware is available in Express v4.16.0 onwards
app.use(express.urlencoded({extended: true}));
app.use(express.json());

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



// ADDRESS PART

// sample address list
const newAddress = [
    {addressLine1: 'Visamaentie 35', addressLine2: 'A 999', city: 'Hameenlinna', postcode: '12345'},
    {addressLine1: 'HAMK UNI 66', addressLine2: 'S 456', city: 'Vantaa', postcode: '145'},
    {addressLine1: 'Helsingintie 35', addressLine2: 'G 606', city: 'Tampere', postcode: '13245'},
    {addressLine1: 'Bruhh 35', addressLine2: 'A 444', city: 'Vienna', postcode: '09994'}
];

app.get('/addresses', (req, res) => {
    res.send("Pepperoni Pals Addresses!");
  });

// CREATE NEW ADDRESS

//Adding one address into Mongo database
app.post('/addoneaddress', (req, res) => {
    console.log("Address Added");
    let address=req.body;
    addOneAddress(address).then(()=>readAllAddresses().then(z=>res.send(z)));
});



async function addOneAddress(address) {
    console.log("addOneAddress started");
    try {
      // Connect the client to the server (optional starting in v4.7)
      await client.connect();
      await client.db("pizzadb").collection("address").insertOne(address);
    }
    catch(e){
        console.log("Lisäyspoikkeus");
    } 
    //finally is run ALWAYS - even if there is a return before
    finally {
      await client.close();
    }
}



// Read all Addresses from address table
app.get('/readAllAddresses', (req, res) => {
    readAllAddresses().then(z => res.send(z));
});



// Reset address list (delete all and insert fresh address list)
app.get('/addressreset', (req, res) => {
    console.log(newAddress)
    resetAddressList().then(() => {
        res.status(200).send("Pizza menu has been reset.");
    });
});

// MongoDB Functions for Address Operations
async function readAllAddresses() {
    console.log("readAllAddresses started");
    // const options = {
    //     sort: { price: 1 }, // Sort by price
    //     projection: { _id: 1, type: 1, price: 1, description: 1, image: 1 },
    // };
    try {
        let adresses = [];
        await client.connect();
        const result = client.db("pizzadb").collection("address").find({});
        for await (const doc of result) {
            adresses.push(doc);
        }
        return adresses;
    } catch (e) {
        console.log("Exception:", e);
    } finally {
        await client.close();
    }
}


// UPDATE
 //Updating an address in Mongo database
 app.put('/updateoneaddress', (req, res) => {
    console.log("Address updated");
    let address=req.body;
    updateOneAddress(address).then(()=>readAllAddresses().then(z=>res.send(z)));
});


async function updateOneAddress(address) {
    console.log("updateOneAddress started");
    console.log("Address id="+address._id);
    try {
        var filter = {"_id": new ObjectId(""+address._id)};
        // var update={ $set: {breed: fish.breed, weight: fish.weight, length: fish.length } };
        var update={ $set: {addressLine1: address.addressLine1, addressLine2: address.addressLine2, city: address.city, postcode: address.postcode} };
        //  {addressLine1: 'HAMK UNI 66', addressLine2: 'S 456', city: 'Vantaa', postcode: '145'},
      // Connect the client to the server (optional starting in v4.7)
        await client.connect();
        await client.db("pizzadb").collection("address").updateOne(filter,update);
    }
    catch(e){
        console.log("Päivityspoikkeus");
    } 
    //finally is run ALWAYS - even if there is a return before
    finally {
      await client.close();
    }
}

// Delete one address by ID
app.delete('/deleteoneaddress/:id', (req, res) => {
    const id = req.params['id'];
    console.log("id= " + id);
    deleteOneAddress(id).then(ok => {
        console.log("After delete ok=" + ok);
        if (ok) {
            readAllAddresses().then(z => { res.status(200).send(z); });
        } else {
            res.status(404).send("Address not found!");
        }
    });
});

// Delete one address by ID
async function deleteOneAddress(id) {
    console.log("deleteOneAddress started");
    let ok = false;
    try {
        const deleteQuery = { "_id": new ObjectId("" + id) };
        await client.connect();
        ok = await client.db("pizzadb").collection("address").deleteOne(deleteQuery).then(result => {
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


async function resetAddressList() {
    console.log("resetAddress started");
    try {
        await client.connect();
        const db = client.db("pizzadb");
        // Clear the existing address collection
        await db.collection("address").deleteMany({});
        // Insert the predefined address List
        await db.collection("address").insertMany(newAddress);
        console.log("Address List reset successful.");
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