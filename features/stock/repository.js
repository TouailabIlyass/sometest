const knex = require('../../db');
var fs = require('fs');
var path = require('path');
const EthUtil=require('ethereumjs-util');
const { date } = require('joi');


async function getUserKeys(id) {
    const [keys] = await knex('users')
      .where('id', id)
      .select('private_key','public_key');
    return keys;
}

async function signAccount(account, privateKey, publicKey){

    const accountToSign = JSON.stringify(account);
    console.log(accountToSign);
    const keccak256hash = EthUtil.keccak256(new Buffer(accountToSign));
    console.log("keccak256hash",keccak256hash)
    const messageHash = keccak256hash.toString('hex');
    console.log("messageHash",messageHash);
    const ecSignature = EthUtil.ecsign(keccak256hash, new Buffer(privateKey, 'hex') )
    console.log("signature 2", ecSignature);
    const v = EthUtil.bufferToHex(ecSignature.v);
    const r = EthUtil.bufferToHex(ecSignature.r);
    const s = EthUtil.bufferToHex(ecSignature.s);
    console.log("v ",v,ecSignature.v);
    console.log("r ",r);
    console.log("s ",s);
    const aggregatedSignature= r+s.substring(2)+v.substring(2);
    console.log("signature rvc",aggregatedSignature)
    const qrUrl= {'hash':messageHash, 'signature':aggregatedSignature,'publicKey':publicKey};
    let objJsonStr = JSON.stringify(qrUrl);
    let base64Qr = Buffer.from(objJsonStr).toString("base64");
    console.log(base64Qr);

}

module.exports = {
    getUserKeys,
    signAccount
  };
  