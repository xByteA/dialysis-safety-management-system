import React, { useState, useEffect, useRef, useContext } from "react";
import { getMessages, sendMessage } from "../data/mock-data";
import { LanguageContext } from "../context/LanguageContext";
import { useTranslationNew } from "../utils/i18n";

export default function SecureMessaging() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [activeChat, setActiveChat] = useState("Dr. Sarah Chen");
  const chatEndRef = useRef(null);
  const { language } = useContext(LanguageContext);
  const t = useTranslationNew(language);

  useEffect(() => {
    setMessages(getMessages());
  }, []);

  useEffect(() => {
    // Scroll to bottom when messages update
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const translateName = (name) => {
    if (language !== "ar") return name;
    if (name === "Dr. Sarah Chen") return "د. سارة تشين (Dr. Sarah Chen)";
    if (name === "Dr. Clinical Administrator") return "د. المسؤول السريري";
    if (name === "Nurse Henderson") return "الممرضة هندرسون (Nurse Henderson)";
    if (name === "Nurse Davis") return "الممرضة ديفيس (Nurse Davis)";
    return name;
  };

  const translateRole = (role) => {
    if (language !== "ar") return role;
    if (role === "Head of Nephrology") return "رئيس قسم أمراض الكلى";
    if (role === "Director") return "المدير الطبي للقسم";
    if (role === "Shift Supervisor") return "مشرف الوردية السريرية";
    return role;
  };

  const translateMsgText = (text) => {
    if (language !== "ar") return text;
    if (text === "Please monitor bed 4 BP every 15 mins.")
      return "يرجى مراقبة ضغط دم السرير ٤ كل ١٥ دقيقة.";
    if (text === "Understood. Trend is showing slow stabilization. Saline bolus administered.")
      return "مفهوم. يظهر الاتجاه استقراراً بطيئاً في الدورة الدموية. تم إعطاء محلول ملحي وريدي.";
    if (text === "Excellent. Let me know if MAP drops below 60.")
      return "ممتاز. أعلمني فوراً إذا انخفض متوسط الضغط الشرياني (MAP) عن ٦٠.";
    if (text === "Do we have extra bloodline kits in cabinet B?")
      return "هل لدينا مجموعات أنابيب دم إضافية في الخزانة ب؟";
    if (text === "Yes, stocked this morning. Bottom shelf.")
      return "نعم، تم تزويدها هذا الصباح في الرف السفلي.";
    if (text.includes("Acknowledged message. Please ensure the clinical flowsheet"))
      return "تم استلام وفهم الرسالة. يرجى التأكد من تحديث تفاصيل ورقة العمل السريرية كاملة في السجلات.";
    return text;
  };

  const translateTime = (time) => {
    if (language !== "ar") return time;
    return time.replace("AM", "صباحاً").replace("PM", "مساءً");
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const timeString = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const newMsg = {
      sender: "Nurse Davis", // Simulated logged in user
      recipient: activeChat,
      text: inputText,
      time: timeString
    };

    const updated = sendMessage(newMsg);
    setMessages(updated);
    setInputText("");

    // Simulate doctor quick reply after 1.5 seconds
    setTimeout(() => {
      const docReply = {
        sender: activeChat,
        recipient: "Nurse Davis",
        text: `Acknowledged message. Please ensure the clinical flowsheet details are updated in the logs.`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      const responseList = sendMessage(docReply);
      setMessages(responseList);
    }, 1500);
  };

  const activeChatMessages = messages.filter(
    m => (m.sender === activeChat && m.recipient === "Nurse Davis") ||
         (m.sender === "Nurse Davis" && m.recipient === activeChat)
  );

  const contactList = [
    { name: "Dr. Sarah Chen", role: "Head of Nephrology", status: "online" },
    { name: "Dr. Clinical Administrator", role: "Director", status: "online" },
    { name: "Nurse Henderson", role: "Shift Supervisor", status: "offline" }
  ];

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-10rem)] flex bg-white dark:bg-on-background border border-border-subtle dark:border-outline-variant rounded-xl overflow-hidden shadow-soft text-start">
      {/* Contact sidebar list */}
      <aside className="w-1/3 border-e border-border-subtle dark:border-outline-variant flex flex-col text-start">
        <div className="p-md bg-surface-muted dark:bg-surface-container-highest border-b border-border-subtle dark:border-outline-variant text-start">
          <h2 className="font-headline-md text-headline-md font-bold text-on-surface dark:text-white text-start">
            {language === "ar" ? "محادثات الأطباء" : "Clinician Chats"}
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto divide-y divide-border-subtle dark:divide-outline-variant text-start">
          {contactList.map((contact, idx) => (
            <button
              key={idx}
              onClick={() => setActiveChat(contact.name)}
              className={`w-full p-md text-start flex items-center gap-md hover:bg-surface-muted dark:hover:bg-surface-container-highest transition-colors ${
                activeChat === contact.name ? "bg-surface-container-low dark:bg-inverse-surface" : ""
              }`}
            >
              <div className="relative shrink-0">
                <div className="w-10 h-10 rounded-full bg-primary-container text-white flex items-center justify-center font-bold text-sm">
                  {contact.name.split(" ").map(n => n[0]).join("")}
                </div>
                <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white ${
                  contact.status === "online" ? "bg-success-medical" : "bg-outline"
                }`} />
              </div>
              <div className="text-start">
                <h4 className="font-semibold text-on-surface dark:text-white text-xs leading-none text-start">
                  {translateName(contact.name)}
                </h4>
                <p className="text-[10px] text-on-surface-variant mt-1 text-start">
                  {translateRole(contact.role)}
                </p>
              </div>
            </button>
          ))}
        </div>
      </aside>

      {/* Chat pane */}
      <section className="flex-1 flex flex-col bg-surface-bg dark:bg-inverse-surface text-start">
        {/* Chat header */}
        <div className="p-md border-b border-border-subtle dark:border-outline-variant flex items-center gap-sm bg-surface-muted dark:bg-surface-container-highest text-start">
          <div className="w-8 h-8 rounded-full bg-primary-container text-white flex items-center justify-center font-bold text-xs shrink-0">
            {activeChat.split(" ").map(n => n[0]).join("")}
          </div>
          <div className="text-start">
            <h3 className="font-semibold text-on-surface dark:text-white text-sm text-start">
              {translateName(activeChat)}
            </h3>
            <span className="text-[10px] text-success-medical font-semibold flex items-center gap-xs text-start">
              <span className="w-1.5 h-1.5 rounded-full bg-success-medical block"></span>
              {language === "ar" ? "نشط الآن" : "Active Now"}
            </span>
          </div>
        </div>

        {/* Messages viewport */}
        <div className="flex-1 overflow-y-auto p-md space-y-md text-start">
          {activeChatMessages.map((msg) => {
            const isMe = msg.sender === "Nurse Davis";
            return (
              <div key={msg.id} className={`flex ${isMe ? "justify-end text-end" : "justify-start text-start"}`}>
                <div className={`max-w-[70%] rounded-xl p-md shadow-sm text-start ${
                  isMe 
                    ? "bg-primary text-white rounded-tr-none" 
                    : "bg-white dark:bg-on-background border border-border-subtle dark:border-outline-variant text-on-surface dark:text-white rounded-tl-none"
                }`}>
                  <p className="text-xs text-start">{translateMsgText(msg.text)}</p>
                  <span className={`block text-[8px] mt-1 text-right ${isMe ? "text-white/70" : "text-on-surface-variant"}`}>
                    {translateTime(msg.time)}
                  </span>
                </div>
              </div>
            );
          })}
          <div ref={chatEndRef} />
        </div>

        {/* Input box */}
        <form onSubmit={handleSend} className="p-md border-t border-border-subtle dark:border-outline-variant bg-white dark:bg-on-background flex gap-sm text-start">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={language === "ar" ? `أرسل رسالة إلى ${translateName(activeChat)}...` : `Message ${activeChat}...`}
            className="flex-1 border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-lg px-4 py-3 text-xs focus:outline-none focus:border-primary text-on-surface dark:text-white text-start"
          />
          <button
            type="submit"
            className="bg-primary text-white px-lg py-3 rounded-lg hover:bg-surface-tint transition-all active:scale-95 duration-150 text-xs font-bold uppercase tracking-wider shrink-0"
          >
            {language === "ar" ? "إرسال" : "Send"}
          </button>
        </form>
      </section>
    </div>
  );
}
