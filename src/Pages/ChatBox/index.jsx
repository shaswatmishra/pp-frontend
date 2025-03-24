import { useState, useEffect, useRef } from "react";
import { ChatBoxWrapper, MessageContainer } from "./index.style";
import BackIconSvg from "../../Svg/BackIcon.svg";
import { SearchInput } from "../StaffPage/StaffPage.style";
import SendMessageSvg from "../../Svg/SendMessageSvg";
import SendFileSvg from "../../Svg/SendFileSvg";
import { useNavigate } from "react-router-dom";
import { WhatsApp } from "../../Api/Api";
import { useAuth } from "../../contexts/AuthContext";
import Loader from "../../Components/Loading/ExportLoader";
import Document from "./Media/Document";
import { useParams } from "react-router-dom";
import axios from "axios";

function convertTimeFormat(h, m) {
  let hh, mm;
  hh = parseInt(h);
  mm = parseInt(m);
  if (hh === 12) {
    return `${hh < 10 ? "0" : ""}${hh}:${mm < 10 ? "0" : ""}${mm} Pm`;
  } else if (hh > 12) {
    return `${hh < 10 ? "0" : ""}${hh % 12}:${mm < 10 ? "0" : ""}${mm} Pm`;
  } else {
    return `${mm < 10 ? "0" : ""}${hh}:${mm < 10 ? "0" : ""}${mm} Am`;
  }
}

const getTime = (from) => {
  if (from === "" || !from) return;

  let dt = new Date(from).toDateString();

  let t1 = from.split("T")[1];

  t1 = convertTimeFormat(t1.split(":")[0], t1.split(":")[1]);

  return `${t1}`;
};

