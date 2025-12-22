import mongoose from 'mongoose';


const MONGODB_URI = process.env.MONGODB_URI




let cached = global.mongoose

if(!cached) {
    cached = global.mongoose = {conn: null, promise: null}
}

const connectToDatabase = async () => {
    if(!MONGODB_URI) {
        throw new Error("Please define the MONGODB_URI environment variable inside .env!")
    }

    if(cached.conn) {
        return cached.conn
    }

    if(!cached.promise) {
        const otp = {
            bufferCommands: false,
        }
        cached.promise = mongoose.connect(MONGODB_URI, otp).then((mongoose) => {
            return mongoose
        })
    }

    try {
        cached.conn = await cached.promise
    } catch (e) {
        cached.promise = null
        throw e
    }

    return cached.conn
}

export default connectToDatabase;