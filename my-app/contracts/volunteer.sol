// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract volunteer{
    uint public numoffunders;
    address public owner;

    mapping(uint=>address) private funders;
    mapping(address=>bool) private successfunders;

    constructor(){
        owner = msg.sender;
    }
    modifier onlyOwner{
        require(msg.sender == owner , "only the owner can only withdraw.");
        _;
    }

    function denote() public payable{
        address funder = msg.sender;
        if(!successfunders[funder]){
            uint indx = numoffunders++;
            funders[indx] = funder;
            successfunders[funder] = true;
        }
    }

    function getContractBalance()public view returns(uint){
        return address(this).balance;
    }

    function withdraw(uint amount) public onlyOwner{
        require(amount <= 20000000000000000 ,"the withdraw amount should be less than 0.2 ether.");
        payable(msg.sender).transfer(amount);
    }

    
}