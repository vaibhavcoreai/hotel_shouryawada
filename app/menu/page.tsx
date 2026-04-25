import { StaggeredMenu } from "@/components/StaggeredMenu";
import Footer from "@/components/Footer";
import FullMenu from "@/components/FullMenu";

// Menu configuration (reuse same as home for consistency)
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

export default function MenuPage() {
  return (
    <main className="min-h-screen bg-[#0D0800]">
      <StaggeredMenu 
        items={menuItems}
        socialItems={socialItems}
        displaySocials={true}
        logoUrl="/logo.png"
        accentColor="#FF6B00"
        colors={['#C9A84C', '#FF6B00', '#1a1a1a']}
      />
      <div className="pt-20">
        <FullMenu />
      </div>
      <Footer />
    </main>
  );
}
