/*
the obj id is almost uniq but not 100%
_id: 5a72578ab85637463765784e6a
// 12 bytes
    // 4 bytes: timestamp
    // 3 bytes: machine identifier
    // 2 bytes: process identifier
    // 3 bytes: counter

    // 1 byte = 8 bits
    2^8 = 256
    // 2^24 = 16M
*/

//generate an Id

const mongoose = require('mongoose');

const id = new mongoose.Types.ObjectId();
console.log(id.getTimestamp());
console.log(id);

const isValid = mongoose.Types.ObjectId.isValid('1234');
console.log(isValid);