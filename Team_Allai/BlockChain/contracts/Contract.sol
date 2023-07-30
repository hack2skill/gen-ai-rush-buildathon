pragma solidity ^0.8.0;
//SPDX-License-Identifier: MPL-2.0

contract Contract {
    address owner;
    mapping(address => bool) whiteList;
    uint256[] requests;
    mapping(uint256 => string) Data;
    mapping(uint256 => uint) status;
    uint256 count = 0;
    mapping(uint256 => bool) deleted;
    mapping(uint256 => uint256) sosNum;

    struct OperationData {
        uint256 id;
        string data;
        uint256 status;
    }

    constructor() {
        owner = msg.sender;
        whiteList[msg.sender] = true;
    }

    function addToWhitelist(address op) public {
        require(msg.sender == owner, "Only Owner can whitelist others!");
        whiteList[op] = true;
    }

    function removeFromWhitelist(address op) public {
        require(msg.sender == owner, "Only Owner can remove others from Whitelist!");
        whiteList[op] = false;
    }

    function addOperation(uint256 id, string calldata D) public {
        require(whiteList[msg.sender], "You are not whitelisted!");
        requests.push(id);
        count++;
        Data[id] = D;
    }

    function setStatus(uint256 id, uint256 s) public {
        require(whiteList[msg.sender], "You are not whitelisted!");
        status[id] = s;
    }

    function delReq(uint256 id) public{
        require(msg.sender==owner,"Only Owner can delete Requests!");
        deleted[id] = true;
    }

    function getOperations() public view returns (OperationData[] memory) {
        require(whiteList[msg.sender], "You are not whitelisted!");
        OperationData[] memory candidateData = new OperationData[](count);
        uint256 res_count = 0;
        for (uint256 i = 0; i < count; i++) {
            if(!deleted[requests[i]]){
                candidateData[res_count] = OperationData(requests[i], Data[requests[i]], status[requests[i]]);
                res_count++;
            }
        }
        OperationData[] memory res = new OperationData[](res_count);
        for (uint256 i = 0; i < res_count; i++) {
            res[i] = candidateData[i];
        }
        return res;
    }

    function isWhiteListed() public view returns(bool){
        return whiteList[msg.sender];
    }

    function setSOSNum(uint256 un,uint256 sn) public {
        sosNum[un] = sn;
    }

    function getSOSNum(uint256 un) public view returns(uint256){
        return sosNum[un];
    }
}
