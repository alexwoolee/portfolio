// Assets 
import Osaka from "@/assets/gallery/osaka-night.webp"
import Gold from "@/assets/gallery/gold-gold-gold.webp"
import Bird from "@/assets/gallery/bird-pond.webp"

export type AboutItem = {
  id: string;
  text: string;
};

export type GalleryItem = {
  src: string;
  alt: string;
}

export const paragraphs: AboutItem[] = [
  {
    id: "par-1",
    text: "From making small projects to full-stack applications, I've always been passionate about building intuitive interfaces and solving problems people face everyday. It all started when I first started studying my bachelor's in Computer Science at SFU in 2023, where I discovered the intricacies of programming and the endless possibilities of technology.",
  },
  {
    id: "par-2",
    text: "Aside from programming, I'm a massive fan of you know the typical things that everyone loves like games, anime, and music. I also regularly get my exercise in by playing sports like badminton or through strength training. Throughout my 20 years of existence, I've also picked up a few languages like English, Chinese, and a novice level of Japanese.",
  },
  {
    id: "par-3",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Utenim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
  },
  {
    id: "par-4",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
  }
]; 

export const galleryImages: GalleryItem[] = [
  { src: Osaka, alt: "photo" },
  { src: Gold, alt: "photo" },
  { src: Bird, alt: "photo" },
]