import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import noblox from "noblox.js";
import axios from "axios";
import "dotenv/config";

await noblox.setCookie(process.env.ROBLOX_COOKIE)

export const data = new SlashCommandBuilder()
  .setName("stat")
  .setDescription("Enter Roblox username and view them stats.")
  .addStringOption((option) => option.setName("target").setDescription("Enter target Roblox username").setRequired(true))

export async function execute(interaction) {
  const target = interaction.options.getString("target");
  const UNIVERSE_ID = '8702198016';
  const DATASTORE_NAME = 'test2';
  const UserID = await noblox.getIdFromUsername(target)
  const User = await noblox.getUserInfo(UserID)
  const ENTRY_KEY = `Player_${UserID}`;
  const url = `https://apis.roblox.com/cloud/v2/universes/${UNIVERSE_ID}/data-stores/${DATASTORE_NAME}/scopes/global/entries/${ENTRY_KEY}`;

  if (UserID === null) {
    interaction.reply("Username is wrong")
    return
  }

  try {
    await interaction.deferReply();

    const response = await axios.get(url, {
      headers: {
        'x-api-key': process.env.ROBLOX_API_KEY,
        'Content-Type': 'application/json'
      }
    });

    const value = null

    if (value == null) {
      await interaction.editReply("Play an ACS Scrimmages once");
      return
    }

    const ELO = value.ELO || 0
    const Kills = value.Kills || 0
    const Deaths = value.Deaths || 0
    const Captures = value.Captures || 0
    const Wins = value.Wins || 0
    const Losses = value.Losses || 0

    const statsEmbed = new EmbedBuilder()
      .setColor(65280)
      .setTitle(`${User.name}'s Stat`)
      .setURL(`https://www.roblox.com/users/${UserID}/profile`)
      .setAuthor({ name: `User ID: ${UserID}` })
      .addFields(
        { name: "ELO", value: `**${ELO}**`, inline: true },
        { name: "Kills", value: `**${Kills}**`, inline: true},
        { name: "Deaths", value: `**${Deaths}**`, inline: true },
        { name: "Captures", value: `**${Captures}**`, interaction: true},
        { name: "Wins", value: `**${Wins}**`, inline: true },
        { name: "Losses", value: `**${Losses}**`, inline: true }
      )
      .setThumbnail(`https://www.roblox.com/headshot-thumbnail/image?userId=${UserID}&width=420&height=420&format=png`)
      .setTimestamp()
      .setFooter({ text: "Bot by calicocat1" })

    await interaction.editReply({ embeds: [statsEmbed] });
    
    const UserRankId = await noblox.getRankInGroup(14058257,UserID);
    const BotRankId = await noblox.getRankInGroup(14058257,10529518423);
    if (UserRankId >= BotRankId || UserRankId <= 0) {
      return
    }

    if (ELO <= 0) {
      noblox.setRank(14058257,UserID,"F")
    } else if (ELO <= 300) {
      noblox.setRank(14058257,UserID,"D")
    } else if (ELO <= 750) {
      noblox.setRank(14058257,UserID,"C")
    } else if (ELO <= 1000) {
      noblox.setRank(14058257,UserID,"B")
    } else if (ELO <= 1250) {
      noblox.setRank(14058257,UserID,"A")
    } else if (ELO <= 1500) {
      noblox.setRank(14058257,UserID,"S")
    } else {
      noblox.setRank(14058257,UserID,"X")
    }
  } catch (err) {
    if (err.response) {
      console.error(`Error (${err.response.status}): `, err.response.data);
      await interaction.editReply(`Error (${err.response.status}): `, err.response.data.message);
    } else {
      console.error("Request Failed: ", err.message);
      await interaction.editReply("Request Failed: ", err.message);
    }
  }
}