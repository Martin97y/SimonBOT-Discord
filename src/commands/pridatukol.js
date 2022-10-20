import { SlashCommandBuilder } from '@discordjs/builders';

    const pridatUkoly = new SlashCommandBuilder()
    .setName('pridatukol')
    .setDescription('Přidá úkol.')
    .addStringOption((option) => option.setName('popis').setDescription('Strana. atd').setRequired(true))
    .addIntegerOption((option) => option.setName('dokdy').setDescription('Datum do kdy.').setRequired(true))

export default pridatUkoly.toJSON();