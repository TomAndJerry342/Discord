import * as Discord from "discord.js";
import { Guild } from "../../../../utils/mongo/schemas/guild.js";
import errorBuilder from "../../../responces/error.js";
import { luthorChatBotConfig } from "../../../events/cogs/luthorChatbot.js";

export default async function (message: Discord.Message, args: string[]) {
    if (args.length < 1)
        return await message.channel.send(
            errorBuilder(
                "Please provide a channelID!",
                "addLuthorChatbotChannel"
            )
        );
    if (args.length > 1)
        return await message.channel.send(
            errorBuilder(
                "Please provide only one argument!",
                "addLuthorChatbotChannel"
            )
        );

    const chatChannelId = args[0];
    const guild = await Guild.findOneAndUpdate(
        { guildId: message.guild?.id },
        { features: { luthorChatChannelId: chatChannelId } },
        { upsert: true }
    );

    luthorChatBotConfig[message.guild.id] = chatChannelId;
    return await message.channel.send("Successfully added chatbot channel!");
}
export const meta = {
    name: "chatbotchannel",
    description: "set the channel for luthor to listen to",
    usage: "<ChannelID>",
};

