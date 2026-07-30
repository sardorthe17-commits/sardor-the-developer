export default function TitleBar() {
  return (
    <header className="title-bar">
      <div className="title-bar__menu">
        <span className="title-bar__logo">{'</>'}</span>
        <span>File</span>
        <span>Edit</span>
        <span>View</span>
        <span>Go</span>
      </div>
      <div className="title-bar__center">sardor-the-developer — Portfolio</div>
      <div className="title-bar__dots" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
    </header>
  )
}
