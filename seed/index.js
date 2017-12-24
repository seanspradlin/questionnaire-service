const Store = require('../lib/store');
const { Question } = require('../lib/models');
const seedQuestions = require('./seed-questions');

module.exports = (client) => {
  const store = new Store(client);
  return Promise.all(seedQuestions.map(q => store.saveQuestion(new Question(q))));
};
