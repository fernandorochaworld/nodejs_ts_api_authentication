import express from "express";
import authentication from "./authentication";
import users from "./users";

const router = express.Router();

export default (): express.Router => {
    authentication(router);
    users(router);

    router.all('*', (req, res) => {
        return res.status(404).json({message: 'Service not found.'}).end();
    });
    return router;
};
