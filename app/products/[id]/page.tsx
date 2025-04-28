import { ProductDetail } from "@/components/product-detail";
import { stripe } from "@/lib/stripe";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await stripe.products.retrieve(params.id);
  return {
    title: product.name,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  try {
    const product = await stripe.products.retrieve(params.id, {
      expand: ["default_price"],
    });

    return <ProductDetail product={product} />;
  } catch (error) {
    // Optional: handle invalid product ID
    return notFound();
  }
}
