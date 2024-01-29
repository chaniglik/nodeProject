import mongoose from "mongoose";
import { product, addValidator,updateValidator } from "../models/product.js";
export const getAllProduct = async (req, res) => {
    let { search,from,to, page, perPage} = req.query;
    try {
        let allProduct;
        let serachObject = {};
        if (search)
            serachObject.nameProduct = new RegExp(search, "i");
        if (from)
            serachObject.price = { $gte: from }
        if (to)
            serachObject.price = { $lte: to }
       //skip- על כמה מוצרים לדלג בהתבסס על כמות העמודים
        //limit-כמות המוצרים המקסימלית שניתן לטעון בכל פעם (כמות מקסימלית-perPage) 
        //אם החיפוש ריק ולא נשלח מסננים אז הפונקצייה תביא את כל המוצרים
       allProduct = await product.find(serachObject)
            .skip((page - 1) * perPage)
            .limit(perPage);
        res.json(allProduct)
    }
    catch (err) {
        res.status(400).send("Not all products are available "+ err.message)
    }
}
export const getProductById = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id))
            return res.status(400).send("Code is invalid")
        let oneProduct  = await product.findById(req.params.id)
        if (!oneProduct)
            return res.status(404).send("This product cannot be viewed with such a code")
        res.json(oneProduct)
    }
    catch (err) {
        res.status(400).send( "It is not possible to accept the product from the producs"+ err.message)
    }

}
export const deleteProduct = async (req, res) => {
    let { id } = req.params;
    if (!mongoose.isValidObjectId(id))
        return res.status(400).send("Code is invalid");
    let deletedProduct = await product.findByIdAndDelete(id)
    if (!deletedProduct)
        return res.status(404).send("This product cannot be deleted because no order was found with such a code")
    return res.json(deletedProduct);

}
export const updateProduct = async (req, res) => {
    //אפשר לעדכן ישר בתוך המסד נתונים
    //אפשר לשלוף לעדכן כאן ולשמור
    let { id } = req.params;
    if (!mongoose.isValidObjectId(id))
        return res.status(400).send("Code is invalid");
        let validate = updateValidator(req.body);
        if (validate.error)
            return res.status(400).json(validate.error.details[0])
    try {
        let productToUpdate = await product.findById(id);
        if (!productToUpdate)
            return res.status(404).send("It cannot be updated because no product was found with such a code")
        productToUpdate.codeProduct = req.body.codeProduct || productToUpdate.codeProduct;
        productToUpdate.nameProduct = req.body.nameProduct || productToUpdate.nameProduct;
        productToUpdate.price = req.body.price || productToUpdate.price;
        productToUpdate.codeProvider = req.body.codeProvider || productToUpdate.codeProvider;
        productToUpdate.imgUrl = req.body.imgUrl || productToUpdate.imgUrl;
        productToUpdate.ManufacturingDate = req.body.ManufacturingDate || productToUpdate.ManufacturingDate;
        productToUpdate.description = req.body.description || productToUpdate.description;

        await productToUpdate.save();
        res.json(productToUpdate);
    } catch (err) {
        res.status(400).send("This order cannot be updated"+ err.message)
    }

}

export const addProduct = async (req, res) => {
    let {codeProduct,nameProduct,description,ManufacturingDate,imgUrl,price,codeProvider } = req.body;
     //קראנו לפונקציה שעושה בדיקות תקינות על הוספה לסכמה
    let validate = addValidator(req.body);
    if (validate.error)
        return res.status(400).json(validate.error.details[0])
    try {
        let sameProduct = await product.find({ codeProduct });
        if (sameProduct.length > 0)
            return res.status(409).send("There is already an product with such a code")
        //יצירה ושמירה של מסמך בפעולה אחת
        let newProduct = await product.create({ codeProduct,nameProduct,description,ManufacturingDate,imgUrl,price,codeProvider })
        return res.status(201).json(newProduct)
    }
    catch (err) {
        res.status(400).send("Unable to add an product"+ err.message)
    }
}

