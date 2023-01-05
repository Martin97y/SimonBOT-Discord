import { ActivityType } from "discord.js";
export default {
    name: 'Activity Presence',
    once: true,
    check: false,
    async execute(client) {
        const statutsArray = [{
        type: ActivityType.Watching,
        text: "Davidovu ass",
        status: "online"
        },
        {
        type: ActivityType.Competing,
        text: "Děláním ničeho",
        status: "online"
        },
        {
        type: ActivityType.Watching,
        text: "Tvoji mámu",
        status: "online"
        },
        {
        type: ActivityType.Listening,
        text: "Depressed songy",
        status: "online"
        },
        {
        type: ActivityType.Listening,
        text: "Rádio Haná",
        status: "online"
        },
        {
        type: ActivityType.Playing,
        text: "Minecraft SUS Edition",
        status: "dnd"
        },
        {
        type: ActivityType.Listening,
        text: "Záchod po kakání",
        status: "online"
        },
        this.check = true,
    ];
 async function pickPresence() {
        const option = Math.floor(Math.random() * statutsArray.length);

        try {
            await client.user.setPresence({
                activities: [{
                    name: statutsArray[option].text,
                    type: statutsArray[option].type
                },
            ],
            status: statutsArray[option].status
            });
        } catch(error) {
            console.error(error);
        }
    }
    setInterval(pickPresence, 8 * 1000);
  }
}