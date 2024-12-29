import mongoose from "mongoose";

const openURl = "mongodb://localhost:27017/harshDatabase";
// console.log("openURL", openURl);

const connectDB = async () => {
  try {
    const result = await mongoose.connect(openURl);
    console.log("====connect===");
    console.log('success', 'Mongoose default connection open to ' + openURl);
  } catch (err) {
    console.log("====connect error===", err);
  }
};

// Event listeners for Mongoose connection
mongoose.connection.on('connecting', () => {
  console.log('Attempting to connect to MongoDB...');
});

mongoose.connection.on('connected', () => {
  console.log('Mongoose default connection open to ' + openURl);
});

mongoose.connection.on('error', (err) => {
  console.log('Mongoose default connection error: ', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose default connection is disconnected');
});

// Handle app termination
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

// Default export
export default connectDB;
