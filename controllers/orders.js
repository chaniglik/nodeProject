import mongoose from "mongoose";
import { order, orderValidator } from "../models/orders.js";
export const getAllOrders = async (req, res) => {
    try {
        let allOrders;
        //שליפת כל ההזמנות מהמסד נתונים
        allOrders = await order.find({})
        res.json(allOrders)
    }
    catch (err) {
        res.status(400).send("Not all orders can be accepted " + err.message)
    }
}
export const getUserOrdersByTokenId = async (req, res) => {
   
    try {
        let OrdersOfUser = await order.find({ userCode:req.myUserToken._id  });
        if (OrdersOfUser.length==0)
            return res.status(404).send("You have no orders");
        res.json(OrdersOfUser)
    }
    catch (err) {
        res.status(400).send("It is not possible to accept  the userOrders from the orders" + err.message)
    }

}
export const deleteOrder = async (req, res) => {
    //מכניס למשתנה אידי את האידי שנשלח לו ביואראל
    let { id } = req.params;
    if (!mongoose.isValidObjectId(id))
        return res.status(400).send("Code is invalid");
    let checkOrder = await order.findById(id);
    if(!checkOrder.hitTheRoad){
    let deletedOrder = await order.findByIdAndDelete(id)
    if (!deletedOrder)
        return res.status(404).send("This order cannot be deleted because no order was found with such a code")
    return res.json(deleteOrder);
}
return res.send("The order has started and cannot be deleted");
}
export const updateOrder = async (req, res) => {
    //אפשר לעדכן ישר בתוך המסד נתונים
    //אפשר לשלוף לעדכן כאן ולשמור
    let { id } = req.params;
    if (!mongoose.isValidObjectId(id))
        return res.status(400).send("Code is invalid");
    try {
        let orderToUpdate = await order.findById(id);
        if (!orderToUpdate)
            return res.status(404).send("It cannot be updated because no order was found with such a code")
        if(req.myUserToken._id!=orderToUpdate.userCode&&req.myUserToken.roles!="ADMIN")
           return res.status(404).send("It cannot be updated because you are not authorized")
        // true-משנה לי את ההזמנה יצאה לדרך ל 
        orderToUpdate.hitTheRoad =true;

        //שומר את הנתונים לאחר השינוי
        await orderToUpdate.save();
        res.json(orderToUpdate);
    } catch (err) {
        res.status(400).send("This order cannot be updated" + err.message)
    }

}

export const addOrder = async (req, res) => {
    let {  orderDate, dueDate, address, userCode, hitTheRoad,arrProducts } = req.body;
    //קראנו לפונקציה שעושה בדיקות תקינות על הוספה לסכמה
    let validate = orderValidator(req.body);
    if (validate.error)
        return res.status(400).json(validate.error.details[0])

    try {
        //_id-זאת מילה שמורה
        //יצירה ושמירה של מסמך בפעולה אחת
        let newOrder = await order.create({ userCode: req.myUserToken._id, orderDate, dueDate, address, userCode, hitTheRoad,arrProducts })
        return res.status(201).json(newOrder)
    }
    catch (err) {
        res.status(400).send("Unable to add an order " + err.message)
    }
}



