const LANGUAGES = ['JavaScript', 'TypeScript', 'Python', 'C', 'C++']
const BACKEND = ['Node.js', 'Express', 'NestJS']
const DATABASES = [
  { name: 'MongoDB', note: 'Mongoose orqali' },
  { name: 'MySQL', note: 'TypeORM orqali' },
  { name: 'PostgreSQL', note: 'TypeORM orqali' },
]

export default function Welcome() {
  return (
    <article className="doc">
      <header className="doc__hero">
        <div className="doc__avatar" aria-hidden="true">
          SC
        </div>
        <div>
          <h1 className="doc__title">Sardor Choriyev</h1>
          <p className="doc__subtitle">Full Stack Developer</p>
        </div>
      </header>

      <p className="doc__lead">
        Backendni Node.js, Express va NestJS asosida quraman, ma'lumotlar bazasi sifatida
        relatsion (MySQL, PostgreSQL) va nomanotli (MongoDB) tizimlar bilan ishlayman.
        Chapdagi <strong>loyihalar</strong> ro'yxatidan istalgan faylni bosib, o'sha loyiha
        haqida ma'lumot va havolasini ko'rishingiz mumkin.
      </p>

      <h2>Bilgan dasturlash tillarim</h2>
      <div className="doc__badges">
        {LANGUAGES.map((lang) => (
          <span key={lang} className="doc__badge doc__badge--lang">
            {lang}
          </span>
        ))}
      </div>

      <h2>Backend freymvorklar</h2>
      <div className="doc__badges">
        {BACKEND.map((fw) => (
          <span key={fw} className="doc__badge doc__badge--fw">
            {fw}
          </span>
        ))}
      </div>

      <h2>Ma'lumotlar bazalari ({DATABASES.length} ta)</h2>
      <ul className="doc__list">
        {DATABASES.map((db) => (
          <li key={db.name}>
            <code>{db.name}</code>
            <span className="doc__list-note"> — {db.note}</span>
          </li>
        ))}
      </ul>

      <h2>Aloqa</h2>
      <table className="doc__table">
        <tbody>
          <tr>
            <td>Kasb</td>
            <td>Full Stack Developer</td>
          </tr>
          <tr>
            <td>Telefon</td>
            <td>
              <a href="tel:+998904100714">+998 90 410 07 14</a>
            </td>
          </tr>
          <tr>
            <td>Email</td>
            <td>
              <a href="mailto:sardorchoriyev449@gmail.com">sardorchoriyev449@gmail.com</a>
            </td>
          </tr>
          <tr>
            <td>GitHub</td>
            <td>
              <a href="https://github.com/sardorthe17-commits" target="_blank" rel="noopener noreferrer">
                github.com/sardorthe17-commits
              </a>
            </td>
          </tr>
        </tbody>
      </table>

      <p className="doc__comment">// chapdagi "loyihalar" papkasini oching va biror faylni bosing ↖</p>
    </article>
  )
}
