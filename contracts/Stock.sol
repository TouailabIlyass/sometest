// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0 <0.9.0;

//import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract StockContract is ERC721URIStorage {
    
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
    
    constructor(string memory _name, string memory _symbol) ERC721 (_name, _symbol){
        _owner = msg.sender;
        stocksLength = 0;
    }
    
    function addStock(string memory stockId, string memory owner, string memory status, uint price, string memory wallet, uint256 nominalValue)
        
        public returns (uint256){
        stocksLength++;
        stocks[stockId] = Stock(stockId, owner,status, price, wallet, nominalValue);
        
        uint256 currentStock = stocksLength;

        //safely mint token for the person that called the function
        _safeMint(msg.sender, currentStock);
        
        _setTokenURI(currentStock, stockId);
    
        return currentStock;
    
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