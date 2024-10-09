import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = "PizzaOrders.db";
const database_version = "1.0";
const database_displayname = "Pizza Orders Database";
const database_size = 200000;

var db;

export const getDBConnection = async () => {
    if (!db) {
        db = await SQLite.openDatabase(
            database_name,
            database_version,
            database_displayname,
            database_size
        );
    }
    return db;
};

export const createTables = async () => {
    const db = await getDBConnection(); // Ensure you get the db connection

    return new Promise((resolve, reject) => {
        // Create tables for storing pizza orders and toppings
        db.transaction((tx) => {
            tx.executeSql(
                // Drop existing tables when the app is restarted
                `DROP TABLE IF EXISTS pizza_orders;`,
                [],
                () => {
                    console.log(`Table pizza_orders dropped!`);

                    // Create the pizza_orders table
                    tx.executeSql(
                        `CREATE TABLE IF NOT EXISTS pizza_orders (
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            dough TEXT,
                            sauce TEXT,
                            cheese INTEGER,
                            tomato INTEGER,
                            basil INTEGER,
                            pepperoni INTEGER,
                            mushrooms INTEGER,
                            size TEXT,
                            order_date TEXT
                        )`,
                        [],
                        () => console.log('Table pizza_orders created!'),
                        (_, error) => console.log('Error creating table', error)
                    );
                },
                (_, error) => console.log('Error dropping table', error)
            );
        });
    });
};

// Save order to SQLite
export const saveOrder = async (order) => {
    const db = await getDBConnection();
    const { dough, sauce, size, toppings } = order; // Ensure you use the correct key here
    const orderDate = new Date().toISOString(); // Automatically set the current date

    return new Promise((resolve, reject) => {
        db.transaction(async tx => {
            // Insert the order first
            tx.executeSql(
                `INSERT INTO pizza_orders 
                    (dough, sauce, cheese, tomato, basil, pepperoni, mushrooms, size, order_date) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`,
                [
                    dough,
                    sauce,
                    toppings.cheese ? 1 : 0,  // Convert to integer (1 or 0)
                    toppings.tomato ? 1 : 0,
                    toppings.basil ? 1 : 0,
                    toppings.pepperoni ? 1 : 0,
                    toppings.mushrooms ? 1 : 0,
                    size,
                    orderDate
                ], 
                async (_, result) => {
                    const orderId = result.insertId;
                    resolve(result);
                },
                (_, error) => reject(error)
            );
        });
    });
};

// Fetch all orders (for viewing previous orders)
export const fetchOrdersWithToppings = async () => {
    const db = await getDBConnection();

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                // Select everything from the pizza_orders table
                `SELECT id, dough, sauce, cheese, tomato, basil, pepperoni, mushrooms, size, order_date 
                 FROM pizza_orders;`,
                [],
                (_, result) => {
                    const orders = [];
                    for (let i = 0; i < result.rows.length; i++) {
                        const row = result.rows.item(i);
                        
                        // Map the topping flags into a human-readable list
                        const toppings = [];
                        if (row.cheese) toppings.push('Cheese');
                        if (row.tomato) toppings.push('Tomato');
                        if (row.basil) toppings.push('Basil');
                        if (row.pepperoni) toppings.push('Pepperoni');
                        if (row.mushrooms) toppings.push('Mushrooms');

                        const order = {
                            id: row.id,
                            dough: row.dough,
                            sauce: row.sauce,
                            size: row.size,
                            order_date: row.order_date,
                            toppings: toppings // Add the toppings list
                        };

                        orders.push(order); // Add the order to the array
                    }
                    resolve(orders); // Resolve with the orders array
                },
                (_, error) => {
                    reject(error); // Handle any error that occurs during the query
                }
            );
        });
    });
};