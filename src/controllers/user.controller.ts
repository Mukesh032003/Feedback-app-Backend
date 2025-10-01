import { NextFunction, Request, Response } from 'express';
import { IUser, User } from '../models/User.model';
import { ApiError } from '../utils/ApiError';
import { ApiResponse } from '../utils/ApiResponse';
import { asyncHandler } from '../utils/handler';

interface UserRegisterData {
    auid: string;
    password: string;
    firstName: string;
    lastName: string;
    email?: string;
    phone?: string;
    role?: 'student' | 'mentor' | 'hod';
}

const registerUser = async function (userData: UserRegisterData) {
    const user: IUser = await User.create(userData);

    if (!user) {
        throw new ApiError(500, 'Internal Server Error');
    }

    return user;
};

const loginUser = asyncHandler(async function (req: Request, res: Response, next: NextFunction) {
    const { auid, password } = req.body;
    if (!auid || auid === '') {
        throw new ApiError(400, 'Auid is required');
    }
    if (!password || password === '') {
        throw new ApiError(400, 'Password is required');
    }

    const user = await User.findOne({ auid: auid });

    if (!user) {
        throw new ApiError(401, 'User not registered');
    }

    const passwordCorrectOrNot = await user.isPasswordCorrect(password);

    if (!passwordCorrectOrNot) {
        throw new ApiError(400, 'Password is incorrect.');
    }
    const accessToken = user.accessToken();
    const userInDb = await User.findById(user._id).select('-password');
    res.status(200)
        .cookie('token', accessToken, {
            maxAge: 86400000,
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        })
        .json(
            new ApiResponse(
                200,
                {
                    user: userInDb,
                    accessToken,
                },
                'Login Successful',
            ),
        );
});

export { registerUser, loginUser };
export type { UserRegisterData };
