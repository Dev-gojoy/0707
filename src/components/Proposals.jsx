import { FaCircle, FaCheck } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";

const Proposals = ({ subject, status, agree, disagree, id }) => {
  // let statusIcon;
  // const getStatus = () => {
  //   if (status === 0) {
  //     statusIcon = <FaCircle className="text-yellow-300" />;
  //     status = "In Progress";
  //   } else if (status === 1) {
  //     statusIcon = <FaCheck className="text-green-300" />;
  //     status = "Proposed";
  //   } else if (status === 2) {
  //     statusIcon = <AiOutlineClose className="text-red-600" />;
  //     status = "Rejected";
  //   }
  // };
  // getStatus();

  const totalVotes = agree + disagree; // 총 투표수

  return (
    <div className="px-12 animate-fade animate-once">
      <Link to={`/governance/${id}`}>
        <button className="bg-amber-600/80 rounded-xl hover:bg-amber-600/40 duration-200 min-w-full p-4">
          <div className="flex justify-between">
            <div className="text-xl">{subject}</div>
            {/* <div className="pt-4 flex items-center gap-2">
              <div className="">{statusIcon}</div>
              <div className="text-lg">{status}</div>
            </div> */}
          </div>
          <div className="text-sm opacity-50 justify-start flex w-fit">
            total votes: {totalVotes}
          </div>
        </button>
      </Link>
    </div>
  );
};
export default Proposals;
