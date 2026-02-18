import { Events } from 'discord.js';

export const name = Events.ClientReady;
export const once = true;

export function execute(client) {
  console.log(`🚀 준비 완료! ${client.user.tag} 계정으로 로그인했습니다.`);
}