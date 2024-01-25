import mongoose, { Schema } from "mongoose";

const StateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true },
    country: { type: Schema.Types.ObjectId, required: true, ref: 'country'}
});

export const StateModel = mongoose.model('state', StateSchema);

export const getStates = () => StateModel.find();
export const getStateById = (id: string) => StateModel.findById(id);
export const getStateByName = (name: string) => StateModel.findOne({ name });
export const createState = (values: Record<string, any>) => new StateModel(values)
    .save().then(state => state.toObject());
export const deleteStateById = (id: string) => StateModel.findOneAndDelete({ _id: id});
export const updateStateById = (id: string, values: Record<string, any>) => StateModel.findByIdAndUpdate(id, values);
