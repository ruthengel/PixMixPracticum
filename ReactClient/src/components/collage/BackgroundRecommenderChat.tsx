"use client"
import { useState, useRef, useEffect } from "react"
import axios from "axios"
import { TextField, IconButton, Box, Typography, Paper, Slide, Avatar } from "@mui/material"
import ChatIcon from "@mui/icons-material/Chat"
import SendIcon from "@mui/icons-material/Send"
import SmartToyIcon from "@mui/icons-material/SmartToy"
import PersonIcon from "@mui/icons-material/Person"
import CloseIcon from "@mui/icons-material/Close"


const myUrl = import.meta.env.VITE_SERVERURL

const BackgroundRecommenderChat = () => {
  const [prompt, setPrompt] = useState("")
  const [messages, setMessages] = useState<{ role: "user" | "bot"; content: string }[]>([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const toggleChat = () => {
    setOpen((prev) => {
      if (!prev && messages.length === 0) {
        setMessages([
          {
            role: "bot",
            content:
              "היי! 😊 אני יכול לעזור לך לבחור תבנית רקע מתאימה לקולאז׳.\nפשוט תכתוב כמה תמונות יש לך ומה הסגנון שאתה רוצה (למשל צבעוני, רטרו, מודרני...)",
          },
        ])
      }
      return !prev
    })
  }

  const handleSend = async () => {
    if (!prompt.trim()) return
    const userMessage = {
      role: "user" as const,
      content: prompt,
    }

    setMessages((prev) => [...prev, userMessage])
    setPrompt("")
    setLoading(true)

    try {
      const result = await axios.post(`${myUrl}/api/ChatBot`,
        {
          messages: [{ role: "user", content: prompt }],
        })

      const botMessage = {
        role: "bot" as const,
        content: result.data.reply || "לא התקבלה תגובה.",
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: "❌ אירעה שגיאה בשליחה לשרת.",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <IconButton
        onClick={toggleChat}
        sx={{
          position: "fixed",
          bottom: 85,
          right: 20,
          background: "white",
          color: "#8B3DFF",
          width: 51,
          height: 51,
          boxShadow: "3",
          "&:hover": {
            background: "#8B3DFF",
            color: 'white',
            transform: "scale(1.05)",
            boxShadow: "0 12px 40px rgba(139, 61, 255, 0.4)",
          },
          transition: "all 0.3s ease",
          zIndex: 1000,
        }}
      >
        {open ? <CloseIcon sx={{ fontSize: 28 }} /> : <ChatIcon sx={{ fontSize: 28, color: "#8B3DFF", "&:hover": { color: 'white' } }} />}
      </IconButton>

      <Slide direction="up" in={open} mountOnEnter unmountOnExit>
        <Paper
          elevation={0}
          sx={{
            position: "fixed",
            bottom: 140,
            right: 20,
            width: 380,
            height: 520,
            borderRadius: "20px",
            background: "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
            border: "1px solid rgba(139, 61, 255, 0.1)",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.5)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 1000,
          }}
        >
          <Box
            sx={{
              background: "linear-gradient(135deg, #8B3DFF 0%, #A855F7 100%)",
              color: "white",
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderRadius: "20px 20px 0 0",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Avatar
                sx={{
                  bgcolor: "rgba(255, 255, 255, 0.2)",
                  width: 32,
                  height: 32,
                }}
              >
                <SmartToyIcon sx={{ fontSize: 18 }} />
              </Avatar>
              <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
                PixBot
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              overflowY: "auto",
              p: 2,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              background: "#fafafa",
              "&::-webkit-scrollbar": {
                width: "6px",
              },
              "&::-webkit-scrollbar-track": {
                background: "transparent",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "rgba(139, 61, 255, 0.2)",
                borderRadius: "3px",
              },
            }}
          >
            {messages.map((msg, idx) => (
              <Box
                key={idx}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 1,
                  flexDirection: msg.role === "user" ? "row-reverse" : "row",
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: "#f1f5f9",
                    color: "#8B3DFF",
                    width: 32,
                    height: 32,
                    fontSize: "14px",
                  }}
                >
                  {msg.role === "user" ? <PersonIcon /> : <SmartToyIcon />}
                </Avatar>
                <Box
                  sx={{
                    maxWidth: "75%",
                    backgroundColor:
                      msg.role === "user" ? "linear-gradient(135deg, #8B3DFF 0%, #A855F7 100%)" : "#ffffff",
                    background: msg.role === "user" ? "linear-gradient(135deg, #8B3DFF 0%, #A855F7 100%)" : "#ffffff",
                    color: msg.role === "user" ? "#fff" : "#1f2937",
                    borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                    p: 2,
                    whiteSpace: "pre-line",
                    boxShadow:
                      msg.role === "user" ? "0 4px 12px rgba(139, 61, 255, 0.3)" : "0 2px 8px rgba(0, 0, 0, 0.08)",
                    border: msg.role === "user" ? "none" : "1px solid #f1f5f9",
                    fontSize: "0.95rem",
                    lineHeight: 1.5,
                  }}
                >
                  {msg.content}
                </Box>
              </Box>
            ))}
            {loading && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 1,
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: "#f1f5f9",
                    color: "#8B3DFF",
                    width: 32,
                    height: 32,
                  }}
                >
                  <SmartToyIcon />
                </Avatar>
                <Box
                  sx={{
                    backgroundColor: "#ffffff",
                    borderRadius: "18px 18px 18px 4px",
                    p: 2,
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
                    border: "1px solid #f1f5f9",
                  }}
                >
                  <Box sx={{ display: "flex", gap: 0.5 }}>
                    {[0, 1, 2].map((i) => (
                      <Box
                        key={i}
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          backgroundColor: "#8B3DFF",
                          animation: "pulse 1.5s ease-in-out infinite",
                          animationDelay: `${i * 0.2}s`,
                          "@keyframes pulse": {
                            "0%, 80%, 100%": {
                              opacity: 0.3,
                            },
                            "40%": {
                              opacity: 1,
                            },
                          },
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              </Box>
            )}
            <div ref={messagesEndRef} />
          </Box>

          <Box
            sx={{
              p: 2,
              backgroundColor: "#ffffff",
              borderTop: "1px solid #f1f5f9",
              borderRadius: "0 0 20px 20px",
            }}
          >
            <Box sx={{ display: "flex", gap: 1, alignItems: "flex-end" }}>
              <TextField
                variant="outlined"
                placeholder="תאר את הקולאז׳ שלך..."
                fullWidth
                multiline
                maxRows={3}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSend()
                  }
                }}
                disabled={loading}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "20px",
                    backgroundColor: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    "&:hover": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#8B3DFF",
                      },
                    },
                    "&.Mui-focused": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#8B3DFF",
                        borderWidth: "2px",
                      },
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                  },
                  "& .MuiInputBase-input": {
                    fontSize: "0.95rem",
                  },
                }}
              />
              <IconButton
                onClick={handleSend}
                disabled={!prompt.trim() || loading}
                sx={{
                  background:
                    prompt.trim() && !loading ? "linear-gradient(135deg, #8B3DFF 0%, #A855F7 100%)" : "#e2e8f0",
                  color: prompt.trim() && !loading ? "white" : "#94a3b8",
                  width: 44,
                  height: 44,
                  "&:hover": {
                    background:
                      prompt.trim() && !loading ? "linear-gradient(135deg, #7C3AED 0%, #9333EA 100%)" : "#e2e8f0",
                    transform: prompt.trim() && !loading ? "scale(1.05)" : "none",
                  },
                  transition: "all 0.2s ease",
                  "&:disabled": {
                    background: "#e2e8f0",
                    color: "#94a3b8",
                  },
                }}
              >
                <SendIcon />
              </IconButton>
            </Box>
          </Box>
        </Paper>
      </Slide>
    </>
  )
}

export default BackgroundRecommenderChat
