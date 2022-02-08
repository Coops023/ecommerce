import { useEffect, useState } from "react";

import { Products } from "../api/api";

export default function Headphones() {
  const [headphones, setHeadphones] = useState([]);

  async function getHeadphones() {
    const response = await new Products().getAllHeadphones();
    // console.log("this is the response", response);
    // console.log("this is the response data", response.data);
    setHeadphones(response.data.headphones);
  }

  useEffect(() => {
    getHeadphones();
  }, []);

  return (
    <div>
      <h2>Hello</h2>
      {headphones.map((headphone) => {
        return <h2>{headphone.name}</h2>;
      })}
    </div>
  );
}
