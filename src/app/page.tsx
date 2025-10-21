export default function Page() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6 py-16 text-white">
      {/* Background gradients */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-[-20%] mx-auto h-96 max-w-3xl rounded-full bg-gradient-to-br from-slate-500/30 via-white/10 to-transparent blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-gradient-to-br from-[#6366F1]/40 via-[#0EA5E9]/20 to-transparent blur-3xl" />
        <div className="absolute -left-24 top-20 h-64 w-64 rounded-full bg-gradient-to-br from-[#22D3EE]/30 via-transparent to-transparent blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_55%)]" />
      </div>

      {/* Pricing container */}
      <div className="relative w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* FREE PLAN */}
        <div className="rounded-3xl border border-white/10 bg-white/5 px-10 py-14 text-center shadow-[0_40px_120px_rgba(15,23,42,0.4)] backdrop-blur-xl flex flex-col">
          <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-sm font-semibold uppercase tracking-[0.35em] text-white/60">
            <svg
              className="h-5 w-5 text-white/70"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 3l9 18H3l9-18z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold tracking-tight mb-3 text-white">
            Free
          </h2>
          <p className="text-sm leading-relaxed text-white/60 mb-2">
            Your free plan has reached its limit.
          </p>
          <p className="text-sm leading-relaxed text-white/60 mb-6">
            Keep your site online, but upgrade to unlock more deploys, analytics, and collaboration tools.
          </p>
          <p className="text-white font-medium mb-8">Free tier (limited)</p>
          <ul className="space-y-2 text-sm text-white/70 flex-1">
            <li>Automatic deploys</li>
            <li>Global CDN</li>
            <li>Basic analytics</li>
            <li>Email support</li>
          </ul>
          <button className="mt-8 w-full rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/70 transition hover:border-white/40 hover:text-white sm:w-auto">
            Plan reached limit
          </button>
        </div>

        {/* PRO PLAN */}
        <div className="relative rounded-3xl border border-white/10 bg-white/10 px-10 py-14 text-center shadow-[0_40px_120px_rgba(255,255,255,0.15)] backdrop-blur-xl flex flex-col">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-white text-black text-xs font-semibold uppercase px-3 py-1 tracking-wide">
            Popular
          </div>
          <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-sm font-semibold uppercase tracking-[0.35em] text-white/60">
            <svg
              className="h-5 w-5 text-white/70"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 3l9 18H3l9-18z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold tracking-tight mb-3 text-white">
            Pro
          </h2>
          <p className="text-sm leading-relaxed text-white/60 mb-2">
            Everything you need to scale your workflow and deploy faster.
          </p>
          <p className="text-sm leading-relaxed text-white/60 mb-6">
            Includes priority builds, team collaboration, and advanced usage controls.
          </p>
          <p className="text-white font-medium mb-8">$20/mo + usage</p>
          <ul className="space-y-2 text-sm text-white/70 flex-1">
            <li>All Free features</li>
            <li>Priority builds · no queues</li>
            <li>Team collaboration</li>
            <li>Cold start prevention</li>
            <li>$20 usage credit included</li>
            <li>Custom domains & analytics</li>
          </ul>
          <button className="mt-8 w-full rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:shadow-[0_0_35px_rgba(255,255,255,0.45)] sm:w-auto">
            Upgrade to Pro
          </button>
        </div>

        {/* AGENCY PLAN */}
        <div className="rounded-3xl border border-white/10 bg-white/5 px-10 py-14 text-center shadow-[0_40px_120px_rgba(15,23,42,0.4)] backdrop-blur-xl flex flex-col">
          <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-sm font-semibold uppercase tracking-[0.35em] text-white/60">
            <svg
              className="h-5 w-5 text-white/70"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 3l9 18H3l9-18z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold tracking-tight mb-3 text-white">
            Agency
          </h2>
          <p className="text-sm leading-relaxed text-white/60 mb-2">
            For teams managing multiple clients or large-scale web apps.
          </p>
          <p className="text-sm leading-relaxed text-white/60 mb-6">
            Includes advanced analytics, multi-region deploys, and dedicated support.
          </p>
          <p className="text-white font-medium mb-8">Custom pricing</p>
          <ul className="space-y-2 text-sm text-white/70 flex-1">
            <li>All Pro features</li>
            <li>Advanced access controls</li>
            <li>Multi-region deploys</li>
            <li>Dedicated account manager</li>
            <li>99.99% SLA</li>
            <li>Custom onboarding</li>
          </ul>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button className="w-full rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20 transition sm:w-auto">
              Request demo
            </button>
            <button className="w-full rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/70 hover:border-white/40 hover:text-white transition sm:w-auto">
              Contact Sales
            </button>
          </div>
        </div>
      </div>

      {/* Footer pulse text */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.3em] text-white/30">
        <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-[#F97316]" />
        <span>Upgrade required to continue </span>
      </div>
    </main>
  );
}
