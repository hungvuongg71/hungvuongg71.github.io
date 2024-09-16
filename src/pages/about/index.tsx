import * as React from 'react'
import { Link, type HeadFC, type PageProps } from 'gatsby'
import Layout from '../../components/layout'

const AboutPage: React.FC<PageProps> = () => {
    return (
        <Layout pageTitle="About Me">
            <Link to="/">Back to Home</Link>
            <p>Hi there! I'm the proud creator of this site, which I built with Gatsby.</p>
        </Layout>
    )
}

export const Head: HeadFC = () => <title>About Page</title>

export default AboutPage