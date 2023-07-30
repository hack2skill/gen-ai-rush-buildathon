import "./App.css";
import React, { useState, useEffect, useReducer, useContext } from "react";
import { ethers } from "ethers";
import { Web3Provider } from "@ethersproject/providers";
import { getAddress } from "ethers";
import PhoneNum from "./res/PhoneNum.png";
import Ilustration from "./res/hero-img.svg"
import OperationsPage from "./components/operations";
import { ChakraProvider } from "@chakra-ui/react";
import { ContractAddress } from './config.js';
import ContractAbi from './utils/Contract.json';
import { Appcontext } from "./components/context";
import { AiOutlineMessage, AiOutlinePhone } from "react-icons/ai";
import { Link } from "react-router-dom";


function App() {
  const { changeID, setChangeID, changeStatus, setChangeStatus } = useContext(Appcontext);
  const [currentAccount, setCurrentAccount] = useState(""); //fetched from metamask
  const [correctNetwork, setCorrectNetwork] = useState(false); //fetched from metamas
  const [operations, setOperations] = useState([]); //fetched from smart contract
  const [validatedOperations, setValidatedOperations] = useState([]); //fetched from smart contract
  const [whitelisted, setWhiteListed] = useState(false); //fetched from smart contract
  //Ethereum Wallet Connector
  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Metamask Not Found ! Get MetaMask and Try Again.");
        return;
      }

      let chainId = await ethereum.request({ method: "eth_chainId" });
      const EthereumChainId = "0xaa36a7";
      if (chainId !== EthereumChainId) {
        alert("Please Connect to Ethereum Testnet");
        return;
      } else {
        setCorrectNetwork(true);
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  function copyPhoneNumberToClipboard() {
    const phoneNumber = "+12707704034";
    navigator.clipboard.writeText(phoneNumber)
      .then(() => {
        window.alert("Copied phone number to clipboard!");
      })
      .catch((error) => {
        window.alert("Could not copy phone number to clipboard.");
        console.error(error);
      });
  }

  function openInNewTab() {
    var win = window.open('https://metamask.io', '_blank');
    win.focus();
  }

  const getEmergencies = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        //setting up provider
        const provider = new Web3Provider(ethereum);
        const signer = provider.getSigner();
        const MyContract = new ethers.Contract(ContractAddress, ContractAbi.abi, signer);
        //calling the smart contract
        let Em_Data = await MyContract.getOperations();
        const formattedOperations = Em_Data.map((operationData) => {
          return {
            id: parseInt(operationData.id),
            data: operationData.data,
            status: parseInt(operationData.status),
          };
        });

        const res = formattedOperations.map((operationObject) => {
          let td = (operationObject.data).replace(/'/g, '"')
          let temp = JSON.parse(td);
          return {
            id: operationObject.id,
            name: temp.name,
            location: temp.location || temp.Location,
            priority: temp.priority,
            attention: temp.attention,
            callerNumber: temp.caller_number,
            time: temp.time,
            status: operationObject.status,
            transcript: temp.transcription || "404"
          };
        });
        setOperations(res);
      }
      else {
        console.log('Ethereum object not found');
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getWhitelisted = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        //setting up provider
        const provider = new Web3Provider(ethereum);
        const signer = provider.getSigner();
        const MyContract = new ethers.Contract(ContractAddress, ContractAbi.abi, signer);
        //calling the smart contract
        let wl_data = await MyContract.isWhiteListed();
        setWhiteListed(wl_data);
      }
      else {
        console.log('Ethereum object not found');
      }
    } catch (error) {
      console.log(error);
    }
  }

  const updateHandler = async (user_num, sos_num) =>{
    console.log('nums : ',user_num," , ",sos_num);
    try{
      //setting up provider
      const {ethereum} = window;
      if(ethereum){
        const provider = new Web3Provider(ethereum);
        const signer = provider.getSigner();
        const MyContract = new ethers.Contract(ContractAddress, ContractAbi.abi, signer);//this step is to connect to the smart contract
        //calling the smart contract
        MyContract.setSOSNum(user_num, sos_num)
        .then(response => {
          console.log("Updated SOS");
          alert("SOS Updated");
        })
        .catch(err => {
          console.log(err);
        });
      }
      else{
        console.log('Ethereum object not found');
      }
    }catch(error){
      console.log(error);
    }
  }


  useEffect(() => {
    if (changeID !== false) {
      const updateStatus = async () => {
        try {
          const { ethereum } = window;
          if (ethereum) {
            //setting up provider
            const provider = new Web3Provider(ethereum);
            const signer = provider.getSigner();
            const MyContract = new ethers.Contract(ContractAddress, ContractAbi.abi, signer);
            //calling the smart contract
            MyContract.setStatus(changeID, changeStatus).then(
              response => {
                getEmergencies();
              }
            ).catch(err => {
              console.log(err);
            });

          }
          else {
            console.log('Ethereum object not found');
          }
        } catch (error) {
          console.log(error);
        }
      }
      updateStatus();
    }
  }, [changeID, changeStatus])

  useEffect(() => {
    connectWallet();
    getEmergencies();
    getWhitelisted();
  }, [connectWallet, getEmergencies, currentAccount, getWhitelisted]);


  return (
    <div className="App">
      {currentAccount === "" ? (
        <>
          <div className="container my-6 md:my-8 md:mx-4 lg:my-12 mx-2 lg:mx-10">
            <div className="grid grid-cols-12">
              <div className="lg:h-[80dvh] h-auto flex flex-col justify-center col-span-12 md:col-span-5 md:order-1 order-2">
                <div className="mx-3 lg:mx-12">
                  <div className="text-4xl font-bold">Saaha-AI</div>
                  <div className="my-6">
                    Saaha-AI system lets callers talk to AI if there are no available 911 operators, grading them on the scale of how important their call is based on the keywords and recording their location. While the responses are being gathered, it will prioritize their call and hand over the call transcript to the 911 operator.
                  </div>
                  <div className="flex gap-4 items-center">
                    <button onClick={connectWallet} className="bg-[#52057B] p-3 px-6 text-white rounded-xl">Connect Wallet</button>
                    <Link to={{
       pathname: '/chat',
       data:{
          updatefunc: updateHandler
       }
    }}>
            <p className="text-[#52057B] text-lg underline underline-offset-8 cursor-pointer " >Continue to Chat</p>
            
          </Link>
                    
                  </div>
                </div>
              </div>
              <div className="col-span-12 md:col-span-7 order-1 lg:order-3">
                <div className="lg:h-[80dvh] my-5 md:my-0 flex justify-center flex-col gap-3">
                  <div className="flex justify-end">
                    <div className="relative right-5 flex items-center cursor-pointer" onClick={copyPhoneNumberToClipboard}>
                      <div className="p-2 bg-[#52057B] border-r-4 border-white rounded-full text-white absolute -left-5 "><AiOutlinePhone className="text-3xl" /></div>
                      <div className="text-white bg-[#52057B] p-2 px-8 rounded-full">+12707704034</div>
                    </div>
                  </div>
                  <img src={Ilustration} alt="illustration" />
                </div>
              </div>
            </div>
          </div>
          <Link to={{
       pathname: '/chat',
       data:{
          updatefunc: updateHandler
       }
    }}>
            <div className="fixed right-5 bottom-5 z-50 px-5 py-3 cursor-pointer">
              <AiOutlineMessage className="text-6xl bg-[#52057B] text-white p-3 rounded-full absolute bottom-0 top= right-0 m-4" />
            </div>
          </Link>
        </>
      ) : currentAccount === "" ? (
        <div
          className="flex flex-col justify-center items-center mb-20 font-bold text-2xl gap-y-3"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "bold",
            fontSize: "26px",
            width: "100%",
            height: "100vh",
          }}
        >
          <div>-----------------------------------------</div>
          <div>Please connect to the Ethereum Testnet</div>
          <div>and reload the page</div>
          <div>-----------------------------------------</div>
        </div>
      ) : !whitelisted ? (
        <div
          className="flex flex-col justify-center items-center mb-20 font-bold text-2xl gap-y-3"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "bold",
            fontSize: "26px",
            width: "100%",
            height: "100vh",
          }}
        >
          <img
            src={PhoneNum}
            alt="+12707704034"
            className="NumBtn"
            onClick={copyPhoneNumberToClipboard}
          ></img>
          <div>-----------------------------------------</div>
          <div>Looks Like You are not WhiteListed, Only authorised <b>Saaha-AI</b> Team Members are allowed to access this page.</div>
          <div>Contact Us to get your wallet address added to whitelist</div>
          <div>-----------------------------------------</div>
          <div style={{
            fontWeight: "normal",
            fontSize: "18px"
          }}>The emergencies of people is an important data and needs to be protected, You trust us with your emergecy info, and we keep your trust. Only authorised people can see your data.</div>
        </div>
      ) : (
        <div className="Main">
          <ChakraProvider>
            <OperationsPage operationsData={operations} />
            <Link to={{
       pathname: '/chat',
       data:{
          updatefunc: updateHandler
       }
    }}>
              <div className="fixed right-5 bottom-5 z-50 px-5 py-3 cursor-pointer">
                <AiOutlineMessage className="text-6xl bg-[#52057B] text-white p-3 rounded-full absolute bottom-0 top= right-0 m-4" />
              </div>
            </Link>
          </ChakraProvider>
        </div>
      )

      }
    </div>
  );
}

export default App;
