import Web3 from "web3";
import { GOVERNANCE_ABI, GOVERNANCE_CA } from "../web3.config";
import { apiKey } from "../App";
import { useGet } from "./get";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export function useOnClick(id, account, setAccount) {
  const web3 = new Web3(`https://goerli.infura.io/v3/${apiKey}`);
  const GVN_contract = new web3.eth.Contract(GOVERNANCE_ABI, GOVERNANCE_CA);

  const [isLoading, setIsLoading] = useState(false);

  // hooks의 useGet 사용
  const { getVoteNum, voteNum, getMyStatus, myStatus } = useGet(account, id);
  const navigate = useNavigate();

  useEffect(() => {
    getVoteNum();
    getMyStatus();
    console.log(voteNum);
    console.log(myStatus);
  }, [account]);

  const onClickAgree = async (e) => {
    if (account) {
      if (voteNum >= 1) {
        if (myStatus < 3) {
          try {
            e.preventDefault();
            setIsLoading(true);
            await window.ethereum.request({
              method: "eth_sendTransaction",
              params: [
                {
                  from: account,
                  to: GOVERNANCE_CA,
                  data: GVN_contract.methods.openVotesagree(id - 1).encodeABI(),
                },
              ],
            });
            navigate(-1);
            alert("Voting completed!");
          } catch (error) {
            alert("you can't vote");
          }
        } else {
          alert("You have already made three votes");
        }
      } else {
        alert("please check your number of votes");
      }
    } else {
      try {
        alert("Connecting to the wallet ...");
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const onClickDisagree = async (e) => {
    if (account) {
      if (voteNum >= 1) {
        if (myStatus < 3) {
          try {
            e.preventDefault();
            setIsLoading(true);
            await window.ethereum.request({
              method: "eth_sendTransaction",
              params: [
                {
                  from: account,
                  to: GOVERNANCE_CA,
                  data: GVN_contract.methods
                    .openVotesdisagree(id - 1)
                    .encodeABI(),
                },
              ],
            });
            navigate(-1);
            alert("Voting completed!");
          } catch (error) {
            alert("you can't vote");
          }
        } else {
          alert("You have already made three votes");
        }
      } else {
        alert("please check your number of votes");
      }
    } else {
      try {
        alert("Connecting to the wallet ...");
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  return { onClickAgree, onClickDisagree, isLoading };
}
