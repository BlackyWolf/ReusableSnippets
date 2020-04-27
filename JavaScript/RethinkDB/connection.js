import { connect } from 'rethinkdb';

export default connect({
    db: 'waterfall',
    host: 'localhost',
    port: '28015'
});
