import { useState, useEffect } from "react";
import axios from "axios";
import { NFT_contract, ERC20_contract } from "../pages/covers";
import { NFT_CA } from "../web3.config";

const JWT = process.env.REACT_APP_JWT;
const pinataURI = "https://teal-individual-peafowl-274.mypinata.cloud/ipfs/";

// flie 값 반환 (피나타 업로드용)
const onScreengenerateImage = async () => {
  // 캔버스 생성
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  // 이미지 크기 설정
  const width = 512;
  const height = 512;
  canvas.width = width;
  canvas.height = height;

  // 이미지 그리기
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);

  // 이미지 그라디언트 세부 설정
  gradient.addColorStop(1, "white");
  gradient.addColorStop(0.3, "gray");
  gradient.addColorStop(0.5, "black");

  // 이미지 그라디언트 설정
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  const fetchWorldTimeDate = async () => {
    try {
      const response = await axios(
        "https://worldtimeapi.org/api/timezone/Etc/UTC"
      );
      return response.data.datetime;
    } catch (err) {
      console.error(err);
    }
  };

  const timeResponse = await fetchWorldTimeDate();
  console.log(timeResponse);

  // expired 날짜 변수 선언
  const currentTime = new Date(timeResponse.substr(0, 19).replace("T", " "));

  const future30Days = new Date(currentTime);
  future30Days.setDate(future30Days.getDate() + 30);
  const future365Days = new Date(currentTime);
  future365Days.setDate(future365Days.getDate() + 365);

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const monthIndex = date.getMonth();
    const year = date.getFullYear().toString();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = months[monthIndex];

    return `${day}-${month}-${year} | ${hours}:${minutes}:${seconds}`;
  };

  // 텍스트 그리기
  ctx.fillStyle = "white";
  ctx.font = "bold 22px GothicFont, sans-serif";
  ctx.fillText(`InsurSand Cover NFT`, 10, 30);
  ctx.fillText(`Price Drop Cover`, 10, 60);
  ctx.fillText(`Expired Date : ${formatDate(future30Days)} UTC`, 10, 120); // 만료 날짜 (만료 날짜가 지난 경우엔 컨트랙트에서 다른 uri 반환.)
  ctx.fillText("Cover Amount : 19222.993 DAI", 10, 150); // 커버 amount
  ctx.fillText("Cover Active Price : 1543.991 $", 10, 180); // 보험금 지급받을 수 있는 가격
  ctx.fillText("Standard WETH Price : 1983.930 $", 10, 210); // 민팅 당시의 토큰 가격
  ctx.fillText(`Mint Date : ${formatDate(currentTime)} UTC`, 10, 240); // 민팅 날짜

  // 이미지 데이터 가져오기
  const imageData = canvas.toDataURL();

  // formData를 사용하여 이미지 파일 데이터를 폼데이터 타입으로 변환시킴.
  var blobBin = atob(imageData.split(",")[1]);
  var array = [];
  for (var i = 0; i < blobBin.length; i++) {
    array.push(blobBin.charCodeAt(i));
  }
  var file = new Blob([new Uint8Array(array)], { type: "image/png" });
  var formdata = new FormData();
  formdata.append("file", file);
  console.log(formdata);

  return file;
};

