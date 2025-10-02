import { NextFunction, Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import { IUser, User } from '../models/User.model';
import { ApiError } from '../utils/ApiError';

interface JwtPayload {
    _id: string;
    roles?: string[];
    iat?: number;
    exp?: number;
}

interface RequestWithUser extends Request {
    user?: IUser | null;
}

export const verifyJwt = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies?.token || req.header('Authorization')?.replace(/^Bearer\s+/, '');
        if (!token || token.trim() === '') {
            throw new ApiError(401, 'Token missing.');
        }

        const secret: Secret | undefined = process.env.ACCESS_TOKEN_SECRET;
        if (!secret) {
            throw new ApiError(500, 'Server misconfiguration: ACCESS_TOKEN_SECRET is missing.');
        }

        // decode token
        let payload: JwtPayload;
        try {
            payload = jwt.verify(token, secret) as unknown as JwtPayload;
        } catch (err) {
            throw new ApiError(401, 'Invalid or expired token.');
        }

        if (!payload || !payload._id) {
            throw new ApiError(401, 'Invalid token payload.');
        }

        // fetch the user from DB and attach to req
        const user = await User.findById(payload._id);
        if (!user) {
            throw new ApiError(401, 'User not found for token.');
        }

        req.user = user;
        next();
    } catch (err) {
        next(err);
    }
};

export default verifyJwt;
