import express from 'express';
import { deleteCountry, getAllCountrys, insertCountry, showCountry, updateCountry } from './country-controller';
import { isAuthenticated } from '../../middlewares';

export default (router: express.Router) => {
    router.get('/countries', isAuthenticated, getAllCountrys);
    router.get('/countries/:id', isAuthenticated, showCountry);
    router.post('/countries', isAuthenticated, insertCountry);
    router.delete('/countries/:id', isAuthenticated, deleteCountry);
    router.patch('/countries/:id', isAuthenticated, updateCountry);
};
