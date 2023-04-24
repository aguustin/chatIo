import axios from "axios";

export const googleAuth = () => axios.get("/google/callback");

export const facebookAuth = () => axios.get("/facebook/callback");

export const twitterAuth = () => axios.get("/twitter/callback");

export const githubAuth = () => axios.get("/github/callback");