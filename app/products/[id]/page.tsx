import { ProductDetail } from "@/components/product-detail";
import { stripe } from "@/lib/stripe";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = params;

  try {
    const product = await stripe.products.retrieve(id, {
      expand: ["default_price"],
    });

    return <ProductDetail product={product} />;
  } catch (error) {
    return notFound();
  }
}
