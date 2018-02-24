const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("Impossible de trouver l'utilisateur!");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("Non, tu n'as pas les perms");
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Cette personne ne peut pas être expulsée!");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("~Ban~")
    .setColor("#bc0000")
    .addField("Banned User", `${bUser} with ID ${bUser.id}`)
    .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Banned In", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", bReason);

    let incidentchannel = message.guild.channels.find(`name`, "moderation");
    if(!incidentchannel) return message.channel.send("Impossible de trouver le canal des incidents.");

    message.guild.member(bUser).ban(bReason);
    incidentchannel.send(banEmbed);
}

module.exports.help = {
  name:"ban"
}
