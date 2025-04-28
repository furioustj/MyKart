import { ProductDetail } from "@/components/product-detail";
import { stripe } from "@/lib/stripe";
import { Metadata } from "next";

// Optionally define metadata if needed
export const metadata: Metadata = {
  title: "Product Detail",
};

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await stripe.products.retrieve(params.id, {
    expand: ["default_price"],
  });

  return <ProductDetail product={product} />;
}
