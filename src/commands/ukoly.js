import { SlashCommandBuilder } from '@discordjs/builders';

const ukazatUkoly = new SlashCommandBuilder()
.setName('ukoly')
.setDescription('Vypíše seznam úkolů.')

export default ukazatUkoly.toJSON();