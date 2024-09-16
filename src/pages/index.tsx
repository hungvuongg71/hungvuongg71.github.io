import React, { useState, useEffect } from 'react'
import { Link, type HeadFC, type PageProps } from 'gatsby'
import Layout from '../components/layout'
import Card from '../components/card/card'
import axios from 'axios'
import { UxComicService } from '../services/uxcomic-service'

interface IIndexPageProps extends PageProps {
  pageTitle: string;
}

type Category = {
  id: string;
  title: string;
}

const IndexPage: React.FC<React.PropsWithChildren<IIndexPageProps>> = ({ data }) => {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    UxComicService.getCategories().then(data => setCategories(data))
  }, [])

  return (
    <Layout pageTitle="Home Page">
      <p>I'm making this by following the Gatsby Tutorial.</p>
      <Link to="/about">Go to About Me</Link>
      <div className="grid gap-3 grid-cols-3">
        {categories && categories?.map(category =>
          <Card key={category.id}>
            {category.title}
          </Card>
        )}

      </div>
    </Layout>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
