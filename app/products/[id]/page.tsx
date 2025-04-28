import { ProductDetail } from "@/components/product-detail";
import { stripe } from "@/lib/stripe";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

// ✅ Don't use a shared PageProps type — define inline instead
export async function generateMetadata(
  { params }: { params: { id: string } }
): Promise<Metadata> {
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

// ✅ Product page using clean, inline type for params
export default async function ProductPage(
  { params }: { params: { id: string } }
) {
  try {
    const product = await stripe.products.retrieve(params.id, {
      expand: ["default_price"],
    });

    return <ProductDetail product={product} />;
  } catch {
    return notFound();
  }
}
