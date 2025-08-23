import mongoose from 'mongoose';
import { DB_NAME } from '../constants';

const connectDB = async (): Promise<void> => {
    try {
        console.log('MONGO URI:', `${process.env.MONGODB_URI}/${DB_NAME}`);

        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);

        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error('MONGODB connection FAILED ', error);
        process.exit(1);
    }
};

export default connectDB;
