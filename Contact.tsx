import SQLite from 'react-native-sqlite-storage';
import { IContact } from './types';
SQLite.DEBUG(true);
SQLite.enablePromise(false);


const database_name = "Anarchat.db";
const database_version = "1.0";
const database_displayname = "Anarchat SQLite Database";
const database_size = 200000;
let db;

class Contact {
  db;

  constructor() {
    this.db = SQLite.openDatabase(database_name, database_version, database_displayname, database_size,
      () => {
        console.log("DB OPEN: " + JSON.stringify(this.db));
        this.db.executeSql('CREATE TABLE IF NOT EXISTS Contact( '
        // this.db.executeSql('CREATE OR REPLACE TABLE Contact( '
        + '_id VARCHAR(45) PRIMARY KEY NOT NULL,' 
        + ' publicKey TEXT NOT NULL,'
        + ' name VARCHAR(45) NOT NULL);', 
        (error) => { console.log(error),
        () => {
          console.log("CONTACT TABLE IS CREATED!");
        }});
      },
      (err) => { console.log("ERROR OPENING DB: ", err) });


  }

  errorCB = (err) => {
    console.log("error: ",err);
    return false;
  };

  addRow(id, publicKey, name) {
    console.log("ADDING ID: " + id);
    console.log("ADDING PUBKEY: " + publicKey);
    console.log("ADDING NAME: " + name);
    this.db.executeSql('INSERT INTO Contact (_id, publicKey, name) ' 
    + `VALUES ('${id}', '${publicKey}', '${name}')`, [],
    () => {});
  }

  deleteRow(id) {
    console.log("DELETING ID: " + id);
    this.db.executeSql(`DELETE FROM Contact WHERE _id = '${id}'`, [],
    () => {});
  }

  getRows(): Promise<IContact[]> {
    return new Promise<IContact[]>( (resolve, reject ) => {
          console.log("Database is ready ... executing query ...");
          this.db.transaction(async (tx) => {
            await tx.executeSql(`SELECT * FROM Contact`, [],
            (tx,results) => {
              console.log("Query completed: " + JSON.stringify(results));
              resolve(results.rows)
          }, (error) => {
            console.log(error);
            reject(error);
          });
          },
          (error) => {
            console.log(error);
            reject(error);
          },
          () => {
              console.log("Processing completed");
          });
      }
    )
  }

  closeDatabase = () => {
    if (db) {
        console.log("Closing database ...");
        () => { console.log("Database closed.") };
    } else {
        console.log("Database was not OPENED");
    }
};
}


export default new Contact();