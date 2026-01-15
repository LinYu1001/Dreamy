// db/contacts.js
const Datastore = require('nedb-promises');
const path = require('path');

const contactsDB = Datastore.create({
  filename: path.join(__dirname, 'db/contacts.db'),
  autoload: true
});

module.exports = { contactsDB };
