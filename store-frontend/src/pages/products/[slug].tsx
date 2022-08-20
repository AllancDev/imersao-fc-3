import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@material-ui/core"
import { NextPage } from "next"
import Head from "next/head"
import { Product, products } from "../../model"

interface ProductDetailPageProps {
    product: Product
}

// const ProductDetailPage: NextPage<ProductDetailPageProps> = ({ product }) => {
const ProductDetailPage = () => {
    const product = products[0]
    return (
        <div>
            <Head>
                <title>{product.name} - Detalhes do produto</title>
            </Head>
            <Card>
                <CardHeader
                    title={product.name.toUpperCase()} 
                    subheader={`R$ ${product.price}`}
                />

                <CardActions>
                    <Button size="small" color="primary" component="a">
                        Purchase
                    </Button>
                </CardActions>
                <CardMedia style={{ paddingTop: '56%'}} image={ product.image_url} />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p" >
                        {product.description}
                    </Typography>
                </CardContent>
            </Card>

        </div>
    )
}


export default ProductDetailPage;