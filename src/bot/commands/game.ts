import * as Discord from 'discord.js';
import getUserFromMention from '../../utils/getUserFromMention.js';
import sleep from '../../utils/sleep.js';
 

export default async function (message: Discord.Message, args:any[] ) {
  let player1:Discord.User = message.author;

  if (message.mentions.users.first() === undefined) return;


  let list_of_players:any = []
 for (let i = 0; i < args.length; i++) {

      list_of_players.push(getUserFromMention(message.client, args[i]));
 }  

  let message_to_send = "";
  for (let i = 0; i < list_of_players.length; i++) {

    message_to_send += list_of_players[i].toString()
  }


  let send = await message.channel.send(`${message_to_send}, you are now playing a game of what the is that word. React to this message to begin`);


   await send.react("👍")
  const filter = (reaction:Discord.MessageReaction, user:Discord.User) => {

    for (let i = 0; i < list_of_players.length; i++) {
      if (user.id == undefined || user.id == null) return false;
      if (user.id === list_of_players[i].id) {console.log("asdf"); return true};
    }

    return false;
  };
  let readyPlayers: Discord.Collection<any, any> = new Discord.Collection();




  const collector = send.createReactionCollector({ filter, max:list_of_players.length, time: 15000 });
  collector.on('collect', async (reaction, user) => {
    readyPlayers.set(user.id, user);
    await send.edit(`${message_to_send}, you are now playing a game of what the fuck is that word. React to this message to begin (${readyPlayers.size}/${list_of_players.length})`);
    
    console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
  });

  // collector.on('end', collected => {
  //   if (collected.size < list_of_players.length) {
  //     send.channel.send("Not enough players reacted, game cancelled");
  //     return
  //   }
  //   send.edit("Game started");
    
  // });

  try{
    const reactions = await send.awaitReactions({ filter, max:list_of_players.length , time: 15000, errors: ['time','max'] })

//something here

  } catch(e) {
    console.log(e)

    send.channel.send("Not enough players reacted, game cancelled");
    return 
  }



  const countdown = await message.channel.send("Please select a random word from your imagination and type it in the chat in 5 secconds..") 
  await sleep(1500);
  await countdown.edit("4")
  await sleep(1500);
  await countdown.edit("3")
  await sleep(1500);
  await countdown.edit("2")
  await sleep(1500);
  await countdown.edit("1")
  await sleep(1500);
  await countdown.edit(`${message_to_send} GO!`)
  // // @ts-ignore TODO: fix all the ts-ignores
  // const collector = await send.createReactionCollector({ filter, max:list_of_players.length, time: 2000 });

  // collector.on('collect', (reaction, user) => {
  //   readyPlayers.push(user)
  //   send.edit(`${message_to_send}, you are now playing a game of what the fuck is that word. React to this message to begin (${readyPlayers.length}/${list_of_players.length})`);
    
  //   console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
  // });

  // collector.on('end', collected => {
  //   if (collected.size < list_of_players.length) {
  //     send.channel.send("Not enough players reacted, game cancelled");
  //     return
  //   }
  //   send.edit("Game started");
    
  // });
}

export const description: DescriptionTypes = {
  name: 'test',
  description: 'game command',
  usage: 'mention as many players as you want to join',
  };

export interface DescriptionTypes {
  name: string;
  aliases?: string[];
  description: string;
  usage: string;
}