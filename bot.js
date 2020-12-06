const Discord = require("discord.js");
const reddit = require("./redditapi.js");
const fetch = require("node-fetch");
const ytdl = require("ytdl-core");

const bot = new Discord.Client();

require("dotenv").config();

const PREFIX = "!";
const USERNAME = "werd";
const CHANNEL = "General";

bot.once("ready", () => {
  console.log("Bot online");
});

bot.on("message", (message) => {
  // commands
  let args = message.content.substring(PREFIX.length).split(" ");

  switch (args[0]) {
    case "ping":
      message.channel.send("pong");
      break;
    case "reddit":
    case "r":
      reddit.topSubreddit(args[1]).then((results) => {
        message.channel.send(results[0].url);
      });
      break;
    case "reddit-search":
    case "rs":
      args.shift();
      reddit.search(args.join(" ")).then((results) => {
        message.channel.send(results[0].url);
      });
      break;
    case "help":
    case "h":
      message.channel.send(
        "Link to github: https://github.com/sirAMPR/discord-bot"
      );
      break;
  }

  // check for reddit link for video file
  if (message.content.includes("reddit.com")) {
    let url = message + ".json";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data[0].data.children[0].data.secure_media) {
          message.channel.send(
            data[0].data.children[0].data.secure_media.reddit_video.fallback_url
          );
        }
      })
      .catch((error) => console.error("Error:", error));
  }
});

bot.on("voiceStateUpdate", (oldState, newState) => {
  if (
    newState.channel !== null &&
    newState.member.user.username === USERNAME &&
    newState.channel.name === CHANNEL
  ) {
    newState.channel.join().then((connection) => {
      connection.play(
        ytdl("https://www.youtube.com/watch?v=3qxX5KhCpTk&t=6s"),
        {
          quality: "highestaudio",
        }
      );
    });
  }
});

bot.login(process.env.API_KEY);
