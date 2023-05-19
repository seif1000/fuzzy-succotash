import e, { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/user.controllers";

const router = Router();

router.get("/", getAllUsers);
router.post("/", createUser);
router.put("/:user_id", updateUser);
router.get("/:user_id", getUserById);
router.delete("/:user_id", deleteUser);
export { router };
