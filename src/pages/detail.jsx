import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { apiKey } from "../App";
import Web3 from "web3";
import { GOVERNANCE_ABI, GOVERNANCE_CA } from "../web3.config";
import { useOnClick } from "../hooks/onClick";
import { useGet } from "../hooks/get";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Detail = ({ account, setAccount }) => {
  const { id } = useParams();

  const [subject, setSubject] = useState(null);
  const [time, setTime] = useState();
  const [address, setAddress] = useState();
  const [summary, setSummary] = useState();
  const [method, setMethod] = useState();
  const [conclusion, setConclusion] = useState();
  const [status, setStatus] = useState("In Progress");
  const [agree, setAgree] = useState(0);
  const [disagree, setDisagree] = useState(0);
  const [total, setTotal] = useState();

  const date = new Date(time * 1000);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  const day = date.getDate();

  // 영문 월명 할당 코드
  if (month === 1) {
    month = "January";
  } else if (month === 2) {
    month = "February";
  } else if (month === 3) {
    month = "March";
  } else if (month === 4) {
    month = "April";
  } else if (month === 5) {
    month = "May";
  } else if (month === 6) {
    month = "June";
  } else if (month === 7) {
    month = "July";
  } else if (month === 8) {
    month = "August";
  } else if (month === 9) {
    month = "September";
  } else if (month === 10) {
    month = "October";
  } else if (month === 11) {
    month = "November";
  } else if (month === 12) {
    month = "December";
  }

  const getProposalData = async () => {
    try {
      const proposalInfo = await GVN_contract.methods.getProposal(id).call();
      setSubject(proposalInfo.subject);
      setTime(Number(proposalInfo.time));
      setAddress(proposalInfo.maker);
      setSummary(proposalInfo.summary);
      setMethod(proposalInfo.method);
      setConclusion(proposalInfo.conclusion);
      setAgree(Number(proposalInfo.agree));
      setDisagree(Number(proposalInfo.disagree));
      setTotal(Number(proposalInfo.agree) + Number(proposalInfo.disagree)); // 해당 안건의 총 투표 수
    } catch (error) {
      console.log("failed to get data of proposal");
    }
  };

  const web3 = new Web3(`https://goerli.infura.io/v3/${apiKey}`);
  const GVN_contract = new web3.eth.Contract(GOVERNANCE_ABI, GOVERNANCE_CA);
  // 안건 종료 시간 구하는 함수
  const getD_day = (time) => {
    const twoWeeks = 1209600;
    const twoWeeksLater = time + twoWeeks; // 2주 뒤 시간
    const currentTime = Math.floor(Date.now() / 1000); // 현재 시간

    const timeDiff = twoWeeksLater - currentTime;

    const days = Math.floor(timeDiff / (24 * 60 * 60)); // 일 단위 계산
    const hours = Math.floor((timeDiff % (24 * 60 * 60)) / (60 * 60)); // 시 단위 계산
    const minutes = Math.floor((timeDiff % (60 * 60)) / 60); // 분 단위 계산
    const seconds = timeDiff % 60; // 초 단위 계산

    return { days, hours, minutes, seconds, timeDiff };
  };

  const { days, hours, minutes, seconds, timeDiff } = getD_day(time);

  // 프론트엔드에 실시간으로 남은 시간 표시
  // console.log(
  //   `안건 종료까지 ${days}일 ${hours}시간 ${minutes}분 ${seconds}초 남았습니다.`
  // );
  // console.log(timeDiff);

  const getStatus = async () => {
    console.log("test");
    // if (timeDiff <= 0 && agree > disagree && total >= totalVoteNum * 0.2) {
    if (agree > disagree) {
      try {
        setStatus("Proposed");
      } catch (error) {
        console.log(error);
      }
    } else if (timeDiff <= 0 && agree <= disagree) {
      try {
        setStatus("Rejected");
      } catch (error) {
        console.log(error);
      }
    }
  };

  // const getTotalVotePower()

  // hooks의 useOnClick 사용
  const { onClickAgree, onClickDisagree, isLoading } = useOnClick(
    id,
    account,
    setAccount
  );

  const { getTotalVotePower, totalVoteNum } = useGet();
  console.log(agree);
  console.log(disagree);
  // console.log(totalVoteNum);
  console.log(total);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: {
          stepSize: 1,
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  const labels = [""];

  const data = {
    labels,
    datasets: [
      {
        label: "Agree",
        data: labels.map(() => agree),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        barThickness: 20,
      },
      {
        label: "Disagree",
        data: labels.map(() => disagree),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  useEffect(() => {
    getProposalData();

    getTotalVotePower();
  }, [status]);

  useEffect(() => {
    if (!agree || !disagree || !total) return;
    getStatus();
  }, [agree, disagree, total]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-amber-400/80 to-amber-600/80 pt-14 pb-20">
      <div className="mx-96 mt-8 flex justify-center items-center">
        <div className="">
          <Link to="/governance">
            <button>
              <div className="flex items-center">
                <BiArrowBack className="mr-1" />
                Back
              </div>
            </button>
          </Link>
          <div>
            <div className="flex items-center justify-between">
              <div
                className={`text-xl border rounded-3xl w-fit mt-8 p-2 ${
                  status === "In Progress"
                    ? "text-amber-800 border-amber-800"
                    : status === "Proposed"
                    ? "text-green-500 border-green-500"
                    : status === "Rejected"
                    ? "text-red-500 border-red-500"
                    : ""
                }`}
              >
                {status}
              </div>
              {status === "In Progress" ? (
                <div
                  className={`mt-6 border p-2 rounded-xl border-green-700 ${
                    days === 0 ? "text-red-400" : "text-green-800"
                  }`}
                >
                  End of the proposal: {days} days, {hours}:{minutes}:{seconds}
                </div>
              ) : (
                <div className="mt-6 border p-2 rounded-xl border-red-800 text-red-800">
                  Proposal has expired.
                </div>
              )}
            </div>
            <div className="text-5xl font-bold mt-6">{subject}</div>
            <div className="opacity-60 mt-4 flex">
              <div>
                Created {month} {day}, {year} · Proposed by&nbsp;
              </div>
              <Link
                to={`https://goerli.etherscan.io/address/${address}`}
                target="_blank"
              >
                <button className="text-amber-900 hover:text-amber-700 duration-150">
                  {address}
                </button>
              </Link>
            </div>
            <div className="mt-4"></div>
            <div className="bg-white rounded-xl shadow-2xl">
              <div className="">
                <div className="items-center p-8">
                  <div className="text-2xl mb-4">Voting progress</div>
                  <div>
                    {total !== 0 ? (
                      <Bar options={options} data={data} height={250} />
                    ) : (
                      <div>There is no vote yet...</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-14 bg-white rounded-xl shadow-2xl border">
              <div>
                <div className="p-8 text-2xl border-b border-amber-800">
                  Proposal details
                </div>
                <div className="bg-gradient-to-r from-amber-400/80 to-amber-600/80 rounded-xl shadow-inner shadow-amber-700 m-8 pb-72">
                  <div className="p-8">
                    <div className="text-xl font-medium mb-3">Summary</div>
                    <div className="break-words" style={{ width: "540px" }}>
                      {summary}
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="text-xl font-medium mb-3">Method</div>
                    <div className="break-words" style={{ width: "540px" }}>
                      {method}
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="text-xl font-medium mb-3">Conclusion</div>
                    <div className="break-words" style={{ width: "540px" }}>
                      {conclusion}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between px-52 pb-4">
                {status === "In Progress" ? (
                  <button
                    disabled={isLoading}
                    onClick={onClickAgree}
                    className="p-2 flex items-center gap-2 text-green-600 border border-green-600 hover:green-800 hover:text-green-800 duration-200 rounded-xl"
                  >
                    {isLoading ? (
                      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gradient-to-r from-amber-400/90 to-amber-600/90 cursor-not-allowed z-0">
                        <span className="text-xl font-semibold text-black ">
                          Voting...
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <AiOutlineCheck />
                        agree
                      </div>
                    )}
                  </button>
                ) : (
                  <div></div>
                )}
                {status === "In Progress" ? (
                  <button
                    disabled={isLoading}
                    onClick={onClickDisagree}
                    className="p-2 flex items-center gap-2 text-red-600 border border-red-600 hover:border-red-800 hover:text-red-800 duration-200 rounded-xl"
                  >
                    {isLoading ? (
                      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gradient-to-r from-amber-400/90 to-amber-600/90 cursor-not-allowed z-0">
                        <span className="text-xl font-semibold text-black ">
                          Voting...
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <AiOutlineClose />
                        Disagree
                      </div>
                    )}
                  </button>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Detail;
