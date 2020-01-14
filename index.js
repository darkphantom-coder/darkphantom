const app = require("express")();

const http = require("http");
app.get("/", (request, response) => {
  console.log(Date.now() + "Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.inv.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
// this is to keep alive your bot, just add it to uptime robot to ping it every 5 minutes

const { Client, Collection, Util } = require("discord.js");
const { config } = require("dotenv");
const fs = require("fs");
const { promptMessage } = require("./function.js");
const Discord = require("discord.js");
const { PREFIX, TOKEN, STATUS } = require("./config.js");
const bot = new Discord.Client();

const client = new Client({
  disableEveryone: true
});
//assest ke ander img h wo daalni h canvas h. w   image kahan dalni hai???
client.commands = new Collection();
client.aliases = new Collection();

client.categories = fs.readdirSync("./commands/");

config({
  path: __dirname + "/.env"
});

["command"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

client.on("ready", () => {
  console.log(`Hi, ${client.user.username} is now online!`);

  setInterval(() => {
    client.user.setActivity(`${STATUS}`, { type: "Watching" });
  }, 5000);
});

client.on("message", async message => {
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.content.startsWith(PREFIX)) return;
  if (!message.member)
    message.member = await message.guild.fetchMember(message);

  const args = message.content
    .slice(PREFIX.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));

  if (command) command.run(client, message, args);
});

 


client.login(TOKEN);
//now make a new file namee config.js and put token pre and your bot status there