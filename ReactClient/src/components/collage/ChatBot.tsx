import { useState } from "react";
const myUrl = import.meta.env.VITE_SERVERURL
export default function ChatBot() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            sender: "bot",
            text: `ברוך הבא! כתוב לי:
- כמה תמונות יש לך לקולאז'
- איזה צבעים או סגנון אתה מחפש
- לאיזו מטרה הקולאז' (אירוע? זיכרון?)
ואני אמליץ לך על רקע מתאים`
        }
    ]);
    const [input, setInput] = useState("");

    const sendMessage = async () => {
        if (!input.trim()) return;

        const newMessages = [...messages, { sender: "user", text: input }];
        setMessages(newMessages);
        setInput("");

        const res = await fetch(`${myUrl}/api/ChatBot`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ messages: [{ role: "user", content: input }] })
        });
        const data = await res.json();

        setMessages([...newMessages, { sender: "bot", text: data.reply }]);
    };

    return (
        <>
            <button
                onClick={() => setOpen(!open)}
                className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-blue-600 text-white text-2xl shadow-lg"
            >
                💬
            </button>

            {open && (
                <div className="fixed bottom-24 right-6 w-80 bg-white rounded-xl shadow-lg border p-3">
                    <h3 className="text-lg font-bold mb-2">עוזר קולאז'</h3>
                    <div className="h-48 overflow-y-auto border p-2 rounded bg-gray-50 mb-2 text-sm space-y-2">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={msg.sender === "user" ? "text-right" : "text-left"}>
                                <span className="inline-block px-2 py-1 rounded bg-gray-200">
                                    {msg.text}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="flex">
                        <input
                            type="text"
                            className="flex-1 border rounded p-1 text-sm"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                            placeholder="כתוב פה את הבקשה שלך..."
                        />
                        <button
                            onClick={sendMessage}
                            className="ml-2 bg-blue-600 text-white px-3 rounded"
                        >
                            שלח
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
