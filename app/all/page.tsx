import React from 'react'
import StaggerText from '../components/animations/staggerText'
import RevealLinks from '../components/animations/RevealLinks'

const ComponentsPage = () => {
  return (
    <main>
        <section>
            <h1>All of Tien&apos;s Reusable Components</h1>
        </section>

        <section>
            <h2>Text Components</h2>
            <article>
                <h3>Stagger Text</h3>
                <StaggerText />
            </article>
            <article>
                <h3>Reveal Links</h3>
                <RevealLinks />
            </article>
        </section>

    
    </main>
  )
}

export default ComponentsPage