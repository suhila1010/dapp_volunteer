/*import logo from './logo.svg';*/
import { useCallback, useEffect, useState } from 'react';
import './App.css';
import Web3 from "web3";
import detectEthereumProvider from '@metamask/detect-provider'
import {loadContract} from './utils/loadContract'

function App() {
  const [web3Api, setWeb3Api] = useState({
    provider:null,
    web3:null,
    contract:null,
    isLoaded:false
  });
  const [shouldreloaded, setreload] = useState(false);
  const reloadEffect = useCallback(()=>{setreload(!shouldreloaded)},[shouldreloaded])

  const walletListener = (provider)=>{
    provider.on("accountsChanged", _ => window.location.reload())
    provider.on("chainChanged", _ => window.location.reload())
  }
  useEffect(() => {
    const loadProvider = async ()=>{
      const provider = await detectEthereumProvider();
      
      if(provider){
        const contract = await loadContract("volunteer", provider);
        walletListener(provider)
        setWeb3Api({
          provider,
          web3:new Web3(provider),
          contract,
          isLoaded:true
        })
        //console.log(provider);
      }
      else{
        setWeb3Api(newApi=>({...newApi,isLoaded:true}))
        console.error("Install Metamask");
      }
    }
    loadProvider()
  },[])
  const [account, setAccount] = useState(null);

  useEffect(()=>{
    const getAccount = async()=> {
      const accounts = await web3Api.web3.eth.getAccounts();
      setAccount(accounts[0])
    }
    web3Api.web3 && getAccount();
  },[web3Api.web3])
  
  const [balance, setBalance] = useState(null);

  useEffect(()=>{
    const getContractBalance = async ()=>{
      const {contract,web3} = web3Api;
      const balance = await web3.eth.getBalance(contract.address);
      setBalance(web3.utils.fromWei(balance, "ether"));
    };
    web3Api.contract && getContractBalance();
  },[web3Api,shouldreloaded])
  
  const donate = useCallback( async()=>{
    const {contract,web3} = web3Api;

    await contract.denote({
      from:account,
      value:web3.utils.toWei("0.02", "ether")
    })
    reloadEffect();
  },[web3Api , account, reloadEffect])

  const withdraw = async()=>{
    const {contract,web3} = web3Api;
    const withdrawAmount = Web3.utils.toWei("0.01","ether");

    await contract.withdraw(withdrawAmount,{
      from:account
    })
    reloadEffect();
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="text-blue-400 text-center font-bold">
          <p>Denate To Our Project Contract To Help Poor People.</p>
        </div>

        <div className='sm:flex'>
          <h3>My Wallet Address : </h3>
          { 
            account? <h3> {account} </h3>:!web3Api.provider?
            <>
            <a className="bg-red-500 text-violet-700 text-base font-semibold px-2 py-2 rounded-lg flex-1"
            href="https://metamask.io/" >
              Install MetaMask
            </a>
            </>: 
            <button className="bg-yellow-500 text-violet-700 text-base font-semibold px-6 py-2 rounded-lg" onClick={web3Api.provider.request({
              method:"eth_requestAccounts"
            })}>Connect Wallet</button>
            }
          
        </div>
        
        <div className="bg-blue-500 text-violet-700 text-base font-semibold px-6 py-4 m-2 rounded-lg">
          <h3>Contract Balance</h3>
          {
            balance ? <h2>{balance} ETH</h2>: <h2>No Balance</h2>
          }
        </div>
        
        <div>
        <button type="button" className="bg-blue-500 text-violet-700 text-base font-semibold px-6 py-2 rounded-lg" onClick={donate}>Donte Ether</button>
        </div>
        <div>
        <button type="button" className="bg-yellow-500 text-violet-700 text-base font-semibold px-6 py-2 rounded-lg m-3" onClick={withdraw} >Owner Withdraw</button>
        </div>
      </header>
    </div>
  );
}

export default App;
