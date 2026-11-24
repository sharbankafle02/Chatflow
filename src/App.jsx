import { useState } from "react";
import Login from "./pages/Login";
import ChatPage from "./pages/ChatPage";
import useLocalStorage from "./hooks/useLocalStorage";
import { currentUser, initialConversations, initialMessages, users } from "./data/demoData";

export default function App() {
  const [loggedIn, setLoggedIn] = useLocalStorage("chatflow_logged_in", false);
  const [profile, setProfile] = useLocalStorage("chatflow_profile", currentUser);
  const [conversations, setConversations] = useLocalStorage("chatflow_conversations", initialConversations);
  const [messages, setMessages] = useLocalStorage("chatflow_messages", initialMessages);

  if (!loggedIn) return <Login onLogin={() => setLoggedIn(true)} />;
  return <ChatPage profile={profile} setProfile={setProfile} conversations={conversations} setConversations={setConversations} messages={messages} setMessages={setMessages} users={users} onLogout={() => setLoggedIn(false)} />;
}
