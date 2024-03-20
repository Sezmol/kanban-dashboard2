import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:8000");

const useSocketData = (eventName: string) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    socket.on(eventName, (newData) => {
      setData(newData);
    });

    return () => {
      socket.off("data-update");
    };
  }, [eventName]);

  return data;
};

export default useSocketData;
