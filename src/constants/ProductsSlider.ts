import one from "@/assets/images/productsSlider/one.avif";
import two from "@/assets/images/productsSlider/two.avif";
import three from "@/assets/images/productsSlider/three.avif";
import four from "@/assets/images/productsSlider/four.avif";

interface ProductsProps {
  id: number;
  image: ImageMetadata;
  name: string;
}

const products: ProductsProps[] = [
  { id: 1, image: one, name: "Optimización de procesos" },
  { id: 2, image: two, name: "Landing Page + Sitio Web Profesional" },
  { id: 3, image: three, name: "Social Media Ads + Campañas" },
  { id: 4, image: four, name: "Marketing Digital" },
];

export const productsSlider = [
  ...products,
  ...products,
  ...products,
  ...products,
];
