"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "../lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";

type MenuItem = { name: string; desc?: string };

const MENU_CATEGORIES: { category: string; items: MenuItem[] }[] = [
  {
    category: "Maharashtrian Special",
    items: [
      { name: "Alani Bhat", desc: "A scrumptious Shaurya Wada Special Thali delicacy that will satisfy all your carnivorous cravings." },
      { name: "Alani Wati" },
      { name: "Chicken Alani Soup", desc: "A flavorful and wholesome soup made with tender chicken, infused with aromatic flavors." },
      { name: "Chicken Dhangiri [5pc]", desc: "Delicious, tender chicken cooked to perfection, offering a delectable blend of flavors." },
      { name: "Chicken Fry [5 Pieces]", desc: "Crispy and flavorful, this chicken fry boasts tender pieces of seasoned chicken." },
      { name: "Chicken Gavakadchi Thali", desc: "A flavorful and aromatic chicken thali with a delectable twist." },
      { name: "Chicken Kalvan", desc: "A delectable non-veg gourmet experience, featuring tender and flavorful chicken in a special gravy." },
      { name: "Chicken Malvani" },
      { name: "Chicken Special Thali", desc: "A delectable non-veg feast showcasing Shaurya Wada's finest chicken delicacies." },
      { name: "Chicken Thali", desc: "A wholesome combo of 2 fluffy rotis and rice served with delicious chicken gravy." },
      { name: "Chicken Ukhad [5pc]", desc: "Tender and flavorful chicken ukhad, a must-try for all meat lovers." },
      { name: "Egg Masala" },
      { name: "Egg Thali", desc: "A flavorsome thali with 2 phulkas served with rice and egg curry." },
      { name: "Indrayani Rice", desc: "A flavorful and aromatic rice dish that brings the taste of India to your table." },
      { name: "Mutton Alani Soup", desc: "A hearty and flavorful soup made with tender mutton, sure to warm your soul." },
      { name: "Mutton Dum Biryani", desc: "A fragrant combination of rice and tender mutton pieces cooked to perfection." },
      { name: "Mutton Chop Kala" },
      { name: "Mutton Fry [5 Pieces]", desc: "Tender and flavorful mutton pieces fried to perfection, a delightful choice." },
      { name: "Mutton Gavakadchi Thali", desc: "An aromatic and flavorful medley of tender mutton cooked in traditional Maharashtra spices." },
      { name: "Mutton Kalvan", desc: "A tantalizing specialty from Shaurya Wada's renowned Thali, Mutton Kalvani is a savory delight." },
      { name: "Mutton Special Thali", desc: "A succulent and savory medley of tender mutton, crafted to perfection for an ultimate feast." },
      { name: "Mutton Thali", desc: "A hearty combo of mutton, egg curry, fulka, and rice." },
      { name: "Mutton Ukkad [8pc]", desc: "A succulent and flavorful mutton dish that promises a delightful culinary experience." },
    ]
  },
  {
    category: "Indian Main Course",
    items: [
      { name: "Mutton Masala", desc: "A flavorful and aromatic delicacy that features tender mutton cooked to perfection." },
      { name: "Chicken Dum Biryani", desc: "Deliciously decadent flavored dum rice layered with fried chicken and indian whole spices." },
      { name: "Chicken Handi", desc: "A delectable handi preparation with succulent chicken, cooked to perfection in a rich gravy." },
      { name: "Chicken Masala", desc: "A delectable non-veg dish bursting with rich flavors and aromatic spices." },
      { name: "Chicken Tikka Masala", desc: "An aromatic, flavorful chicken dish cooked in a rich, creamy tomato-based sauce." },
      { name: "Dal Fry", desc: "A comforting and delicious preparation made with mixed daal cooked and tempered." },
      { name: "Dal Khichdi Tadka", desc: "A delicious and comforting meal, made from rice and moong lentils." },
      { name: "Dal Khchidi", desc: "A fragrant combination of Basmati rice and lentils cooked to perfection." },
      { name: "Dal Tadka", desc: "A scrumptious and aromatic Indian delight bursting with flavors." },
      { name: "Egg Bhurji" },
      { name: "Jeera Rice", desc: "Aromatic rice cooked in a tempering of cumin and whole spices." },
      { name: "Murgh Musallam", desc: "Indulge in the rich flavors of this royal Mughlai delicacy, a succulent non-Veg delight." },
      { name: "Mutton Handi", desc: "Juicy and succulent mutton cooked to perfection, capturing the essence of traditional flavors." },
      { name: "Paneer Biryani", desc: "A flavorsome and aromatic vegetarian biryani dish featuring succulent paneer." },
      { name: "Paneer Kurchan", desc: "A delectable and flavorful vegetarian delicacy that will tantalize your taste buds." },
      { name: "Paneer Tikka Masala", desc: "A rich and flavorful vegetarian delight that will satisfy your taste buds." },
      { name: "Steamed Rice", desc: "A fragrant and fluffy staple of Indian cuisine that perfectly complements any meal." },
      { name: "Veg Bhuna Masala", desc: "Delicious blend of vegetables cooked to perfection in a flavorful and aromatic style." },
      { name: "Veg Biryani", desc: "A flavorful combination of rice and assorted veggies cooked in a fragrant blend." },
      { name: "Veg Maratha", desc: "A delightful and flavorful Maharashtrian-inspired vegetarian dish that will transport you." },
      { name: "Veg Pulao", desc: "A wholesome dish prepared by cooking chopped vegetables and rice in a flavorful way." },
      { name: "Vada Special Veg", desc: "A savory and mouthwatering veggie delight that will tantalize your taste buds." },
    ]
  },
  {
    category: "Chinese",
    items: [
      { name: "Chicken 65" },
      { name: "Chicken Chilly" },
      { name: "Chicken Crispy" },
      { name: "Chicken Fried Rice", desc: "A delectable blend of tender chicken and fragrant rice stir-fried to perfection." },
      { name: "Chicken Lollipop", desc: "Everyone's favorite home-spiced chicken lollipop served straight from the tandoor." },
      { name: "Chicken Manchow Soup", desc: "A comforting chinese-style thick soup filled with tender, juicy chicken." },
      { name: "Chicken Schezwan Fried Rice", desc: "A flavorful and aromatic combination of tender chicken and delectably seasoned rice." },
      { name: "Chicken Tripple Schezwan Fried Rice" },
      { name: "Fried Rice Veg", desc: "A flavorful and aromatic Chinese dish loaded with an assortment of fresh vegetables." },
      { name: "Veg Manchow Soup", desc: "A delicious hot and spicy, thick soup made from mixed vegetables." },
      { name: "Panner 65" },
      { name: "Paneer Chili Dry", desc: "A scrumptious Chinese starter that combines the smoothness of paneer." },
      { name: "Schezwan Fried Rice Veg", desc: "A flavorful and aromatic Chinese rice dish packed with vibrant vegetables." },
      { name: "Veg Manchurian" },
      { name: "Veg Tripple Schezwan Fried Rice" },
    ]
  },
  {
    category: "Tandoor & Raan",
    items: [
      { name: "Chicken Tandoori", desc: "Tandoor-cooked chicken chunks marinated in a yogurt and chiilli based masala." },
      { name: "Chicken Tikka", desc: "Super soft chunks of chicken are coated with a spicy and peppery masala." },
      { name: "Paneer Banjara Kebab", desc: "Tender and flavorful Indian kebabs bursting with aromatic spices and succulent paneer." },
      { name: "Paneer Malai Kebab", desc: "Indulge in the irresistible creaminess and delicate flavor of this delectable kebab." },
      { name: "Paneer Tikka", desc: "Soft paneer cubes marinated in a seasoned masala and cooked in a tandoor." },
      { name: "Chicken Raan", desc: "Tender and flavorful, this mouthwatering chicken dish is a true delight for meat lovers." },
      { name: "Mutton Raan", desc: "A mouthwatering and flavorful non-veg delight from the Raan category, featuring tender meat." },
    ]
  },
  {
    category: "Breads",
    items: [
      { name: "Bajari Bhakri", desc: "A wholesome veggie delight enriched with traditional flavors." },
      { name: "Butter Naan", desc: "North Indian bread with a generous serving of butter that tastes brilliant." },
      { name: "Butter Roti", desc: "Soft and fluffy rotis topped with a generous serving of butter." },
      { name: "Chapati", desc: "A delightfully wholesome combo with soft chapatis." },
      { name: "Javari Bhakri", desc: "An exquisite blend of aromatic flavors and mouthwatering textures." },
      { name: "Naan", desc: "A delectable and flavorful traditional Indian bread that is expertly cooked." },
      { name: "Roti", desc: "A flavorful and wholesome traditional Indian bread perfect for enjoying." },
    ]
  },
  {
    category: "Desserts & Beverages",
    items: [
      { name: "Solkadi", desc: "A refreshing and tangy concoction that will leave your taste buds craving for more." },
      { name: "Gulab Jamun", desc: "Delight your taste buds with this delectable Indian dessert, sweet and succulent." },
    ]
  }
];

