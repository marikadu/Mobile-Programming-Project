import React from 'react';

import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'pizza.db'}); // Database Name
var tableName = 'pizza';

// Predefined pizza samples (RETRIEVE LATER FROM MONGODB)
// const samplePizza = [
//   {dough: 'Original', sauce: "Tomato", toppings: ['Cheese', "tomatoes"], size: "Small"},
//   {dough: 'Gluten-Free', sauce: "Tomato", toppings: ['Cheese', "Basil"], size: "Medium"},
//   {dough: 'Whole-wheat', sauce: "Chili", toppings: ['Cheese', "tomatoes"], size: "Small"},
//   {dough: 'Gluten-Free ', sauce: "Tomato", toppings: ['Cheese', "Mushrooms"], size: "Large"},
//   {dough: 'Original', sauce: "Tomato", toppings: ['Cheese', "tomatoes", "Pepperoni"], size: "Small"},

// ];
let samplePizza = {dough: 'Original', sauce: "Tomato", toppings: ['Cheese', "tomatoes"], size: "Small"};

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
                    samplePizza.forEach(pizza => {
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
    });
  });
  return promise;
};

// export const init = () => {
//   const promise = new Promise((resolve, reject) => {
//     db.transaction(tx => {
//       // Create table if not exists
//       tx.executeSql(
//         `CREATE TABLE IF NOT EXISTS ${tableName} 
//         (id INTEGER PRIMARY KEY NOT NULL,
//         dough TEXT NOT NULL,
//         sauce TEXT NOT NULL,
//         toppings TEXT NOT NULL,
//         size TEXT NOT NULL);`,
//         [],
//         () => {
//           // Insert predefined pizza only if the table is empty (Most likely from MONGODB)
//           tx.executeSql(
//             `SELECT COUNT(*) AS count FROM ${tableName}`,
//             [],
//             (tx, result) => {
//               if (result.rows.item(0).count === 0) {
//                 // Insert predefined pizza
//                 samplePizza.forEach(pizza => {
//                   tx.executeSql(
//                     `INSERT INTO ${tableName} (dough, sauce, toppings, size) VALUES (?, ?, ?, ?)`,
//                     [pizza.dough, pizza.sauce, JSON.stringify(pizza.toppings), pizza.size],  // Store toppings as JSON string
//                   );
//                 });
//               }
//               resolve();
//             },
//           );
//         },
//         (_, err) => {
//           reject(err);
//         },
//       );
//     });
//   });
//   return promise;
// };

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
            // items.push(result.rows.item(i)); //The form of an item is {dough: 'Original', sauce: "Tomato", toppings: ['Cheese', "tomatoes"], size: "Small"},
            // console.log(result.rows.item(i)); //For debugging purposes to see the data in console window
            const row = result.rows.item(i);

            items.push({...row, toppings: (JSON.parse(row.toppings))}); // Convert/ Parse toppings from a JSON string to an array
          }

          items.forEach((item, index) => {
            console.log('FETCHED FROM DATABASE '+ index + ' ', item); //For debugging purposes to see the data in console window
            
          });

          // console.log('FETCHED FROM DATABASE', items); //For debugging purposes to see the data in console window
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