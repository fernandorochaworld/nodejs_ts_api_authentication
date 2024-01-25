import express from 'express';
import { deleteStateById, getStateById, getStates, getStateByName, createState } from './state-db-schema';

export const getAllStates = async (req: express.Request, res: express.Response) => {
    try {
        // const States = await getStates();
        const states = await getStates();
        // states.forEach(async item => await item.populate('country').execPopulate());

        return res.status(200).json(states);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const showState = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const state = await getStateById(id).populate('country', "-_id -__v -states");
        return res.status(200).json(state).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const insertState = async (req: express.Request, res: express.Response) => {
    try {
        const { name, code, country } = req.body;

        if (!name || !code || !country) {
            return res.status(400).json({ error: 'Name, code, and country are required.' }).end();
        }

        const existingState = await getStateByName(name);
        if (existingState) {
            return res.status(400).json({ error: 'State already exists.' }).end();
        }


        const State = await createState({
            name,
            code,
            country
        });

        return res.status(200).json(State).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const deleteState = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const deleteState = await deleteStateById(id);

        return res.json(deleteState);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const updateState = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        if (!name) {
            return res.sendStatus(400);
        }

        const State = await getStateById(id);
        State.name = name;
        await State.save();

        return res.status(200).json(State).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}
