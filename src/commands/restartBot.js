import { SlashCommandBuilder} from '@discordjs/builders';
import { PermissionFlagsBits } from 'discord.js';

 const restarTBot = new SlashCommandBuilder()
 .setName('restart')
 .setDescription('Restartuje bota.')
 .setDefaultMemberPermissions(PermissionFlagsBits.PrioritySpeaker)

export default restarTBot.toJSON();