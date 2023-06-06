import users from "../models/users.js";
import bcrypt from "bcrypt";
import { imageUploader } from "../libs/cloudinary.js";
import fs from 'fs-extra';

export const deleteAll = async (req, res) => {
    await users.deleteMany();
    res.sendStatus(200);
}

export const loginUser = async (req, res) => {

    const email = req.body.email;

    const password = req.body.password;

    const findUser = await users.find({ email: email });

    if (findUser.length !== 0) {

        let compare = bcrypt.compareSync(password, findUser[0].password);

        if (compare !== 0) {

            res.send(findUser);

        } else {

            res.sendStatus(201);

        }
    } else {
        res.sendStatus(201);
    }

}

export const registerUser = async (req, res) => {

    const { name, bio, phone, email, password } = req.body;

    const userExist = await users.find({ email: email });

    if (userExist.length !== 0) {

        res.sendStatus(201);

    } else {
        const salt = bcrypt.genSaltSync(10);
        const hash = await bcrypt.hash(password, salt);

        const newUser = await new users({
            name: name,
            bio: bio,
            phone: phone,
            email: email,
            password: hash
        })
        await newUser.save();

        res.send(newUser);
    }

}

export const details = async (req, res) => {

    const id = req.params.id;

    try {
        const userDetails = await users.find({ _id: id });
        res.send(userDetails);

    } catch (error) {
        console.log(error);
    }

}

export const editUser = async (req, res) => {

    const id = req.params.id;
    const { name, bio, phone, password } = req.body;
    let photo;

    if (req.files) {

        const result = await imageUploader(req.files.photo.tempFilePath);
        await fs.remove(req.files.photo.tempFilePath);

        photo = {
            url: result.secure_url,
            public_id: result.public_id
        }

    }
    try {

        if (req.body.password) {
            const salt = bcrypt.genSaltSync(10);
            const hash = await bcrypt.hash(password, salt);

            await users.updateOne({ _id: id },
                {
                    $set: {
                        photo: photo,
                        name: name,
                        bio: bio,
                        phone: phone,
                        password: hash
                    }
                })
        }

        await users.updateOne({ _id: id },
            {
                $set: {
                    photo: photo,
                    name: name,
                    bio: bio,
                    phone: phone
                }
            })

        const userUpdate = await users.find({ _id: id });

        res.send(userUpdate);

    } catch (error) {
        console.log(error);
    }

}

export const findUsersController = async (req, res) => {
    const response = await users.find({});
    res.send(response);
}
