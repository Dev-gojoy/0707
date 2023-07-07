import Web3 from "web3";
import { ERC20_ABI, ERC20_CA, NFT_ABI, NFT_CA } from "../web3.config";
import { apiKey } from "../App";
import { HiLockClosed } from "react-icons/hi";
import { Link } from "react-router-dom";
import { FaEthereum } from "react-icons/fa";
import { BsGraphDownArrow, BsShieldCheck } from "react-icons/bs";

const web3 = new Web3(window.ethereum);
export const NFT_contract = new web3.eth.Contract(NFT_ABI, NFT_CA);
export const ERC20_contract = new web3.eth.Contract(ERC20_ABI, ERC20_CA);

const Covers = ({ account }) => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-amber-400/80 to-amber-600/80 pt-14 pb-20">
      <div className="flex justify-center items-center gap-40 mt-20 text-lg pb-20">
        <button className="bg-amber-700/40 rounded-md p-8 text-white/80 shadow-xl hover:scale-95 duration-300 hover:bg-amber-700/70">
          <div className="hover:animate-pulse hover:animate-once">
            Required documents
          </div>
        </button>
        <button className="bg-amber-800/50 rounded-md p-8 text-white/80 shadow-xl hover:scale-95 duration-300 hover:bg-amber-800/70">
          <div className="hover:animate-pulse hover:animate-once">
            How to buy coverage
          </div>
        </button>
        <button className="bg-amber-900/60 rounded-md p-8 text-white/80 shadow-xl hover:scale-95 duration-300 hover:bg-amber-900/70">
          <div className="hover:animate-pulse hover:animate-once">
            How to make a claim
          </div>
        </button>
      </div>
      <div className="" style={{ height: "560px" }}>
        <div className="flex h-full px-60 gap-52 items-center justify-center">
          <div className="border rounded-xl w-2/5 h-full bg-gray-100 opacity-80 shadow-2xl shadow-amber-700 hover:bg-white duration-500 hover:scale-105">
            <div className="flex flex-col">
              <div className="flex ml-12 mt-4 gap-8">
                <div className="w-fit">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/logo.png`}
                    alt="logo"
                    className="w-24"
                  />
                </div>
                <div className="">
                  <div className="font-bold text-lg">INSURSAND</div>
                  <div className="flex items-center gap-2 text-amber-800/80">
                    <BsShieldCheck className="" />
                    Asset Insurance
                  </div>
                </div>
              </div>
              <div className="border-2 rounded-xl mx-8 my-12">
                <div className="mt-12 mx-12 flex justify-between">
                  <div>Type: </div>
                  <div className="flex items-center gap-1">
                    <BsGraphDownArrow />
                    Asset Insur.
                  </div>
                </div>
                <div className="mt-8 mx-12 flex justify-between">
                  <div>Chains: </div>
                  <div>
                    <FaEthereum size={20} />
                  </div>
                </div>
                <div className="mt-8 mx-12 flex justify-between">
                  <div>Period: </div>
                  <div>30days / 365days</div>
                </div>
                <div className="mt-8 mb-12 mx-12 flex justify-between">
                  <div>Votes: </div>
                  <div>1 ~ 3</div>
                </div>
              </div>
              <button className="flex mt-8 mx-auto items-center border border-green-700 text-2xl text-green-700 hover:bg-green-600/30 hover:border-green-800 hover:text-green-900 duration-300 p-2 rounded-2xl">
                <Link to={`/covers/coindrop`}>Get Quote</Link>
              </button>
            </div>
          </div>
          <div className="border rounded-xl w-2/5 h-full bg-gray-100 opacity-80 shadow-2xl shadow-amber-700 hover:bg-white duration-500 hover:scale-105">
            <div className="flex flex-col">
              <div className="flex ml-12 mt-4 gap-8">
                <div className="w-fit">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/logo.png`}
                    alt="logo"
                    className="w-24"
                  />
                </div>
                <div className="">
                  <div className="font-bold text-lg">INSURSAND</div>
                  <div className="flex items-center gap-2 text-amber-800/80">
                    <BsShieldCheck className="" />
                    Unstaking Lockup Insurance
                  </div>
                </div>
              </div>
              <div className="border-2 rounded-xl mx-8 my-12">
                <div className="mt-12 mx-12 flex justify-between">
                  <div>Type: </div>
                  <div className="flex items-center gap-1">
                    <HiLockClosed />
                    Unstaking Lockup Insur.
                  </div>
                </div>
                <div className="mt-8 mx-12 flex justify-between">
                  <div>Chains: </div>
                  <div>
                    <FaEthereum size={20} />
                  </div>
                </div>
                <div className="mt-8 mx-12 flex justify-between">
                  <div>Period: </div>
                  <div>30days / 365days</div>
                </div>
                <div className="mt-8 mb-12 mx-12 flex justify-between">
                  <div>Votes: </div>
                  <div>1 ~ 3</div>
                </div>
              </div>
              <button className="flex mt-8 mx-auto items-center border border-green-700 text-2xl text-green-700 hover:bg-green-600/30 hover:border-green-800 hover:text-green-900 duration-300 p-2 rounded-2xl">
                <Link to={`/covers/coindrop`}>Get Quote</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Covers;
