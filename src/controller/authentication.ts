import express from 'express';
import { createUser, getUserByEmail } from '../db/users';
import { authentication, random } from '../helpers';


export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password, username } = req.body;

        if (!email || !password || !username) {
            return res.sendStatus(400);
        };

        const existUser = await getUserByEmail(email);

        if (existUser) {
            return res.sendStatus(400)
        };

        const salt = random();

        const user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password)
            }
        });
        return res.status(200).json(user)

    } catch (error) {
        console.log(error as Error);
        return res.sendStatus(400);
    }
}