// 이미지 생성값 반환 (웹에 띄우는 용도)
const onScreenDrawing = async () => {
  // 캔버스 생성
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  // 이미지 크기 설정
  const width = 512;
  const height = 512;
  canvas.width = width;
  canvas.height = height;

  // 이미지 그리기
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);

  // 이미지 그라디언트 세부 설정
  gradient.addColorStop(1, "white");
  gradient.addColorStop(0.3, "gray");
  gradient.addColorStop(0.5, "black");

  // 이미지 그라디언트 설정
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // 로고 이미지를 로딩

  const fetchWorldTimeDate = async () => {
    try {
      const response = await axios(
        "https://worldtimeapi.org/api/timezone/Etc/UTC"
      );
      return response.data.datetime;
    } catch (err) {
      console.error(err);
    }
  };

  const timeResponse = await fetchWorldTimeDate();
  console.log(timeResponse);

  // expired 날짜 변수 선언
  const currentTime = new Date(timeResponse.substr(0, 19).replace("T", " "));

  const future30Days = new Date(currentTime);
  future30Days.setDate(future30Days.getDate() + 30);
  const future365Days = new Date(currentTime);
  future365Days.setDate(future365Days.getDate() + 365);

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const monthIndex = date.getMonth();
    const year = date.getFullYear().toString();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = months[monthIndex];

    return `${day}-${month}-${year} | ${hours}:${minutes}:${seconds}`;
  };

  // 텍스트 그리기
  ctx.fillStyle = "white";
  ctx.font = "bold 22px GothicFont, sans-serif";
  ctx.fillText(`InsurSand Cover NFT`, 10, 30);
  ctx.fillText(`Price Drop Cover`, 10, 60);
  ctx.fillText(`Expired Date : ${formatDate(future30Days)} UTC`, 10, 120); // 만료 날짜 (만료 날짜가 지난 경우엔 컨트랙트에서 다른 uri 반환.)
  ctx.fillText("Cover Amount : 19222.993 DAI", 10, 150); // 커버 amount
  ctx.fillText("Cover Active Price : 1543.991 $", 10, 180); // 보험금 지급받을 수 있는 가격
  ctx.fillText("Standard WETH Price : 1983.930 $", 10, 210); // 민팅 당시의 토큰 가격
  ctx.fillText(`Mint Date : ${formatDate(currentTime)} UTC`, 10, 240); // 민팅 날짜

  // 이미지 데이터 가져오기
  const imageData = canvas.toDataURL();

  // formData를 사용하여 이미지 파일 데이터를 폼데이터 타입으로 변환시킴.
  var blobBin = atob(imageData.split(",")[1]);
  var array = [];
  for (var i = 0; i < blobBin.length; i++) {
    array.push(blobBin.charCodeAt(i));
  }
  var file = new Blob([new Uint8Array(array)], { type: "image/png" });
  var formdata = new FormData();
  formdata.append("file", file);
  console.log(formdata);

  return imageData;
};

// 이미지로 반환받은 ipfs hash 값을 넣어 metadata 생성
const generateMetadata = async (res) => {
  const uri = res.data.IpfsHash;
  console.log(uri);
  const imageUri = pinataURI + uri;
  console.log(imageUri);
  const metadata = {
    name: "Insur Sand",
    description: "Defi Insurance Service with NFT.",
    image: `${imageUri}`,
    attributes: [
      {
        trait_type: "Token Price Drop Cover.",
        value: `wETH`,
      },
    ],
  };

  // 메타데이터를 JSON 문자열로 변환
  const metadataString = JSON.stringify(metadata);

  // JSON 문자열을 파일로 변환
  const metadataFile = new Blob([metadataString], { type: "application/json" });
  var formdata = new FormData();
  formdata.append("file", metadataFile);
  console.log(formdata);

  return metadataFile;
};

