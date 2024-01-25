import express from 'express';
import { deleteState, getAllStates, insertState, showState, updateState } from './state-controller';
import { isAuthenticated } from '../../middlewares';

export default (router: express.Router) => {
    router.get('/states', isAuthenticated, getAllStates);
    router.get('/states/:id', isAuthenticated, showState);
    router.post('/states', isAuthenticated, insertState);
    router.delete('/states/:id', isAuthenticated, deleteState);
    router.patch('/states/:id', isAuthenticated, updateState);
};
