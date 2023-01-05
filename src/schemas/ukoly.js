import { mongoose } from 'mongoose';

const ukolyschema = new mongoose.Schema({
    ukol: mongoose.SchemaTypes.String,
    dokdy: mongoose.SchemaTypes.String,
    kdo: mongoose.SchemaTypes.String,
})

export default mongoose.model('Ukolys', ukolyschema);