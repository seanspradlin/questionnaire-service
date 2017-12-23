process.env.NODE_ENV = 'test';

const { assert } = require('chai');
const { Question } = require('../../lib/models');

describe('question', () => {
  it('should be a function', () => {
    assert.isFunction(Question);
  });

  it('should have a question', () => {
    // Given
    const values = {
      question: 'What is 2 + 2?',
      answers: ['1', '2', '3'],
    };

    // When
    const question = new Question(values);

    // Then
    assert.isString(question.question);
  });

  it('should have answers', () => {
    // Given
    const values = {
      question: 'What is 2 + 1?',
      answers: ['1', '2', '3'],
    };

    // When
    const question = new Question(values);

    // Then
    assert.isArray(question.answers);
  });

  it('should throw error if question is not provided', () => {
    // Given
    const values = {
      answers: ['1', '2', '3'],
    };

    // When
    const instantiate = () => new Question(values);

    // Then
    assert.throws(instantiate);
  });

  it('should throw an error if question is not a string', () => {
    // Given
    const values = {
      question: 42,
      answers: ['1', '2', '3'],
    };

    // When
    const instantiate = () => new Question(values);

    // Then
    assert.throws(instantiate);
  });

  it('should throw an error if no answers are provided', () => {
    // Given
    const values = {
      question: 'What is 2 + 1?',
    };

    // When
    const instantiate = () => new Question(values);

    // Then
    assert.throws(instantiate);
  });

  it('should throw an error if answers are not an array of strings', () => {
    // Given
    const values = {
      question: 'What is 2 + 1?',
      answers: [1, 2, 3],
    };

    // When
    const instantiate = () => new Question(values);

    // Then
    assert.throws(instantiate);
  });

  it('should throw an error if there are less than two answers', () => {
    // Given
    const values = {
      question: 'What is 2 + 2?',
      answers: ['3'],
    };

    // When
    const question = new Question(values);

    // Then
    assert.isString(question.question);
  });
});
