export default function Footer({ brand }: { brand: string }) {
  return (
    <footer className="border-t border-white/10 px-5 py-8 md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="font-heading text-sm font-black uppercase tracking-widest text-white">
          {brand}
        </p>
        <p className="font-body text-xs text-muted">
          © {new Date().getFullYear()} {brand}. Всички права запазени.
        </p>
      </div>
    </footer>
  );
}
