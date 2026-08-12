import Clock from "@/components/Clock";
import ListenerCount from "@/components/ListenerCount";
import SocialLinks from "@/components/SocialLinks";
import Player from "@/components/Player";

export default function Home() {
  return (
    <main className="relative flex min-h-dvh flex-1 flex-col items-center justify-between overflow-hidden">
      {/* Fixed background */}
      <div className="hero-bg fixed inset-0 -z-20 bg-cover bg-center" />
      <div className="fixed inset-0 -z-20 bg-gradient-to-b from-black/35 via-black/10 to-black/60" />

      {/* Fixed grain overlay */}
      <div className="grain-overlay fixed inset-0 -z-10" />

      {/* Top row: clock, listener count, social links */}
      <div className="safe-l safe-t fixed z-10">
        <Clock />
      </div>
      <div className="safe-t fixed left-1/2 z-10 -translate-x-1/2">
        <ListenerCount />
      </div>
      <div className="safe-r safe-t fixed z-10">
        <SocialLinks />
      </div>

      {/* Player, bottom-anchored */}
      <div className="safe-b fixed left-1/2 z-10 -translate-x-1/2">
        <Player />
      </div>
    </main>
  );
}
