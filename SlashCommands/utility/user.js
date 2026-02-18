import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('user')
  .setDescription('사용자 정보를 확인합니다.');

export async function execute(interaction) {
  const { user } = interaction;
  await interaction.reply(`유저명: ${user.username}\nID: ${user.id}`);
}