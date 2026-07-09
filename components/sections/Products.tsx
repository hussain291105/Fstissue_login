 "use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export const products = [
  {
    img: "/Image 01.png",
    title: "Fresh Royale",
    subtitle: "Highest quality (Virgin) - 100 PLY",
    description:
      "Premium virgin paper tissue offering maximum softness and absorbency.",
    specifications: [
      "100 Ply",
      "Virgin Paper",
      "Extra Soft",
      "High Absorbency",
      "Premium Quality"
    ]
  },
  {
    img: "/Image 02.png",
    title: "Fresh Blooms",
    subtitle: "Everyday soft tissue - 50 PLY",
    description:
      "Soft and economical tissue suitable for everyday use.",
    specifications: [
      "50 Ply",
      "Semi Virgin",
      "Soft Finish",
      "Daily Use"
    ]
  },
  {
    img: "/Image 03.png",
    title: "Fresh Natura",
    subtitle: "Eco-friendly premium - 100 PLY",
    description:
      "Environment-friendly premium tissue manufactured using semi virgin paper.",
    specifications: [
      "100 Ply",
      "Semi Virgin",
      "Eco Friendly",
      "High Strength"
    ]
  }
];

export default function Products() {
  const [selectedProduct, setSelectedProduct] = useState<
    (typeof products)[0] | null
  >(null);

  return (
    <section id="products" className="px-6 py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
        
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-12 flex items-end justify-between sm:mb-16"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-primary sm:text-sm">
              Products
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-dark sm:text-4xl lg:text-5xl">
              Featured Collection
            </h2>
          </div>
        </motion.div>
        
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.14 } },
          }}
          className="grid gap-6 sm:gap-8 lg:grid-cols-3"
        >
          {products.map(({ img, title, subtitle }, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 18 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
              onClick={() => setSelectedProduct(products[index])}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="group relative overflow-hidden rounded-2xl sm:rounded-3xl lg:rounded-4xl"
            >
              <div className="relative h-[350px] w-full sm:h-[400px] lg:h-[500px]">
                <Image
                  src={img}
                  alt={`Product ${index + 1}`}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-110"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-black/50 to-black/90" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <h3 className="text-xl font-semibold text-white sm:text-2xl">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-white/80 sm:text-base">
                  {subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Product Popup */}
        <AnimatePresence>
          {selectedProduct && (
            <>
              <motion.div
                className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/80 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProduct(null)}
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35 }}
                className="
                  fixed 
                  left-1/2 
                  top-1/2 
                  z-[9999]
                  w-[95%] 
                  max-w-5xl
                  max-h-[92vh]
                  -translate-x-1/2 
                  -translate-y-1/2 
                  overflow-y-auto
                  rounded-3xl 
                  bg-white 
                  shadow-2xl
                "
              >
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="
                    absolute
                    right-3
                    top-3
                    z-20
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    bg-white
                    shadow-lg
                    transition
                    hover:rotate-90
                  "
                >
                  ✕
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative h-64 sm:h-80 md:h-96 lg:h-[600px]">
                    <Image
                      src={selectedProduct.img}
                      alt={selectedProduct.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="p-5 sm:p-7 lg:p-12">
                    <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
                      {selectedProduct.title}
                    </h2>

                    <p className="mt-3 text-sm sm:text-base lg:text-lg text-gray-500">
                      {selectedProduct.subtitle}
                    </p>

                    <p className="mt-6 text-sm leading-7 text-gray-700 sm:text-base lg:text-lg">
                      {selectedProduct.description}
                    </p>

                    <div className="mt-8">
                      <h3 className="mb-4 text-xl font-semibold">
                        Specifications
                      </h3>

                      <div className="mt-6 flex flex-wrap gap-2 sm:gap-3">
                        {selectedProduct.specifications.map((item) => (
                          <span
                            key={item}
                            className="
                              rounded-full 
                              bg-blue-100 
                              px-3
                              py-2 
                              text-xs
                              font-medium 
                              text-blue-700
                              "
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
