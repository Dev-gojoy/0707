import { Link } from "react-router-dom";
import { MetaMaskAvatar } from "react-metamask-avatar";
import { useEffect, useRef, useState } from "react";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";

const Header = ({ account, setAccount }) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef(null);

  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (index) => {
    setSelectedItem(index);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const onClickConnect = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
      } catch (error) {
        console.log(error);

        alert("Failed to Metamask login.");
      }
    } else {
      alert("You must install Metamask.");
    }
  };

  const onClickDisconnect = async () => {
    try {
      setAccount("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="fixed w-full z-50">
      <nav className="px-4 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link
            to="/"
            className="flex items-center"
            onClick={() => handleItemClick(null)}
          >
            <div className="justify-between flex">
              <img
                src={`${process.env.PUBLIC_URL}/images/logo.png`}
                alt="logo"
                className="w-28"
              />
            </div>
          </Link>
          <div className="p-2 flex">
            <div className="justify-between items-center w-full text-sm font-light">
              <ul className="flex flex-row">
                <li>
                  <Link
                    to="/covers"
                    className={`block rounded-xl py-2 px-4 mr-2 ${
                      selectedItem === 0
                        ? "text-amber-600"
                        : "hover:text-amber-600"
                    }`}
                    onClick={() => handleItemClick(0)}
                  >
                    Buy Cover
                  </Link>
                </li>
                <li>
                  <Link
                    to="/governance"
                    className={`block rounded-xl py-2 px-4 mr-2 ${
                      selectedItem === 1
                        ? "text-amber-600"
                        : "hover:text-amber-600"
                    }`}
                    onClick={() => handleItemClick(1)}
                  >
                    Governance
                  </Link>
                </li>
                <li className="block rounded-xl py-2 px-4 hover:text-amber-600">
                  Community
                </li>
                <li>
                  <Link
                    to="/faq"
                    className={`block rounded-xl py-2 px-4 ${
                      selectedItem === 2
                        ? "text-amber-600"
                        : "hover:text-amber-600"
                    }`}
                    onClick={() => handleItemClick(2)}
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex items-center">
            {account ? (
              <div className="flex items-center justify-end">
                <button
                  onClick={() => setIsOpen((prev) => !prev)}
                  className="text-amber-600 border border-amber-600 hover:border-amber-800 hover:text-amber-800 duration-200 rounded-xl p-2 items-center flex"
                >
                  <MetaMaskAvatar address={account} size={24} />
                  <div className="ml-2">
                    <div className="flex items-center gap-4">
                      {account.substring(0, 6)}....
                      {account.substring(account.length - 4)}
                      {!isOpen ? <AiOutlineCaretDown /> : <AiOutlineCaretUp />}
                    </div>
                  </div>
                </button>
                {isOpen && (
                  <div
                    ref={dropdownRef}
                    className="animate-fade-down animate-once absolute top-14 text-black border border-amber-600 duration-200 flex flex-col rounded-lg p-2 mt-4 gap-1 divide-y divide-amber-600"
                  >
                    <Link to="/dashboard">
                      <button className="hover:text-amber-600 pb-1">
                        Dashboard
                      </button>
                    </Link>
                    <Link
                      to={`https://goerli.etherscan.io/address/${account}`}
                      target="_blank"
                    >
                      <button className="hover:text-amber-600 py-1">
                        Open in Etherscan
                      </button>
                    </Link>
                    <Link to="/">
                      <button
                        className="hover:text-amber-600 justify-start flex pt-1"
                        onClick={onClickDisconnect}
                      >
                        Disconnect
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <button
                className="p-2 text-amber-600 border border-amber-600 hover:border-amber-800 hover:text-amber-800 duration-200 rounded-xl animate-delay-300"
                onClick={onClickConnect}
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
