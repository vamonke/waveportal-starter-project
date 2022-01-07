import { ethers } from "ethers";
import WavePortalContract from "./WavePortal.json";

const contractABI = WavePortalContract.abi;
const CONTRACT_ADDRESS = "0x4653415f0a1A208b4f62FcF49C9ea6F66c8050e4";

export const getContract = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const wavePortalContract = new ethers.Contract(
    CONTRACT_ADDRESS,
    contractABI,
    signer
  );

  return wavePortalContract;
}