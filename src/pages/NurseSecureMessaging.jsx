import React, { useState, useEffect, useRef } from "react";
import { getMessages, sendMessage } from "../data/mock-data";

export default function NurseSecureMessaging() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const chatEndRef = useRef(null);

  const initialNursesMessages = [
    { id: 101, sender: "Nurse Henderson", text: "Arthur Pendelton's graft checks are clear this morning. Swelling decreased.", time: "07:30 AM" },
    { id: 102, sender: "Nurse Roberts", text: "Thanks. Has anyone prepped the RO system calibration logs yet?", time: "07:45 AM" },
    { id: 103, sender: "Nurse Davis", text: "Yes, Ramirez did them at 7:45 AM. All clear.", time: "07:55 AM" },
    { id: 104, sender: "Nurse Henderson", text: "We have a new admission coming in later, Emma Lopez. Check-in is scheduled for 14:00.", time: "08:15 AM" }
  ];

  useEffect(() => {
    const list = localStorage.getItem("nurse_group_messages");
    if (!list) {
      localStorage.setItem("nurse_group_messages", JSON.stringify(initialNursesMessages));
      setMessages(initialNursesMessages);
    } else {
      setMessages(JSON.parse(list));
    }
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const timeString = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const newMsg = {
      id: Date.now(),
      sender: "Nurse Davis", // Simulated logged in user
      text: inputText,
      time: timeString
    };

    const updated = [...messages, newMsg];
    setMessages(updated);
    localStorage.setItem("nurse_group_messages", JSON.stringify(updated));
    setInputText("");

    // Simulate other nurse reply after 2 seconds
    setTimeout(() => {
      const nurseReply = {
        id: Date.now() + 1,
        sender: "Nurse Henderson",
        text: "Got it, I will coordinate the bed assignments for the shift transition.",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      const responseList = [...updated, nurseReply];
      setMessages(responseList);
      localStorage.setItem("nurse_group_messages", JSON.stringify(responseList));
    }, 2000);
  };

  return (
    <div className="max-w-5xl mx-auto h-[calc(100vh-10rem)] flex flex-col bg-white dark:bg-on-background border border-border-subtle dark:border-outline-variant rounded-xl overflow-hidden shadow-soft">
      {/* Header */}
      <div className="p-md border-b border-border-subtle dark:border-outline-variant bg-surface-muted dark:bg-surface-container-highest flex items-center justify-between">
        <div className="flex items-center gap-md">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <span className="material-symbols-outlined">groups</span>
          </div>
          <div>
            <h2 className="font-headline-md text-headline-md font-bold text-on-surface dark:text-white">Nurses Shift Handover Chat</h2>
            <p className="text-[10px] text-on-surface-variant mt-0.5">Active Staff Members: Nurse Davis, Nurse Henderson, Nurse Roberts</p>
          </div>
        </div>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-status-badge font-status-badge bg-success-medical/15 text-success-medical text-[10px] font-bold">
          4 Clinicians Online
        </span>
      </div>

      {/* Messages pane */}
      <div className="flex-1 overflow-y-auto p-md space-y-md bg-surface-bg dark:bg-inverse-surface">
        {messages.map((msg) => {
          const isMe = msg.sender === "Nurse Davis";
          return (
            <div key={msg.id} className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
              <span className="text-[9px] text-on-surface-variant font-semibold px-1 mb-0.5">{msg.sender}</span>
              <div className={`max-w-[70%] rounded-xl p-md shadow-sm ${
                isMe 
                  ? "bg-primary text-white rounded-tr-none" 
                  : "bg-white dark:bg-on-background border border-border-subtle dark:border-outline-variant text-on-surface dark:text-white rounded-tl-none"
              }`}>
                <p className="text-xs">{msg.text}</p>
                <span className={`block text-[8px] mt-1 text-right ${isMe ? "text-white/70" : "text-on-surface-variant"}`}>
                  {msg.time}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={chatEndRef} />
      </div>

      {/* Input bar */}
      <form onSubmit={handleSend} className="p-md border-t border-border-subtle dark:border-outline-variant bg-white dark:bg-on-background flex gap-sm">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Broadcast to nursing team..."
          className="flex-1 border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-lg px-4 py-3 text-xs focus:outline-none focus:border-primary text-on-surface dark:text-white"
        />
        <button
          type="submit"
          className="bg-primary text-white px-lg py-3 rounded-lg hover:bg-surface-tint transition-all active:scale-95 duration-150 text-xs font-bold uppercase tracking-wider"
        >
          Broadcast
        </button>
      </form>
    </div>
  );
}
