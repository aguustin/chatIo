import { Router } from "express";
import { loginUser, registerUser, details, editUser, deleteAll } from "../controllers/usersController.js";

const router = Router();

router.delete("/delete", deleteAll);

router.post("/login", loginUser);

router.post("/registerUser", registerUser);

router.get("/details/:id", details);

router.put("/edit/:id", editUser);

export default router;