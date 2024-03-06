import { body } from "express-validator";

let validateSignup = [
    body('name').exists({checkFalsy:true}).withMessage("Name field cannot be empty"),
    body('email').isEmail().withMessage("Email is not valid"),
    body('password').trim().isLength({min:6}).withMessage("Password must be 6 character long")
]

export default validateSignup 