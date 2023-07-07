import Portfolio from "../components/Portfolio";

const DashBoard = ({ account }) => {
  return (
    <div>
      <Portfolio account={account} />
    </div>
  );
};

export default DashBoard;
