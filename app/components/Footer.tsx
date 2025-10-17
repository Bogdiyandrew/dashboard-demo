const Footer = () => {
  return (
    <footer className="bg-black/20 mt-24 py-12 border-t border-white/10 backdrop-blur-lg">
      <div className="container mx-auto px-6 text-center text-gray-400 space-y-8">
        
        {/* Secțiunea de atenționare, stilizată distinct */}
        <div className="max-w-3xl mx-auto text-xs border border-yellow-500/30 bg-yellow-900/20 p-4 rounded-lg">
          <h4 className="font-bold text-yellow-400 mb-2 uppercase tracking-widest">ATENȚIE</h4>
          <p className="text-yellow-500 font-sans">
            Acesta este un proiect demonstrativ pentru a evidenția abilitățile de design și dezvoltare. Nu reprezintă un magazin real și nu reflectă întregul potențial al serviciilor oferite de <a href="https://digitura.ro" target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-300">digitura.ro</a>.
          </p>
        </div>

        {/* Secțiunea principală a footer-ului */}
        <div>
            <p className="text-2xl font-bold font-serif text-white mb-2 tracking-wider">ShopFlow</p>
            <p className="text-sm font-sans">
                &copy; {new Date().getFullYear()} ShopFlow Dashboard. Toate drepturile rezervate.
            </p>
            <p className="text-sm mt-1 font-sans">
                Un demo creat cu mândrie pentru <a href="https://digitura.ro" target="_blank" rel="noopener noreferrer" className="text-[var(--secondary-accent)] hover:underline">digitura.ro</a>
            </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;