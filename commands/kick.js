const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("Impossible de trouver l'utilisateur!");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Non, tu n'as pas les perms");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Cette personne ne peut pas être expulsée!");

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("~Kick~")
    .setColor("#e56b00")
    .addField("Kicked Utilisateur", `${kUser} avec ID ${kUser.id}`)
    .addField("Kicked Par", `<@${message.author.id}> avec ID ${message.author.id}`)
    .addField("Kicked Dans", message.channel)
    .addField("Temps", message.createdAt)
    .addField("Raison", kReason);

    let kickChannel = message.guild.channels.find(`name`, "moderation");
    if(!kickChannel) return message.channel.send("Impossible de trouver le canal des incidents.");

    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);
}

module.exports.help = {
  name:"kick"
}
