import React, { useEffect } from 'react';
import {ethers, utils} from 'ethers';
import CampaignFactory from './build/CampaignFactory.json';
import web3 from './web3';

// function Factory1(props){
//     useEffect(async () => {
//         const contractAddress="0x04130c58B5B41FaC529cc86D459a34f056917d2f";
//         let tempProvider=new ethers.providers.Web3Provider(window.ethereum);
//         let tempSigner=tempProvider.getSigner();
//         let tempContract=new ethers.Contract(contractAddress,CampaignFactory.interface,tempSigner);
//         props.setContract(tempContract);
//     },[]);
    
//     return <div>
//         {/* <h1>Hello</h1> */}
//     </div>
// }

const instance=new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    "0x8211F3625D9037e349883C66f36eadc6b2B39f1E"
);
export default instance;

// export default Factory1;
// 0x56023019b942b25C12E05f2a8FCc2F925b77D756