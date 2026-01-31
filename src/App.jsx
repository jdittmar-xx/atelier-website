import { useState } from 'react'

function App() {
  const [email, setEmail] = useState('')

  return (
    <div className="min-h-screen bg-black text-white/80 overflow-x-hidden">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 flex justify-between items-center">
        <a href="/" className="block">
          <img src="/logo.png" alt="Atelier" className="h-7 w-auto opacity-70 hover:opacity-100 transition-opacity" />
        </a>
        <a 
          href="#waitlist" 
          className="mono-caps text-xs text-white/40 hover:text-white/70 transition-colors"
        >
          Join Waitlist
        </a>
      </nav>

      {/* SECTION 1: HERO */}
      <section className="min-h-screen flex flex-col justify-center items-center px-6 md:px-12 relative">
        {/* Celestial background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white/20 rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 right-1/3 w-0.5 h-0.5 bg-white/30 rounded-full animate-pulse delay-300"></div>
          <div className="absolute top-2/3 left-1/3 w-0.5 h-0.5 bg-white/20 rounded-full animate-pulse delay-700"></div>
          <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-white/10 rounded-full animate-pulse delay-500"></div>
          <div className="absolute top-1/2 right-1/5 w-0.5 h-0.5 bg-white/20 rounded-full animate-pulse delay-1000"></div>
        </div>
        
        <p className="mono-caps text-[10px] md:text-xs text-white/25 mb-10 text-center">
          A tool for thinkers who build with taste
        </p>
        
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-center leading-[1.1] mb-8 max-w-4xl">
          <span className="text-white/90">Where every seed is a</span><br />
          <em className="italic text-white/60">reality waiting to be born</em>
        </h1>
        
        <p className="text-white/30 text-sm md:text-base font-light max-w-md text-center mb-12 leading-relaxed">
          The curiosity engine for creators who refuse to let their ideas die.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <a 
            href="#waitlist" 
            className="group flex items-center justify-center gap-3 bg-white/[0.03] border border-white/10 px-8 py-4 hover:bg-white/[0.06] hover:border-white/20 transition-all duration-500"
          >
            <span className="mono-caps text-xs text-white/60 group-hover:text-white/80">Join the Waitlist</span>
          </a>
          <a 
            href="#mechanism" 
            className="group flex items-center justify-center gap-2 px-8 py-4 text-white/30 hover:text-white/50 transition-all duration-500"
          >
            <span className="mono-caps text-xs">Explore</span>
            <span className="group-hover:translate-y-1 transition-transform duration-300">↓</span>
          </a>
        </div>
      </section>

      {/* SECTION 2: THE PROBLEM */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 py-32 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <p className="mono-caps text-[10px] text-white/20 mb-6">
            The Problem
          </p>
          
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white/70 mb-16 leading-[1.15]">
            What happened to<br />
            <em className="italic text-white/40">the magic?</em>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 md:gap-20">
            <div className="space-y-8">
              <p className="text-white/40 text-lg md:text-xl font-light leading-relaxed">
                Your best ideas are buried under noise.
              </p>
              <p className="text-white/40 text-lg md:text-xl font-light leading-relaxed">
                The spark dies before it becomes real.
              </p>
              <p className="text-white/40 text-lg md:text-xl font-light leading-relaxed">
                Another note app. Another forgotten dream.
              </p>
            </div>
            
            <div className="space-y-8">
              <p className="text-white/25 font-light leading-relaxed">
                Every spark of insight that turns into another database entry is a lost potential reality.
              </p>
              <p className="text-white/25 font-light leading-relaxed">
                The ideas get buried. The wonder disappears. You're back to overwhelmed and uninspired.
              </p>
              <p className="text-white/25 font-light leading-relaxed italic">
                What happened to that child-like curiosity when everything felt so new?
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE INSIGHT */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 py-32 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <p className="mono-caps text-[10px] text-white/20 mb-6">
            The Insight
          </p>
          
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white/70 mb-16 leading-[1.15]">
            The tools<br />
            <em className="italic text-white/40">betrayed you</em>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="border border-white/5 p-8 hover:border-white/10 transition-colors duration-500">
              <p className="text-white/50 text-sm mb-3">They trap you in</p>
              <p className="font-serif text-xl text-white/70">Decision loops</p>
            </div>
            <div className="border border-white/5 p-8 hover:border-white/10 transition-colors duration-500">
              <p className="text-white/50 text-sm mb-3">They drain you with</p>
              <p className="font-serif text-xl text-white/70">Cognitive fatigue</p>
            </div>
            <div className="border border-white/5 p-8 hover:border-white/10 transition-colors duration-500">
              <p className="text-white/50 text-sm mb-3">They bury you under</p>
              <p className="font-serif text-xl text-white/70">Infinite consumption</p>
            </div>
          </div>
          
          <div className="max-w-2xl">
            <p className="text-white/30 font-light leading-relaxed mb-6">
              Current tools weren't designed for flow. They were designed for capture, not creation.
            </p>
            <p className="text-white/50 font-light leading-relaxed text-lg">
              The interface should serve the ideas, not cage them.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: THE MECHANISM */}
      <section id="mechanism" className="min-h-screen flex flex-col justify-center px-6 md:px-12 py-32 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <p className="mono-caps text-[10px] text-white/20 mb-6">
            The Mechanism
          </p>
          
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white/70 mb-8 leading-[1.15]">
            The Personal<br />
            <em className="italic text-white/40">Universe Engineer</em>
          </h2>
          
          <p className="text-white/30 font-light text-lg mb-20 max-w-xl">
            Not another notes app. Not another project manager. It's a curiosity engine. It's where ideas don't die—they bloom.
          </p>
          
          <div className="grid md:grid-cols-3 gap-px bg-white/5">
            <div className="bg-black p-10 md:p-12">
              {/* Seeds: sprouting/emerging graphic */}
              <div className="w-16 h-16 mb-8 relative">
                <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
                  <circle cx="32" cy="48" r="6" stroke="currentColor" strokeWidth="1" className="text-white/20" />
                  <path d="M32 42 L32 24" stroke="currentColor" strokeWidth="1" className="text-white/30" />
                  <path d="M32 24 Q24 20 20 12" stroke="currentColor" strokeWidth="1" className="text-white/20" fill="none" />
                  <path d="M32 24 Q40 20 44 12" stroke="currentColor" strokeWidth="1" className="text-white/20" fill="none" />
                  <circle cx="20" cy="12" r="2" fill="currentColor" className="text-white/30" />
                  <circle cx="44" cy="12" r="2" fill="currentColor" className="text-white/30" />
                  <circle cx="32" cy="24" r="3" fill="currentColor" className="text-white/20" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl text-white/70 mb-4">Seeds</h3>
              <p className="text-white/30 font-light leading-relaxed">
                Every idea starts here—captured with reverence. A spark. A question. A wonder.
              </p>
            </div>
            
            <div className="bg-black p-10 md:p-12">
              {/* Atelier: focused workspace/portal graphic */}
              <div className="w-16 h-16 mb-8 relative">
                <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
                  <rect x="12" y="12" width="40" height="40" stroke="currentColor" strokeWidth="1" className="text-white/15" />
                  <rect x="20" y="20" width="24" height="24" stroke="currentColor" strokeWidth="1" className="text-white/20" />
                  <rect x="28" y="28" width="8" height="8" fill="currentColor" className="text-white/30" />
                  <line x1="32" y1="4" x2="32" y2="12" stroke="currentColor" strokeWidth="1" className="text-white/10" />
                  <line x1="32" y1="52" x2="32" y2="60" stroke="currentColor" strokeWidth="1" className="text-white/10" />
                  <line x1="4" y1="32" x2="12" y2="32" stroke="currentColor" strokeWidth="1" className="text-white/10" />
                  <line x1="52" y1="32" x2="60" y2="32" stroke="currentColor" strokeWidth="1" className="text-white/10" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl text-white/70 mb-4">The Atelier</h3>
              <p className="text-white/30 font-light leading-relaxed">
                The sacred workspace where seeds become reality. Deep focus. Pure creation.
              </p>
            </div>
            
            <div className="bg-black p-10 md:p-12">
              {/* Worlds: constellation/universe graphic */}
              <div className="w-16 h-16 mb-8 relative">
                <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
                  <circle cx="32" cy="32" r="8" stroke="currentColor" strokeWidth="1" className="text-white/25" />
                  <circle cx="32" cy="32" r="2" fill="currentColor" className="text-white/40" />
                  <circle cx="12" cy="16" r="4" stroke="currentColor" strokeWidth="1" className="text-white/15" />
                  <circle cx="12" cy="16" r="1.5" fill="currentColor" className="text-white/25" />
                  <circle cx="52" cy="20" r="3" stroke="currentColor" strokeWidth="1" className="text-white/15" />
                  <circle cx="52" cy="20" r="1" fill="currentColor" className="text-white/25" />
                  <circle cx="16" cy="52" r="3" stroke="currentColor" strokeWidth="1" className="text-white/15" />
                  <circle cx="16" cy="52" r="1" fill="currentColor" className="text-white/25" />
                  <circle cx="50" cy="48" r="4" stroke="currentColor" strokeWidth="1" className="text-white/15" />
                  <circle cx="50" cy="48" r="1.5" fill="currentColor" className="text-white/25" />
                  <line x1="24" y1="28" x2="15" y2="19" stroke="currentColor" strokeWidth="0.5" className="text-white/10" />
                  <line x1="40" y1="28" x2="49" y2="22" stroke="currentColor" strokeWidth="0.5" className="text-white/10" />
                  <line x1="26" y1="38" x2="18" y2="49" stroke="currentColor" strokeWidth="0.5" className="text-white/10" />
                  <line x1="38" y1="38" x2="47" y2="46" stroke="currentColor" strokeWidth="0.5" className="text-white/10" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl text-white/70 mb-4">Worlds</h3>
              <p className="text-white/30 font-light leading-relaxed">
                Your seeds manifest into tangible work—newsletters, threads, projects, art.
              </p>
            </div>
          </div>
          
          <p className="text-center text-white/40 font-serif text-xl italic mt-16">
            "Create your reality, one seed at a time"
          </p>
        </div>
      </section>

      {/* SECTION 5: THE EXPERIENCE */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 py-32 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <p className="mono-caps text-[10px] text-white/20 mb-6">
            The Experience
          </p>
          
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white/70 mb-20 leading-[1.15]">
            Designed for wonder.<br />
            <em className="italic text-white/40">For stillness. For flow.</em>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-12 md:gap-8">
            <div className="text-center">
              <p className="mono-caps text-[10px] text-white/20 mb-6">Morning</p>
              <p className="font-serif text-2xl text-white/60 mb-4 italic">"Let the light fade in"</p>
              <p className="text-white/25 font-light text-sm leading-relaxed">
                Open session prompt. Set intention. Begin.
              </p>
            </div>
            
            <div className="text-center">
              <p className="mono-caps text-[10px] text-white/20 mb-6">Deep Work</p>
              <p className="font-serif text-2xl text-white/60 mb-4 italic">"The world fades out"</p>
              <p className="text-white/25 font-light text-sm leading-relaxed">
                All distractions disappear. Only the edge of creation exists.
              </p>
            </div>
            
            <div className="text-center">
              <p className="mono-caps text-[10px] text-white/20 mb-6">Evening</p>
              <p className="font-serif text-2xl text-white/60 mb-4 italic">"Ideas you created today"</p>
              <p className="text-white/25 font-light text-sm leading-relaxed">
                Integration, not accumulation. See what you built.
              </p>
            </div>
          </div>
          
          <div className="mt-24 text-center">
            <p className="text-white/30 font-light leading-relaxed max-w-lg mx-auto">
              That pure focus. That edge. When everything disappears and the only thing that exists is the moment of creation.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6: WHO IT'S FOR */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 py-32 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <p className="mono-caps text-[10px] text-white/20 mb-6">
            Who It's For
          </p>
          
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white/70 mb-16 leading-[1.15]">
            For thinkers who<br />
            <em className="italic text-white/40">build with taste</em>
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-16">
            <div className="border-l border-white/10 pl-6 py-2">
              <p className="text-white/50 font-light">For the free thinkers</p>
            </div>
            <div className="border-l border-white/10 pl-6 py-2">
              <p className="text-white/50 font-light">For the dreamers</p>
            </div>
            <div className="border-l border-white/10 pl-6 py-2">
              <p className="text-white/50 font-light">For the curators</p>
            </div>
            <div className="border-l border-white/10 pl-6 py-2">
              <p className="text-white/50 font-light">For the makers</p>
            </div>
            <div className="border-l border-white/10 pl-6 py-2">
              <p className="text-white/50 font-light">For the analogues</p>
            </div>
            <div className="border-l border-white/10 pl-6 py-2">
              <p className="text-white/50 font-light">For the obsessives</p>
            </div>
          </div>
          
          <div className="max-w-2xl">
            <p className="text-white/40 text-xl font-light leading-relaxed mb-8">
              For those who refuse to separate work and life.
            </p>
            <p className="text-white/60 font-serif text-2xl italic">
              "My life is my work. My work is my life."
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 7: THE PHILOSOPHY */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 py-32 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <p className="mono-caps text-[10px] text-white/20 mb-6">
            The Philosophy
          </p>
          
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white/70 mb-20 leading-[1.15]">
            Think like<br />
            <em className="italic text-white/40">a genius</em>
          </h2>
          
          <div className="space-y-12 max-w-3xl">
            <blockquote className="border-l border-white/10 pl-8">
              <p className="text-white/50 text-xl md:text-2xl font-serif italic leading-relaxed">
                "Excellence emerges when you create space for complete focus and stillness."
              </p>
            </blockquote>
            
            <blockquote className="border-l border-white/10 pl-8">
              <p className="text-white/50 text-xl md:text-2xl font-serif italic leading-relaxed">
                "Thinking is leverage. Taste is the moat. Atelier is the fortress."
              </p>
            </blockquote>
            
            <blockquote className="border-l border-white/10 pl-8">
              <p className="text-white/50 text-xl md:text-2xl font-serif italic leading-relaxed">
                "Everything is created twice. Every dream begins as a seed."
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      {/* SECTION 8: FOUNDER STORY */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 py-32 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <p className="mono-caps text-[10px] text-white/20 mb-6">
            Origin
          </p>
          
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white/70 mb-16 leading-[1.15]">
            I built this because<br />
            <em className="italic text-white/40">I had to</em>
          </h2>
          
          <div className="space-y-8 text-white/40 font-light leading-relaxed text-lg">
            <p>
              The worst feeling in the world is having great ideas but nothing to show for them.
            </p>
            <p>
              I wanted a home for my inquiries, questions, threads, hopes, dreams, beliefs. A place where thoughts could breathe.
            </p>
            <p>
              I wanted to create in one ordered life—where curiosity compounds and ideas become reality.
            </p>
            <p className="text-white/60 font-serif text-xl italic pt-8">
              "The magic you're looking for is in the ideas you forgot to remember."
            </p>
            <p className="text-white/30">
              That's why I built a curiosity engine.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 9: SOCIAL PROOF */}
      <section className="py-32 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-5xl mx-auto text-center">
          <p className="mono-caps text-[10px] text-white/20 mb-6">
            Early Signal
          </p>
          
          <p className="font-serif text-2xl md:text-3xl text-white/50 italic mb-4">
            "Join the thinkers who are already creating"
          </p>
          
          <p className="text-white/25 font-light">
            Built for creators. By a creator.
          </p>
        </div>
      </section>

      {/* SECTION 10: THE OFFER / CTA */}
      <section id="waitlist" className="min-h-screen flex flex-col justify-center items-center px-6 md:px-12 py-32 border-t border-white/5">
        <div className="max-w-2xl mx-auto text-center">
          <p className="mono-caps text-[10px] text-white/20 mb-6">
            Enter
          </p>
          
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white/80 mb-8 leading-[1.15]">
            Enter the<br />
            <em className="italic text-white/50">Atelier</em>
          </h2>
          
          <p className="text-white/30 font-light mb-12 max-w-md mx-auto">
            Be among the first to experience the tool designed for wonder, stillness, and flow.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-8">
            <input 
              type="email" 
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white/[0.03] border border-white/10 px-6 py-4 text-white/70 placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-colors text-sm"
            />
            <button 
              type="submit"
              className="mono-caps bg-white/[0.05] border border-white/10 px-8 py-4 text-white/60 hover:bg-white/[0.08] hover:text-white/80 transition-all duration-300 text-xs"
            >
              Join
            </button>
          </form>
          
          <p className="text-white/20 text-xs">
            No spam. No noise. Just signal.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 md:px-12 py-12 border-t border-white/5">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Atelier" className="h-5 w-auto opacity-50" />
            <span className="text-white/20 text-xs">© 2026</span>
          </div>
          
          <p className="text-white/20 text-xs italic">
            Built with taste.
          </p>
          
          <div className="flex gap-6 text-xs text-white/30">
            <a href="#" className="hover:text-white/50 transition-colors">Twitter</a>
            <a href="#" className="hover:text-white/50 transition-colors">Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
