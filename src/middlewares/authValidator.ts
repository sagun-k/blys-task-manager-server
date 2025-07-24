import { body } from "express-validator";

export const registerValidation = [
    body("email").isEmail().withMessage("Must be a valid email"),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),
    body("name").optional().isString().withMessage("Name must be a string"),
];

export const loginValidation = [
    body("email").isEmail().withMessage("Must be a valid email"),
    body("password").notEmpty().withMessage("Password is required"),
];
