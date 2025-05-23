// Category data
export const categories = [
  {
    id: 1,
    name: "Solo Recording",
    slug: "solo-recording",
    image: "https://images.unsplash.com/photo-1589903308904-1010c2294adc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" // Microphone close-up
  },
  {
    id: 2,
    name: "Group Podcasts",
    slug: "group-podcasts",
    image: "https://images.unsplash.com/photo-1593697821252-0c9137d9fc45?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" // Multiple mics setup
  },
  {
    id: 3,
    name: "Video Podcasts",
    slug: "video-podcasts",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" // Studio with video equipment
  },
];

// Equipment filters
export const equipmentOptions = [
  "Pro Microphones",
  "Acoustic Treatment", 
  "Mixing Console",
  "Video Equipment",
  "Soundproofing",
  "Headphones",
  "Recording Software",
  "Editing Services",
  "Live Streaming",
  "Audio Interface"
];

// Collection data
export const collections = [
  {
    id: 1,
    title: "Top-Rated Studios",
    description: "The most highly rated podcast studios in town",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80", // Professional studio
    placesCount: 12
  },
  {
    id: 2,
    title: "Budget-Friendly",
    description: "Affordable podcast studios that don't compromise on quality",
    image: "https://images.unsplash.com/photo-1583324113626-70df0f4deaab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80", // Simple studio setup
    placesCount: 8
  },
  {
    id: 3,
    title: "Premium Studios",
    description: "Luxury podcast studios with top-of-the-line equipment",
    image: "https://images.unsplash.com/photo-1520697830682-bbb6e85e2b0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80", // High-end equipment
    placesCount: 15
  },
  {
    id: 4,
    title: "Group Recording",
    description: "Studios perfect for recording with multiple guests",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80", // Multiple people recording
    placesCount: 9
  },
];

// Studio data
export const studios = [
  {
    id: 1,
    name: "SoundWave Studios",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80", // Professional studio
    equipment: ["Pro Microphones", "Acoustic Treatment", "Mixing Console"],
    rating: 4.8,
    availableTimes: "9:00 AM - 8:00 PM",
    pricePerHour: "₹999 per hour",
    discount: "20% OFF for 3+ hours",
    location: "Downtown",
    promoted: true
  },
  {
    id: 2,
    name: "AudioCraft",
    image: "https://images.unsplash.com/photo-1583324113626-70df0f4deaab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80", // Simple studio setup
    equipment: ["Soundproofing", "Pro Microphones", "Recording Software"],
    rating: 4.5,
    availableTimes: "10:00 AM - 10:00 PM",
    pricePerHour: "₹1,299 per hour",
    discount: "15% OFF weekday mornings",
    location: "Midtown"
  },
  {
    id: 3,
    name: "Podcast Central",
    image: "https://images.unsplash.com/photo-1520697830682-bbb6e85e2b0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80", // High-end equipment
    equipment: ["Pro Microphones", "Video Equipment", "Acoustic Treatment", "Editing Services"],
    rating: 4.9,
    availableTimes: "8:00 AM - 9:00 PM",
    pricePerHour: "₹1,999 per hour",
    location: "Uptown"
  },
  {
    id: 4,
    name: "VoiceBooth",
    image: "https://images.unsplash.com/photo-1589903308904-1010c2294adc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80", // Microphone close-up
    equipment: ["Soundproofing", "Headphones", "Audio Interface"],
    rating: 4.2,
    availableTimes: "9:00 AM - 7:00 PM",
    pricePerHour: "₹999 per hour",
    discount: "Bring a friend for free",
    location: "Eastside",
    promoted: true
  },
  {
    id: 5,
    name: "Creator Hub",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80", // Studio with video equipment
    equipment: ["Pro Microphones", "Video Equipment", "Live Streaming"],
    rating: 4.7,
    availableTimes: "24/7 Access",
    pricePerHour: "₹1,499 per hour",
    location: "Tech District"
  },
  {
    id: 6,
    name: "Echo Studios",
    image: "https://images.unsplash.com/photo-1593697821252-0c9137d9fc45?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80", // Multiple mics setup
    equipment: ["Pro Microphones", "Acoustic Treatment", "Editing Services"],
    rating: 4.4,
    availableTimes: "10:00 AM - 9:00 PM",
    pricePerHour: "₹1,099 per hour",
    location: "North Side"
  },
];

// Making aliases for compatibility
export const mockStudios = studios;

