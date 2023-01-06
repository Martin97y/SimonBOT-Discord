import { mongoose } from 'mongoose';

const guildSchema = new mongoose.Schema({
    guild: mongoose.SchemaTypes.String,
})

export default mongoose.model('Guilds', guildSchema);