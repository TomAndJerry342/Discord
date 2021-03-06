import * as Discord from "discord.js";
import { Guild } from "../../../../utils/mongo/schemas/guild.js";
import { luthorChatBotConfig } from "../../../events/cogs/luthorChatbot.js";

export default async function (message: Discord.Message, args: string[]) {
    const guild = await Guild.findOne({ guildId: message.guild?.id });
    if (guild.features.luthorChatChannelId) {
        await Guild.findOneAndUpdate(
            { guildId: message.guild?.id },
            { features: { luthorChatChannelId: null } }
        );
        luthorChatBotConfig[message.guild.id] = null;
        await message.channel.send("Successfully removed chatbot channel!");
    } else {
        await message.channel.send("No chatbot channel set!");
    }
}
export const meta = {
    name: "removechatbotchannel",
    description: "removes the chatbot channel",
    usage: "",
};

