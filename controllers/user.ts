import { Request, Response } from "express";
import User from "../models/user";

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.findAll({
            where: {
                status: true
            }
        });

        res.json({ users });

    } catch (error: unknown) {
        console.log(error);
    }
}

export const getUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id);

        if (user) res.json(user);
        else res.status(404).json({ msg: 'No se pudo encontrar un usuario con ese ID' });

    } catch (error: unknown) {
        console.log(error);
    }
}

export const saveUser = async(req: Request, res: Response) => {
    try {
        const { body } = req;
    
        const user = await User.create(body);

        res.json(user);

    } catch (error: unknown) {
        console.log(error);
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { body } = req;
    
        const user = await User.findByPk(id);
        await user?.update(body);

        res.json(user);
        
    } catch (error: unknown) {
        console.log(error);
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
    
        const user = await User.findByPk(id);
        await user?.update({ status: false });

        res.json(user);
        
    } catch (error: unknown) {
        console.log(error);
    }
}