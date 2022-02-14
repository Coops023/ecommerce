import { useEffect, useState } from "react";
// import { headphone } from "./server/routes";
import { Link } from "react-router-dom";
import { Products } from "../api/api";

export default function Headphones() {
  const [headphones, setHeadphones] = useState([]);

  async function getHeadphones() {
    const response = await new Products().getAllHeadphones();
    console.log("this is the response", response);
    console.log("this is the response data", response.data);

    setHeadphones(response.data.headphones);
  }

  useEffect(() => {
    getHeadphones();
  }, []);

  return (
    <article>
      {headphones.map((headphone) => {
        return (
          <div>
            <h1>{headphone.image.mobile}</h1>
            <img width={200} height={200} src={headphone.image.mobile} alt="" />
          </div>
        );
      })}
    </article>
  );
}
