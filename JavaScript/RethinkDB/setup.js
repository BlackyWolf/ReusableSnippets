import rethinkdb from 'rethinkdb';
import connectAsync from './connection';

const databaseName = 'database';

export default async () => {
    let connection = await connectAsync;

    const databaseExists = await rethinkdb.dbList().contains(databaseName).run(connection);

    const tables = ['table1', 'table2', 'table3'];

    // If the database does not exist
    if (!databaseExists) {
        // Create the database
        await rethinkdb.dbCreate(databaseName).run(connection);

        // Check if the tables exist, and if not, create them
        await rethinkdb(tables)
            .difference(rethinkdb.db(databaseName).tableList())
            .forEach(table => rethinkdb.db(databaseName).tableCreate(table))
            .run(connection);
    } else {
        // Check if the tables already exist and if not, create them
        await rethinkdb(tables)
            .difference(rethinkdb.db(databaseName).tableList())
            .forEach(table => rethinkdb.db(databaseName).tableCreate(table))
            .run(connection);
    }
}
