import React, { useEffect, useState } from "react";
import axios from "axios";
import { AxiosResponse } from "axios";

// 建立context
export const MyContext = React.createContext({});
export default function Context(props: any) {
  // useState
  const [userObj, setUserObj] = useState<any>();

  // useEffect
  useEffect(() => {
    axios
      .get("http://localhost:8000/getuser", { withCredentials: true })
      .then((res: AxiosResponse) => {
        if (res.data) {
          setUserObj(res.data);
        }
      });
  }, []);
  return (
    <MyContext.Provider value={userObj}>{props.children}</MyContext.Provider>
  );
}
