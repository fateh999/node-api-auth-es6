import mongoose from 'mongoose';

const mongooseConnect = () =>
  mongoose.connect(
    'mongodb://admin:root123@ds255005.mlab.com:55005/node-assignment'
  );

export default mongooseConnect;
