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

    const promise = new Promise((resolve, reject) => {
    // Create a table for storing pizza orders
        db.transaction((tx) => {
            tx.executeSql(
                // Drop the table when app is restarted
                `drop table if exists pizza_orders;`,
                [],
                () => {
                    console.log(`Table pizza_orders dropped!`);

                    // Create the table again after dropping
                    tx.executeSql(
                        `CREATE TABLE IF NOT EXISTS pizza_orders (
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            sauce TEXT,
                            toppings TEXT,
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
    return promise;
};

// Save order to SQLite
export const saveOrder = (order) => {
    const { sauce, toppings, size } = order;
    const orderDate = new Date().toISOString(); // Automatically set the current date

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO pizza_orders (sauce, toppings, size, order_date) VALUES (?, ?, ?, ?);',
                [sauce, JSON.stringify(toppings), size, orderDate], // Store toppings as JSON string
                (_, result) => resolve(result),
                (_, error) => reject(error)
            );
        });
    });
};

// Fetch all orders (for viewing previous orders)
export const fetchOrders = () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM pizza_orders;',
                [],
                (_, result) => resolve(result.rows._array),
                (_, error) => reject(error)
            );
        });
    });
};