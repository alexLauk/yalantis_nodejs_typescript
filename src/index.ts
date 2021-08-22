import app from './server';
import config from './typeorm/config/ormconfig';
import dbCreateConnection from './typeorm/dbCreateConnection';

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

(async () => {
  await dbCreateConnection(config);
})();
