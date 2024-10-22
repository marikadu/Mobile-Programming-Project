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

// Delete one pizza by ID
app.delete('/deleteonepizza/:id', (req, res) => {
    const id = req.params['id'];
    console.log("id=" + id);
    deleteOnePizza(id).then(ok => {
        console.log("After delete ok=" + ok);
        if (ok) {
            readAllPizzas().then(z => { res.status(200).send(z); });
        } else {
            res.status(404).send("Pizza not found!");
        }
    });
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

// async function deleteOnePizza(id) {
//     console.log("deleteOnePizza started");
//     let ok = false;
//     try {
//         const deleteQuery = { "_id": new ObjectId("" + id) };
//         await client.connect();
//         ok = await client.db("pizzadb").collection("menu").deleteOne(deleteQuery).then(result => {
//             return result.deletedCount == 1;
//         });
//         console.log("ok=" + ok);
//     } catch (e) {
//         console.log("Delete Exception:", e);
//     } finally {
//         await client.close();
//     }
//     return ok;
// }

async function deleteOnePizza(id) {
    console.log("deleteOnePizza started");
    let ok = false;
    try {
        var deletequery = { "_id": new ObjectId("" + id) }; // Convert to ObjectId
        // Connect the client to the server (optional starting in v4.7)
        await client.connect();
        ok = await client.db("pizzadb").collection("pizza").deleteOne(deletequery)
            .then(result => {
                return result.deletedCount == 1;
            });
        console.log("ok=" + ok);
    } catch (e) {
        console.log("Deletion error: ", e);
    } 
    finally {
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


// const path = require(`path`);
//     const express = require('express');
//     const app = express();
    
//     //All the incoming JSON literals are converted to Javascript objects automatically 
//     //when the content type of the sent data is application/json
//     //And all the returned (res.send(object);) Javascript objects are converted to JSON literals
//     const bodyParser = require('body-parser');
//     app.use(bodyParser.json());
//     app.use(bodyParser.urlencoded({ extended: true }));
    
//     // This middleware is available in Express v4.16.0 onwards
//     app.use(express.urlencoded({extended: true}));
    
    
//     // var MongoClient = require('mongodb').MongoClient;
//     const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
//     // var url = "mongodb://localhost:27017/";
//     // var uri="mongodb+srv://pihkoi:cbhEMFuY3F1AH0uo@mongo2024.loyn74k.mongodb.net/?retryWrites=false&w=majority&appName=mongo2024";
//     var uri="mongodb+srv://pihkoi:MfrGm39Qj9TO8j5y@cluster0.fnypd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

//     const client = new MongoClient(uri,  {
//         serverApi: {
//             version: ServerApiVersion.v1,
//             strict: true,
//             deprecationErrors: true,
//         }
//     }
//     );
    
//     //URI to static files in folder 'views' is 'html'
//     //e.g. http://some.server.sw/html/form.html points to file form.html in views folder
//     app.use("/html", express.static('views'));
    
//     //Responding by "Root of the app!" - this is the root of the app
//     app.get('/', (req, res) => {
//       res.send("Root of the app!");
//     });
    
//     //Responding by hello text - actually for debugging
//     app.get('/sayHello', (req, res) => {
//       res.send("Hello from the Pepperoni Pals Team!");
//     });
    
//     //Responding by opening file /views/form.html
//     app.get('/submit', (req, res) => {
//       res.sendFile(path.join(__dirname, '/views/form.html'));
//     });
    
//     //Responding by returnig the data added into html form. Here name and message should
//     //be the names of the html form fields
//     app.post('/submit', (req, res) => {
//         console.log({
//           name: req.body.name,
//           message: req.body.message,
//         });
//         res.send('Thanks for your message!'+req.body.name+" "+req.body.message);
//     });
    
//     //This is debugging function
//     //A JSON string is sent from an html form and sent by AJAX as JSON string
//     //This method returns the modified object
//     app.post('/addfish', (req, res) => {
//         console.log("Tadaa");
//         let fish=req.body;
//         fish.breed="Muokattu "+fish.breed;
//         fish.weight=8900;
//         fish.length=120;
//         console.log({
//           name: req.body
//         });
//         res.send(fish);
//     });
//     //Adding a fish into Mongo database
//     app.post('/addonefish', (req, res) => {
//         console.log("Tadaa");
//         let fish=req.body;
//         addOneFish(fish).then(()=>readall().then(z=>res.send(z)));
//     });
//     //Updating a fish in Mongo database
//     app.put('/updateonefish', (req, res) => {
//         console.log("Tadaa update");
//         let fish=req.body;
//         updateOneFish(fish).then(()=>readall().then(z=>res.send(z)));
//     });
    
//     //Get the first one from the table (collection)
//     app.get('/getfirstfish', (req, res) => {
//         readfirst().then(z=>res.send(z));
//     });
//     app.get('/getonefish/:id', (req, res) => {
//         readone(req.params['id']).then(z=>res.send(z));
//     });
    
//     //Get the all fish from the table (collection)
//     app.get('/getallfish', (req, res) => {
//         readall().then(z=>res.send(z));
//     });
    
//     //delete one fish
//     app.delete('/deleteonefish/:id', (req, res) => {
//         const id=req.params['id'];
//         console.log("id="+id);
//         deleteOneFish(id).then(ok=>
//             {
//                 console.log("deleten jälkeen ok="+ok);
//                 if (ok){
//                     readall().then(z=>{res.status(200).send(z);});
//                 }
//                 else{
//                     res.status(313).send("Ei poistettavaa!");
//                 }
//             }
//         );
//         console.log("deleted");
//     });
    
    
//     async function addOneFish(fish) {
//         console.log("addOneFish started");
//         try {
//           // Connect the client to the server (optional starting in v4.7)
//           await client.connect();
//           await client.db("fishdb").collection("fish").insertOne(fish);
//         }
//         catch(e){
//             console.log("Lisäyspoikkeus");
//         } 
//         //finally is run ALWAYS - even if there is a return before
//         finally {
//           await client.close();
//         }
//     }
//     async function updateOneFish(fish) {
//         console.log("updateOneFish started");
//         console.log("Fish id="+fish._id);
//         try {
//             var filter = {"_id": new ObjectId(""+fish._id)};
//             var update={ $set: {breed: fish.breed, weight: fish.weight, length: fish.length } };
//           // Connect the client to the server (optional starting in v4.7)
//             await client.connect();
//             await client.db("fishdb").collection("fish").updateOne(filter,update);
//         }
//         catch(e){
//             console.log("Päivityspoikkeus");
//         } 
//         //finally is run ALWAYS - even if there is a return before
//         finally {
//           await client.close();
//         }
//     }
//     async function readfirst() {
//         console.log("readfirst started");
//         try {
//           // Connect the client to the server (optional starting in v4.7)
//           await client.connect();
//           // Send a ping to confirm a successful connection
//           await client.db("fishdb").command({ ping: 1 });
//           console.log("Ping succeeded");
//           //Read all fish, but return the first only
//           result=await client.db("fishdb").collection("fish").findOne({});
//           return result;
//         }
//         catch(e){
//             console.log("Poikkeus");
//         } 
//         //finally is run ALWAYS - even if there is a return before
//         finally {
//           await client.close();
//         }
//     }
//     async function readone(id) {
//         console.log("readone started");
//         try {
//             // Connect the client to the server (optional starting in v4.7)
//             await client.connect();
//             // Send a ping to confirm a successful connection
//             await client.db("fishdb").command({ ping: 1 });
//             console.log("Ping succeeded");
//             //Read all fish, but return the first only
//             result=await client.db("fishdb").collection("fish").findOne({"_id":new ObjectId(""+id)});
//             console.log(result._id);
//             console.log(result.breed);
//             console.log(result.weight);
//             console.log(result.length);
//             return result;
//         }
//         catch(e){
//             console.log("Poikkeus");
//         } 
//         //finally is run ALWAYS - even if there is a return before
//         finally {
//           await client.close();
//         }
//     }
//     async function readall() {
//         console.log("readall started");
//         const options = {
//             // Sort returned documents in ascending order by weight
//             sort: { weight: 1 },
//             // Include all the fields into the result
//             projection: { _id: 1, breed: 1, weight: 1, length:1},
//           };    
//         try {
//         let arr=new Array();
//           await client.connect();
//           result=client.db("fishdb").collection("fish").find({}, options);
//         //   result=client.db("fishdb").collection("fish").find({}); //the same as with options above
//           for await (const doc of result) {
//             console.log(doc._id);//Debugging
//             arr.push(doc);
//           }
//           return arr;
//         }
//         catch(e){
//             console.log("Poikkeus");
//         } 
//         //finally is run ALWAYS - even if there is a return before
//         finally {
//           // Ensures that the client will close when you finish/error
//           await client.close();
//         }
//     }
//     async function deleteOneFish(id) {
//         console.log("deleteOneFish started");
//         let ok=false;
//         try {
//           var deletequery = {"_id": new ObjectId(""+id)};
//           // Connect the client to the server (optional starting in v4.7)
//           await client.connect();
//           ok=await client.db("fishdb").collection("fish").deleteOne(deletequery).
//           then(result=>{
//             return result.deletedCount==1;
//           });
//           console.log("ok="+ok);
//         }
//         catch(e){
//             console.log("Poistopoikkeus");
//         } 
//         //finally is run ALWAYS - even if there is a return before
//         finally {
//           await client.close();
//         }
//         console.log("deleteOneFish ended");
//         console.log("lopussa ok="+ok);
//         return ok;
//     }
    
//     // Listen to the App Engine-specified port, or 8080 otherwise
//     const PORT = process.env.PORT || 8080;
//     app.listen(PORT, () => {
//       console.log(`Server listening on port ${PORT}...`);
//     });    
