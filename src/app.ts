import {code, echo, start, start_new_chat, view_chat_list} from "./commands/commands";
import bot from "./utils/botInit";
import TelegramBot from "node-telegram-bot-api";




//ON COMMANDS
bot.onText(/\/start/, start)

bot.onText(/\/echo (.+)/, echo)

bot.onText(/\/code/, code as (msg: TelegramBot.Message, match: RegExpExecArray | null) => void)

bot.onText(/📝Start New Chat📝/, start_new_chat)

bot.onText(/📂View Previous Chats📂/, view_chat_list)