// Time slots data
export const timeSlots = [
  {
    id: 1,
    studioId: 1,
    date: "2023-10-15",
    slots: [
      { time: "09:00 AM", available: true },
      { time: "10:00 AM", available: true },
      { time: "11:00 AM", available: false },
      { time: "12:00 PM", available: true },
      { time: "01:00 PM", available: true },
      { time: "02:00 PM", available: false },
      { time: "03:00 PM", available: true },
      { time: "04:00 PM", available: true },
      { time: "05:00 PM", available: true },
      { time: "06:00 PM", available: false },
      { time: "07:00 PM", available: true }
    ]
  },
  {
    id: 2,
    studioId: 1,
    date: "2023-10-16",
    slots: [
      { time: "09:00 AM", available: true },
      { time: "10:00 AM", available: false },
      { time: "11:00 AM", available: true },
      { time: "12:00 PM", available: true },
      { time: "01:00 PM", available: false },
      { time: "02:00 PM", available: false },
      { time: "03:00 PM", available: true },
      { time: "04:00 PM", available: true },
      { time: "05:00 PM", available: false },
      { time: "06:00 PM", available: true },
      { time: "07:00 PM", available: true }
    ]
  },
  {
    id: 3,
    studioId: 2,
    date: "2023-10-15",
    slots: [
      { time: "10:00 AM", available: true },
      { time: "11:00 AM", available: true },
      { time: "12:00 PM", available: false },
      { time: "01:00 PM", available: true },
      { time: "02:00 PM", available: true },
      { time: "03:00 PM", available: true },
      { time: "04:00 PM", available: false },
      { time: "05:00 PM", available: true },
      { time: "06:00 PM", available: true },
      { time: "07:00 PM", available: false },
      { time: "08:00 PM", available: true },
      { time: "09:00 PM", available: true }
    ]
  }
];

// Making aliases for compatibility
export const mockTimeSlots = timeSlots;

// Equipment details data
export const equipmentDetails = [
  {
    id: 1,
    studioId: 3,
    name: "Shure SM7B",
    description: "Professional dynamic microphone with smooth, flat, wide-range frequency response.",
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Close-up of mic
    category: "Microphone",
    isPremium: true
  },
  {
    id: 2,
    studioId: 3,
    name: "Acoustic Panels",
    description: "Professional acoustic treatment to reduce echo and improve sound quality.",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Studio with acoustic treatment
    category: "Acoustic Treatment",
    isPremium: false
  },
  {
    id: 3,
    studioId: 3,
    name: "Rodecaster Pro",
    description: "Complete podcast production studio with sound pads, effects and multi-channel mixing.",
    image: "https://images.unsplash.com/photo-1583324113626-70df0f4deaab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Audio interface/mixer
    category: "Mixing Console",
    isPremium: true
  },
  {
    id: 4,
    studioId: 3,
    name: "Sony A7 III",
    description: "Full-frame mirrorless camera for high-quality video podcast recording.",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Camera equipment
    category: "Video Equipment",
    isPremium: true
  },
  {
    id: 5,
    studioId: 3,
    name: "Audio-Technica ATH-M50x",
    description: "Professional studio monitor headphones for accurate audio monitoring.",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Headphones
    category: "Headphones",
    isPremium: false
  },
  {
    id: 6,
    studioId: 3,
    name: "Adobe Audition",
    description: "Professional audio workstation for recording, mixing, and post-production.",
    image: "https://images.unsplash.com/photo-1453738773917-9c3eff1db985?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Audio software interface
    category: "Software",
    isPremium: true
  }
];

// Reviews data
export const reviews = [
  {
    id: 1,
    studioId: 3,
    author: {
      name: "Alex Johnson",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      reviewCount: 42
    },
    rating: 4.5,
    content: "The studio was amazing! Great equipment and soundproofing. Perfect for my podcast interview session. The staff was also very helpful with technical setup.",
    date: "2 days ago",
    likeCount: 8,
    liked: false
  },
  {
    id: 2,
    studioId: 3,
    author: {
      name: "Sarah Williams",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      reviewCount: 18
    },
    rating: 3.5,
    content: "Good studio but a bit pricey. The equipment was professional grade, but I had some issues with the booking system. The actual recording quality was excellent though.",
    date: "1 week ago",
    likeCount: 3,
    liked: true
  },
  {
    id: 3,
    studioId: 3,
    author: {
      name: "Mike Chen",
      image: "https://randomuser.me/api/portraits/men/22.jpg",
      reviewCount: 87
    },
    rating: 5.0,
    content: "Best podcast studio I've used! The acoustic treatment is superb and the Shure SM7B mics are perfect. Very easy to book and the staff helped with editing my episode.",
    date: "2 weeks ago",
    likeCount: 15,
    liked: false
  }
];

// Making aliases for compatibility
export const mockReviews = reviews;
