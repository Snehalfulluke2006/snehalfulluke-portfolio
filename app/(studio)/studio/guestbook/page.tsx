import { MessageSquare, Clock } from "lucide-react"

export default function StudioGuestbook() {
    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div>
                <h1 className="text-4xl font-black tracking-tighter mb-2">Guestbook</h1>
                <p className="text-white/40">Moderate messages left by your visitors.</p>
            </div>

            <div className="flex flex-col items-center justify-center py-32 rounded-[40px] glass border border-white/5 gap-6">
                <div className="w-20 h-20 rounded-3xl glass border-white/10 flex items-center justify-center">
                    <MessageSquare size={32} className="text-indigo-400" />
                </div>
                <div className="text-center space-y-2">
                    <h2 className="text-2xl font-black tracking-tight">Guestbook Manager</h2>
                    <p className="text-white/30 text-sm font-medium">Review and moderate visitor guestbook entries.</p>
                    <div className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-400 mt-4">
                        <Clock size={12} />
                        <span>Coming Soon</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
