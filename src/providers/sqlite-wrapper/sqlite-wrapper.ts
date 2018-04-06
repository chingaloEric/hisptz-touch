import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {SQLite, SQLiteObject,SQLiteDatabaseConfig} from '@ionic-native/sqlite';
import { Platform } from 'ionic-angular';

declare var sqlite3:any;

Object.defineProperty(Array.prototype, 'item', {
  enumerable: false,
  value: function(n) { return this[n]; }
});
export class SQLiteWrapperObject extends SQLiteObject {
  db: any;
  constructor(db: any){
    super(db)
    this.db = db;
  }
  databaseFeatures: {
    isSQLitePluginDatabase: boolean;
  };
  openDBs: any;
  executeSql(statement: string, params: any): Promise<any>{
    return new Promise<any>((resolve, reject) => {
      this.db.all(statement,params,(err,rows)=>{
        if(err){
          reject(err);
        }else{
          resolve({rows:rows});
        }
      });
    })
  }
  transaction(fn: any): Promise<any>{
    return new Promise<any>((resolve, reject) => {

    })
  }
  sqlBatch(sqlStatements: Array<string | string[] | any>): Promise<any>{
    //TODO add transaction
    let convertedStatements = "BEGIN TRANSACTION;";
    sqlStatements.forEach((statement)=>{
      let split = statement[0].split("?");
      split.forEach((part,index)=>{
        convertedStatements += part;
        if(index < split.length - 1)
          if(statement[1][index] == undefined)
          {
            convertedStatements += "'{}'";
          }else if(typeof statement[1][index] == 'string')
          {
            convertedStatements += "'" + statement[1][index].split("'").join("''") +"'";
          }else if(typeof statement[1][index] == 'boolean')
          {
            let value = '1';
            if(!statement[1][index])
              value = '0';
            convertedStatements += value;
          }else{
            convertedStatements += statement[1][index];
          }
      });
    })
    convertedStatements += "COMMIT;";
    return new Promise<any>((resolve, reject) => {
      this.db.exec(convertedStatements,(err,rows)=>{
        if(err){
          console.error(err,sqlStatements,convertedStatements);
          this.db.run("ROLLBACK");
          reject(err);
        }else{
          resolve({rows:rows});
        }
      });
    })
  }
}
/*
  Generated class for the SqliteWrapperProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SqliteWrapperProvider {
  isApp;
  constructor(private sqlite: SQLite,public platform: Platform) {
    if(this.platform.is('core') || this.platform.is('mobileweb')) {
      this.isApp = false;
    } else {
      this.isApp = true;
    }
  }

  /**
   * Open or create a SQLite database file.
   *
   * See the plugin docs for an explanation of all options: https://github.com/litehelpers/Cordova-sqlite-storage#opening-a-database
   *
   * @param config {SQLiteDatabaseConfig} database configuration
   * @return Promise<SQLiteObject>
   */
  db
  create(config: SQLiteDatabaseConfig): Promise<SQLiteObject>{
    if(this.isApp){
      return this.sqlite.create(config);
    }else{
      if(!this.db){
        this.db = new sqlite3.Database(config.name);
      }
      return new Promise<SQLiteWrapperObject>((resolve, reject) => {
        this.db.serialize(()=> {
          resolve(new SQLiteWrapperObject(this.db));
        });

      })
    }
  }
  /**
   * Verify that both the Javascript and native part of this plugin are installed in your application
   * @returns {Promise<any>}
   */
  echoTest(): Promise<any>{
    if(this.isApp){
      return this.sqlite.echoTest();
    }else{

    }
  }
  /**
   * Automatically verify basic database access operations including opening a database
   * @returns {Promise<any>}
   */
  selfTest(): Promise<any>{
    if(this.isApp){
      return this.sqlite.selfTest();
    }else{

    }
  }
  /**
   * Deletes a database
   * @param config {SQLiteDatabaseConfig} database configuration
   * @returns {Promise<any>}
   */
  deleteDatabase(config: SQLiteDatabaseConfig): Promise<any>{
    if(this.isApp){
      return this.sqlite.deleteDatabase(config);
    }else{

    }
  }
}
