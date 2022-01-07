import { ethers } from "ethers";
import WavePortalContract from "./WavePortal.json";

const contractABI = WavePortalContract.abi;
const CONTRACT_ADDRESS = "0x11c49f04951A0f931FAb26C7029FB08b415fB43C";

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