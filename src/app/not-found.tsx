import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AmazonAffiliateBox from "@/components/AmazonAffiliateBox";
import { getContextualAmazonProducts } from "@/lib/amazon";

export default function NotFound() {
  const amz = getContextualAmazonProducts(
    "404",
    "mejores-productos-capilares",
    "Tratamientos para Cabello Decolorado K18 y Olaplex"
  );
  return (
    <>
      <Header />
      <main className="pt-[88px] pb-16">
        <div className="wrap max-w-3xl text-center py-12">
          <span className="eyebrow">Página no encontrada · 404</span>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl font-extrabold">
            Parece que esta hebra capilar perdió su enlace
          </h1>
          <p className="mt-4 text-lg text-[var(--muted)]">
            Explora nuestras 600 guías técnicas sobre cabello teñido o
            decolorado, comparativas de K18, Olaplex, mascarillas, champús y
            protectores térmicos o consulta el ranking por costo por aplicación
            en Amazon Estados Unidos y España.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/" className="btn btn-buy shine">
              Volver al inicio
            </Link>
            <Link
              href="/mejores-productos-capilares/mejores-tratamientos-cabello-decolorado-amazon/"
              className="btn btn-ghost"
            >
              Ver Top 9 en Amazon →
            </Link>
          </div>
        </div>
        <div className="wrap">
          <AmazonAffiliateBox
            variant="showcase"
            sectionTitle={amz.sectionTitle}
            sectionSubtitle={amz.sectionSubtitle}
            products={amz.products}
            source="404"
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
