import mongoose, { Schema } from "mongoose";

const CountrySchema = new mongoose.Schema({
    name: { type: String, required: true },
    alpha2Code: { type: String, required: true },
    // states: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'state',
    // }],
},{
    toJSON: { virtuals: true }
});

CountrySchema.virtual('sts', {
    ref: 'state',
    localField: '_id',
    foreignField: 'country'
});

export const CountryModel = mongoose.model('country', CountrySchema);

export const getCountrys = () => CountryModel.find();
export const getCountryByName = (name: string) => CountryModel.findOne({ name });
export const getCountryById = (id: string) => CountryModel.findById(id);
export const createCountry = (values: Record<string, any>) => new CountryModel(values)
    .save().then(country => country.toObject());
export const deleteCountryById = (id: string) => CountryModel.findOneAndDelete({ _id: id});
export const updateCountryById = (id: string, values: Record<string, any>) => CountryModel.findByIdAndUpdate(id, values);
