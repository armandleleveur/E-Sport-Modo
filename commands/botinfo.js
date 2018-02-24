const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setDescription("Bot Information")
    .setColor("#15f153")
    .setThumbnail(bicon)
    .addField("Bot Nom", bot.user.username)
    .addField("Créer le", bot.user.createdAt);

    try{
      await message.author.send(mbotembed);
  }catch(e){
      message.reply("Vos SM sont verrouillés. Je ne peux pas vous envoyer les commandes de la foule.");
  }
}

module.exports.help = {
  name:"botinfo"
}
