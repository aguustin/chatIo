import axios from "axios";

export const loginRequest = (email, password) => axios.post("/login", {email, password});

export const registerRequest = (userRegister) => axios.post("/registerUser", userRegister);

export const detailsRequest = (id) => axios.get(`/details/${id}`);

export const editRequest = async (id, editUserOb) => {

    const form = new FormData();

    for(let key in editUserOb) {
        form.append(key, editUserOb[key]);
    }

    return await axios.put(`/edit/${id}`, form, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}