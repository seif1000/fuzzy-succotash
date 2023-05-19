import { Request, Response } from "express";
import { User } from "../models/User";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.getAllUsers();

    res.status(200).send(users);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    let user = await User.createUser(
      req.body.email,
      req.body.first_name,
      req.body.last_name,
      req.body.birthday,
      req.body.password
    );
    return res.status(200).send(user);
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;
    const user = await User.updateUser(
      Number(user_id),
      req.body.email,
      req.body.first_name,
      req.body.last_name,
      req.body.birthday
    );
    return res.status(200).send(user);
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;
    const user = await User.getUserById(Number(user_id));
    return res.status(200).send(user);
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;
    const user = await User.deleteUser(Number(user_id));
    return res.status(200).send(user);
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
};
