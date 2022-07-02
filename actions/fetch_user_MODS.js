module.exports = {
  name: 'Fetch User MOD',
  section: 'Member Control',
    meta: {
      version: '2.1.5',
      preciseCheck: true,
      author: '[XinXyla - 172782058396057602]',
      authorUrl: 'https://github.com/DBM-Mods/Portugues',
      downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
    },

  subtitle (data) {
    return `${data.User}`
  },

  variableStorage (data, varType) {
    const type = parseInt(data.storage)
    if (type !== varType) return
    return ([data.varName, 'User'])
  },

  fields: ['User', 'storage', 'varName'],

  html (isEvent, data) {
    return `
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Versão 0.2</div>
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">dbmmods.com</div>
  <div style="padding-top: 8px;">
  <span class="dbminputlabel">Buscar usuário pelo ID</span><br>
    <textarea class="round" id="User" rows="1" placeholder="" style="width: 99%; font-family: monospace; white-space: nowrap; resize: none;"></textarea>
  </div><br>
</div>
<div style="padding-top: 8px;">
  <div style="float: left; width: 35%;">
  <span class="dbminputlabel">Armazenar em</span><br>
    <select id="storage" class="round">
      ${data.variables[1]}
    </select>
  </div>
  <div id="varNameContainer" style="float: right; width: 60%;">
  <span class="dbminputlabel">Nome da Variável</span><br>
    <input id="varName" class="round" type="text">
  </div>`
  },

  init () {},

  action (cache) {
    const data = cache.actions[cache.index]
    const User = this.evalMessage(data.User, cache)
    const client = this.getDBM().Bot.bot

    client.users.fetch(User).catch(console.error).then((User) => {
      const storage = parseInt(data.storage)
      const varName = this.evalMessage(data.varName, cache)
      this.storeValue(User, storage, varName, cache)
      this.callNextAction(cache)
    })
  },


  mod () {}
}
