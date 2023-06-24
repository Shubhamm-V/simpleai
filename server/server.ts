const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Handling unhandled Exception
process.on('uncaughtException', (err: Error) => {
  console.log('UNHANDLED EXCEPETION, SHUTTING DOWN');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const expressAPP = require('./app');

// Gettting database url and password form .env
const DB =
  process.env.DATABASE && process.env.DATABASE_PASSWORD
    ? process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)
    : undefined;

// Connecting to database
mongoose.connect(DB).then(() => {
  console.log('Database connected');
});

// Listenig from port
const server = expressAPP.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

// Handling unhandledRejection
process.on('unhandledRejection', (err: Error) => {
  console.log('UNHANDLED REJECTION, SHUTTING DOWN');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
