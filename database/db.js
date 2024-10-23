import React from 'react';

import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'pizza.db'}); // Database Name
var tableName = 'pizza';
var tableAddress = 'address';

// Predefined pizza samples (RETRIEVE LATER FROM MONGODB)
const pizzaList = [
  {dough: 'Original', sauce: "Tomato", toppings: ['Cheese', "tomatoes"], size: "Small"},
  {dough: 'Gluten-Free', sauce: "Tomato", toppings: ['Cheese', "Basil"], size: "Medium"},
  {dough: 'Whole-wheat', sauce: "Chili", toppings: ['Cheese', "tomatoes"], size: "Small"},
  {dough: 'Gluten-Free ', sauce: "Tomato", toppings: ['Cheese', "Mushrooms"], size: "Large"},
  {dough: 'Original', sauce: "Tomato", toppings: ['Cheese', "tomatoes", "Pepperoni"], size: "Small"},

];
// let samplePizza = {dough: 'Original', sauce: "Tomato", toppings: ['Cheese', "tomatoes"], size: "Small"};

// const pizza = {dough: 'Original', sauce: "Tomato", toppings: ['Cheese', "tomatoes"], size: "Small"};


//method returns a Promise - in the calling side .then(...).then(...)....catch(...) can be used

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      // Create table if it doesn't exist
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS ${tableName} 
        (id INTEGER PRIMARY KEY NOT NULL,
        dough TEXT NOT NULL,
        sauce TEXT NOT NULL,
        toppings TEXT NOT NULL,
        size TEXT NOT NULL);`,
        [],
        () => {
          // Delete all existing rows to empty the table
          tx.executeSql(
            `DELETE FROM ${tableName};`,
            [],
            () => {
              console.log('Table emptied successfully.');

              // Check if the table is empty and insert sample data if needed
              tx.executeSql(
                `SELECT COUNT(*) AS count FROM ${tableName}`,
                [],
                (tx, result) => {
                  if (result.rows.item(0).count === 0) {
                    // Insert predefined pizza if the table is empty
                    pizzaList.forEach(pizza => {
                      tx.executeSql(
                        `INSERT INTO ${tableName} (dough, sauce, toppings, size) VALUES (?, ?, ?, ?);`,
                        [pizza.dough, pizza.sauce, JSON.stringify(pizza.toppings), pizza.size], // Store toppings as JSON string
                      );
                    });
                    console.log('Sample data inserted successfully.');
                  }
                  resolve();
                },
                (_, err) => {
                  console.log('Error counting rows:', err);
                  reject(err);
                }
              );
            },
            (_, err) => {
              console.log('Error deleting data:', err);
              reject(err);
            }
          );
        },
        (_, err) => {
          console.log('Error creating table:', err);
          reject(err);
        }
      );

      // TABLE FOR ADDRESS
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS ${tableAddress} 
        (id INTEGER PRIMARY KEY NOT NULL,
        addressLine1 TEXT NOT NULL,
        addressLine2 TEXT NOT NULL,
        city TEXT NOT NULL,
        postcode TEXT NOT NULL);`,
        [],
        () => {
          // Delete all existing rows to empty the table (for debugging purposes)
          tx.executeSql(
            `DELETE FROM ${tableAddress};`,
            [],
            () => {
              console.log('Table emptied successfully.');
            },
            (_, err) => {
              console.log('Error deleting data:', err);
              reject(err);
            }
          );
        },
        (_, err) => {
          console.log('Error creating table:', err);
          reject(err);
        }
      );
    });
  });
  return promise;
};

// FUNCTIONS FOR PIZZA:

