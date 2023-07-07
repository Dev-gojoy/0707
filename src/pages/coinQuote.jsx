import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { useEffect, useState } from "react";
import Quote from "../components/Quote";
import { AiOutlineSelect } from "react-icons/ai";
import { IoReaderOutline } from "react-icons/io5";

const CoinQuote = ({ account }) => {
  const [amount, setAmount] = useState(1);
  const [period, setPeriod] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const [finalPrice, setFinalPrice] = useState(0);
  const [votes, setVotes] = useState(0);
  const [totalRate, setTotalRate] = useState(0);
  const [dailyRate, setDailyRate] = useState(0);
  const [coveragePeriod, setCoveragePeriod] = useState(0);
  const [isChecked, setIsChecked] = useState(false);

  const onClickToggle = () => {
    // 30
    setPeriod(0);
    setToggle(!toggle);
    setToggle2(false);
  };

  const onClickToggle2 = () => {
    // 365
    setPeriod(1);
    setToggle2(!toggle2);
    setToggle(false);
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const getPeriod = async () => {
    try {
      if (period === 0) {
        setCoveragePeriod(30);
      } else if (period === 1) {
        setCoveragePeriod(365);
      } else {
        setCoveragePeriod(0);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getFinalPrice = async () => {
    try {
      if (period === 0) {
        // 30days
        setFinalPrice((amount * 125) / 10000);
        setTotalRate(1.25);
        setDailyRate(0.0416);
      } else if (period === 1) {
        // 365days
        setFinalPrice((amount * 760) / 10000);
        setTotalRate(7.6);
        setDailyRate(0.0208);
      }
    } catch (error) {
      console.log(error);
    }
    console.log(typeof amount);
  };

  const getVotes = async () => {
    try {
      if (finalPrice < 100) {
        setVotes(1);
      } else if (finalPrice <= 200) {
        setVotes(2);
      } else if (finalPrice > 200) {
        setVotes(3);
      } else {
        setVotes(0);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFinalPrice();
    getPeriod();
  }, [amount, period]);

  useEffect(() => {
    getVotes();
  }, [finalPrice]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-amber-400/80 to-amber-600/80 pt-14 pb-20">
      <div className="mx-40 mt-24">
        <div>
          <Link to="/covers">
            <button>
              <div className="flex items-center">
                <BiArrowBack className="mr-1" />
                Back
              </div>
            </button>
          </Link>
          <div className="mt-4 text-5xl text-amber-900">Buy cover</div>
          <div className="mt-3 text-lg text-amber-900/80">
            Enter the coverage amount and Select the coverage period and Get the
            quote!
          </div>
          <div className="flex flex-row gap-20">
            <div className="w-2/3">
              <div className="mt-12 bg-white rounded-xl shadow-2xl h-full">
                <div className="p-6 text-2xl flex items-center gap-2">
                  <AiOutlineSelect />
                  Coverage Options
                </div>
                <div className="p-6">
                  You can choose between two coverage options:&nbsp;
                  <div className="inline font-bold">30 days</div> and&nbsp;
                  <div className="inline font-bold">365 days</div>.<br />
                  <br /> Please note that the fee rates may vary depending on
                  the chosen duration
                  <br />
                  <br /> and&nbsp;
                  <u>
                    the coverage amount will also be calculated differently
                    based on the chosen coverage amount and duration.
                  </u>
                </div>
                <div className="p-6 flex justify-evenly gap-4">
                  <div className="border rounded-xl w-1/2">
                    <div className="text-xl flex justify-center pt-4">
                      <u>Coverage Period</u>
                    </div>
                    <div className="flex mt-3 gap-10 p-4 justify-around">
                      <button
                        className={`rounded-3xl p-8 border-2 transition duration-300 hover:scale-95 hover:text-blue-600/50 hover:border-blue-500/50 hover:bg-blue-100/50 ${
                          toggle &&
                          "bg-blue-100 border-blue-500 text-blue-600 hover:text-blue-600/50 hover:border-blue-500/50 hover:bg-blue-100/50"
                        }`}
                        onClick={onClickToggle}
                      >
                        30 days
                      </button>
                      <button
                        className={`rounded-3xl p-8 border-2 transition duration-300 hover:scale-95 hover:text-blue-600/50 hover:border-blue-500/50 hover:bg-blue-100/50 ${
                          toggle2 &&
                          "bg-blue-100 border-blue-500 text-blue-600 hover:text-blue-600/50 hover:border-blue-500/50 hover:bg-blue-100/50"
                        }`}
                        onClick={onClickToggle2}
                      >
                        365 days
                      </button>
                    </div>
                  </div>
                  <div className="w-1/2 border rounded-xl">
                    <div className="text-xl flex justify-center pt-4">
                      <u>Coverage Amount</u>
                    </div>
                    {/* <div className="flex justify-end mr-12">
                      {period === null ? <div>enter period!</div> : <div></div>}
                    </div> */}
                    <div className="p-5 flex items-center justify-end">
                      <input
                        placeholder="0"
                        type="number"
                        className="p-8 pr-4 text-2xl flex w-3/5"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        style={{ textAlign: "right" }}
                      ></input>
                      <span className="text-2xl text-amber-800">ETH</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-1/3">
              <div className="mt-12 bg-white rounded-xl shadow-2xl h-full flex flex-col">
                <div className="p-6 text-2xl flex items-center gap-2">
                  <IoReaderOutline />
                  Receipt
                </div>
                <div className="mx-12">
                  <div className="border mt-8 rounded-xl">
                    <div className="p-2 font-bold">
                      <u>Request</u>
                    </div>
                    <div className="flex justify-between p-3 mx-8 text-sm">
                      <div>coverage period:</div>
                      <div className="font-bold">{coveragePeriod} days</div>
                    </div>
                    <div className="flex justify-between p-3 mx-8 text-sm">
                      <div>coverage amount:</div>
                      <div className="font-bold">{amount} ETH</div>
                    </div>
                  </div>
                  <div className="border mt-8 rounded-xl">
                    <div className="p-2 font-bold">
                      <u>Quote</u>
                    </div>
                    <div className="flex justify-between p-3 mx-8 text-sm">
                      <div>amount you'll pay:</div>
                      <div className="font-bold">{finalPrice} ETH</div>
                    </div>
                    <div className="flex justify-between p-3 mx-8 text-sm">
                      <div>votes you'll receive:</div>
                      <div className="font-bold">{votes}</div>
                    </div>
                    <div className="flex-grow flex justify-between p-3 mx-8 text-sm">
                      <div>fee rate:</div>
                      <div className="flex font-bold">
                        <div>{totalRate}% (total)</div>
                        <div className="mx-1"> | </div>
                        <div>{dailyRate}% (daily)</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-center mt-8">
                    {
                      <Quote
                        finalPrice={finalPrice}
                        period={period}
                        account={account}
                        amount={amount}
                        isChecked={isChecked}
                      />
                    }
                  </div>
                  <label className="flex justify-center items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                    />
                    I have read and agreed to the terms and conditions.
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sticky top-50 mx-40 mt-24 w-1/2">
        <div className=" bg-white rounded-xl shadow-2xl h-full">
          <div className="p-6 text-2xl">Terms and conditions</div>
          <div className="p-6 text-sm">
            <div className="text-xl mb-2">1. Coverage Options</div>
            &nbsp; &nbsp;1.1. You can choose between two coverage options: 30
            days and 365 days. The coverage period starts from the date of
            purchase.
            <br /> &nbsp; &nbsp;1.2. Please note that the fee rates may vary
            depending on the chosen duration.
            <br /> &nbsp; &nbsp;1.3. The coverage amount will be calculated
            differently based on the chosen coverage amount and duration.
            <div className="text-xl mb-2 mt-2">2. Coverage Eligibility</div>
            &nbsp; &nbsp;2.1. The coverage is available for holders of the
            specified coin (to be determined).
            <br /> &nbsp; &nbsp;2.2. You must hold the specified coin at the
            time of purchase to be eligible for coverage.
            <br /> <div className="text-xl mb-2 mt-2">3. Payment</div> &nbsp;
            &nbsp;3.1. The payment currency for the coverage is USDT.
            <br /> &nbsp; &nbsp;3.2. The coverage amount must be paid in full at
            the time of purchase.
            <br /> <div className="text-xl mb-2 mt-2">4. Voting Rights</div>
            &nbsp; &nbsp;4.1. By purchasing coverage, you will obtain voting
            rights based on the final price of the specified coin.
            <br /> &nbsp; &nbsp;4.2. Voting rights will be allocated
            proportionally to the coverage amount.
            <br /> <div className="text-xl mb-2 mt-2">5. NFT Issuance</div>{" "}
            &nbsp; &nbsp;5.1. Upon purchasing coverage, you will receive a
            unique non-fungible token (NFT) as proof of coverage.
            <br /> &nbsp; &nbsp;5.2. The NFT will be issued to the wallet
            address used for the purchase.
            <br /> <div className="text-xl mb-2 mt-2">6. Claim Process</div>
            &nbsp; &nbsp;6.1. In the event of a valid claim, you must follow the
            specified claim process provided separately.
            <br /> &nbsp; &nbsp;6.2. Claims will be evaluated based on the terms
            and conditions outlined in the claim process.
            <br />
            <div className="text-xl mb-2 mt-2">7. Market Fluctuations</div>
            &nbsp; &nbsp;7.1. Please be aware that the final price of the
            specified coin may vary due to market fluctuations.
            <br /> &nbsp; &nbsp;7.2. INSURSAND does not guarantee any specific
            outcome or returns from the coverage.
            <br /> <div className="text-xl mb-2 mt-2">8. Disclaimer</div> &nbsp;
            &nbsp;8.1. INSURSAND reserves the right to modify or update these
            terms and conditions at any time.
            <br /> &nbsp; &nbsp;8.2. By purchasing coverage, you agree to comply
            with these terms and conditions.
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinQuote;
