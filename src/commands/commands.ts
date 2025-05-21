import TelegramBot from "node-telegram-bot-api";
import bot from "../utils/botInit";
import db from "../utils/database";


export function start(msg: TelegramBot.Message, match: RegExpExecArray | null): void{
    // const menu_btn = new TelegramBot.

    bot.sendMessage(msg.chat.id, "Welcome to the StackOverflow Bot", {reply_markup:{keyboard:[[{text:"📝Start New Chat📝", },{text:"📂View Previous Chats📂"}]]}})
}


export function echo(msg: TelegramBot.Message, match: RegExpExecArray | null): void{
    {
        if (match) {
            const resp = match[1];
            bot.sendMessage(msg.chat.id, resp)
        }
    }

}

export async function code(msg: TelegramBot.Message, match: RegExpExecArray | null): Promise<void>{
    const res = await db.query('SELECT $1::text as message', ['Hello world!'])
    console.log(res.rows[0].message)
    bot.sendMessage(msg.chat.id, `<pre language='JavaScript'>${res.rows[0].message}</pre>`, {parse_mode:"HTML"})
}

export function start_new_chat(msg: TelegramBot.Message, match: RegExpExecArray | null) {
    bot.sendMessage(msg.chat.id, "<pre>NEW CHAT STARTED</pre>", {parse_mode: "HTML"})
}

export function view_chat_list(msg: TelegramBot.Message, match: RegExpExecArray | null) {
    bot.sendMessage(msg.chat.id, "<pre>LIST OF PREVIOUS CHATS:</pre>", {parse_mode: "HTML"})
}