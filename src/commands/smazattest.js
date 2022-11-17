import { SlashCommandBuilder } from '@discordjs/builders';
import { PermissionFlagsBits } from 'discord.js';

 const smazatTest = new SlashCommandBuilder()
 .setName('smazat-test')
 .setDescription('Smaže test.')
 .setDefaultMemberPermissions(PermissionFlagsBits.PrioritySpeaker)
 .addStringOption((option) => option.setName('test').setDescription('Číslo').setRequired(true))

export default smazatTest.toJSON();