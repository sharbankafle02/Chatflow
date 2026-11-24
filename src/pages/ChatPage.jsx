import { useMemo, useState } from "react";
import { Bell, Menu } from "lucide-react";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import { DetailsModal, NewChatModal, ProfileModal } from "../components/Modals";
import Avatar from "../components/Avatar";

export default function ChatPage({ profile, setProfile, conversations, setConversations, messages, setMessages, users, onLogout }) {
  const [activeId, setActiveId] = useState("c1");
  const [search, setSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modal, setModal] = useState("");
  const active = useMemo(() => conversations.find((c) => c.id === activeId) || conversations[0], [conversations, activeId]);
  const activeMessages = messages[active?.id] || [];

  function selectChat(id) {
    setActiveId(id);
    setConversations((old) => old.map((c) => c.id === id ? { ...c, unread: 0 } : c));
  }

  function sendMessage(text, attachment) {
    const id = active.id;
    const newMessage = { id: Date.now(), sender: "me", text, attachment, time: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }), read: false };
    setMessages((old) => ({ ...old, [id]: [...(old[id] || []), newMessage] }));
    setConversations((old) => old.map((c) => c.id === id ? { ...c, lastMessage: text || `📎 ${attachment?.name}`, time: "Now" } : c));
  }

  function createGroup(name, memberIds) {
    const id = `c${Date.now()}`;
    const members = ["me", ...memberIds];
    const group = { id, type: "group", name, avatar: "", online: false, unread: 0, lastMessage: "Group created", time: "Now", members, color: "bg-fuchsia-600" };
    setConversations((old) => [group, ...old]);
    setMessages((old) => ({ ...old, [id]: [{ id: Date.now(), sender: "me", text: `Welcome to ${name}!`, time: "Now", read: false }] }));
    setActiveId(id);
    setModal("");
    setMobileOpen(false);
  }

  return <main className="flex h-screen min-h-[600px] overflow-hidden bg-[#101014] text-white">
    <Sidebar conversations={conversations} activeId={activeId} onSelect={selectChat} search={search} setSearch={setSearch} onNewChat={() => setModal("new")} profile={profile} onProfile={() => setModal("profile")} mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    <div className="flex min-w-0 flex-1 flex-col">
      <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-white/[0.08] bg-[#101014] px-4 sm:px-6">
        <div className="flex items-center gap-3"><button onClick={() => setMobileOpen(true)} className="rounded-lg p-2 text-zinc-400 hover:bg-white/10 lg:hidden"><Menu size={20} /></button><div><p className="text-xs text-zinc-500">Workspace / <span className="text-zinc-300">Messages</span></p><p className="mt-1 text-sm font-semibold">Good afternoon, {profile.name.split(" ")[0]} 👋</p></div></div>
        <div className="flex items-center gap-2"><button title="Notifications" className="relative rounded-lg border border-white/10 p-2.5 text-zinc-400 hover:bg-white/10"><Bell size={17} /><span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-violet-400" /></button><button onClick={() => setModal("profile")} className="ml-1"><Avatar src={profile.avatar} name={profile.name} size="h-9 w-9" online /></button></div>
      </div>
      <div className="flex min-h-0 flex-1">
        {active ? <ChatWindow conversation={active} messages={activeMessages} users={users} profile={profile} onSend={sendMessage} onMenu={() => setModal("details")} onBack={() => setMobileOpen(true)} /> : <div className="flex flex-1 items-center justify-center text-zinc-500">Choose a conversation</div>}
      </div>
    </div>
    {modal === "profile" && <ProfileModal profile={profile} onClose={() => setModal("")} onSave={setProfile} onLogout={onLogout} />}
    {modal === "new" && <NewChatModal users={users} onClose={() => setModal("")} onCreate={createGroup} />}
    {modal === "details" && active && <DetailsModal conversation={active} users={users} onClose={() => setModal("")} />}
  </main>;
}
