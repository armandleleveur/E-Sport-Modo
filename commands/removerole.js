const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("Désolé mon pote, tu ne peux pas faire ça.");
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!rMember) return message.reply("Impossible de trouver cet utilisateur");
  let role = args.join(" ").slice(22);
  if(!role) return message.reply("Indiquez un rôle!");
  let gRole = message.guild.roles.find(`name`, role);
  if(!gRole) return message.reply("Impossible de trouver ce rôle.");

  if(!rMember.roles.has(gRole.id)) return message.reply("Ils n'ont pas ce rôle.");
  await(rMember.removeRole(gRole.id));

  try{
    await rMember.send(`RIP, vous avez perdu le ${gRole.name} rôle.`)
  }catch(e){
    message.channel.send(`RIP à <@${rMember.id}>, Nous avons enlevé ${gRole.name} d'eux. Nous avons essayé de les DM, mais leurs DM sont bloqués.`)
  }
}

module.exports.help = {
  name: "removerole"
}
