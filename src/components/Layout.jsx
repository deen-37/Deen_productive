export default function Layout(props) {
    const { children } = props
    const header = (
        <header>
            <h1 className="text-gradient">Deen Productivity</h1>
            <p><strong>The 30 day productivity program</strong></p>
        </header>
    )

    const footer = (
        <footer>
            <p>Built by <a href="https://www.selehadin.netlify.app">Selehadin Abebe</a></p>
            <p>© 2025 30-Day productivity Program. All rights reserved.</p>
        </footer>
    )
    return (
        <>
            {header}
            {children}
            {footer}
        </>

    )
}