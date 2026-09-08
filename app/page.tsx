import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { ModelProfile } from "@/components/model-profile"
import { Gallery } from "@/components/gallery"
import { Videos } from "@/components/videos"
import { Ecommerce } from "@/components/ecommerce"
import { Instagram } from "@/components/instagram"
import { Booking } from "@/components/booking"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <About />
        <ModelProfile />
        <Gallery />
        <Videos />
        <Ecommerce />
        <Instagram />
        <Booking />
      </main>

      <Footer />
    </>
  )
}