export default function FullMenu() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "expo.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="full-menu"
      className="relative py-24 md:py-32"
      style={{ background: "#FDFBF7" }}
    >
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="font-heading font-extrabold uppercase tracking-widest mb-4"
            style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)", color: "#C9A84C" }}
          >
            The Royal Darbar Menu
          </h2>
          <div className="w-24 h-px mx-auto" style={{ background: "rgba(201,168,76,0.5)" }} />
        </div>

        <div className="space-y-4">
          {MENU_CATEGORIES.map((category) => (
            <div
              key={category.category}
              className="border rounded-sm overflow-hidden"
              style={{ borderColor: "rgba(201,168,76,0.15)" }}
            >
              <button
                onClick={() => setOpenCategory(openCategory === category.category ? null : category.category)}
                className="w-full flex items-center justify-between p-4 md:p-6 text-left transition-colors duration-300 cursor-none hover:bg-black/[0.02]"
                style={{
                  background: openCategory === category.category ? "rgba(26,26,26,0.03)" : "transparent",
                }}
              >
                <h3
                  className="font-heading font-bold text-lg md:text-xl uppercase tracking-wider pr-4"
                  style={{ color: "#1A1A1A" }}
                >
                  {category.category}
                </h3>
                <motion.div
                  animate={{ rotate: openCategory === category.category ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <ChevronDown color="#C9A84C" size={24} />
                </motion.div>
              </button>

              <AnimatePresence>
                {openCategory === category.category && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 md:p-6 pt-2 pb-6 md:pb-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 md:gap-y-8 border-t" style={{ borderColor: "rgba(201,168,76,0.1)" }}>
                      {category.items.map((item, i) => (
                        <div key={i} className="flex flex-col">
                          <h4 className="font-heading font-bold text-lg mb-1" style={{ color: "#C9A84C" }}>
                            {item.name}
                          </h4>
                          {item.desc && (
                            <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(26,26,26,0.7)" }}>
                              {item.desc}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
