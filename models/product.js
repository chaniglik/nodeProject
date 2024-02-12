import mongoose from "mongoose";
import Joi from "joi";
const productSchema = mongoose.Schema({
    //קוד מוצר שיכולה להיות חשופה גם למשתמש
    codeProduct: { type: Number, required: true },
    nameProduct: String,
    description: String,
    ManufacturingDate:Date,
    imgUrl:{type:String,default:"http://https://store-kg53.onrender.com//products/pic1.jpg"},
    price: { type: Number, required: true },
    codeProvider: { type: String, required: true },

})

//יוצר את הטבלה בבסיס הנתונים בפעם הראשונה שיעשה בה שימוש

export const product = mongoose.model("products", productSchema);
//ספריית גוי-עושה בדיקות על השדות של הסכמה

export const addValidator = (_productToValidate) => {

    let productJoi = Joi.object({
        codeProvider: Joi.string().min(5).max(8),
        price: Joi.number().min(0).max(40000),
       
        

    }).unknown()

    return productJoi.validate(_productToValidate);
}
export const updateValidator = (_productToValidate) => {

    let productJoi = Joi.object({
        codeProvider: Joi.string().min(5).max(8),
        price: Joi.number().min(0).max(40000),
        

    }).unknown()

    return productJoi.validate(_productToValidate);
}
