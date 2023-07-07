import { useEffect, useState } from "react";
import Web3 from "web3";
import { GOVERNANCE_ABI, GOVERNANCE_CA } from "../web3.config";
import Proposals from "./Proposals";
import { Link } from "react-router-dom";
import { apiKey } from "../App";

const Proposal = () => {
  const [proposalNum, setProposalNum] = useState();
  const [proposalInfo, setProposalInfo] = useState([]);
  const [sortBy, setSortBy] = useState("oldest"); // 추가: 정렬 기준을 저장하는 상태

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const offset = (page - 1) * limit;

  const web3 = new Web3(`https://goerli.infura.io/v3/${apiKey}`);
  const GVN_contract = new web3.eth.Contract(GOVERNANCE_ABI, GOVERNANCE_CA);

  useEffect(() => {
    async function getProposalData() {
      try {
        const proposalNums = Array.from(
          { length: proposalNum },
          (_, index) => index + 1
        );
        const proposalDatas = await Promise.all(
          proposalNums.map(async (id) => {
            const proposalInfo = await GVN_contract.methods
              .getProposal(id)
              .call();
            return proposalInfo;
          })
        );
        var proposals = await GVN_contract.methods.getP_number().call();
        setProposalNum(Number(proposals));
        setProposalInfo(proposalDatas);
      } catch (error) {
        console.log("failed to get data of proposal");
      }
    }
    getProposalData();
  }, [proposalNum]);

  useEffect(() => {
    const sortProposals = () => {
      if (sortBy === "oldest") {
        // 최신순으로 정렬
        setProposalInfo((prevProposals) =>
          [...prevProposals].sort((a, b) => Number(a.num) - Number(b.num))
        );
      } else if (sortBy === "latest") {
        // 오래된 순으로 정렬
        setProposalInfo((prevProposals) =>
          [...prevProposals].sort((a, b) => Number(b.num) - Number(a.num))
        );
      } else if (sortBy === "most votes") {
        // 투표 수가 많은 순으로 정렬
        setProposalInfo((prevProposals) =>
          [...prevProposals].sort(
            (a, b) =>
              Number(b.agree) +
              Number(b.disagree) -
              (Number(a.agree) + Number(a.disagree))
          )
        );
      }
    };

    sortProposals();
  }, [sortBy]);

  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
  };

  const PageButtons = () => {
    const totalPages = Math.ceil(proposalNum / limit);
    const buttons = [];

    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => setPage(i)}
          className={`mx-1 py-1 px-2 rounded-lg animate-fade animate-once ${
            i === page ? "bg-amber-700 text-white" : "bg-white text-amber-700"
          }`}
        >
          {i}
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className="min-h-screen flex justify-center bg-gradient-to-r from-amber-400/80 to-amber-600/80 pt-14 pb-20">
      <div className="mx-96 w-1/2 mt-20 min-h-screen bg-white rounded-xl shadow-2xl">
        <div className="flex justify-between p-12">
          <div>
            <div className="text-3xl mb-2">Proposals</div>
            <div className="text-sm opacity-75">
              Total proposals: {proposalNum}
            </div>
          </div>
          <div>
            <Link to="/create">
              <button className="bg-amber-700/80 hover:bg-amber-800/80 rounded-xl transition duration-300 hover:scale-95">
                <div className="text-lg text-white py-2 px-4">
                  Create Proposal
                </div>
              </button>
            </Link>
          </div>
        </div>
        <div className="flex justify-end mr-24">
          <select
            className="mb-12 border p-1 rounded-xl border-black"
            value={sortBy}
            onChange={handleSortByChange}
          >
            <option value="oldest">Oldest</option>
            <option value="latest">Latest</option>
            <option value="most votes">Most Votes</option>
          </select>
        </div>
        <div className="grid gap-8 mx-12">
          {proposalInfo &&
            proposalInfo.slice(offset, offset + limit).map((v, i) => {
              return (
                <Proposals
                  key={i}
                  subject={v.subject}
                  agree={Number(v.agree)}
                  disagree={Number(v.disagree)}
                  id={Number(v.num)}
                />
              );
            })}
        </div>
      </div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 font-bold">
        {PageButtons()}
      </div>
    </div>
  );
};
export default Proposal;
