const bip39 = require('bip39');
const { ethers }  = require('ethers');
const fs = require('fs');

const derivationPath = "m/44'/60'/0'/0";
let etherscanProvider = new ethers.providers.EtherscanProvider();

fs.readFile('wordlists.txt', 'utf8', function (err, content) {
  let wordlist = content.split('\n');
  wordlist.forEach(word1 => {
    wordlist.forEach(word2 => {
        wordlist.forEach(word3 => {
            let word = `${word1} garment ${word2} advance mesh film comic mansion shaft blossom fee ${word3}`
            if (bip39.validateMnemonic(word)) {
                var hdNode = ethers.utils.HDNode.fromMnemonic(word);
                var childNode = hdNode.derivePath(derivationPath + '/' + 0);

                var w = new ethers.Wallet(childNode.privateKey);

                etherscanProvider.getHistory(w.address).then((history) => {
                    if(history) {
                        console.log(w.address+ ' : ' +word);
                    }
                });
            }
        })
    })
  });

});