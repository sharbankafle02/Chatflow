import { useState } from "react";
import { X, UserRound, Users, Check } from "lucide-react";

export function ProfileModal({ profile, onClose, onSave, onLogout }) {
  const [name, setName] = useState(profile.name);
  const [status, setStatus] = useState(profile.status);
  return <ModalShell title="Profile settings" onClose={onClose}>
    <div className="space-y-4">
      <div className="flex items-center gap-3 rounded-xl bg-white/5 p-4"><img src={profile.avatar} className="h-14 w-14 rounded-full object-cover" /><div><p className="font-semibold text-white">{profile.name}</p><p className="text-xs text-emerald-400">Your account</p></div></div>
      <label className="block text-xs text-zinc-400">Display name<input value={name} onChange={(e) => setName(e.target.value)} className="mt-2 w-full rounded-lg border border-white/10 bg-zinc-900 px-3 py-2.5 text-sm text-white outline-none focus:border-violet-500" /></label>
      <label className="block text-xs text-zinc-400">Status<select value={status} onChange={(e) => setStatus(e.target.value)} className="mt-2 w-full rounded-lg border border-white/10 bg-zinc-900 px-3 py-2.5 text-sm text-white outline-none"><option>Available</option><option>Busy</option><option>Away</option></select></label>
      <button onClick={() => { onSave({ ...profile, name: name.trim() || profile.name, status }); onClose(); }} className="flex w-full items-center justify-center gap-2 rounded-lg bg-violet-600 py-2.5 text-sm font-semibold text-white hover:bg-violet-500"><Check size={16} /> Save changes</button>
      <button onClick={onLogout} className="w-full rounded-lg border border-white/10 py-2.5 text-sm text-zinc-400 hover:bg-white/5 hover:text-white">Log out</button>
    </div>
  </ModalShell>;
}

export function NewChatModal({ onClose, onCreate, users }) {
  const [name, setName] = useState("");
  const [selected, setSelected] = useState([]);
  return <ModalShell title="Create a group" onClose={onClose}>
    <div className="space-y-4">
      <label className="block text-xs text-zinc-400">Group name<input autoFocus value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Design team" className="mt-2 w-full rounded-lg border border-white/10 bg-zinc-900 px-3 py-2.5 text-sm text-white outline-none focus:border-violet-500" /></label>
      <p className="text-xs text-zinc-400">Add members</p>
      <div className="max-h-56 space-y-1 overflow-y-auto">{Object.values(users).map((user) => <button key={user.id} onClick={() => setSelected((old) => old.includes(user.id) ? old.filter((id) => id !== user.id) : [...old, user.id])} className="flex w-full items-center gap-3 rounded-lg p-2.5 text-left hover:bg-white/5"><img src={user.avatar} className="h-9 w-9 rounded-full" /><span className="flex-1 text-sm text-zinc-200">{user.name}</span><span className={`flex h-5 w-5 items-center justify-center rounded-md border ${selected.includes(user.id) ? "border-violet-500 bg-violet-600" : "border-white/20"}`}>{selected.includes(user.id) && <Check size={13} />}</span></button>)}</div>
      <button disabled={!name.trim() || selected.length < 1} onClick={() => onCreate(name.trim(), selected)} className="w-full rounded-lg bg-violet-600 py-2.5 text-sm font-semibold text-white hover:bg-violet-500 disabled:opacity-40">Create group</button>
    </div>
  </ModalShell>;
}

export function DetailsModal({ conversation, users, onClose }) {
  const members = conversation.members.map((id) => id === "me" ? { name: "Alex Morgan", avatar: "https://i.pravatar.cc/120?img=12", online: true } : users[id]).filter(Boolean);
  return <ModalShell title="Conversation details" onClose={onClose}>
    <div className="mb-4 flex flex-col items-center rounded-xl bg-white/5 p-5"><div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-600"><Users size={25} /></div><p className="font-semibold text-white">{conversation.name}</p><p className="mt-1 text-xs text-zinc-500">{conversation.type === "group" ? "Group conversation" : "Direct message"}</p></div>
    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">Members · {members.length}</p>
    <div className="space-y-3">{members.map((m) => <div key={m.name} className="flex items-center gap-3"><img src={m.avatar} className="h-9 w-9 rounded-full" /><div><p className="text-sm text-zinc-200">{m.name}</p><p className="text-[11px] text-zinc-500">{m.online ? "Online" : "Offline"}</p></div></div>)}</div>
  </ModalShell>;
}

function ModalShell({ title, children, onClose }) {
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" onMouseDown={(e) => e.target === e.currentTarget && onClose()}><div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#18181f] p-5 shadow-2xl"><div className="mb-5 flex items-center justify-between"><h3 className="font-semibold text-white">{title}</h3><button onClick={onClose} className="rounded-lg p-2 text-zinc-500 hover:bg-white/10 hover:text-white"><X size={17} /></button></div>{children}</div></div>;
}
