const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {

  //!warn @daeshan <reason>
  if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("Tu n'as pas les perms");
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!wUser) return message.reply("Impossible de les trouver");
  if(wUser.hasPermission("MANAGE_MESSAGES")) return message.reply("Tu ne peut pas le warn");
  let reason = args.join(" ").slice(22);

  if(!warns[wUser.id]) warns[wUser.id] = {
    warns: 0
  };

  warns[wUser.id].warns++;

  fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
    if (err) console.log(err)
  });

  let warnEmbed = new Discord.RichEmbed()
  .setDescription("Warns")
  .setAuthor(message.author.username)
  .setColor("#fc6400")
  .addField("Utilisateur averti", `<@${wUser.id}>`)
  .addField("Avertis en", message.channel)
  .addField("Nombre d'avertissements", warns[wUser.id].warns)
  .addField("Raison", reason);

  let warnchannel = message.guild.channels.find(`name`, "moderation");
  if(!warnchannel) return message.reply("Impossible de trouver la chaîne");

  warnchannel.send(warnEmbed);

  if(warns[wUser.id].warns == 2){
    let muterole = message.guild.roles.find(`name`, "muted");
    if(!muterole) return message.reply("Vous devriez créer ce rôle.");

    let mutetime = "10s";
    await(wUser.addRole(muterole.id));
    message.channel.send(`<@${wUser.id}> a été temporairement coupé`);

    setTimeout(function(){
      wUser.removeRole(muterole.id)
      message.reply(`<@${wUser.id}> a été désactivé.`)
    }, ms(mutetime))
  }
  if(warns[wUser.id].warns == 3){
    message.guild.member(wUser).ban(reason);
    message.reply(`<@${wUser.id}> a été banni.`)
  }

}

module.exports.help = {
  name: "warn"
}