function Index() {
  const navigate = useNavigate();
  const { idToken, DisplaySnackbar } = useAuth();
  const { id, number } = useParams();
  const [loading, setLoading] = useState(false);
  const [mssg, setMssg] = useState("");
  const [messages, setMessages] = useState([]);
  const messageId = useRef(null);
  const messagesRef = useRef([]);
  const intervalRef = useRef(null);
  const requestPending = useRef(false);

  const messagesEndRef = useRef(null);

  const updateNewMessages = (newMessages) => {
    setMessages([...messagesRef.current, ...newMessages]);
  };

  const getData = async (query) => {
    setLoading(true);
    try {
      const dt = await axios.get(
        `${WhatsApp?.getChats(id)}?${query}&sort=-createdAt`,
        {
          headers: {
            firebasetoken: idToken,
          },
        }
      );
      setMessages(dt?.data?.data?.messages.reverse());
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const sendMessage = async () => {
    if (!mssg) return;

    var index = null;
    try {
      messages.push({
        _id: Date.now().toString(16),
        message: mssg,
        createdAt: new Date().toISOString(),
        status: "pending",
        sender: "doctor",
        messageType:"text"
      });

      setMessages([...messages]);
      index = messages.length - 1;

      const dt = await axios.post(
        WhatsApp.sendMssg,
        {
          code: "91",
          text: mssg,
          number: number,
        },
        {
          headers: {
            firebasetoken: idToken,
          },
        }
      );

      messages[index] = dt.data.data.message;
      setMessages([...messages]);
      setMssg("");
    } catch (err) {
      messages[index].status = "error";
      setMessages([...messages]);
      DisplaySnackbar(err?.response?.data?.message, "error");
    }
  };

  const sendMediaMessage = async (e) => {
    const file = e.target.files[0];
    if (!e.target.files[0]) return;

    const messageType =
      file.type.split("/")[0] === "application"
        ? "document"
        : file.type.split("/")[0];

    var index = null;
    try {
      messages.push({
        _id: Date.now().toString(16),
        message: mssg,
        createdAt: new Date().toISOString(),
        filename: file.name,
        messageType,
        status: "pending",
        sender: "doctor",
      });

      setMessages([...messages]);
      index = messages.length - 1;

      const dt = await axios.post(
        WhatsApp.sendMediaMssg,
        {
          code: "91",
          number: number,
          messageType,
          fileurl: "",
        },
        {
          headers: {
            firebasetoken: idToken,
          },
        }
      );

      messages[index] = dt.data.data.message;
      setMessages([...messages]);
      setMssg("");
    } catch (err) {
      messages[index].status = "error";
      setMessages([...messages]);
      DisplaySnackbar(err?.response?.data?.message, "error");
    }
  };

  const fetchLatestMessages = async () => {
    try {
      requestPending.current = true;
      const dt = await axios.get(
        `${WhatsApp?.getChats(id)}?_id[gt]=${
          messageId.current
        }&limit=20&sort=-createdAt`,
        {
          headers: {
            firebasetoken: idToken,
          },
        }
      );
      return dt.data.data.messages;
    } catch (err) {
      console.log(err);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    if (messages.length) {
      messagesRef.current = messages;
      messageId.current = messages[messages.length - 1]._id;
    }
  }, [messages]);

  useEffect(() => {
    //fetch messages
    getData("page=1&limit=20");
    //setup interval
    intervalRef.current = setInterval(() => {
      if (requestPending.current) return;
      if (!messageId.current) return;
      fetchLatestMessages()
        .then((newMessages) => {
          if (!newMessages.length) return;
          updateNewMessages(newMessages.reverse());
        })
        .finally(() => (requestPending.current = false));
    }, 1500);
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <ChatBoxWrapper>
      <div className="heading">
        <div onClick={() => navigate(-1)} className="icon">
          <BackIconSvg />
        </div>
        <h2>{number}</h2>
      </div>
      <div style={{ marginBottom: "70px" }}>
        {messages.map((item, id) => {
          return (
            <>
              <p
                style={{
                  textAlign: "center",
                  fontWeight: "500",
                  fontSize: "1.1rem",
                }}
              >
                {id !== 0 &&
                new Date(messages[id]?.createdAt).toDateString() ===
                  new Date(messages[id - 1]?.createdAt).toDateString()
                  ? ""
                  : new Date(messages[id]?.createdAt).toDateString()}
              </p>

              <Message
                time={getTime(item?.createdAt || new Date())}
                text={item?.message}
                mediaType={item?.messageType}
                mediaUrl={item.mediaUrl}
                color={item?.sender === "doctor" ? "#EBDDFF" : "#F2F2F2"}
                type={item?.sender === "doctor" ? "right" : "left"}
                status={item?.status}
              />
            </>
          );
        })}
      </div>

      {/* <Message color="#F2F2F2" type="left"/>
        <Message color="#EBDDFF" type="right"/> */}
      <div className="messageInput">
        <div>
          <span onClick={sendMediaMessage}>
            <SendFileSvg />
          </span>
        </div>
        <div className="searchContainer">
          <SearchInput
            value={mssg}
            onChange={(e) => setMssg(e.target.value)}
            placeholder="Type Your message"
          />
          <div onClick={() => sendMessage()} className="sendIcon">
            <SendMessageSvg />
          </div>
        </div>
      </div>
      <div ref={messagesEndRef} />
      {loading && <Loader />}
    </ChatBoxWrapper>
  );
}

const Message = ({
  filename,
  mediaType,
  mediaUrl,
  text,
  color,
  type,
  time,
  status,
}) => {
  const style = {};
  if (status === "pending") {
    style["opacity"] = 0.5;
  }

  const downloadFile = (uri, name) => {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderMedia = (mediaType, mediaUrl, text) => {
    var component = "";
    switch (mediaType) {
      case "video":
        component = <video className="text media" src={mediaUrl} />;
        break;
      case "image":
        component = (
          <img className="text media" src={mediaUrl} alt="media message" />
        );
        break;
      case "document":
        if (!filename) {
          try {
            filename = new URL(mediaUrl)?.pathname?.replace("/contents/", "");
          } catch (err) {
            return null;
          }
        }
        component = <Document filename={filename} fileurl={mediaUrl} />;
        break;
      case "text":
        component = <p className={`text ${status}`}>{text}</p>;
        break;
    }
    return component;
  };

  return (
    <MessageContainer style={style} color={color} type={type}>
      <p className="time">{time}</p>
      {renderMedia(mediaType, mediaUrl, text)}
    </MessageContainer>
  );
};

export default Index;

/**
 * [
    {
      messageType: "image",
      mediaUrl:
        "https://bcn-bucket.s3.ap-south-1.amazonaws.com/contents/2560x1600-4564622-star-wars-star-destroyer+(1).jpg",
      createdAt: new Date().toISOString(),
      sender: "doctor",
    },
    {
      messageType: "document",
      mediaUrl:
        "https://bcn-bucket.s3.ap-south-1.amazonaws.com/contents/AirportTransferChargeAuthorization.pdf",
      createdAt: new Date().toISOString(),
      sender: "doctor",
    },
    {
      messageType: "text",
      mediaUrl: "Dummy text from doctor",
      createdAt: new Date().toISOString(),
      sender: "doctor",
    },
  ]
 */
