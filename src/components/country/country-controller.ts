import express from 'express';
import { deleteCountryById, getCountryById, getCountrys, getCountryByName, createCountry } from './country-db-schema';

export const getAllCountrys = async (req: express.Request, res: express.Response) => {
    try {
        const countrys = await getCountrys();
        // const countrys = await getCountrys().populate('states');

        return res.status(200).json(countrys);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const showCountry = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const country = await getCountryById(id).populate(['states', 'sts']);
        return res.status(200).json(country).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const insertCountry = async (req: express.Request, res: express.Response) => {
    try {
        const { name, alpha2Code } = req.body;

        if (!name || !alpha2Code) {
            return res.status(400).json({ error: 'Name and code are required.' }).end();
        }

        const existingCountry = await getCountryByName(name);
        if (existingCountry) {
            return res.status(400).json({ error: 'Country already exists.' }).end();
        }


        const country = await createCountry({
            name,
            alpha2Code
        });

        return res.status(200).json(country).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const deleteCountry = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const deleteCountry = await deleteCountryById(id);

        return res.json(deleteCountry);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const updateCountry = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const { name, alpha2Code } = req.body;
        if (!Object.keys(req.body).length) {
            return res.status(400).json({error: 'No param to update.'}).end();
        }


        console.log(req.body);

        const country = await getCountryById(id);
        
        if (name !== undefined) country.name = name;
        if (alpha2Code !== undefined) country.alpha2Code = alpha2Code;
        // if (states !== undefined) country.states = states;

        await country.save();
        

        return res.status(200).json(country).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}
