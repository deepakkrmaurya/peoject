
import mongoose from "mongoose";
const dbConnection = async()=>{
  try {
    mongoose.connect(process.env.MONGO_URI!)
   const connection =  mongoose.connection
   connection.on('connected',()=>{
     console.log('DB Connection Successfully...');
     
   })
   connection.on('error',(err)=>{
    console.log('db connction faild'+err)
    process.exit()
   })


  } catch (error) {
    console.log('somethine went wrong in connecting to DB')
    console.log(error)
  }
}

export default dbConnection