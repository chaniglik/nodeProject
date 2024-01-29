import jwt from 'jsonwebtoken';

export const generateToken = (newUser) => {
    //ספריית סיין מקבלת 3 פרמטרים :הפרטים על המשתמש,מפתח סודי,לכמה זמן ליצור את הטוקאן הזה
    let token = jwt.sign(
        { _id: newUser._id, nameUser: newUser.nameUser,roles: newUser.roles },
        process.env.JWT_SECRET,
        {
            expiresIn: "100m"
        }
    )

    return token;

}