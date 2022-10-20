import { mongoose } from 'mongoose';

const testyschema = new mongoose.Schema({
    test: mongoose.SchemaTypes.String,
    kdy: mongoose.SchemaTypes.String,
})

export default mongoose.model('Testys', testyschema);