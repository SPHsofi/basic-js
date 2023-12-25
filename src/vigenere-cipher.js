const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {
  constructor(isDirect = true) {
    this.isDirect = isDirect;
  }

  validateInputs(message, key) {
    if (!message || !key) {
      throw new Error("Incorrect arguments!");
    }
  }
  
  encrypt(message, key) {
    this.validateInputs(message, key);

    const repeatedKey = this.repeatKey(key, message.length);
    const encryptedChars = message.split('').map((char, index) => {
      if (char.match(/[A-Za-z]/)) {
        const baseCharCode = char.toUpperCase().charCodeAt(0);
        const keyCharCode = repeatedKey[index].toUpperCase().charCodeAt(0);
        const encryptedCharCode = (baseCharCode + keyCharCode) % 26 + 'A'.charCodeAt(0);
        return String.fromCharCode(encryptedCharCode);
      } else {
        return char;
      }
    });

    return this.isDirect ? encryptedChars.join('') : encryptedChars.reverse().join('');
  }

  decrypt(encryptedMessage, key) {
    this.validateInputs(encryptedMessage, key);

    const repeatedKey = this.repeatKey(key, encryptedMessage.length);

    const decryptedChars = encryptedMessage.split('').map((char, index) => {
      if (char.match(/[A-Za-z]/)) {
        const baseCharCode = char.toUpperCase().charCodeAt(0);
        const keyCharCode = repeatedKey[index].toUpperCase().charCodeAt(0);
        const decryptedCharCode = (baseCharCode - keyCharCode + 26) % 26 + 'A'.charCodeAt(0);
        return String.fromCharCode(decryptedCharCode);
      } else {
        return char;
      }
    });

    return this.isDirect ? decryptedChars.join('') : decryptedChars.reverse().join('');
  }

  repeatKey(key, length) {

    const repeatedKey = [];
    let keyIndex = 0;

    for (let i = 0; i < length; i++) {
      if (keyIndex === key.length) {
        keyIndex = 0;
      }
      repeatedKey.push(key[keyIndex]);
      keyIndex++;
    }

    return repeatedKey.join('');
  }
}

module.exports = {
  VigenereCipheringMachine
};
