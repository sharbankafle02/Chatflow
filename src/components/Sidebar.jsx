import { Hash, MessageCircle, Plus, Search, Settings, Users, X } from "lucide-react";
import Avatar from "./Avatar";

export default function Sidebar({ conversations, activeId, onSelect, search, setSearch, onNewChat, profile, onProfile, mobileOpen, onClose }) {
  const filtered = conversations.filter((chat) => chat.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <>
      {mobileOpen && <button aria-label="Close menu" onClick={onClose} className="fixed inset-0 z-30 bg-black/60 lg:hidden" />}
      <aside className={`${mobileOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 left-0 z-40 flex w-[310px] flex-col border-r border-white/10 bg-zinc-950 transition-transform duration-300 lg:static lg:z-auto lg:w-[320px] lg:translate-x-0`}>
        <div className="flex h-[76px] items-center justify-between border-b border-white/10 px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 shadow-lg shadow-violet-950/50"><MessageCircle size={21} /></div>
            <div><h1 className="text-lg font-bold tracking-tight text-white">ChatFlow</h1><p className="text-[11px] text-zinc-500">Your space to connect</p></div>
          </div>
          <button onClick={onClose} className="rounded-lg p-2 text-zinc-500 hover:bg-white/10 lg:hidden"><X size={18} /></button>
        </div>

        <div className="px-4 pt-5">
          <div className="mb-3 flex items-center justify-between px-1">
            <p className="text-[11px] font-semibold uppercase tracking-[.16em] text-zinc-500">Workspace</p>
            <span className="rounded-md bg-white/5 px-2 py-1 text-[10px] text-zinc-500">FREE PLAN</span>
          </div>
          <button className="flex w-full items-center gap-3 rounded-xl bg-white/[0.06] px-3 py-3 text-left hover:bg-white/10">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 font-bold">C</div>
            <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold text-zinc-100">Creative Studio</p><p className="text-xs text-zinc-500">Free workspace</p></div>
            <span className="text-zinc-500">⌄</span>
          </button>
        </div>

        <div className="px-4 pt-6">
          <div className="mb-3 flex items-center justify-between px-1">
            <p className="text-[11px] font-semibold uppercase tracking-[.16em] text-zinc-500">Messages</p>
            <button onClick={onNewChat} title="New conversation" className="rounded-md p-1.5 text-zinc-500 hover:bg-white/10 hover:text-white"><Plus size={16} /></button>
          </div>
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search conversations..." className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-2.5 pl-9 pr-3 text-xs text-white outline-none placeholder:text-zinc-600 focus:border-violet-500/60" />
          </div>
        </div>

        <div className="scrollbar-hide flex-1 overflow-y-auto px-3 py-4">
          <div className="mb-2 flex items-center justify-between px-2"><p className="text-[11px] font-semibold uppercase tracking-[.15em] text-zinc-500">Recent chats</p><span className="text-[10px] text-zinc-600">{filtered.length}</span></div>
          <div className="space-y-1">
            {filtered.map((chat) => (
              <button key={chat.id} onClick={() => { onSelect(chat.id); onClose(); }} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition ${activeId === chat.id ? "bg-violet-500/15 ring-1 ring-violet-500/20" : "hover:bg-white/[0.05]"}`}>
                <div className="relative">
                  {chat.type === "group" ? <div className={`flex h-10 w-10 items-center justify-center rounded-full ${chat.color || "bg-violet-600"} text-white`}><Users size={18} /></div> : <Avatar src={chat.avatar} name={chat.name} online={chat.online} />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2"><p className={`truncate text-[13px] font-semibold ${activeId === chat.id ? "text-white" : "text-zinc-200"}`}>{chat.name}</p><span className="shrink-0 text-[10px] text-zinc-600">{chat.time}</span></div>
                  <div className="mt-1 flex items-center justify-between gap-2"><p className="truncate text-xs text-zinc-500">{chat.lastMessage}</p>{chat.unread > 0 && <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-violet-500 px-1.5 text-[10px] font-bold text-white">{chat.unread}</span>}</div>
                </div>
              </button>
            ))}
            {filtered.length === 0 && <p className="px-3 py-8 text-center text-xs text-zinc-500">No conversations found.</p>}
          </div>
          <div className="mt-7 px-2"><p className="mb-3 text-[11px] font-semibold uppercase tracking-[.15em] text-zinc-500">Channels</p><button className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-sm text-zinc-500 hover:bg-white/5 hover:text-zinc-200"><Hash size={16} /> general</button><button className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-sm text-zinc-500 hover:bg-white/5 hover:text-zinc-200"><Hash size={16} /> design-talk</button></div>
        </div>

        <button onClick={onProfile} className="flex items-center gap-3 border-t border-white/10 px-5 py-4 text-left hover:bg-white/[0.04]">
          <Avatar src={profile.avatar} name={profile.name} size="h-10 w-10" online />
          <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold text-white">{profile.name}</p><p className="text-xs text-emerald-400">{profile.status}</p></div>
          <Settings size={17} className="text-zinc-500" />
        </button>
      </aside>
    </>
  );
}
