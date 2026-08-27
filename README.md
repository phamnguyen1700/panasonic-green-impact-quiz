# Forest Whispers Quiz

You are designing and building a React + Vite + TypeScript campaign quiz microsite.

I will attach reference screenshots, background images, and this reference campaign website:

https://songkhoegopxanh.com/

Use the attached images and website only as visual references for mood, art direction, layout energy, typography feeling, nature atmosphere, and campaign quality. Do not copy exact assets unless I provide them as project assets.

Your task in this phase:

Create the design system and build only the Home and Info screens.

Visual direction:

- nature-inspired campaign

- lush forest, mountain, sky, sunlight background imagery

- fresh green, lime, cyan, soft blue, warm sunlight accents

- premium social campaign feeling

- cinematic full-screen scenes

- glassmorphism cards

- soft blur, light rays, floating leaves, particles

- bold editorial display typography

- rounded organic UI shapes

- energetic but elegant

- not dashboard UI

- not admin UI

- not SaaS landing page

- not Ant Design / Material UI / Bootstrap style

- avoid shadcn-looking dashboard components

Tech stack:

- React

- Vite

- TypeScript

- Tailwind CSS

- Framer Motion

- Custom UI components only

- No Ant Design

- No Material UI

- No Bootstrap

Required design system:

1. Design tokens

   Create:

   src/config/theme.config.ts

   Include:

   - color palette

   - gradients

   - typography scale

   - spacing

   - radius

   - shadows

   - blur values

   - z-index layers

   - motion durations and easings

2. Asset config

   Create:

   src/config/assets.config.ts

   Put all image/background/icon paths here.

   Do not hardcode image paths inside components.

3. Campaign config

   Create:

   src/config/campaign.config.ts

   Put all text, labels, CTA wording, and brand copy here.

   Do not hardcode campaign copy inside components.

4. Reusable theme components

   Create:

   src/components/CampaignButton.tsx

   src/components/GlassPanel.tsx

   src/components/ForestCard.tsx

   src/components/FloatingAsset.tsx

   src/components/ScreenBackground.tsx

   src/components/MotionScreen.tsx

   src/components/TextInput.tsx

5. Layout primitives

   Create reusable layout components if needed:

   - FullscreenStage

   - ContentContainer

   - CardStack

   - CenterStage

Architecture:

src/

  main.tsx

  App.tsx

  app/

    screenFlow.ts

    AppProviders.tsx

  features/

    home/

      HomeScreen.tsx

      components/

        HomeHero.tsx

        FloatingForestCards.tsx

    info/

      InfoScreen.tsx

      components/

        PlayerInfoForm.tsx

        CampaignIntro.tsx

        ForestPreviewCards.tsx

  hooks/

    useAppFlow.ts

    usePlayerInfoForm.ts

  types/

    player.types.ts

    campaign.types.ts

  config/

    campaign.config.ts

    assets.config.ts
    motion.config.ts

    theme.config.ts

  components/

    CampaignButton.tsx

    GlassPanel.tsx

    ForestCard.tsx

    FloatingAsset.tsx

    ScreenBackground.tsx

    MotionScreen.tsx

    TextInput.tsx

  utils/

    cn.ts

    storage.ts

  styles/

    index.css

    fonts.css

    theme.css

public/

  images/

    home/

    info/

    quiz/

    result/

  elements/

    leaves/

    particles/

    frames/

  icons/

  fonts/

Home screen requirements:

- full-screen hero

- use provided background image as the main visual foundation

- headline: "Bạn là loại rừng nào?"

- supporting campaign copy from campaign.config.ts

- floating translucent forest/personality cards

- CTA button: "Chơi ngay"

- cinematic composition

- responsive mobile and desktop

Info screen requirements:

- campaign intro

- player info form

- name required

- phone optional

- CTA button: "Bắt đầu"

- small preview of forest personality cards

- visual style must match Home screen

- form should feel campaign-branded, not generic

Important:

- Build a reusable design system first.

- Use the design system in Home and Info.

- Keep screen-specific composition inside features.

- Keep reusable UI in components.

- Make all text readable on image backgrounds.

- Use overlays, contrast, and soft gradients when needed.

- Add subtle Framer Motion transitions.

- Avoid clutter.

- Make the result feel premium even though Result is not built yet.

- Generate clean, maintainable code that I can clone and refactor later.

Deliverable:

A working React/Vite source code project with the design system, Home screen, and Info screen wired together.

Motion system:

Create a consistent motion language for the campaign.

Use Framer Motion for:

- screen transitions

- hero text reveal

- floating forest cards

- soft parallax-like movement

- CTA hover/tap interactions

- glass card entrance

- background particle/leaf drifting

- form step transition

Motion direction:

- calm, organic, airy

- inspired by wind, leaves, sunlight, and floating cards

- no aggressive bouncing

- no childish cartoon motion

- no excessive animation that distracts from reading

Define reusable motion presets in:

src/config/motion.config.ts

Include presets for:

- screenEnter

- screenExit

- fadeUp

- fadeScale

- staggerContainer

- staggerItem

- floatingSlow

- floatingMedium

- cardHover

- buttonTap

- revealText

- particleDrift

Use these presets across the app instead of hardcoding animation values in every component.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/add3020a-fc28-4a8b-9739-bb8e753b487b).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
