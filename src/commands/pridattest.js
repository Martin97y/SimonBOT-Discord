import { SlashCommandBuilder } from '@discordjs/builders';

 const pridatTesty = new SlashCommandBuilder()
 .setName('pridat-test')
 .setDescription('Přidá test.')
 .addStringOption((option) => option.setName('popis').setDescription('Co se bude psát.').setRequired(true))
 .addIntegerOption((option) => option.setName('kdy').setDescription('Datum kdy.').setRequired(true))

export default pridatTesty.toJSON();