export default function Avatar({ src, name = "User", size = "h-10 w-10", online = false }) {
  return (
    <div className={`relative shrink-0 ${size}`}>
      {src ? (
        <img src={src} alt={name} className="h-full w-full rounded-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center rounded-full bg-violet-500/20 text-sm font-bold text-violet-300">
          {name.split(" ").map((part) => part[0]).slice(0, 2).join("")}
        </div>
      )}
      {online && <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-zinc-900 bg-emerald-400" />}
    </div>
  );
}
