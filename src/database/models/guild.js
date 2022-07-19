const { Schema, model } = require('mongoose');

const guidSchema = new Schema({
    _id: String,
    welcome: {
        channel: String,
    },
    autorole: {
        role: String,
    }
})


module.exports = model('guilds', guidSchema);