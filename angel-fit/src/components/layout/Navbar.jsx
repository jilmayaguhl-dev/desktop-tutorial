export default function Navbar({ activePage, setPage }) {
  const links = [
    { id: 'dashboard', label: 'Home' },
    { id: 'workouts', label: 'Workouts' },
    { id: 'meals', label: 'Meal Plans' },
    { id: 'nutrition', label: 'Nutrition' },
    { id: 'progress', label: 'Progress' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-noir/90 backdrop-blur border-b border-gold/20">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <span className="font-serif text-gold text-xl tracking-widest uppercase">Angel Fit</span>
        <ul className="flex gap-8">
          {links.map(link => (
            <li key={link.id}>
              <button
                onClick={() => setPage(link.id)}
                className={`text-sm tracking-widest uppercase transition-colors ${
                  activePage === link.id
                    ? 'text-gold'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
