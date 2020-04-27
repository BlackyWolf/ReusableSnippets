import { table } from 'rethinkdb';
import connectAsync from './connection';

const tableName = 'table1';

export class Entity {
    async add(entity) {
        const connection = await connectAsync;

        const result = await table(tableName).insert(entity).run(connection);

        console.log(result);

        if (result.generated_keys && result.generated_keys.length > 0) {
            entity.id = result.generated_keys[0];
        }
    }

    async all() {
        const connection = await connectAsync;

        return table(tableName).run(connection);
    }

    async find(id) {
        const connection = await connectAsync;

        return table(tableName).get(id).run(connection);
    }

    async remove(entity) {
        const connection = await connectAsync;

        return table(tableName).get(entity.id).delete().run(connection);
    }

    async update(entity) {
        const connection = await connectAsync;

        return table(tableName).get(entity.id).update(entity).run(connection);
    }
};

export default new Entity();
