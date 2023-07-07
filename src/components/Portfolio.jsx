import { useEffect } from "react";
import { useGet } from "../hooks/get";

const Portfolio = ({ account }) => {
  const {
    getTokenBalance,
    tokenBalance,
    getVoteNum,
    voteNum,
    getTotalSpend,
    totalSpend,
  } = useGet(account);

  useEffect(() => {
    if (!account) {
      window.location.href = "/"; // account가 없을 시 메인으로 리다이렉트
    }
    getVoteNum();
    getTokenBalance();
    getTotalSpend();
  });

  return (
    <div className="min-h-screen bg-gradient-to-r from-amber-400/80 to-amber-600/80 pt-14 pb-20">
      <div className="ml-12 mr-12 mt-20">
        <div>
          <div className="text-2xl font-bold text-slate-800">Dashboard</div>
          <div className="text-xl mt-12">
            <div className="border border-transparent border-b-slate-400 pb-20 grid grid-cols-4">
              <div>
                <div className="transition hover:scale-110 duration-500 delay-100 border border-amber-800 p-4 rounded-xl mr-6 pr-4 bg-amber-500/90 hover:bg-amber-500 shadow-lg shadow-amber-800/50">
                  <div className="font-medium text-sm border border-transparent border-b-stone-400">
                    Active Cover Amount
                  </div>
                  <div className="mt-4 text-white">{totalSpend} USDT</div>
                </div>
              </div>
              <div>
                <div className="transition hover:scale-110 duration-500 delay-100 border border-amber-800 p-4 rounded-xl mr-6 pr-4 bg-amber-500/90 hover:bg-amber-500 shadow-lg shadow-amber-800/50">
                  <div className="font-medium text-sm border border-transparent border-b-stone-400">
                    Number of Votes
                  </div>
                  <div className="mt-4 text-white">{voteNum}</div>
                </div>
              </div>
              <div>
                <div className="transition hover:scale-110 duration-500 delay-100 border border-amber-800 p-4 rounded-xl pr-4 bg-amber-500/90 hover:bg-amber-500 shadow-lg shadow-amber-800/50">
                  <div className="font-medium text-sm border border-transparent border-b-stone-400">
                    My Balance (USDT)
                  </div>
                  <div className="mt-4 text-white">{tokenBalance} USDT</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <div className="mt-8 text-xl text-slate-700">My Cover NFT</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
