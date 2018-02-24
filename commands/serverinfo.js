const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Server Information")
    .setColor("#15f153")
    .setThumbnail(sicon)
    .addField("Nom du serveur", message.guild.name)
    .addField("Créé le", message.guild.createdAt)
    .addField("Vous avez rejoint", message.member.joinedAt)
    .addField("Total des membres", message.guild.memberCount);

    try{
      await message.author.send(serverembed);
  }catch(e){
      message.reply("Vos SM sont verrouillés. Je ne peux pas vous envoyer les commandes de la foule.");
  }
}

module.exports.help = {
  name:"serverinfo"
}
