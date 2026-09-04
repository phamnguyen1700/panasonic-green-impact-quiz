import { motion } from "framer-motion";
import { Autoplay, EffectCreative } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/autoplay";

import { ForestCard } from "@/components/ForestCard";
import { forestPersonalities } from "@/config/campaign.config";
import { cn } from "@/utils/cn";

interface HomeForestCarouselProps {
  className?: string;
}

export function HomeForestCarousel({ className }: HomeForestCarouselProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.25 }}
      className={cn("home-forest-carousel relative w-full overflow-hidden px-0", className)}
    >
      <Swiper
        autoplay={{
          delay: 2200,
          disableOnInteraction: true,
        }}
        centeredSlides
        className="home-forest-carousel__swiper"
        creativeEffect={{
          prev: {
            shadow: false,
            origin: "right center",
            translate: ["-54%", 12, -180],
            rotate: [0, 0, -7],
            scale: 0.82,
          },
          next: {
            shadow: false,
            origin: "left center",
            translate: ["54%", 12, -180],
            rotate: [0, 0, 7],
            scale: 0.82,
          },
        }}
        effect="creative"
        grabCursor
        loop
        modules={[EffectCreative, Autoplay]}
        slidesPerView="auto"
      >
        {forestPersonalities.map((personality) => (
          <SwiperSlide key={personality.id} className="home-forest-carousel__slide">
            <ForestCard
              personality={personality}
              interactive={false}
              className="h-full w-full scale-100"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
}
