"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "../lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";

type MenuItem = { name: string; desc?: string };

const MENU_CATEGORIES: { category: string; items: MenuItem[] }[] = [
  {
    category: "Shauryawada Special",
    items: [
      { name: "Gavran Chicken Matka Handi (Half / Full)", desc: "गावरान चिकन मटका हंडी (हाफ / फुल)" },
      { name: "Rajeshahi Murg", desc: "राजेशाही मुर्ग" },
      { name: "Mutton Shahi Korma", desc: "मटन शाही कोरमा" },
      { name: "Mutton Matka Handi (Half / Full)", desc: "मटन मटका हंडी (हाफ / फुल)" },
      { name: "Mutton Shahi Raan Ki Shaan", desc: "मटन शाही रान की शान" },
    ]
  },
  {
    category: "Raan",
    items: [
      { name: "Aakha Bakra Raan (Big)", desc: "आख्खा बकरा रान (बिग)" },
      { name: "Aakha Bakra Raan (Small)", desc: "आख्खा बकरा रान (स्मॉल)" },
      { name: "Mutton Raan", desc: "मटन रान" },
      { name: "Chicken Raan", desc: "चिकन रान" },
      { name: "Chicken Raan (Half)", desc: "चिकन रान (हाफ)" },
    ]
  },
  {
    category: "Thali",
    items: [
      { name: "Mutton Gawakadchi Thali", desc: "मटन फ्राय, मटन द्राय पीस, मटन लोणचे, आळणी वाटी, सोलकढी वाटी, खिचडी, भजी, भात. अनलिमिटेड: भाकरी / चपाती, रसा, भात" },
      { name: "Mutton Special Thali", desc: "मटन फ्राय, मटन वाटी, वजडी वाटी, आळणी वाटी, गोड पदार्थ आणि अंडा मसाला. अनलिमिटेड: भाकरी / चपाती, रसा, भात" },
      { name: "Mutton Thali", desc: "मटन रसा विथ पीस, अंडा मसाला आणि अनलिमिटेड: भाकरी / चपाती, रसा, भात" },
      { name: "Chicken Gawakadchi Thali", desc: "चिकन फ्राय, चिकन द्राय, चिकन लोणचे, आळणी वाटी, सोलकढी वाटी, गोड पदार्थ, अंडा मसाला आणि अनलिमिटेड: भाकरी / चपाती / रोटी, रसा, भात" },
      { name: "Chicken Special Thali", desc: "चिकन फ्राय, अंडा मसाला, आळणी वाटी, गोड पदार्थ आणि अनलिमिटेड: भाकरी / चपाती / रोटी, रसा, भात" },
      { name: "Chicken Thali", desc: "चिकन रसा विथ पीस, अंडा मसाला आणि अनलिमिटेड: भाकरी / चपाती / रोटी, रसा, भात" },
      { name: "Egg Thali", desc: "अंडा थाळी" },
      { name: "Veg Thali", desc: "2 व्हेज भाजी, दाल, राईस, भाकरी / चपाती / रोटी, भात आणि गोड पदार्थ" },
    ]
  },
  {
    category: "Mutton Special",
    items: [
      { name: "Ghee Mutton Roast", desc: "घी मटन रोस्ट" },
      { name: "Mutton Kharda", desc: "मटन खर्डा" },
      { name: "Mutton Fry", desc: "मटन फ्राय" },
      { name: "Mutton Ukad", desc: "मटन उकड" },
      { name: "Mutton Chop Fry", desc: "मटन चॉप फ्राय" },
      { name: "Wajadi Fry", desc: "वजडी फ्राय" },
      { name: "Kaleji Fry", desc: "कलेजी फ्राय" },
    ]
  },
  {
    category: "Starters (Non-Veg)",
    items: [
      { name: "Chicken Manchow Soup", desc: "चिकन मंचाव सूप" },
      { name: "Chicken Alani Soup", desc: "चिकन आळणी सूप" },
      { name: "Mutton Alani Soup", desc: "मटन आळणी सूप" },
      { name: "Alani Soup Vati", desc: "आळणी सूप वाटी" },
      { name: "Chicken Lolipop (Dry)", desc: "चिकन लॉलीपॉप (ड्राय)" },
      { name: "Chicken Chilli", desc: "चिकन चिल्ली" },
      { name: "Chicken Manchurian (Dry)", desc: "चिकन मंचुरियन (ड्राय)" },
      { name: "Ghee Roast Chicken", desc: "घी रोस्ट चिकन" },
      { name: "Chicken Kharda", desc: "चिकन खर्डा" },
      { name: "Chicken Ukad", desc: "चिकन उकड" },
      { name: "Chicken Tandoori (Half / Full)", desc: "चिकन तंदूरी (हाफ / फुल)" },
      { name: "Chicken Tikka", desc: "चिकन टिक्का" },
    ]
  },
  {
    category: "Starters (Veg)",
    items: [
      { name: "Cream Of Tomato Soup", desc: "क्रीम ऑफ टोमॅटो सूप" },
      { name: "Veg Manchow Soup", desc: "व्हेज मंचाव सूप" },
      { name: "Fry / Roasted Papad", desc: "फ्राय / रोस्टेड पापड" },
      { name: "Masala Papad", desc: "मसाला पापड" },
      { name: "Green Salad", desc: "ग्रीन सॅलड" },
      { name: "Paneer Tikka", desc: "पनीर टिक्का" },
      { name: "Veg Manchurian Dry", desc: "व्हेज मंचुरियन ड्राय" },
      { name: "Paneer Chilli (Dry)", desc: "पनीर चिली (ड्राय)" },
      { name: "Veg Crispy", desc: "व्हेज क्रिस्पी" },
    ]
  },
  {
    category: "Main Course (Non-Veg)",
    items: [
      { name: "Mutton Malwani Handi (Half / Full)", desc: "मटन मालवणी हांडी (हाफ / फुल)" },
      { name: "Mutton Kalwan (Half / Full)", desc: "मटन कालवण (हाफ / फुल)" },
      { name: "Chicken Malwani Handi (Half / Full)", desc: "चिकन मालवणी हांडी (हाफ / फुल)" },
      { name: "Chicken Kalwan (Half / Full)", desc: "चिकन कालवण (हाफ / फुल)" },
      { name: "Murgh Musallam (Half / Full)", desc: "मुर्ग मुसल्लम (हाफ / फुल)" },
      { name: "Butter Chicken", desc: "बटर चिकन" },
      { name: "Egg Masala", desc: "अंडा मसाला" },
    ]
  },
  {
    category: "Main Course (Veg)",
    items: [
      { name: "Shev Bhaji", desc: "शेव भाजी" },
      { name: "Shevga Handi / Shevga Fry", desc: "शेवगा हांडी / शेवगा फ्राय" },
      { name: "Pithla", desc: "पिठला" },
      { name: "Wanga Fry / Masala", desc: "वांगी फ्राय / मसाला" },
      { name: "Dal Fry / Tadka", desc: "दाल फ्राय / तडका" },
      { name: "Paneer (Tikka / Butter) Masala", desc: "पनीर (टिक्का / बटर) मसाला" },
      { name: "Paneer Kurchan", desc: "पनीर कर्चन" },
      { name: "Wada Special Veg", desc: "वाडा स्पेशल व्हेज" },
      { name: "Veg Kadhai", desc: "व्हेज कडाई" },
      { name: "Veg Kolhapuri", desc: "व्हेज कोल्हापुरी" },
      { name: "Kaju Masala", desc: "काजू मसाला" },
    ]
  },
  {
    category: "Biryani & Chinese",
    items: [
      { name: "Veg Biryani", desc: "व्हेज बिर्याणी" },
      { name: "Chicken Dum Biryani", desc: "चिकन दम बिर्याणी" },
      { name: "Mutton Dum Biryani", desc: "मटन दम बिर्याणी" },
      { name: "Veg (Fried / Shejwan) Rice", desc: "व्हेज (फ्राईड / शेझवान) राईस" },
      { name: "Veg (Hakka / Shejwan) Noodles", desc: "व्हेज (हक्का / शेझवान) नूडल्स" },
      { name: "Egg (Fried / Shejwan) Rice", desc: "अंडा (फ्राईड / शेझवान) राईस" },
      { name: "Chicken (Fried / Shejwan) Rice", desc: "चिकन (फ्राईड / शेझवान) राईस" },
      { name: "Egg (Fried / Shejwan) Noodles", desc: "अंडा (फ्राईड / शेझवान) नूडल्स" },
    ]
  },
  {
    category: "Roti / Naan",
    items: [
      { name: "Roti / Butter Roti", desc: "रोटी / बटर रोटी" },
      { name: "Naan / Butter Naan", desc: "नान / बटर नान" },
      { name: "Garlic Naan (Plain / Butter / Cheese)", desc: "गार्लिक नान (प्लेन / बटर / चीज)" },
      { name: "Lachha Paratha (Plain / Butter)", desc: "लच्छा पराठा (प्लेन / बटर)" },
      { name: "Kulcha (Plain / Butter)", desc: "कुलचा (प्लेन / बटर)" },
      { name: "Bhakri (Bajari / Jowar)", desc: "भाकरी (बाजरी / ज्वारी)" },
    ]
  },
  {
    category: "Rice",
    items: [
      { name: "Indrayani Rice (Half / Full)", desc: "इंद्रायणी राईस (हाफ / फुल)" },
      { name: "Steam Rice (Half / Full)", desc: "स्टीम राईस (हाफ / फुल)" },
      { name: "Jira Rice (Half / Full)", desc: "जिरा राईस (हाफ / फुल)" },
      { name: "Veg Pulav", desc: "व्हेज पुलाव" },
      { name: "Dal Khichdi / Tadka", desc: "डाल खिचडी / तडका" },
      { name: "Alani Rice", desc: "आळणी भात" },
      { name: "Curd Rice", desc: "दही भात" },
    ]
  },
  {
    category: "Desserts & Beverages",
    items: [
      { name: "Ukadiche Modak (2 Pcs)", desc: "उकडीचे मोदक (2 पीस)" },
      { name: "Gulab Jamun (5 Pcs)", desc: "गुलाब जामुन (5 पीस)" },
      { name: "Matka Rabadi", desc: "मटका रबडी" },
      { name: "Mojito (Classic / Blue / Strawberry)", desc: "मोजिटो (क्लासिक / ब्लू / स्ट्रॉबेरी)" },
      { name: "Soft Drink (Small)", desc: "सॉफ्ट ड्रिंक (स्मॉल)" },
      { name: "Soft Drink (Big)", desc: "सॉफ्ट ड्रिंक (बिग)" },
      { name: "Solkadi", desc: "सोलकढी" },
      { name: "Fresh Lime Soda (Salted / Sweet / Mixed)", desc: "फ्रेश लाईम सोडा (सॉल्टेड / स्वीट / मिक्स)" },
      { name: "Fresh Lime Water (Salted / Sweet / Mixed)", desc: "फ्रेश लाईम वॉटर (सॉल्टेड / स्वीट / मिक्स)" },
      { name: "Mineral Water", desc: "मिनरल वॉटर" },
    ]
  }
];

