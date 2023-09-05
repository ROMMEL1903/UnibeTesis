"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateToken = (req, res, next) => {
    console.log('validate toke');
    const headerToken = req.headers['authorization'];
    console.log(headerToken);
    if (headerToken != undefined && headerToken.startsWith('Bearer')) {
        try {
            const bearerToken = headerToken.slice(7);
            console.log(bearerToken);
            jsonwebtoken_1.default.verify(bearerToken, process.env.CLAVE_SECRETA || 'GmRawg14');
            next();
        }
        catch (error) {
            res.status(401).json({
                msg: 'token no valido '
            });
        }
    }
    else {
        res.status(401).json({
            msg: 'Acesso denegado'
        });
    }
};
exports.default = validateToken;
