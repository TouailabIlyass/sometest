const Stock = artifacts.require('Stock');

contract('Stock', ()=>{

    let stock = null;
    before(async() =>{
       stock = await Stock.deployed();
    });

    it('Should create a new Stock', async()=>{
        await stock.addStock('st1', 'owner1','status1', 800, 'wallet1', 800);
        const stocks = await stock.stocks('st1');
        assert(stocks.stockId === 'st1');
    });
});