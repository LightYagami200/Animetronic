const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      permissionLevel: 5,
      requiredPermissions: ['MANAGE_ROLES'],
      runIn: ['text'],
      description: 'Unmute a member',
      usage: '<member:member>'
    });
  }

  async run(msg, [member]) {
    if (!msg.guild.settings.mutedRole)
      return msg.reply("Ooops! You haven't set up the muted role yet");
    if (!member.roles.has(msg.guild.settings.mutedRole))
      return msg.reply(
        "Ooops! The member you're tryna unmute isn't even muted"
      );

    //Unmute
    await member.roles.remove(msg.guild.settings.mutedRole);

    member.user.settings.roles.forEach(async role => {
      await member.roles.add(role);
    });

    await member.user.settings.update([]);

    msg.channel.send('Member Unmuted');
  }
};
