export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  file: string;
};

export const products: Product[] = [
  {
    id: "resume-19",
    name: "Professional Resume",
    description: "ATS-friendly professional resume template.",
    price: 19,
    file: "/products/resume.pdf",
  },
  {
    id: "resume-jd-49",
    name: "JD-Oriented Resume",
    description: "Resume optimized for a specific job description.",
    price: 49,
    file: "/products/jd-resume.pdf",
  },
];

export function getProduct(productId: string) {
  return products.find((product) => product.id === productId);
}