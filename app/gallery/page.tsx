"use client";

import { StaggeredMenu } from "@/components/StaggeredMenu";
import Footer from "@/components/Footer";
import Masonry from "@/components/Masonry";
import Lightbox from "@/components/Lightbox";
import { motion } from "framer-motion";
import { useState } from "react";

const menuItems = [
  { label: 'Home', ariaLabel: 'Go to home', link: '/' },
  { label: 'About', ariaLabel: 'About Us', link: '/#about' },
  { label: 'Dishes', ariaLabel: 'Signature Dishes', link: '/#dishes' },
  { label: 'Menu', ariaLabel: 'Full Menu', link: '/menu' },
  { label: 'Gallery', ariaLabel: 'Photo Gallery', link: '/gallery' },
  { label: 'Branches', ariaLabel: 'Our Branches', link: '/#branches' },
  { label: 'Watch', ariaLabel: 'Watch Videos', link: '/#youtube' },
  { label: 'Reserve', ariaLabel: 'Reserve a Table', link: 'tel:+918888888888' },
  { label: 'Contact', ariaLabel: 'Contact Us', link: '/#contact' }
];

const socialItems = [
  { label: 'Facebook', link: 'https://facebook.com/vikasnana.handeiii' },
  { label: 'Instagram', link: 'https://instagram.com/hotel_shauryawada' },
  { label: 'YouTube', link: 'https://youtube.com/@Hotel_Shauryawada_Official' }
];

// List of images from public/Masonry
const galleryImages = [
  "1-0aa0q2b4ck.jpg", "1-0vlsvtdry6.jpg", "1-0ylhh9ynlt.jpg", "1-2suzb36roz.jpg",
  "1-4yd13x47fy.jpg", "1-65wt7y56xl.jpg", "1-6b9b1avnfv.jpg", "1-954h7lx9mr.jpg",
  "1-9fom82msou.jpg", "1-dwuo1qee7h.jpg", "1-erx53gladg.jpg", "1-g1nby15uqf.jpg",
  "1-g7qwklixq1.jpg", "1-g9tbsu156o.jpg", "1-hj5lb8qk9z.jpg", "1-hp1yk88fph.jpg",
  "1-i6c11dif5k.jpg", "1-lhgqv4hbgm.jpg", "1-mo2brnv765.jpg", "1-o5yiymdgf1.jpg",
  "1-rj1vydi5io.jpg", "1-s6rn0dy821.jpg", "1-sm5ur99gwa.jpg", "1-suf2jpcyve.jpg",
  "1-tcqgepefml.jpg", "1-tiu5giqjlm.jpg", "1-unkmxdkro7.jpg", "1-uuebkk96gh.jpg",
  "1-weghcs72z2.jpg", "1-wiy1edo4yr.jpg", "1-wyio2gvw2o.jpg", "1-y1ifjaka47.jpg",
  "1-ybc2eiovpo.jpg", "1-zqevtp3qxy.jpg"
];

const items = galleryImages.map((img, index) => ({
  id: index.toString(),
  img: `/Masonry/${img}`,
  url: `/Masonry/${img}`, // Open image in new tab or just keep it
  height: index % 2 === 0 ? 600 : 400, // Varying heights for masonry effect
}));

export default function GalleryPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleItemClick = (_item: any, index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  return (
    <main className="min-h-screen bg-cream overflow-x-hidden">
      <StaggeredMenu 
        items={menuItems}
        socialItems={socialItems}
        displaySocials={true}
        logoUrl="/logo.png"
        accentColor="#FF6B00"
        colors={['#C9A84C', '#FF6B00', '#1a1a1a']}
      />

      <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-heading font-bold text-charcoal mb-4">
            Visual <span className="text-gold">Grandeur</span>
          </h1>
          <div className="flex items-center justify-center gap-4 mb-6">
             <div className="h-px w-12 bg-gold/30"></div>
             <span className="text-saffron uppercase tracking-[0.3em] text-xs font-bold">The Shauryawada Experience</span>
             <div className="h-px w-12 bg-gold/30"></div>
          </div>
          <p className="max-w-2xl mx-auto text-charcoal/70 font-body text-lg leading-relaxed">
            Step into the royal court of Maharashtra. From our legendary Raan to the 
            regal ambiance of our 8 branches, explore the moments that define our dynasty.
          </p>
        </motion.div>

        <div>
          <Masonry
            items={items}
            ease="power3.out"
            duration={0.8}
            stagger={0.05}
            animateFrom="bottom"
            scaleOnHover={true}
            hoverScale={0.98}
            blurToFocus={true}
            colorShiftOnHover={true}
            onItemClick={handleItemClick}
          />
        </div>
      </section>

      <Lightbox 
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={items.map(it => it.img)}
        currentIndex={currentIndex}
        onNavigate={(index) => setCurrentIndex(index)}
      />

      <Footer />
    </main>
  );
}
