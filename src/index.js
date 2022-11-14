import { config } from 'dotenv';
import { Client, Routes, GatewayIntentBits, } from 'discord.js';
import { mongoose } from 'mongoose';
import { REST } from '@discordjs/rest';

import Ukolys from './schemas/ukoly.js';
import Testys from './schemas/testy.js';

import restart from './commands/restart.js';
import smazatUkol from './commands/smazatukol.js';
import smazatTest from './commands/smazattest.js';
import ukazatUkoly from './commands/ukoly.js';
import ukazatTesty from './commands/testy.js';
import pridatUkol from './commands/pridatukol.js';
import pridatTest from './commands/pridattest.js';
import activity from './events/activity.js';
import pickPresence from './events/tools/pickPresence.js';
import checkBot from './functions/checkbotfunctions.js';
import checkbotfunctions from './functions/checkbotfunctions.js';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

config();

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;


mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then((m) => {
    console.log("Connected to DB");
}).catch((err) => console.log(err));

const rest = new REST({ version: '10' }).setToken(DISCORD_BOT_TOKEN);

client.on("ready", () => {
    console.log(`${client.user.tag} běží.`);
    checkBot.execute(client);
});

let checki = false;

client.on('interactionCreate', async (interaction) => {
    if (interaction.isChatInputCommand()) {
      if (interaction.commandName === 'ukoly') {
        try {
         const ukoly = await Ukolys.find({});
         let description = "";
         for (const i in ukoly) {
            description += `${parseInt(i) + 1}) ${ukoly[i].ukol} | Do Kdy: ${ukoly[i].dokdy}\n`;
         }
         if (description == 0) {
            return interaction.reply("Prázdno");
            
         } 
         await interaction.reply({ content: description});
        } catch (err) {
            interaction.reply({content: 'Chyba'});
        }
      }
      if (interaction.commandName === 'testy') {
        try {
         const testy = await Testys.find({});
         let description = "";
         for (const i in testy) {
            description += `${parseInt(i) + 1}) ${testy[i].test} | Kdy: ${testy[i].kdy}\n`;
         }
         if (description == 0) {
            return interaction.reply("Prázdno");
           
          }
          await interaction.reply({ content: description});
        } catch (err) {
            console.log(err);
            interaction.reply({content: 'Chyba'});
        }
      }
      if (interaction.commandName === 'pridatukol') {
        const ukol = interaction.options.get('popis').value;
        const datum = interaction.options.get('dokdy').value;
        try {
          await Ukolys.create({
            ukol: ukol,
            dokdy: datum,
          })
        interaction.reply({ content: 'Úspěšně přidáno.'});
      } catch (err) {
        console.log(err);
        interaction.reply({ content: 'Chyba.'});
      }
   }
      if (interaction.commandName === 'pridat-test') {
        const test = interaction.options.get('popis').value;
        const kdy = interaction.options.get('kdy').value;
        try {
          await Testys.create({
            test: test,
            kdy: kdy,
          })
        interaction.reply({ content: 'Úspěšně přidáno.'});
      } catch (err) {
        console.log(err);
        interaction.reply({ content: 'Chyba.'});
      }
      }
      if (interaction.commandName === 'smazatukol') {
        const cislo = interaction.options.get('ukol').value;
        try {
          await Ukolys.deleteOne({ dokdy: cislo });
          await interaction.reply({ content: 'Smazáno.', fetchReply: true});
        } catch (err) {
          console.log(err);
          interaction.reply({ content: 'Chyba.' });
        }
      }
      if (interaction.commandName === 'smazat-test') {
        const cislo = interaction.options.get('test').value;
        try {
          await Testys.deleteOne({ kdy: cislo });
          await interaction.reply({ content: 'Smazáno.', fetchReply: true});
        } catch (err) {
          console.log(err);
          interaction.reply({ content: 'Chyba.' });
        }
    }
    if (interaction.commandName === 'restart') {
      try {
        await interaction.reply({ content: 'Trying to restart...', fetchReply: true});
        client.destroy();
        checki = false;
        activity.check = false;
        main();
        checkBot.execute(client);
      } catch (err) {
        console.log(err);
        interaction.reply({ content: 'Chyba.' });
      }
   }
  }
});

async function main() {
    client.login(DISCORD_BOT_TOKEN);
    checki = true;
    const commands = [ restart,ukazatUkoly,pridatTest,ukazatTesty,pridatUkol,smazatUkol,smazatTest];
    try {
     await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
        body: commands,
     });
     
    } catch (err) {
        console.log(err);
    } 
}
export default checki;
main();