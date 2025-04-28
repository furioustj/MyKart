import { ProductDetail } from "@/components/product-detail";
import { stripe } from "@/lib/stripe";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

// Define the type for dynamic route props
type PageProps = {
  params: {
    id: string;
  };
};

// Optional: Generate dynamic metadata (e.g., <title>)
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const product = await stripe.products.retrieve(params.id);
    return {
      title: product.name,
    };
  } catch {
    return {
      title: "Product Not Found",
    };
  }
}

// Main page component
export default async function ProductPage({ params }: PageProps) {
  try {
    const product = await stripe.products.retrieve(params.id, {
      expand: ["default_price"],
    });

    return <ProductDetail product={product} />;
  } catch {
    return notFound();
  }
}
