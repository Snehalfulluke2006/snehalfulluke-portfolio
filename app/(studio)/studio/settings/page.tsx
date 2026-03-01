import { Settings, Clock, Shield, Palette, Bell } from "lucide-react"

export default function StudioSettings() {
    const sections = [
        { icon: Shield, label: "Security", desc: "Password, 2FA, session management" },
        { icon: Palette, label: "Appearance", desc: "Theme, colors, fonts" },
        { icon: Bell, label: "Notifications", desc: "Email alerts, lead notifications" },
    ]

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div>
                <h1 className="text-4xl font-black tracking-tighter mb-2">Settings</h1>
                <p className="text-white/40">Configure your studio and platform preferences.</p>
            </div>

            <div className="grid gap-4">
                {sections.map(({ icon: Icon, label, desc }) => (
                    <div
                        key={label}
                        className="flex items-center justify-between p-8 rounded-[32px] glass border border-white/5 opacity-50 cursor-not-allowed"
                    >
                        <div className="flex items-center gap-6">
                            <div className="w-14 h-14 rounded-2xl glass border-white/10 flex items-center justify-center">
                                <Icon size={22} className="text-indigo-400" />
                            </div>
                            <div>
                                <div className="font-black tracking-tight text-lg">{label}</div>
                                <div className="text-white/30 text-sm font-medium">{desc}</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-400">
                            <Clock size={12} />
                            <span>Coming Soon</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
