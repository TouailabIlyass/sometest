const { wrap } = require('async-middleware');

const loadPage = require('./commands/load-page');
const createStock = require('./commands/createStock');
const signAccount = require('./commands/sign-account');


function isAuthenticated(req, res, next) {
    if (req.user && req.isAuthenticated()) {
      return next();
    }
  
    return res.redirect('/login');
}


module.exports = router => {
    router.get('/stock', isAuthenticated, wrap(loadPage));

    router.post('/stock/create',isAuthenticated,wrap(signAccount), async(req,res)=>{
        console.log('body',req.body);
        const stock = {
            stockId: req.body.stockId,
            status: req.body.status,
            price: parseInt(req.body.price),
            nominalValue: parseInt(req.body.nominalValue),
            owner: '',
            wallet:''
        };
        const result = await createStock(stock);
        res.send(result);
    });
        
    return router;
  };