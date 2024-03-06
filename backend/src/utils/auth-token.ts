import jwt from "jsonwebtoken";

let createToken = (id : String, email : String) => {
    let token = jwt.sign({id, email}, process.env.JWT_SECRET, {
        expiresIn : "7d"
    })
    return token;
}

export default createToken 