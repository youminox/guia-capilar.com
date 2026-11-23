# Guía Capilar (`guia-capilar.com`)

Portal especializado en Español sobre **tricología cosmética, reparación molecular de enlaces disulfuro y cuidado de cabello teñido o decolorado** (**K18 Biomimetic Hairscience**, **Olaplex**, **Redken Acidic Bonding Concentrate**, **L'Oréal Professionnel Metal Detox**, **Color Wow** y **Elizavecca CER-100**), con cálculo real de **costo por aplicación** y **tipo de porosidad**.

## Arquitectura & SEO Anti-Canibalización

- **620 Páginas Estáticas (SSG)** compiladas con Next.js 16 App Router:
  - **12 Páginas Pilar (Hubs de Categoría)**
  - **100 Artículos Transaccionales** (40 Reviews a fondo + 30 Comparativas VS + 30 Rankings de compra en Amazon)
  - **500 Artículos SEO Informacionales** (0% canibalización validada en `src/data/keyword_map.json`)
  - **Home Interactiva de 15 Secciones** inspirada en los efectos visuales de `prunex1.com` (animación SVG de puentes disulfuro, órbita de ingredientes activos, comparador interactivo antes/después de cutícula, calculadora interactiva de costo por aplicación y buscador instantáneo de 612 guías).
  - **7 Páginas Legales y de Transparencia** a nombre de **CARLOS LINGAN BORJA** (Lima, Perú · `info@charlielingan.com`).
- **Imágenes Fotorrealistas `< 100 KB`**:
  - Generadas con **ChatGPT Image API (`gpt-image-1`, `quality: "medium"`)** y optimizadas en WebP (`16 KB – 64 KB`).
- **Afiliados Amazon Dual Store**:
  - 🇺🇸 Amazon Estados Unidos (`amazon.com`): **`guia-capilar-20`** (Tienda principal)
  - 🇪🇸 Amazon España (`amazon.es`): **`guia-capilar-21`**
- **Chat Online Tricológico IA (`gpt-4o-mini` predeterminado)**:
  - Conectado a Supabase (`ehwjvuhbimqakvzqbvvg`) y administrado desde el dashboard de `charlielingan.com` en el apartado **`guia-capilar.com`**.
