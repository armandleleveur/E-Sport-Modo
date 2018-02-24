const Discord = require ("discord.js")

module.exports.run = async (bot, message, args) => {

    let helpembed = new Discord.RichEmbed()
    .setDescription("Help Menu")
    .setColor("#ffffff")
    .addField("Help Commandes", "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
    .addField(" - help : avoir les commandes", "!help")
    .addField(" - serverinfo : avoir les info du serveur", "!serverinfo")
    .addField(" - botinfo : information du bot", "!botinfo")
    .addField(" - report : report un utilisateur", "!report @? [raison]");

    try{
        await message.author.send(helpembed);
    }catch(e){
        message.reply("Vos SM sont verrouillés. Je ne peux pas vous envoyer les commandes de la foule.");
    }


    if(message.member.hasPermission("MANAGE_MESSAGES")){
    let modembed = new Discord.RichEmbed()
    .setDescription("Modération Help Menu")
    .setColor("#009900")
    .addField("Modération Commandes", "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
    .addField(" - addrole : ajouter un role a un utilisateur", "!addrole @? [role]")
    .addField(" - removerole : supprimer un role a un utilisateur", "!removerole @? [role]")
    .addField(" - kick : expulsé un utlisateur du serveur", "!kick @? [raison]")
    .addField(" - warn : mettre un avertissement a un utilisateur", "!warn @? [raison]")
    .addField(" - warnlevel : combien d'avertissement", "!warnlevel @?")
    .addField(" - ban : bannir un utilisateur du serveur", "!ban @? [raison]")
    .addField(" - clear : netoyé le channel", "!clear [nombre de msg]")
    .addField(" - tempmute : mute un utilisateur", "!tempmute @? [1s/m/h/d");

    try{
        await message.author.send(modembed);
    }catch(e){
        message.reply("Vos SM sont verrouillés. Je ne peux pas vous envoyer les commandes de la foule.");
    }
}

}


module.exports.help = {
    name: "help"
}