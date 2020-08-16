import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

export function requireJwtMiddleware(req:any, res:any, next:any) {
    if(!req.headers.authorization){
        return res.status(403).send({error: "Missing authorization in headers"})
    }
    const [, token] = req.headers.authorization.split(' ');

    if (!token) return res.status(401).send({error: "Access Denied, Missing token"});
    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }catch (err) {
        res.status(400).send({error: "Access Denied, invalid token"})
    }
}