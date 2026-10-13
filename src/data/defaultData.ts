import { SiteData } from '../types';

/**
 * =========================================================================
 * BIRTHDAY TRIBUTE DATA FOR TAMANNA (TIMMY)
 * =========================================================================
 * You can edit all your messages, line texts, and memories directly in this file.
 * The images are hosted in the project's public folder as:
 *   /1.jpg, /2.jpg, ... up to /14.jpg
 * =========================================================================
 */

export const initialSiteData: SiteData = {
  // Opening Screen Reveal Texts
  heroTitle: "Happy birthday to you dear",
  heroNickname: "Timmy",

  // ACT II: OUR STORY ARC (Photos 1, 2, 3, 4 with 3 lines each)
  storyMilestones: [
    {
      id: "arc-1",
      photoId: 1,
      photoSrc: "/1.jpg",
      title: "Part 1 · The Beginning of the Chaos",
      subtitle: "Where our friendship story officially unlocked",
      line1: "From sitting in the corner row making goofy faces instead of studying.",
      line2: "Listening to music secretly through every lecture and sleeping in the class.",
      line3: "We knew right from day one that we were going to be partners in crime."
    },
    {
      id: "arc-2",
      photoId: 2,
      photoSrc: "/2.jpg",
      title: "Part 2 · The Great Integrated Project of English",
      subtitle: "Full confidence on the outside, 100% ridiculousness on the inside",
      line1: "Acting all professional in front of ma'am, but in reality, zero seriousness kept.",
      line2: "Flexing and striking dramatic poses in class with everyone watching.",
      line3: "Proving that any school event turns into a comedy special when we add our magic."
    },
    {
      id: "arc-3",
      photoId: 3,
      photoSrc: "/3.jpg",
      title: "Part 3 · Avinya and It's Shenanigans",
      subtitle: "Presenting to you the center of pure madness",
      line1: "From all the effort we put into 'building' it.",
      line2: "To all the efforts we made trying to 'sell it' to everyone (the multimeter, the watch, and whatnot).",
      line3: "Creating some legendary memories that we will never forget."
    },
    {
      id: "arc-4",
      photoId: 4,
      photoSrc: "/4.jpg",
      title: "Part 4 · Best of friends - no matter the distance",
      subtitle: "Turning every visit into something memorable",
      line1: "From me planning all of it out with your parents,",
      line2: "To the moment of perfect execution of the surprise.",
      line3: "But of course, can't forget the failed party popper fiasco (and ofcourse, you putting the cake on me as well - besharam)."
    }
  ],

  // ACT III: HALL OF FAME (3 Best Photos: 5, 6, 7 in elegant gallery frames)
  hallOfFame: [
    {
      id: "hof-1",
      photoId: 5,
      photoSrc: "/5.jpg",
      title: "The Royal Bowl Crown",
      tagline: "We never let the whole competition steal our fun",
      year: "Hall of Fame · Edition I"
    },
    {
      id: "hof-2",
      photoId: 6,
      photoSrc: "/6.jpg",
      title: "The Jamal Kudu Stance",
      tagline: "Balancing the championship trophy right on your head on one foot.",
      year: "Hall of Fame · Edition II"
    },
    {
      id: "hof-3",
      photoId: 7,
      photoSrc: "/7.jpg",
      title: "The Classic Timmy Pose",
      tagline: "Eyes rolled, tongue out, bundled up and entirely unapologetic.",
      year: "Hall of Fame · Edition III"
    }
  ],

  // ACT IV: OUR VERY OWN ADVENTURES (Photos 8 to 14 connected by horizontal Luna Lovegood chains)
  adventures: [
    {
      id: "adv-1",
      photoId: 8,
      photoSrc: "/8.jpg",
      title: "The Trauma inducing couple of DRS",
      caption: "Who can forget the gossip they gave us daily to make us last the day",
      locationOrDate: "XIA Classroom"
    },
    {
      id: "adv-2",
      photoId: 9,
      photoSrc: "/9.jpg",
      title: "The Star Anchors",
      caption: "Double peace signs, unmistakable anchorship, and newsdesk royalty.",
      locationOrDate: "Media Room"
    },
    {
      id: "adv-3",
      photoId: 10,
      photoSrc: "/10.jpg",
      title: "No one could tolerate us for long",
      caption: "Just like Tom and Jerry, we don't care about the rest of the world",
      locationOrDate: "Shenanigans"
    },
    {
      id: "adv-4",
      photoId: 11,
      photoSrc: "/11.jpg",
      title: "Front Row Celebrity Spotlight",
      caption: "Shades on, thumbs up on the stage, exuding pure main character energy.",
      locationOrDate: "VIP Access"
    },
    {
      id: "adv-5",
      photoId: 12,
      photoSrc: "/12.jpg",
      title: "The Most Dripped ppl on Teachers Day",
      caption: "Unmatched energy, warm laughter, and the brightest smiles of all.",
      locationOrDate: "DRSIS"
    },
    {
      id: "adv-6",
      photoId: 13,
      photoSrc: "/13.jpg",
      title: "Timmy and Chororo worshipping me hehe",
      caption: "Self explanatory (cool guy emoji)",
      locationOrDate: "Cafeteria Shenanigans"
    },
    {
      id: "adv-7",
      photoId: 14,
      photoSrc: "/14.jpg",
      title: "The Most random-ass Interview",
      caption: "To this day I have no idea why I was interviewed in a University Fair ",
      locationOrDate: "DRSIS"
    }
  ],

  // ACT V: THE COFFEE LETTER (2 paragraphs in handwriting font)
  letter: {
    salutation: "To My Favourite Son Jerry,",
    paragraph1: "Happy Birthday! Looking back at everything we’ve lived through, from chaotic science fairs and improvised newsroom broadcasts to laughing until tears rolled down our faces in the back row of class, I honestly cannot imagine my life without you. You have this unmatched, ridiculous magic that turns the most ordinary, mundane day into an unforgettable adventure filled with inside jokes that only the two of us will ever truly understand (like Tanmoy Sir and the last bench waali kahani).",
    paragraph2: "I thank you from the bottom of my heart for being the friend who never judges my terrible ideas, who always matches my chaotic frequency, and who stands right beside me no matter what. As you celebrate another year, I wish you endless happiness, boundless success, and days as bright, warm, and hilarious as you are. Keep smiling, keep shining, and never stop being the wonderful person you are, Tamanna.",
    signoff: "Forever your best friend,",
    signature: "Tom",
    date: "On your special birthday & for all the years to come"
  },

  customPhotos: {}
};
