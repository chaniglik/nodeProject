import { user } from "../models/user.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../config/jwt.js";
import { userValidator } from "../models/user.js";
export const addUser = async (req, res) => {
    try {
        let { nameUser, email, password,dateOfRegistration } = req.body;
        if (!nameUser || !email || !password)
            return res.status(404).send("One of the required fields is missing")
          //מחזיר אמת אם הסיסמה נעשתה כראוי
        let validate = userValidator(req.body);
        if (validate.error)
            return res.status(400).json(validate.error.details[0])
            
        //לספריית ביקריפט ישנה אפשרות של אש שהיא עושה מספר של סיבובי הגיבוב הקוד
        let hashedPassword = await bcrypt.hash(password, 7);
        let newUser =new user({nameUser, password: hashedPassword, email,dateOfRegistration });
        
        await newUser.save();
        
        let { _id, nameUser:nU, email: e,dateOfRegistration:dR} = newUser;
        //קורא לפונקציה ושולח לה את המשתמש ויוצר לו טוקאן
        
        let token = generateToken(newUser);
        res.json({ _id, nameUser: nU, token, email: e,dateOfRegistration:dR });
    }
    catch (err) {
        console.log(err)
        res.status(500).send("r occured in....")
    }


}

export const login = async (req, res) => {
    try {
        let {email, nameUser, password } = req.body;
       
        if (!email || !password)
            return res.status(404).send("One of the required fields is missing")
           
       
           
        let loggedInUser = await user.findOne({ email });
        if (!loggedInUser)
            return res.status(404).send("no user with such credentials")
        //חיפש את האדם לפי השם וכאן אכן מוודא שזה הוא על פי הסיסמה
        if (!await bcrypt.compare(password, loggedInUser.password))
            return res.status(404).send("no user with such credentials") 
        let { nameUser: nU, _id, email:e,dateOfRegistration } = loggedInUser;
        let token = generateToken(loggedInUser);
        res.json({ _id, nameUser: nU, token, email:e,dateOfRegistration });

    }
    catch (err) {
        console.log(err)
        res.status(500).send("r occured in....login")
    }

}

export const getAllUsers = async (req, res) => {
    try {
       
        //לשלוף לתוך כל המשתמשים את כל הנתונים בלי הקוד
        let allusers = await user.find({}, "-password");
        res.json(allusers);
    }
    catch (err) {
         console.log(err)
        res.status(500).send("r occured in....")
    }

}
