const repository = require('../repository');

async function signAccount(req,res, next){
    console.log(req.user);
    const stock = {
        stockId: req.body.stockId,
        status: req.body.status,
        price: parseInt(req.body.price),
        nominalValue: parseInt(req.body.nominalValue),
        owner: '',
        wallet:''
    };
    repository.signAccount(stock, req.user.private_key, req.user.public_key);
    next();
}

module.exports = signAccount;