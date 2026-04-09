import { useState, useRef, useEffect } from "react";
import axios from "axios";
import "../assets/css/AiChatDrawer.css";

const QUICK_QUESTIONS = [
  "È adatto ai bambini?",
  "Quanto dura il gioco?",
  "Vale il prezzo?",
  "È simile ad altri giochi?",
  "È multiplayer?",
];

export default function AiChatDrawer({ product }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showQuick, setShowQuick] = useState(true);

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (product?.name) {
      setMessages([
        {
          role: "bot",
          text: `Ciao! Sono l'assistente per ${product.name}. Chiedimi qualsiasi cosa su questo gioco! 🎮`,
        },
      ]);
      setShowQuick(true);
    }
  }, [product?.name]);

  useEffect(() => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }, [messages, isLoading]);

  // Focus automatico all'apertura del drawer
  useEffect(() => {
    if (isOpen) textareaRef.current?.focus();
  }, [isOpen]);

  const buildSystemPrompt = () => {
    return `Sei un assistente esperto di videogiochi.

    Parla in modo naturale, utile e diretto.

    Gioco:
    - Nome: ${product?.name}
    - Descrizione: ${product?.description}
    - Prezzo: ${product?.price}€
    - Generi: ${product?.genres}
    - Piattaforme: ${product?.platforms}

    Obiettivo:
    Aiuta l'utente a capire se vale la pena acquistarlo.

    Regole:
    - Risposte brevi (max 3 frasi)
    - Niente frasi generiche
    - Dai opinioni concrete`;
  };

  const sendMessage = async (text) => {
    const userText = (text || input).trim();
    if (!userText || isLoading) return;

    // Reset altezza textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    const newMessages = [...messages, { role: "user", text: userText }];

    setMessages(newMessages);
    setInput("");
    setShowQuick(false);
    setIsLoading(true);

    // messaggio utente
    const history = newMessages.slice(1, -1).map((m) => ({
      role: m.role === "user" ? "user" : "assistant",
      content: m.text,
    }));

    try {
      const { data } = await axios.post(`http://localhost:3000/chat`, {
        system: buildSystemPrompt(),
        messages: [...history, { role: "user", content: userText }],
      });

      setMessages((prev) => [...prev, { role: "bot", text: data.reply }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Errore di connessione al server." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {isOpen && (
        <div className="chat-overlay" onClick={() => setIsOpen(false)} />
      )}

      <button
        className={isOpen ? "" : "chat-toggle"}
        onClick={() => setIsOpen(!isOpen)}
      >
        🤖 AI CHAT
      </button>

      <div className={`chat-drawer ${isOpen ? "open" : ""}`}>
        <div className="chat-header  d-flex">
          <div className="text chatTitleContainer">
            <p
              className="chat-title mb-0 fs-3 "
              style={{ color: "var(--viola)" }}
            >
              GAME ASSISTANT
            </p>
            <p className="chat-sub mb-0 fs-4 text">{product?.name}</p>
          </div>
          <button onClick={() => setIsOpen(false)} className=" buttonYES my-3">
            ✕
          </button>
        </div>

        <div className="chat-messages pixel-sans">
          {messages.map((msg, i) => (
            <div key={i} className={`msg ${msg.role}`}>
              {msg.role === "bot" && <span className="bot-label fs-5">AI</span>}
              {<span className="text">{msg.text}</span>}
            </div>
          ))}

          {isLoading && <div className="typing">...</div>}

          <div ref={messagesEndRef} />
        </div>

        {showQuick && (
          <div className="quick pixel-sans">
            {QUICK_QUESTIONS.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                style={{ color: "var(--viola)" }}
              >
                {q}
              </button>
            ))}
          </div>
        )}

        <div className="chat-input pixel-sans">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
            onKeyDown={handleKey}
            placeholder="Scrivi..."
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim()}
            className="buttonNO p-0"
          >
            ➤
          </button>
        </div>
      </div>
    </>
  );
}
