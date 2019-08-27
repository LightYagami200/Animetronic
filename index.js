//=====================
//DEPENDENCIES
//=====================
const { Client } = require('klasa');
const keys = require('./config/keys');
//=====================

//=====================
//SCHEMAS
//=====================
//-> Guild Schema
Client.defaultGuildSchema.add('mutedRole', 'role');

//-> User Schema
Client.defaultUserSchema.add('roles', 'string', { array: true });
//=====================

//=====================
//INIT
//=====================

//-> Klasa Client
(async () => {
  const client = await new Client({
    fetchAllMembers: false,
    prefix: '-',
    commandEditing: true,
    noPrefixDM: true,
    owners: [
      '338334949331697664' //Light Yagami
    ],
    readyMessage: () => 'Bot ready'
  });

  await client.login(keys.discordBotToken);
})();
//=====================
