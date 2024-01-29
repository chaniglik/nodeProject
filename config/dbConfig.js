import mongoose from "mongoose";
export const connectToDB = () => {
    const mongoURI = process.env.DB_CONNECTION ||"mongodb+srv://w3231000:92DHWLKOnOUJOTIp@sari.rldp1b5.mongodb.net/";
    mongoose.connect(mongoURI)
    //מסוים host הוא רץ במחשב באישי שלי על
        .then((suc) => { console.log("mongo db connected sucessfully!!!", suc.connection.host) })
        .catch(err => {
            console.log("cannot connect mongoDB")
            console.log(err)
            //סוגר את התכונית שאנחנו מתחילים להריץ בכישלון
            process.exit(1);
        })
}
//92DHWLKOnOUJOTIp