import mongoose from "mongoose";
import Joi from "joi";
import * as roleType from "./roleTypes.js";
const userSchema = mongoose.Schema({
    nameUser: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true,unique:true },
    roles: {
        type: String, default: roleType.USER
    },
    dateOfRegistration: { type: Date, default: Date.now() }
})
//יוצר את הטבלה בבסיס הנתונים בפעם הראשונה שיעשה בה שימוש

export const user = mongoose.model("users", userSchema);

//ספריית גוי-עושה בדיקות על השדות של הסכמה

export const userValidator = (_userToValidate) => {
    let userJoi = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)
        
    }).unknown()

    return userJoi.validate(_userToValidate);
}