export const addPizza = pizza => {
  console.log(pizza);
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      //Here we use the Prepared statement, just putting placeholders to the values to be inserted
      tx.executeSql(
        'insert into ' + tableName + '(dough, sauce, toppings, size) VALUES (?, ?, ?, ?);',
        //And the values come here
        [pizza.dough, pizza.sauce, JSON.stringify(pizza.toppings), pizza.size], 
        //If the transaction succeeds, this is called
        () => {
          resolve();
        },
        //If the transaction fails, this is called
        (_, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};

export const updatePizza = (id, dough, sauce, toppings, size) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      //Here we use the Prepared statement, just putting placeholders to the values to be inserted
      tx.executeSql(
        'update ' + tableName + ' set dough=?, sauce=?, toppings=?, size=? where id=?;',
        //And the values come here
        [dough, sauce, JSON.stringify(toppings), size, id],
        //If the transaction succeeds, this is called
        () => {
          resolve();
        },
        //If the transaction fails, this is called
        (_, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};

export const deletePizza = id => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      //Here we use the Prepared statement, just putting placeholders to the values to be inserted
      tx.executeSql(
        'delete from ' + tableName + ' where id=?;',
        //And the values come here
        [id],
        //If the transaction succeeds, this is called
        () => {
          resolve();
          console.log('DELETED SUCCESSFULLY ', id); // DEBUGGING
        },
        //If the transaction fails, this is called
        (_, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};

export const fetchAllPizza = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      //Here we select all from the table pizza
      tx.executeSql(
        'select * from ' + tableName,
        [],
        (tx, result) => {
          let items = []; //Create a new empty Javascript array
          //And add all the items of the result (database rows/records) into that table
          for (let i = 0; i < result.rows.length; i++) {
            const row = result.rows.item(i);

            items.push({...row, toppings: (JSON.parse(row.toppings))}); // Convert/ Parse toppings from a JSON string to an array
          }

          // items.forEach((item, index) => {
          //   console.log('FETCHED FROM DATABASE '+ index + ' ', item); //For debugging purposes to see the data in console window
            
          // });
          resolve(items); //The data the Promise will have when returned
        },
        (tx, err) => {
          console.log('Err');
          console.log(err);
          reject(err);
        },
      );
    });
  });
  return promise;
};

// FUNCTIONS FOR ADDRESS:

export const addAddress = address => {
  console.log(address);
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      //Here we use the Prepared statement, just putting placeholders to the values to be inserted
      tx.executeSql(
        'insert into ' + tableAddress + '(addressLine1, addressLine2, city, postcode) VALUES (?, ?, ?, ?);',
        //And the values come here
        [address.addressLine1, address.addressLine2, address.city, address.postcode], 
        //If the transaction succeeds, this is called
        () => {
          resolve();
        },
        //If the transaction fails, error is called
        (_, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};

export const updateAddress = (id, addressLine1, addressLine2, city, postcode) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      //Here we use the Prepared statement, just putting placeholders to the values to be inserted
      tx.executeSql(
        'update ' + tableAddress + ' set addressLine1=?, addressLine2=?, city=?, postcode=? where id=?;',
        //And the values come here
        [addressLine1, addressLine2, city, postcode, id],
        //If the transaction succeeds, this is called
        () => {
          resolve();
        },
        //If the transaction fails, error is called
        (_, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};

export const deleteAddress = id => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      //Here we use the Prepared statement, just putting placeholders to the values to be inserted
      tx.executeSql(
        'delete from ' + tableAddress + ' where id=?;',
        //And the values come here
        [id],
        //If the transaction succeeds, this is called
        () => {
          resolve();
          console.log('DELETED SUCCESSFULLY ', id); // DEBUGGING
        },
        //If the transaction fails, this is called
        (_, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};

export const fetchAllAddress = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      //Here we select all from the table pizza
      tx.executeSql(
        'select * from ' + tableAddress,
        [],
        (tx, result) => {
          let items = []; //Create a new empty Javascript array
          //And add all the items of the result (database rows/records) into that table
          for (let i = 0; i < result.rows.length; i++) {
            items.push(result.rows.item(i)); // Convert/ Parse toppings from a JSON string to an array
            console.log(result.rows.item(i));//For debugging purposes to see the data in console window
          }
          resolve(items); //The data the Promise will have when returned
        },
        (tx, err) => {
          console.log('Err');
          console.log(err);
          reject(err);
        },
      );
    });
  });
  return promise;
};