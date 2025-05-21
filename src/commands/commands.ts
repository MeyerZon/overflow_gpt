import TelegramBot from "node-telegram-bot-api";
import bot from "../utils/botInit";
import db from "../utils/database";


export async function start(msg: TelegramBot.Message, match: RegExpExecArray | null): Promise<void>{
    const user = await db.query("SELECT * FROM users WHERE telegram_id = $1", [msg.chat.id])
    console.log(user.rows)

    if (user.rows.length === 0) {
        bot.sendMessage(msg.chat.id, "Welcome to the StackOverflow Bot! It's seems you are new here?", {reply_markup:{keyboard:[[{text:"📝Start New Chat📝", },{text:"📂View Previous Chats📂"}]]}})
        await db.query(`INSERT INTO users (telegram_id, last_active_at) VALUES ($1, NOW()) ON CONFLICT (telegram_id) DO NOTHING`, [Number(msg.chat.id)])
        return
    }

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