import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('봇의 응답 속도를 확인합니다.');

export async function execute(interaction) {
  await interaction.reply(`🏓 퐁! 지연 시간: ${interaction.client.ws.ping}ms`);
}