module.exports = {
  name: "ping",
  category: "info",
  description: "tells the bot ping",
  
  run: async (client, message) => {
    const m = await message.channel.send("Ping?");
    m.edit(`Pong, the bot latncy is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
    
  }
}