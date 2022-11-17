import { SlashCommandBuilder} from '@discordjs/builders';
import { PermissionFlagsBits } from 'discord.js';

 const restartBot = new SlashCommandBuilder()
 .setName('restart')
 .setDescription('Restartuje bota.')
 .setDefaultMemberPermissions(PermissionFlagsBits.PrioritySpeaker)

export default restartBot.toJSON();