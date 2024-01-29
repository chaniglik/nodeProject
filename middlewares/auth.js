
import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
    // "x-access-token" מכניסים לתוך טוקאן את הערך שיכניסו לי שהמפתח של הערך הזה יהיה שווה ל
    let token = req.headers["x-access-token"];
    if (!token)
        return res.status(403).send("missing token please sign in first")

    try {
        req.myUserToken = jwt.verify(token, process.env.JWT_SECRET);
        next();

    }
    catch (err) {
        res.status(401).send("this token is not authorized")
    }

}


export const authAdmin = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token)
        return res.status(403).send("missing token please sign in first")

    try {
        let user = jwt.verify(token, process.env.JWT_SECRET);
        if (user.roles == "ADMIN") {
            req.myUserToken = user;
            next();
        }
        else
          return res.status(403).send("you are not allowed to get to this action")

    }
    catch (err) {
        res.status(401).send("this token is not authorized")
    }

}