export default function FullMenu() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const handleCategoryClick = (categoryName: string) => {
    if (openCategory === categoryName) {
      setOpenCategory(null);
    } else {
      setOpenCategory(categoryName);
      setTimeout(() => {
        const id = `category-${categoryName.replace(/\s+/g, '-')}`;
        const el = document.getElementById(id);
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 100;
          if ((window as any).lenis) {
            (window as any).lenis.scrollTo(y, { duration: 1 });
          } else {
            window.scrollTo({ top: y });
          }
        }
      }, 450); // Wait 450ms for Framer Motion height:0 animation to fully complete so the element's final Y position is accurate
    }
  };

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
              id={`category-${category.category.replace(/\s+/g, '-')}`}
              className="border rounded-sm overflow-hidden"
              style={{ borderColor: "rgba(201,168,76,0.15)" }}
            >
              <button
                onClick={() => handleCategoryClick(category.category)}
                className="w-full flex items-center justify-between p-4 md:p-6 text-left transition-colors duration-300 cursor-none hover:bg-black/[0.02]"
                style={{
                  background: openCategory === category.category ? "rgba(26,26,26,0.03)" : "transparent",
                }}
              >
                <span
                  className="font-heading font-bold text-lg md:text-xl uppercase tracking-wider pr-4 block"
                  style={{ color: "#1A1A1A" }}
                >
                  {category.category}
                </span>
                <motion.span
                  animate={{ rotate: openCategory === category.category ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{ display: 'block' }}
                >
                  <ChevronDown color="#C9A84C" size={24} />
                </motion.span>
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
