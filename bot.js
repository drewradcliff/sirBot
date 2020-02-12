const Discord = require("discord.js");
const reddit = require("./redditapi.js");

const bot = new Discord.Client();

require("dotenv").config();

const PREFIX = "!";

bot.on("ready", () => {
  console.log("Bot online");
});

bot.on("message", message => {
  let args = message.content.substring(PREFIX.length).split(" ");

  switch (args[0]) {
    case "reddit":
      reddit.topSubreddit(args[1]).then(results => {
        message.channel.send(results[0].url);
      });
      break;
    case "reddit-search":
      reddit.search(args[1]).then(results => {
        message.channel.send(results[0].url);
      });
      break;
    case "help":
      message.channel.send(
        "Link to github: https://github.com/sirAMPR/discord-bot"
      );
  }
});

bot.login(process.env.API_KEY);
