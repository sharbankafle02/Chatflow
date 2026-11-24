import { MessageCircle, ArrowRight } from "lucide-react";

export default function Login({ onLogin }) {
  return <main className="flex min-h-screen items-center justify-center bg-[#0c0c10] px-4 py-10 text-white">
    <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-[#15151c] shadow-2xl md:grid-cols-2">
      <div className="hidden min-h-[600px] flex-col justify-between bg-gradient-to-br from-violet-700 via-indigo-700 to-[#25205d] p-12 md:flex">
        <div className="flex items-center gap-3"><div className="rounded-xl bg-white/15 p-3"><MessageCircle /></div><span className="text-xl font-bold">ChatFlow</span></div>
        <div><p className="mb-4 text-sm font-medium uppercase tracking-[.2em] text-violet-200">Communication, simplified</p><h1 className="max-w-sm text-5xl font-bold leading-[1.1]">Make every conversation count.</h1><p className="mt-5 max-w-sm text-sm leading-6 text-indigo-100/80">A calmer place for your team to connect, collaborate and create great things together.</p></div>
        <p className="text-xs text-indigo-200/60">© 2026 ChatFlow. Demo experience.</p>
      </div>
      <div className="flex min-h-[600px] flex-col justify-center px-7 py-12 sm:px-14">
        <div className="mb-10 md:hidden"><div className="inline-flex rounded-xl bg-violet-600 p-3"><MessageCircle /></div></div>
        <p className="text-xs font-semibold uppercase tracking-[.18em] text-violet-400">Welcome to ChatFlow</p>
        <h2 className="mt-3 text-3xl font-bold">Sign in to continue</h2>
        <p className="mt-2 text-sm text-zinc-500">Use our demo account to explore the application.</p>
        <div className="mt-8 space-y-4"><label className="block text-xs text-zinc-400">Email address<input defaultValue="alex@chatflow.demo" type="email" className="mt-2 w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm text-white outline-none focus:border-violet-500" /></label><label className="block text-xs text-zinc-400">Password<input defaultValue="chatflow123" type="password" className="mt-2 w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm text-white outline-none focus:border-violet-500" /></label></div>
        <button onClick={onLogin} className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 py-3.5 text-sm font-semibold hover:bg-violet-500">Continue to ChatFlow <ArrowRight size={16} /></button>
        <p className="mt-5 text-center text-xs text-zinc-600">Demo mode · No real authentication required</p>
      </div>
    </div>
  </main>;
}
