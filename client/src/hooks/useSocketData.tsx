import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socketUrl = process.env.REACT_APP_SOCKET_BASE_URL;

const socket = io(socketUrl || "");

interface IXData {
  x: number;
}

interface Data {
  barChartData: IXData[];
  lineChartData: IXData[];
}

const useSocketData = (eventName: string) => {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    socket.on(eventName, (newData) => {
      setData(newData);
    });

    return () => {
      socket.off(eventName);
    };
  }, [eventName]);

  return data;
};

export default useSocketData;
