import { ProductDetail } from "@/components/product-detail";
import { stripe } from "@/lib/stripe";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

// 👇 You no longer receive a plain object for params — it's a Promise
export default async function ProductPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    const product = await stripe.products.retrieve(id, {
      expand: ["default_price"],
    });

    return <ProductDetail product={product} />;
  } catch (error) {
    return notFound();
  }
}

// ✅ Optional: SEO metadata (if used)
export async function generateMetadata({
  params
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const product = await stripe.products.retrieve(id);
    return {
      title: product.name,
    };
  } catch {
    return {
      title: "Product Not Found",
    };
  }
}
