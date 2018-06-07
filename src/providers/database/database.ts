import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Injectable } from '@angular/core';

@Injectable()
export class DatabaseProvider {

  constructor(private sqlite: SQLite) { }

  // get datas in DB
  public getDB() {
    // para cada opearção é necessario abrir o DB
    return this.sqlite.create({
      name: 'product.db',
      location: 'default'
    })

  }
  // Creates a bank if there is no existing bank with the name in the parameter
  public createDB() {
    return this.getDB()
      .then((db: SQLiteObject) => {

         // Create Tables
         this.createTables(db);

         // Insert datas default
         this.insertDefaultItems(db);

      })
      .catch(e => console.error(e));
  }

  // creating the tables in the database
  private createTables(db: SQLiteObject){
     // Create Tables
     db.sqlBatch([
      ['CREATE TABLE IF NOT EXISTS categories (id integer primary key AUTOINCREMENT NOT NULL, name TEXT)'],
      ['CREATE TABLE IF NOT EXISTS products (id integer primary key AUTOINCREMENT NOT NULL, name TEXT, price EUR, duedate DATE, active integer, category_id integer, FOREIGN KEY(category_id) REFERENCES categories(id))']
    ])
      .then(() => console.log('Tabelas criadas'))
      .catch(e => console.error('Erro ao criar as tabelas', e));
  }

  // Including the default data
  private insertDefaultItems(db: SQLiteObject){
    db.executeSql('select COUNT(id) as qtd from categories', {})
    .then((data: any) => {
      //If there is no record
      if (data.rows.item(0).qtd == 0) {

        // Create tables
        db.sqlBatch([
          ['insert into categories (name) values (?)', ['Food']],
          ['insert into categories (name) values (?)', ['Drinkes']],
          ['insert into categories (name) values (?)', ['Dessert']],
        ])
          .then(() => console.log('Dados padrões incluídos'))
          .catch(e => console.error('Erro ao incluir dados padrões', e));

      }
    })
    .catch(e => console.error('Erro ao consultar a qtd de categorias', e));
  }
}
