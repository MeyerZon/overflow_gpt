import dotenv from "dotenv";
import TelegramBot from "node-telegram-bot-api"

 function botInit() {

    dotenv.config()

    const TOKEN = process.env.TELEGRAM_TOKEN

    if (!TOKEN) {
        console.error("No token")
        throw new Error("No telegram token provided")
    }
    const options = {
        polling: true
    };
    //TODO Switch to the webhooks.
    return new TelegramBot(TOKEN, options)
}

const bot = botInit()
export default bot