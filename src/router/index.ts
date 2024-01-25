import express from "express";
import authentication from "../components/auth/auth-router";
import users from "../components/user/users-router";
import countries from "../components/country/country-router";
import states from "../components/state/state-router";

const router = express.Router();

export default (): express.Router => {
    authentication(router);
    users(router);
    countries(router);
    states(router);

    router.all('*', (req, res) => {
        return res.status(404).json({message: 'Service not found.'}).end();
    });
    return router;
};
