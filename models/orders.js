import mongoose from "mongoose";
import Joi from "joi";
//סכמת עזר לשימוש סוג של שדה בסכמה השנייה
const minimalProduct = mongoose.Schema({
    codeProduct: { type: Number, required: true },
    nameProduct: { type: String },
    price: { type: Number, required: true },
description: String,
 imgUrl:String,
    quantityOfProduct:{ type: Number, required: true }
})

const ordersSchema = mongoose.Schema({
    orderDate: { type: Date, default: Date.now() },
    dueDate: { type: Date, default: Date.now() },
    address: { type: String, required: true },
    //user צריך להכניס את האידי של ה 
    userCode:String,
    hitTheRoad: { type: Boolean, default: false },
    arrProducts: { type: [minimalProduct] }

})
//יוצר את הטבלה בבסיס הנתונים בפעם הראשונה שיעשה בה שימוש
export const order = mongoose.model("orders", ordersSchema);
//ספריית גוי-עושה בדיקות על השדות של הסכמה
export const orderValidator = (_orderToValidate) => {
    let orderJoi = Joi.object({
        address: Joi.string().min(4).max(100)
    }).unknown()

    return orderJoi.validate(_orderToValidate);
}
