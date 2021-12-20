pragma solidity >=0.4.22 <0.7.0;


contract Stock {
    
    address private _owner;
    uint256 private stocksLength;
    mapping(string => Stock) public stocks;

    modifier isOwner() {
        require(msg.sender == _owner);
        _;
    }
    
    struct Stock{
        string stockId;
        string owner;
        string status;
        uint price;
        string wallet;
        uint256 nominalValue;
    }


    modifier validOwner() {
        require(msg.sender == _owner);
        _;
    }
    
    
    event TransferStock(string  from, string  to, string stockId);
    
    constructor()
        public {
        _owner = msg.sender;
        stocksLength = 0;
    }
    
    function addStock(string memory stockId, string memory owner, string memory status, uint price, string memory wallet, uint256 nominalValue)
        
        public {
        stocksLength++;
        stocks[stockId] = Stock(stockId, owner,status, price, wallet, nominalValue);
    }
    
    
    
    function transferTo(string memory _from, string memory  _to, string memory stockId) 
        validOwner
        public {
        
        //Stock memory tmp = stocks[stockId];
        //tmp.owner = _to;
        stocks[stockId].owner = _to;
        emit TransferStock(_from, _to,stockId);

    }
        
}
