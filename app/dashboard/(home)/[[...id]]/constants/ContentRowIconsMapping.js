import {
  Image,
  Type,
  Link,
  Calendar,
  Play,
  Timer,
  Hash,
  FileText,
  Map,
  Zap,
  ShoppingCart,
  MessageSquare,
  Flag,
  Layers,
  Car,
  FolderOpen,
  Heading1,
} from 'lucide-react';

import { FaInstagram, FaYoutube } from 'react-icons/fa';

// Mapping of card types to their corresponding icons
export const ContentRowIconsMapping = {
  // Basic card types
  text: Type,
  url: Link,
  image: Image,
  media: Image,
  'section title': Heading1,
  nestedCard: Layers,

  // Right panel cards
  bannerCard: Flag,
  calendarCard: Calendar,
  carouselCard: Layers,
  countdownTimerCard: Timer,
  counterCard: Hash,
  driveCard: FolderOpen,
  formCard: FileText,
  instagramReelCard: FaInstagram,
  mapCard: Map,
  marquee: Zap,
  shoppable: ShoppingCart,
  shop: ShoppingCart,
  testimonials: MessageSquare,
  youtubeCard: FaYoutube,

  // Default fallback
  default: FileText,
};

// Helper function to get icon for a card type
export const getCardIcon = (cardType) => {
  if (!cardType) return ContentRowIconsMapping.default;

  // First try the exact cardType as provided
  if (ContentRowIconsMapping[cardType]) {
    return ContentRowIconsMapping[cardType];
  }

  // Then try normalized version (lowercase, replace spaces/underscores with hyphens)
  const normalizedType = cardType.toLowerCase().replace(/[_\s]/g, '-');
  if (ContentRowIconsMapping[normalizedType]) {
    return ContentRowIconsMapping[normalizedType];
  }

  // Return default if no match found
  return ContentRowIconsMapping.default;
};
