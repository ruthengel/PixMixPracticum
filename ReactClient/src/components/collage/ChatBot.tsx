// import { useState } from "react";
// const myUrl = import.meta.env.VITE_SERVERURL
// export default function ChatBot() {
//     const [open, setOpen] = useState(false);
//     const [messages, setMessages] = useState([
//         {
//             sender: "bot",
//             text: `ברוך הבא! כתוב לי:
// - כמה תמונות יש לך לקולאז'
// - איזה צבעים או סגנון אתה מחפש
// - לאיזו מטרה הקולאז' (אירוע? זיכרון?)
// ואני אמליץ לך על רקע מתאים`
//         }
//     ]);
//     const [input, setInput] = useState("");

//     const sendMessage = async () => {
//         if (!input.trim()) return;

//         const newMessages = [...messages, { sender: "user", text: input }];
//         setMessages(newMessages);
//         setInput("");

//         const res = await fetch(`${myUrl}/api/ChatBot`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ messages: [{ role: "user", content: input }] })
//         });
//         const data = await res.json();

//         setMessages([...newMessages, { sender: "bot", text: data.reply }]);
//     };

//     return (
//         <>
//             <button
//                 onClick={() => setOpen(!open)}
//                 className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-blue-600 text-white text-2xl shadow-lg"
//             >
//                 💬
//             </button>

//             {open && (
//                 <div className="fixed bottom-24 right-6 w-80 bg-white rounded-xl shadow-lg border p-3">
//                     <h3 className="text-lg font-bold mb-2">עוזר קולאז'</h3>
//                     <div className="h-48 overflow-y-auto border p-2 rounded bg-gray-50 mb-2 text-sm space-y-2">
//                         {messages.map((msg, idx) => (
//                             <div key={idx} className={msg.sender === "user" ? "text-right" : "text-left"}>
//                                 <span className="inline-block px-2 py-1 rounded bg-gray-200">
//                                     {msg.text}
//                                 </span>
//                             </div>
//                         ))}
//                     </div>
//                     <div className="flex">
//                         <input
//                             type="text"
//                             className="flex-1 border rounded p-1 text-sm"
//                             value={input}
//                             onChange={(e) => setInput(e.target.value)}
//                             onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//                             placeholder="כתוב פה את הבקשה שלך..."
//                         />
//                         <button
//                             onClick={sendMessage}
//                             className="ml-2 bg-blue-600 text-white px-3 rounded"
//                         >
//                             שלח
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// }

"use client"

import { useState, useRef, useEffect } from "react"
import { Send, X, MessageSquare } from "lucide-react"

const myUrl = import.meta.env.VITE_SERVERURL

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: `ברוך הבא! כתוב לי:
- כמה תמונות יש לך לקולאז'
- איזה צבעים או סגנון אתה מחפש
- לאיזו מטרה הקולאז' (אירוע? זיכרון?)
ואני אמליץ לך על רקע מתאים`,
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Animation classes when opening/closing the chat
  const chatContainerClasses = `fixed bottom-24 right-6 w-80 md:w-96 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden transition-all duration-300 ease-in-out ${
    open ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-10 pointer-events-none"
  }`

  const sendMessage = async () => {
    if (!input.trim()) return

    const newMessages = [...messages, { sender: "user", text: input }]
    setMessages(newMessages)
    setInput("")
    setIsTyping(true)

    try {
      const res = await fetch(`${myUrl}/api/ChatBot`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content: input }] }),
      })

      const data = await res.json()
      setIsTyping(false)
      setMessages([...newMessages, { sender: "bot", text: data.reply }])
    } catch (error) {
      setIsTyping(false)
      setMessages([...newMessages, { sender: "bot", text: "אירעה שגיאה בתקשורת. אנא נסה שוב מאוחר יותר." }])
    }
  }

  return (
    <>
      {/* Chat toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg flex items-center justify-center transition-all hover:shadow-blue-300/50 hover:shadow-xl active:scale-95"
        aria-label={open ? "סגור צ'אט" : "פתח צ'אט"}
      >
        {open ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {/* Chat container */}
      <div className={chatContainerClasses}>
        {/* Chat header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 flex justify-between items-center">
          <h3 className="text-lg font-bold">עוזר קולאז' חכם</h3>
          <button
            onClick={() => setOpen(false)}
            className="text-white/80 hover:text-white transition-colors"
            aria-label="סגור צ'אט"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages area */}
        <div className="h-64 md:h-80 overflow-y-auto p-3 bg-gray-50 space-y-3">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] px-3 py-2 rounded-lg ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white text-gray-800 border border-gray-200 px-3 py-2 rounded-lg rounded-bl-none shadow-sm">
                <div className="flex space-x-1 rtl:space-x-reverse">
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="p-3 bg-white border-t border-gray-200">
          <div className="flex">
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded-l-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rtl:text-right"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="כתוב פה את הבקשה שלך..."
              dir="rtl"
            />
            <button
              onClick={sendMessage}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 rounded-r-lg flex items-center justify-center transition-colors hover:from-blue-600 hover:to-blue-700 disabled:opacity-50"
              disabled={!input.trim() || isTyping}
            >
              <Send size={18} className="transform rotate-180" />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
