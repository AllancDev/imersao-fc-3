import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@material-ui/core'
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import http from '../http'
import { Product, products } from '../model'

interface ProductsListPageProps {
  products: Product[]
}

const ProductsListPage: NextPage<ProductsListPageProps> = ({products}) => {
  return (
    <div>
      <Head>
        <title>Listagem de produtos</title>
      </Head>


      <Typography component="h1" variant="h3" color="textPrimary" gutterBottom>
        Produtos
      </Typography>
      <Grid container spacing={4} >
        {
          products.map((product, key) => (
            <Grid key={key} item xs={12} sm={6} md={4} >
              <Card >
                <CardMedia style={{ paddingTop: '50%' }} image={product.image_url} />
                <CardContent>
                  <Typography component="h2" variant="h5" gutterBottom>
                    {product.name}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link href="/products/[slug]" as={`/products/${product.slug}`} passHref>
                    <Button size="small" color="primary" component="a">
                      Detalhes
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          ))
        }
      </Grid>
    </div>
  )
}

export default ProductsListPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const response = await http.get('products')
  console.log(response)
  return {
    props: {
      products: response.data
    }
  }
}