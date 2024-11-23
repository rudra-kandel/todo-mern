import tokenService from "@services/service-token";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import URL from "../../constants/apiurl";
import { io } from "socket.io-client";

export default function Logs() {
  let arr;
  const [logs, setLogs] = useState([]);
  const token = tokenService.getToken().access;
  let headers = {
    Authorization: "Bearer " + tokenService.getToken()?.access,
  };

  const navigate = useNavigate();
  const firstRender = useRef(true);
  let socket;

  const addDet = (res) => {
    console.log("🚀 ~ socket.on ~ res:", res);
    console.log(logs, arr, "logs");
    let temp = [...arr];
    console.log(temp);
    temp.unshift({ ...res });
    console.log(temp, "temp");
    arr = [...temp];
    setLogs([...temp]);
  };

  function setupSocket() {
    socket = io(URL, {
      auth: {
        token,
      },
    });

    socket.on("connect", () => {
      console.log("🚀 ~ socket.on ~ connected");
    });
    socket.on("emailLog", addDet);
  }

  useEffect(() => {
    if (!token) return navigate("/login");
    if (firstRender.current) {
      console.log("first render", firstRender.current);
      // firstRender.current = false;
      axios
        .get(URL + "api/logs/?limit=15&page=1", { headers })
        .then((res) => {
          setLogs(res?.data.data);
          arr = res?.data?.data ?? [];
        })
        .catch((e) => {
          console.log("🚀 ~ axios.get ~ e:", e);
          return {};
        });
      // setupSocket();
      // return () => {
      //   socket.off("connect"),
      //     () => {
      //       console.log("🚀 ~ socket.on ~ connected");
      //     };
      //   socket.off("emailLog", (res) => {
      //     console.log("🚀 ~ socket.on ~ res:", res);
      //   });
      // };
    }
  }, []);
  useEffect(() => {
    if (!token) return navigate("/login");
    if (firstRender.current) {
      console.log("first render", firstRender.current);
      firstRender.current = false;
      setupSocket();
      return () => {
        socket.off("connect"),
          () => {
            console.log("🚀 ~ socket.on ~ connected");
          };
        socket.off("emailLog", (res) => {
          console.log("🚀 ~ socket.on ~ res:", res);
        });
      };
    }
  }, []);

  function logout(e) {
    e.preventDefault();
    tokenService.clear_token();
    navigate("/login");
  }
  return (
    <main className="min-h-screen w-[100dvw] flex flex-col bg-white ">
      <nav className="w-full flex justify-between px-10 py-5">
        <Link to="/">Home</Link>
        <button onClick={logout}>Log Out</button>
      </nav>
      <div className="px-10 py-5 h-full flex flex-col gap-3">
        <table className="">
          <thead>
            <tr>
              <th>S.N.</th>
              <th>Date</th>
              <th>Email</th>
              <th>Sent By</th>
              <th>Status</th>
              <th>Error Message</th>
              <th>Retry count</th>
            </tr>
          </thead>
          <tbody>
            {logs?.map((data, index) => (
              <tr key={index}>
                <td className="text-center p-2">{index + 1}</td>
                <td className="text-center p-2">{data.createdAt}</td>
                <td className="text-center p-2">{data.email}</td>
                <td className="text-center p-2">{data.user.email}</td>
                <td
                  className={`text-center p-2 ${
                    data.status === "success"
                      ? "text-green-500"
                      : data.status === "failed"
                        ? "text-red-500"
                        : ""
                  }`}
                >
                  {data.status}
                </td>
                <td className="text-center p-2">{data.errorMessage ?? "-"}</td>
                <td className="text-center p-2"> {data.retryCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
