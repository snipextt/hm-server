import server from './server';
import { connectTooDB as connect } from './db';

connect.then(() => {
  server.listen(2002, () => {
    console.log('Listining on port 2002');
  });
});
