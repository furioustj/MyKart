import { ProductDetail } from "@/components/product-detail";
import { stripe } from "@/lib/stripe";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  try {
    const product = await stripe.products.retrieve(params.id, {
      expand: ["default_price"],
    });

    return <ProductDetail product={product} />;
  } catch {
    // Redirect to 404 page if product retrieval fails
    return notFound();
  }
}
