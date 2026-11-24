import { useMemo, useRef, useState } from "react";
import { ArrowLeft, CheckCheck, FileText, ImagePlus, Info, Menu, MoreHorizontal, Paperclip, Phone, Search, Send, Smile, Video } from "lucide-react";
import Avatar from "./Avatar";

export default function ChatWindow({ conversation, messages, users, profile, onSend, onMenu, onBack }) {
  const [draft, setDraft] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [attachment, setAttachment] = useState(null);
  const fileRef = useRef(null);
  const bottomRef = useRef(null);
  const isGroup = conversation.type === "group";
  const partner = users[conversation.members.find((id) => id !== "me")] || {};
  const visibleMessages = useMemo(() => messages.filter((m) => !query || m.text.toLowerCase().includes(query.toLowerCase())), [messages, query]);

  function submit(e) {
    e.preventDefault();
    if (!draft.trim() && !attachment) return;
    onSend(draft.trim(), attachment);
    setDraft("");
    setAttachment(null);
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  }

  function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setAttachment({ name: file.name, type: file.type, url: URL.createObjectURL(file) });
    e.target.value = "";
  }

  return (
    <section className="flex min-w-0 flex-1 flex-col bg-[#101014]">
      <header className="flex h-[76px] shrink-0 items-center justify-between border-b border-white/[0.08] px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <button onClick={onBack} className="rounded-lg p-2 text-zinc-400 hover:bg-white/10 lg:hidden"><Menu size={19} /></button>
          {isGroup ? <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${conversation.color || "bg-violet-600"}`}><span className="text-sm font-bold">{conversation.name.slice(0, 1)}</span></div> : <Avatar src={conversation.avatar} name={conversation.name} online={conversation.online} />}
          <div className="min-w-0"><h2 className="truncate text-sm font-semibold text-white sm:text-[15px]">{conversation.name}</h2><p className="mt-0.5 text-[11px] text-zinc-500">{isGroup ? `${conversation.members.length} members · ${conversation.members.length - 1} active` : conversation.online ? "Active now" : "Last seen recently"}</p></div>
        </div>
        <div className="flex items-center gap-1 text-zinc-400 sm:gap-2">
          <button onClick={() => setShowSearch(!showSearch)} title="Search messages" className="rounded-lg p-2.5 hover:bg-white/10 hover:text-white"><Search size={18} /></button>
          <button title="Voice call (demo)" className="hidden rounded-lg p-2.5 hover:bg-white/10 hover:text-white sm:block"><Phone size={18} /></button>
          <button title="Video call (demo)" className="hidden rounded-lg p-2.5 hover:bg-white/10 hover:text-white sm:block"><Video size={19} /></button>
          <button onClick={onMenu} title="Conversation details" className="rounded-lg p-2.5 hover:bg-white/10 hover:text-white"><Info size={18} /></button>
          <button title="More options" className="hidden rounded-lg p-2.5 hover:bg-white/10 hover:text-white sm:block"><MoreHorizontal size={19} /></button>
        </div>
      </header>

      {showSearch && <div className="border-b border-white/10 px-5 py-3"><input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search in this conversation..." className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-violet-500" /></div>}

      <div className="scrollbar-hide flex-1 overflow-y-auto px-4 py-6 sm:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 flex items-center gap-3"><div className="h-px flex-1 bg-white/10" /><span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] font-medium text-zinc-500">TODAY</span><div className="h-px flex-1 bg-white/10" /></div>
          <div className="space-y-6">
            {visibleMessages.map((message) => {
              const mine = message.sender === "me";
              const sender = mine ? profile : users[message.sender] || { name: conversation.name, avatar: conversation.avatar };
              return (
                <div key={message.id} className={`flex items-end gap-3 ${mine ? "flex-row-reverse" : ""}`}>
                  {!mine && <Avatar src={sender.avatar} name={sender.name} size="h-8 w-8" />}
                  <div className={`flex max-w-[82%] flex-col ${mine ? "items-end" : "items-start"}`}>
                    {!mine && <span className="mb-1.5 ml-1 text-[11px] font-medium text-zinc-400">{sender.name}</span>}
                    <div className={`rounded-2xl px-4 py-3 text-[13px] leading-6 ${mine ? "rounded-br-md bg-violet-600 text-white" : "rounded-bl-md border border-white/[0.07] bg-[#1d1d24] text-zinc-200"}`}>
                      {message.text && <p className="whitespace-pre-wrap break-words">{message.text}</p>}
                      {message.attachment && <div className="mt-2 flex items-center gap-2 rounded-lg bg-black/15 p-2"><FileText size={18} /><span className="max-w-48 truncate text-xs">{message.attachment.name}</span></div>}
                    </div>
                    <div className="mt-1.5 flex items-center gap-1.5 px-1 text-[10px] text-zinc-600"><span>{message.time}</span>{mine && <CheckCheck size={13} className={message.read ? "text-sky-400" : "text-zinc-600"} />}</div>
                  </div>
                </div>
              );
            })}
            {visibleMessages.length === 0 && <p className="py-12 text-center text-sm text-zinc-500">No matching messages.</p>}
            <div ref={bottomRef} />
          </div>
          {conversation.online && !isGroup && <div className="mt-5 flex items-center gap-2 pl-11 text-xs text-zinc-500"><span className="flex gap-1"><i className="h-1.5 w-1.5 animate-bounce rounded-full bg-violet-400" /><i className="h-1.5 w-1.5 animate-bounce rounded-full bg-violet-400 [animation-delay:120ms]" /><i className="h-1.5 w-1.5 animate-bounce rounded-full bg-violet-400 [animation-delay:240ms]" /></span>{partner.name || conversation.name} is online</div>}
        </div>
      </div>

      <div className="shrink-0 px-4 pb-5 pt-2 sm:px-8">
        <form onSubmit={submit} className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-[#1b1b22] p-3 shadow-xl shadow-black/10 focus-within:border-violet-500/40">
          {attachment && <div className="mb-2 flex items-center justify-between rounded-lg bg-white/5 px-3 py-2 text-xs text-zinc-300"><span className="flex items-center gap-2"><FileText size={15} />{attachment.name}</span><button type="button" onClick={() => setAttachment(null)} className="text-zinc-500 hover:text-white">Remove</button></div>}
          <textarea value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit(e); } }} rows="2" placeholder={`Message ${conversation.name}...`} className="max-h-32 min-h-12 w-full resize-none bg-transparent px-1 py-1 text-sm leading-6 text-zinc-100 outline-none placeholder:text-zinc-600" />
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-1 text-zinc-500">
              <input ref={fileRef} type="file" accept="image/*,.pdf,.doc,.docx,.txt" onChange={handleFile} className="hidden" />
              <button type="button" onClick={() => fileRef.current?.click()} title="Attach a file" className="rounded-lg p-2 hover:bg-white/10 hover:text-white"><Paperclip size={17} /></button>
              <button type="button" onClick={() => fileRef.current?.click()} title="Attach image" className="rounded-lg p-2 hover:bg-white/10 hover:text-white"><ImagePlus size={17} /></button>
              <button type="button" onClick={() => setDraft((d) => d + " 😊")} title="Add emoji" className="rounded-lg p-2 hover:bg-white/10 hover:text-white"><Smile size={17} /></button>
            </div>
            <button type="submit" disabled={!draft.trim() && !attachment} className="flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-40">Send <Send size={14} /></button>
          </div>
        </form>
        <p className="mt-2 text-center text-[10px] text-zinc-700">Press Enter to send · Shift + Enter for a new line</p>
      </div>
    </section>
  );
}
