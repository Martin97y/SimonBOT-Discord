import { SlashCommandBuilder } from '@discordjs/builders';
import { PermissionFlagsBits } from 'discord.js';

 const smazatUkol = new SlashCommandBuilder()
 .setName('smazatukol')
 .setDescription('Smaže úkol.')
 .setDefaultMemberPermissions(PermissionFlagsBits.PrioritySpeaker)
 .addStringOption((option) => option.setName('ukol').setDescription('Číslo').setRequired(true))

export default smazatUkol.toJSON();