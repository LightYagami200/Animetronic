const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      permissionLevel: 5,
      requiredPermissions: ['MANAGE_ROLES'],
      runIn: ['text'],
      description: 'Mute a member',
      usage: '<member:member>'
    });
  }

  async run(msg, [member]) {
    // if (member.id === msg.member.id)
    //   return msg.reply("You can't mute yourself baka!");
    if (member.id === this.client.user.id)
      return msg.reply("You can't mute me baka!");
    if (!msg.guild.settings.mutedRole)
      return msg.reply("Ooops! You haven't set up the muted role yet");

    //Mute
    member.roles.each(async role => {
      if (role.name === '@everyone') return;
      await member.roles.remove(role);
      await member.user.settings.update(
        'roles',
        [...member.user.settings.roles, role.id],
        { action: 'overwrite' }
      );
      console.log(member.user.settings);
    });

    await member.roles.add(msg.guild.settings.mutedRole);

    msg.channel.send('Member Muted');
  }
};
