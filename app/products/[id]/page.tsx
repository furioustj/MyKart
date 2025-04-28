import { ProductDetail } from "@/components/product-detail";
import { stripe } from "@/lib/stripe";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

// ✅ Rename this to avoid conflicting with any 'PageProps' from a plugin
type ProductPageParams = {
  params: {
    id: string;
  };
};

// ✅ generateMetadata using explicit inline param type
export async function generateMetadata(
  { params }: ProductPageParams
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

// ✅ Page component using same safe renamed type
export default async function ProductPage(
  { params }: ProductPageParams
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
