const Web3 = require('web3');

const StockContract = require('../../../build/contracts/Stock.json');

const createStock = async(stock) => {
    const web3 = new Web3(process.env.GANACH_URL);

    const id = await web3.eth.net.getId();
    const accounts = await web3.eth.getAccounts();
    const deployedNetwork = StockContract.networks[id];
    const contract = new web3.eth.Contract(
        StockContract.abi,
        deployedNetwork.address,{from: accounts[0],gas: 3000000}
    );

    console.log(id, deployedNetwork.address, accounts[0],stock);
    try{
   //let result = await contract.methods.addStock(stock.stockId, stock.owner,stock.status, stock.price, stock.wallet, stock.nominalValue).send({from:accounts[0]});
   //console.log(result);
   result = await contract.methods.stocks('st1').call();
   //console.log(result);
   return result;
    }catch(e)
    {
        console.log(e);
    }
}

module.exports = createStock;