//IMPORTS
import { config } from 'dotenv';
import { Client, Routes, GatewayIntentBits, Embed, EmbedBuilder } from 'discord.js';
import { mongoose } from 'mongoose';
import { REST } from '@discordjs/rest';
import express, { request } from 'express';
import path from 'path';
import fs from 'fs';
import Ukolys from './schemas/ukoly.js';
import Testys from './schemas/testy.js';
import restartBot from './commands/restartBot.js';
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
import { channel } from 'diagnostics_channel';
import { count } from 'console';
import { start } from 'repl';
//-------------------------------------------------------------------------
const app = express();
app.use(express.json())
var port = process.env.PORT || 8080

app.get('/', function(request, response)  {
  response.send('OK');
})

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

//CONNECT DB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then((m) => {
    console.log("Connected to DB");
}).catch((err) => console.log(err));

const rest = new REST({ version: '10' }).setToken(DISCORD_BOT_TOKEN);
//ON READY
client.on("ready", () => {
    console.log(`${client.user.tag} běží.`);
    checkBot.execute(client);
});

let checki = false;

//CHECK UPDATES
var accessToken = "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";




//INTERACTIONS
client.on('interactionCreate', async (interaction) => {
    if (interaction.isChatInputCommand()) {
      if (interaction.commandName === 'ukoly') {
        try {
         const ukoly = await Ukolys.find({});
         let description = "";
         for (const i in ukoly) {
            description += `${parseInt(i) + 1}) ${ukoly[i].ukol} | Do Kdy: ${ukoly[i].dokdy}\n | Přidal/a: ${testy[i].kdo}`;
         }
         if (description == 0) {
            return interaction.reply("Prázdno");
            
         } 
         const sendukolyEmbed = new EmbedBuilder()
         .setColor(15277667)
         .setTitle('Úkoly')
         .setDescription(description)
         .setFooter({ text: `Použil/a ${desc}`, iconURL: 'https://cdn.discordapp.com/avatars/'+interaction.user.id+'/'+interaction.user.avatar+'.jpeg' });

       await interaction.reply({embeds: [sendukolyEmbed]});
        } catch (err) {
            interaction.reply({content: 'Chyba'});
        }
      }
      if (interaction.commandName === 'testy') {
        try {
         const testy = await Testys.find({});
         const desc = interaction.user.username; 
         let description = "";
         for (const i in testy) {
            description += `${parseInt(i) + 1}) ${testy[i].test} | Kdy: ${testy[i].kdy} | Přidal/a: ${testy[i].kdo}\n`;
         }
         if (description == 0) {
            return interaction.reply("Prázdno");
           
          }
          const sendtestyEmbed = new EmbedBuilder()
            .setColor(15277667)
            .setTitle('Testy')
            .setDescription(description)
            .setFooter({ text: `Použil/a ${desc}`, iconURL: 'https://cdn.discordapp.com/avatars/'+interaction.user.id+'/'+interaction.user.avatar+'.jpeg' });

          await interaction.reply({embeds: [sendtestyEmbed]});
          
         // await interaction.reply({ content: description});
          
        } catch (err) {
            console.log(err);
            interaction.reply({content: 'Chyba'});
        }
      }
      if (interaction.commandName === 'pridatukol') {
        const ukol = interaction.options.get('popis').value;
        const datum = interaction.options.get('dokdy').value;
        const kdo = interaction.user.username;
        const desc = interaction.user.username; 

        try {
          await Ukolys.create({
            ukol: ukol,
            dokdy: datum,
            kdo: kdo,
          })
          const sendpridatukolEmbed = new EmbedBuilder()
          .setColor(15277667)
          .setTitle('Úkoly')
          .setDescription(`Přidáno: ${ukol}`)
          .setFooter({ text: `Použil/a ${desc}`, iconURL: 'https://cdn.discordapp.com/avatars/'+interaction.user.id+'/'+interaction.user.avatar+'.jpeg' });

        await interaction.reply({embeds: [sendpridatukolEmbed]});
      } catch (err) {
        console.log(err);
        interaction.reply({ content: 'Chyba.'});
      }
   }
      if (interaction.commandName === 'pridat-test') {
        const test = interaction.options.get('popis').value;
        const kdy = interaction.options.get('kdy').value;
        const kdo = interaction.user.username;
        const desc = interaction.user.username; 

        try {
          await Testys.create({
            test: test,
            kdy: kdy,
            kdo: kdo,
          })
          const sendpridattestEmbed = new EmbedBuilder()
          .setColor(15277667)
          .setTitle('Testy')
          .setDescription(`Přidáno: ${test}`)
          .setFooter({ text: `Použil/a ${desc}`, iconURL: 'https://cdn.discordapp.com/avatars/'+interaction.user.id+'/'+interaction.user.avatar+'.jpeg' });

        await interaction.reply({embeds: [sendpridattestEmbed]});
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
        const desc = interaction.user.username;
        const restartembed = new EmbedBuilder()
            .setColor(15277667)
            .setTitle('Restart')
            .setDescription(`${client.user.tag} is restarting`)
            .setFooter({ text: `Použil/a ${desc}`, iconURL: 'https://cdn.discordapp.com/avatars/'+interaction.user.id+'/'+interaction.user.avatar+'.jpeg' });

          await interaction.reply({embeds: [restartembed]}, {fetchReply: true});
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
//MAIN STARTUP
async function main() {
    client.login(DISCORD_BOT_TOKEN);
    checki = true;
    const commands = [restartBot,ukazatUkoly,pridatTest,ukazatTesty,pridatUkol,smazatUkol,smazatTest];
    try {
     await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
        body: commands,
     });
     
    } catch (err) {
        console.log(err);
    } 
}

//LISTEN ON PORT
app.listen(port, function() {
  console.log('App listening on port:', port);
});

export default checki;
main();