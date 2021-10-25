import {requiredField, tooLongField, tooShortField, onlyWhitespaces, emailField, shortPassword, linkField, uniqueField } from '@/use/validations';

describe('validation tests', () => {
  let response = null;

  it('requiredField', () => {
    response = requiredField('test');
    expect(response).toEqual(true);

    response = requiredField(1);
    expect(response).toEqual(true);

    response = requiredField('');
    expect(response).toEqual('Field is required');
  });

  it('tooLongField', () => {
    response = tooLongField('test');
    expect(response).toEqual(true);

    response = tooLongField('');
    expect(response).toEqual(true);

    response = tooLongField('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.');
    expect(response).toEqual('Field is too long');
  });

  it('tooShortField', () => {
    response = tooShortField('test');
    expect(response).toEqual(true);

    response = tooShortField('');
    expect(response).toEqual(true);

    response = tooShortField('t');
    expect(response).toEqual('Field is too short');
  });

  it('onlyWhitespaces', () => {
    response = onlyWhitespaces(' test ');
    expect(response).toEqual(true);

    response = onlyWhitespaces('');
    expect(response).toEqual(true);

    response = onlyWhitespaces('\t');
    expect(response).toEqual('Field contains only whitespaces');

    response = onlyWhitespaces('  ');
    expect(response).toEqual('Field contains only whitespaces');
  });

  it('emailField', () => {
    response = emailField('abc@xyz.com');
    expect(response).toEqual(true);

    response = emailField('');
    expect(response).toEqual(true);

    response = emailField('abc@xyz');
    expect(response).toEqual('E-mail must be valid');

    response = emailField('xyz.com');
    expect(response).toEqual('E-mail must be valid');

    response = emailField('xyz');
    expect(response).toEqual('E-mail must be valid');
  });

  it('shortPassword', () => {
    response = shortPassword('abcdefghijkl');
    expect(response).toEqual(true);

    response = shortPassword('');
    expect(response).toEqual(true);

    response = shortPassword('abc');
    expect(response).toEqual('Password is too short');
  });

  it('linkField', () => {
    response = linkField('https://stackoverflow.com/');
    expect(response).toEqual(true);

    response = linkField('http://link');
    expect(response).toEqual(true);

    response = linkField('');
    expect(response).toEqual(true);

    response = linkField('https:/stackoverflow.com/');
    expect(response).toEqual('Please provide a correct link');

    response = linkField('http//stackoverflow.com/');
    expect(response).toEqual('Please provide a correct link');
  });

  it('uniqueField', () => {
    const listItems = ['abc', 'def', 'ghi'];

    response = uniqueField('test', listItems);
    expect(response).toEqual(true);

    response = uniqueField('def', listItems, true);
    expect(response).toEqual('This field should be unique');

    response = uniqueField('', listItems, true);
    expect(response).toEqual(true);

    response = uniqueField('test', [], true);
    expect(response).toEqual(true);

    response = uniqueField('', []);
    expect(response).toEqual(true);
  });
});
