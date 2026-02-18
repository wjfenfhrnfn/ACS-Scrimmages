import { REST, Routes } from 'discord.js';
import 'dotenv/config';

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

try {
  console.log('글로벌 커맨드 초기화중...');

  await rest.put(
    Routes.applicationCommands(process.env.CLIENT_ID),
    { body: [] },
  );

  console.log('초기화 완료! 반영까지 1시간 이상 소요될 수 있음');
} catch (error) {
  console.error(error);
}