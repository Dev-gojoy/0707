import { BsDiscord, BsTwitter, BsGithub } from "react-icons/bs";

const Footer = () => {
  return (
    <div className="bg-gradient-to-r from-white to-amber-400/80 relative">
      <div>
        <div className="pt-4 pl-12 pb-4 ml-4">
          <div className="flex w-fit items-center">
            <img
              src={`${process.env.PUBLIC_URL}/images/logo.png`}
              alt="logo"
              className="w-52"
            />
          </div>
          <div className="opacity-70 pb-8 w-fit">
            <div className="pb-4 mt-4 ">Every moment in DeFi,</div>
            <div className="">Safe easy with INSURSAND</div>
          </div>
          <div className="flex justify-between pr-4 mt-20">
            <div className="flex gap-8">
              <BsDiscord size={26} />
              <BsTwitter size={26} />
              <BsGithub size={26} />
            </div>
            <div>© 2023 INSURSAND. All rights reserved.</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
