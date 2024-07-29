import React from "react";
import * as FaIcons from "react-icons/fa";

function ChatRoom(props) {
  return (
    <>
      <main>
        <div>
          <img alt="" />
          <p>채팅 내용</p>
        </div>
      </main>
      <form>
        <input />
        <button>
          <FaIcons.FaPaperPlane />
        </button>
      </form>
    </>
  );
}

export default ChatRoom;