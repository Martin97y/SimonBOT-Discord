import { ThreadChannel } from 'discord.js';
import activity from '../events/activity.js';
import checki from '../index.js';

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

const CHANNEL_ID = '1032275870070624326'

export default {
    name: 'botCheck',
    once: true,
    async execute(client) {
        client.channels.cache.get(CHANNEL_ID).send(`Restarting...`);
        client.channels.cache.get(CHANNEL_ID).send(`Starting ${client.user.tag} Diagnostics Tools`);
        sleep(6000);
        client.channels.cache.get(CHANNEL_ID).send(`Starting services...`);
        sleep(2000);
        client.channels.cache.get(CHANNEL_ID).send(`Starting Activity Presence...`);
        activity.execute(client);
        if (activity.check == true) {
            client.channels.cache.get(CHANNEL_ID).send(`Activity Presence CHECK ✅`);
        } else {
            client.channels.cache.get(CHANNEL_ID).send(`Activity Presence FAILED ❌`);
        }
        client.channels.cache.get(CHANNEL_ID).send(`Checking MAIN Services... `);
        if (!checki == true) {
            client.channels.cache.get(CHANNEL_ID).send(`MAIN Services CHECK ✅`);
        } else {
            client.channels.cache.get(CHANNEL_ID).send(`MAIN Services FAILED ❌`);
        }
        client.channels.cache.get(CHANNEL_ID).send(`DONE!`);
   }   
};