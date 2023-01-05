

export default (client) => {
    client.pickPresence = async () => {
        const option = Math.floor(Math.random() * options.length)
        await client.user.setPresence({
            activities: [
                {
                    name: options[option].text,
                    type: options[option].type,
                },
          ],
          status: options[option].status,             
        })
        .catch(console.error);
    };
};