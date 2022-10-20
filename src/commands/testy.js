import { SlashCommandBuilder } from '@discordjs/builders';


 const ukazatTesty = new SlashCommandBuilder()
 .setName('testy')
 .setDescription('Vypíše seznam testů.')


export default ukazatTesty.toJSON();