const FileUpload = ({ finalPrice, period, account, amount, isChecked }) => {
  const [selectedFile, setSelectedFile] = useState();
  const [generatedImageData, setGeneratedImageData] = useState(null);

  const generateImage = async () => {
    // 캔버스 엘리먼트 생성
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // 이미지 크기 설정
    const width = 512;
    const height = 512;
    canvas.width = width;
    canvas.height = height;

    // 이미지 그리기
    ctx.fillStyle = "gray";
    ctx.fillRect(0, 0, width, height);

    const fetchWorldTimeDate = async () => {
      try {
        const response = await axios(
          "https://worldtimeapi.org/api/timezone/Etc/UTC"
        );
        return response.data.datetime;
      } catch (err) {
        console.error(err);
      }
    };

    const timeResponse = await fetchWorldTimeDate();
    console.log(timeResponse);

    // 텍스트 그리기
    const currentDate = timeResponse.substr(19, timeResponse.length());
    currentDate
      .toLocaleDateString("en-US", {
        day: "2-digit",
        year: "numeric",
        month: "short",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      })
      .replace(" ", "");
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText(`Expired Date : 20-08-2024`, 10, 40); // 만료 날짜 (만료 날짜가 지난 경우엔 컨트랙트에서 다른 uri 반환.)
    ctx.fillText("Cover Amount : 19222.993 DAI", 10, 70); // 커버 amount
    ctx.fillText("Cover Active Price : 1543.991 $", 10, 100); // 보험금 지급받을 수 있는 가격
    ctx.fillText("Standard WETH Price : 1983.930 $", 10, 150); // 민팅 당시의 토큰 가격
    ctx.fillText(`Mint Date : ${currentDate}`, 10, 180); // 민팅 날짜

    // 이미지 데이터 가져오기
    const imageData = canvas.toDataURL();

    // formData를 사용하여 이미지 파일 데이터를 폼데이터 타입으로 변환시킴.
    var blobBin = atob(imageData.split(",")[1]);
    var array = [];
    for (var i = 0; i < blobBin.length; i++) {
      array.push(blobBin.charCodeAt(i));
    }
    var file = new Blob([new Uint8Array(array)], { type: "image/png" });
    var formdata = new FormData();
    formdata.append("file", file);
    console.log(formdata);
  };

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  const onClickSubmission = async () => {
    try {
      if (account) {
        if (isChecked) {
          console.log(Math.ceil(finalPrice));
          const approve = await ERC20_contract.methods
            .approve(NFT_CA, Math.ceil(finalPrice))
            .send({
              from: account,
            });
          console.log(approve);

          const formData = new FormData();

          formData.append("file", await onScreengenerateImage());

          const metadata = JSON.stringify({
            name: "File name",
          });
          formData.append("pinataMetadata", metadata);

          const options = JSON.stringify({
            cidVersion: 0,
          });
          formData.append("pinataOptions", options);

          try {
            const res = await axios.post(
              "https://api.pinata.cloud/pinning/pinFileToIPFS",
              formData,
              {
                maxBodyLength: "Infinity",
                headers: {
                  "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
                  Authorization: JWT,
                },
              }
            );
            console.log(res.data);
            var responseOfPinataHash = res;
          } catch (error) {
            console.log(error);
          }

          const metaDatas = new FormData();

          metaDatas.append(
            "file",
            await generateMetadata(responseOfPinataHash)
          );

          const fileMetaData = JSON.stringify({
            name: `METADATA`,
          });
          metaDatas.append("pinataMetadata", fileMetaData);

          const options1 = JSON.stringify({
            cidVersion: 0,
          });
          metaDatas.append("pinataOptions", options1);

          try {
            const response = await axios.post(
              "https://api.pinata.cloud/pinning/pinFileToIPFS",
              metaDatas,
              {
                maxBodyLength: "Infinity",
                headers: {
                  "Content-Type": `multipart/form-data; boundary=${metaDatas._boundary}`,
                  Authorization: JWT,
                },
              }
            );
            if (response.status === 200) {
              const mint = await NFT_contract.methods

                .mintNFT_Cover(period, amount, response.data.IpfsHash)
                .send({
                  from: account,
                });
              console.log(mint);
            }
          } catch (error) {
            console.log(error);
          } // return response;
        } else {
          alert("please check the term");
        }
      } else {
        alert("please connect");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 클릭 시 NFT 이미지를 프론트에 그려주는 함수
  const onClickGenerateImage = async () => {
    const imageData = await onScreenDrawing();
    setGeneratedImageData(imageData);
  };

  return (
    <div>
      <button
        className="flex justify-center border text-green-600 border-green-500 mb-12 p-4 rounded-xl hover:animate-jump hover:animate-once hover:animate-duration-[1500ms] hover:text-green-800 hover:border-green-700 hover:bg-green-100"
        onClick={onClickSubmission}
      >
        Get Covered !
      </button>
      {/* <div>
        <button onClick={onClickGenerateImage}>generateImage</button>
      </div>
      {generatedImageData && (
        <img src={generatedImageData} alt="Generated Image" />
      )} */}
    </div>
  );
};

export default FileUpload;
