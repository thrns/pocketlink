import React, { useState } from 'react';
import { safeWindowOpen } from '@/utils/urlUtils';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaReddit,
  FaGithub,
  FaFacebook,
  FaLinkedin,
  FaPinterest,
  FaSnapchat,
  FaTiktok,
  FaWhatsapp,
  FaTelegram,
  FaSpotify,
  FaMedium,
  FaTwitch,
  FaDiscord,
  FaStackOverflow,
  FaVimeo,
  FaDribbble,
  FaBehance,
  FaFlickr,
  FaSoundcloud,
  FaQuora,
  FaTumblr,
  FaWeixin,
  FaSlack,
  FaMeetup,
  FaBlogger,
  FaGitlab,
  FaBitbucket,
  FaHackerNews,
} from 'react-icons/fa';
import {
  ExternalLink,
  ArrowUpRight,
  Sparkles,
  Zap,
  Heart,
  Star,
  Play,
  Headphones,
  MessageCircle,
  Users,
  Code,
  Camera,
  Gamepad2,
  Radio,
  Feather,
  Hash,
  Send,
} from 'lucide-react';
import { FaXTwitter } from 'react-icons/fa6';
import { SiBento } from 'react-icons/si';

const UrlMaker = ({ links, variant = 'default', style = 'elegant' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const getDomainName = (url) => {
    if (!url || typeof url !== 'string') return 'unknown';

    try {
      const parsedUrl = new URL(url);
      const hostname = parsedUrl.hostname.replace('www.', '');
      const pathname = parsedUrl.pathname;

      // Special case for Spotify URLs
      if (hostname.includes('spotify.com')) {
        if (pathname.includes('/user/')) return 'spotify-user';
        if (pathname.includes('/track/')) return 'spotify-track';
        if (pathname.includes('/album/')) return 'spotify-album';
        if (pathname.includes('/playlist/')) return 'spotify-playlist';
        if (pathname.includes('/artist/')) return 'spotify-artist';
        return 'spotify';
      }

      // YouTube URL patterns
      if (hostname.includes('youtube.com') || hostname.includes('youtu.be')) {
        if (
          pathname.includes('/channel/') ||
          pathname.includes('/c/') ||
          pathname.includes('/@')
        )
          return 'youtube-channel';
        if (pathname.includes('/playlist')) return 'youtube-playlist';
        if (pathname === '/' && parsedUrl.searchParams.has('v'))
          return 'youtube-video';
        if (hostname.includes('youtu.be')) return 'youtube-video';
        return 'youtube';
      }

      // Instagram URL patterns
      if (hostname.includes('instagram.com')) {
        if (pathname.includes('/reel/') || pathname.includes('/reels/'))
          return 'instagram-reel';
        if (pathname.includes('/p/')) return 'instagram-post';
        if (pathname.includes('/stories/')) return 'instagram-story';
        if (pathname.length > 1 && !pathname.includes('/p/'))
          return 'instagram-profile';
        return 'instagram';
      }

      // Twitter/X URL patterns
      if (hostname.includes('twitter.com') || hostname.includes('x.com')) {
        if (pathname.includes('/status/')) return 'twitter-tweet';
        if (pathname.includes('/lists/')) return 'twitter-list';
        if (pathname.length > 1 && !pathname.includes('/status/'))
          return 'twitter-profile';
        return hostname.includes('x.com') ? 'x' : 'twitter';
      }

      // TikTok URL patterns
      if (hostname.includes('tiktok.com')) {
        if (pathname.includes('/video/')) return 'tiktok-video';
        if (pathname.length > 1 && !pathname.includes('/video/'))
          return 'tiktok-profile';
        return 'tiktok';
      }

      // Facebook URL patterns
      if (hostname.includes('facebook.com')) {
        if (pathname.includes('/posts/') || pathname.includes('/permalink/'))
          return 'facebook-post';
        if (pathname.includes('/groups/')) return 'facebook-group';
        if (pathname.includes('/events/')) return 'facebook-event';
        if (
          pathname.includes('/pages/') ||
          (pathname.length > 1 && !pathname.includes('/posts/'))
        )
          return 'facebook-page';
        return 'facebook';
      }

      // LinkedIn URL patterns
      if (hostname.includes('linkedin.com')) {
        if (pathname.includes('/company/')) return 'linkedin-company';
        if (pathname.includes('/posts/')) return 'linkedin-post';
        if (pathname.includes('/in/')) return 'linkedin-profile';
        return 'linkedin';
      }

      // Reddit URL patterns
      if (hostname.includes('reddit.com')) {
        if (pathname.includes('/r/')) return 'reddit-subreddit';
        if (pathname.includes('/u/') || pathname.includes('/user/'))
          return 'reddit-user';
        if (pathname.includes('/comments/')) return 'reddit-post';
        return 'reddit';
      }

      // Standard domain name extraction for other platforms
      return hostname.split('.')[0];
    } catch (e) {
      return null;
    }
  };

  const urlActions = {
    x: {
      action: 'Follow',
      icon: <FaXTwitter className="h-2.5 w-2.5" />,
      alternateIcon: <Feather className="h-2.5 w-2.5" />,
      emoji: '🐦',
      color: '#000000',
      gradient: 'from-black to-gray-800',
      particle: '✨',
    },
    twitter: {
      action: 'Follow',
      icon: <FaTwitter className="h-2.5 w-2.5" />,
      alternateIcon: <MessageCircle className="h-2.5 w-2.5" />,
      emoji: '🐦',
      color: '#1DA1F2',
      gradient: 'from-blue-400 to-blue-600',
      particle: '💙',
    },
    instagram: {
      action: 'Follow',
      icon: <FaInstagram className="h-2.5 w-2.5" />,
      alternateIcon: <Camera className="h-2.5 w-2.5" />,
      emoji: '📸',
      color: '#E1306C',
      gradient: 'from-pink-600 to-purple-700',
      particle: '💖',
    },
    youtube: {
      action: 'Watch',
      icon: <FaYoutube className="h-2.5 w-2.5" />,
      alternateIcon: <Play className="h-2.5 w-2.5" />,
      emoji: '▶️',
      color: '#FF0000',
      gradient: 'from-red-500 to-red-700',
      particle: '🎬',
    },
    github: {
      action: 'Star',
      icon: <FaGithub className="h-2.5 w-2.5" />,
      alternateIcon: <Code className="h-2.5 w-2.5" />,
      emoji: '💻',
      color: '#333333',
      gradient: 'from-gray-700 to-gray-900',
      particle: '⭐',
    },
    spotify: {
      action: 'Listen',
      icon: <FaSpotify className="h-2.5 w-2.5" />,
      alternateIcon: <Headphones className="h-2.5 w-2.5" />,
      emoji: '🎵',
      color: '#1DB954',
      gradient: 'from-green-500 to-green-700',
      particle: '🎶',
    },
    'spotify-user': {
      action: 'Follow',
      icon: <FaSpotify className="h-2.5 w-2.5" />,
      alternateIcon: <Users className="h-2.5 w-2.5" />,
      emoji: '👤',
      color: '#1DB954',
      gradient: 'from-green-500 to-green-700',
      particle: '🎵',
    },
    'spotify-track': {
      action: 'Play',
      icon: <FaSpotify className="h-2.5 w-2.5" />,
      alternateIcon: <Play className="h-2.5 w-2.5" />,
      emoji: '🎧',
      color: '#1DB954',
      gradient: 'from-green-500 to-green-700',
      particle: '🎶',
    },
    'spotify-album': {
      action: 'Listen',
      icon: <FaSpotify className="h-2.5 w-2.5" />,
      alternateIcon: <Headphones className="h-2.5 w-2.5" />,
      emoji: '💿',
      color: '#1DB954',
      gradient: 'from-green-500 to-green-700',
      particle: '🎶',
    },
    'spotify-playlist': {
      action: 'Play',
      icon: <FaSpotify className="h-2.5 w-2.5" />,
      alternateIcon: <Play className="h-2.5 w-2.5" />,
      emoji: '📀',
      color: '#1DB954',
      gradient: 'from-green-500 to-green-700',
      particle: '🎶',
    },
    'spotify-artist': {
      action: 'Follow',
      icon: <FaSpotify className="h-2.5 w-2.5" />,
      alternateIcon: <Users className="h-2.5 w-2.5" />,
      emoji: '🎤',
      color: '#1DB954',
      gradient: 'from-green-500 to-green-700',
      particle: '🎵',
    },
    twitch: {
      action: 'Follow',
      icon: <FaTwitch className="h-2.5 w-2.5" />,
      alternateIcon: <Gamepad2 className="h-2.5 w-2.5" />,
      emoji: '🎮',
      color: '#9146FF',
      gradient: 'from-purple-600 to-purple-800',
      particle: '🎯',
    },
    discord: {
      action: 'Join',
      icon: <FaDiscord className="h-2.5 w-2.5" />,
      alternateIcon: <Users className="h-2.5 w-2.5" />,
      emoji: '💬',
      color: '#5865F2',
      gradient: 'from-indigo-500 to-indigo-700',
      particle: '🎉',
    },
    linkedin: {
      action: 'Connect',
      icon: <FaLinkedin className="h-2.5 w-2.5" />,
      alternateIcon: <Users className="h-2.5 w-2.5" />,
      emoji: '💼',
      color: '#0A66C2',
      gradient: 'from-blue-600 to-blue-800',
      particle: '🔗',
    },
    pinterest: {
      action: 'Follow',
      icon: <FaPinterest className="h-2.5 w-2.5" />,
      alternateIcon: <Camera className="h-2.5 w-2.5" />,
      emoji: '📌',
      color: '#E60023',
      gradient: 'from-red-600 to-red-700',
      particle: '💡',
    },
    snapchat: {
      action: 'Add',
      icon: <FaSnapchat className="h-2.5 w-2.5" />,
      alternateIcon: <Camera className="h-2.5 w-2.5" />,
      emoji: '👻',
      color: '#FFFC00',
      gradient: 'from-yellow-300 to-yellow-400',
      particle: '📸',
    },
    tiktok: {
      action: 'Watch',
      icon: <FaTiktok className="h-2.5 w-2.5" />,
      alternateIcon: <Play className="h-2.5 w-2.5" />,
      emoji: '🎵',
      color: '#000000',
      gradient: 'from-black via-gray-800 to-black',
      particle: '🎬',
    },
    whatsapp: {
      action: 'Message',
      icon: <FaWhatsapp className="h-2.5 w-2.5" />,
      alternateIcon: <MessageCircle className="h-2.5 w-2.5" />,
      emoji: '💬',
      color: '#25D366',
      gradient: 'from-green-500 to-green-600',
      particle: '📱',
    },
    telegram: {
      action: 'Join',
      icon: <FaTelegram className="h-2.5 w-2.5" />,
      alternateIcon: <Send className="h-2.5 w-2.5" />,
      emoji: '✈️',
      color: '#0088cc',
      gradient: 'from-blue-500 to-blue-600',
      particle: '📨',
    },
    medium: {
      action: 'Read',
      icon: <FaMedium className="h-2.5 w-2.5" />,
      alternateIcon: <Feather className="h-2.5 w-2.5" />,
      emoji: '📝',
      color: '#000000',
      gradient: 'from-gray-800 to-black',
      particle: '📚',
    },
    reddit: {
      action: 'Join',
      icon: <FaReddit className="h-2.5 w-2.5" />,
      alternateIcon: <MessageCircle className="h-2.5 w-2.5" />,
      emoji: '🤖',
      color: '#FF4500',
      gradient: 'from-orange-600 to-orange-700',
      particle: '⬆️',
    },
    facebook: {
      action: 'Follow',
      icon: <FaFacebook className="h-2.5 w-2.5" />,
      alternateIcon: <Users className="h-2.5 w-2.5" />,
      emoji: '👍',
      color: '#1877F2',
      gradient: 'from-blue-600 to-blue-700',
      particle: '💙',
    },
    vimeo: {
      action: 'Watch',
      icon: <FaVimeo className="h-2.5 w-2.5" />,
      alternateIcon: <Play className="h-2.5 w-2.5" />,
      emoji: '🎥',
      color: '#1AB7EA',
      gradient: 'from-blue-400 to-blue-500',
      particle: '🎬',
    },
    dribbble: {
      action: 'Follow',
      icon: <FaDribbble className="h-2.5 w-2.5" />,
      alternateIcon: <Camera className="h-2.5 w-2.5" />,
      emoji: '🏀',
      color: '#EA4C89',
      gradient: 'from-pink-500 to-pink-600',
      particle: '🎨',
    },
    behance: {
      action: 'Follow',
      icon: <FaBehance className="h-2.5 w-2.5" />,
      alternateIcon: <Star className="h-2.5 w-2.5" />,
      emoji: '🎨',
      color: '#1769FF',
      gradient: 'from-blue-600 to-blue-700',
      particle: '✨',
    },
    soundcloud: {
      action: 'Listen',
      icon: <FaSoundcloud className="h-2.5 w-2.5" />,
      alternateIcon: <Headphones className="h-2.5 w-2.5" />,
      emoji: '🎵',
      color: '#FF3300',
      gradient: 'from-orange-500 to-orange-600',
      particle: '🎧',
    },
    quora: {
      action: 'Follow',
      icon: <FaQuora className="h-2.5 w-2.5" />,
      alternateIcon: <MessageCircle className="h-2.5 w-2.5" />,
      emoji: '❓',
      color: '#B92B27',
      gradient: 'from-red-700 to-red-800',
      particle: '💭',
    },
    tumblr: {
      action: 'Follow',
      icon: <FaTumblr className="h-2.5 w-2.5" />,
      alternateIcon: <Feather className="h-2.5 w-2.5" />,
      emoji: '📝',
      color: '#36465D',
      gradient: 'from-blue-900 to-gray-800',
      particle: '📚',
    },
    weixin: {
      action: 'Follow',
      icon: <FaWeixin className="h-2.5 w-2.5" />,
      alternateIcon: <MessageCircle className="h-2.5 w-2.5" />,
      emoji: '💬',
      color: '#07C160',
      gradient: 'from-green-500 to-green-600',
      particle: '📱',
    },
    slack: {
      action: 'Join',
      icon: <FaSlack className="h-2.5 w-2.5" />,
      alternateIcon: <MessageCircle className="h-2.5 w-2.5" />,
      emoji: '💬',
      color: '#4A154B',
      gradient: 'from-purple-800 to-purple-900',
      particle: '🔗',
    },
    gitlab: {
      action: 'Follow',
      icon: <FaGitlab className="h-3 w-3" />,
      alternateIcon: <Code className="h-3 w-3" />,
      emoji: '🦊',
      color: '#FC6D26',
      gradient: 'from-orange-600 to-orange-800',
      particle: '⭐',
    },
    bitbucket: {
      action: 'Follow',
      icon: <FaBitbucket className="h-3 w-3" />,
      alternateIcon: <Code className="h-3 w-3" />,
      emoji: '💻',
      color: '#0052CC',
      gradient: 'from-blue-600 to-blue-700',
      particle: '⭐',
    },
    hackernews: {
      action: 'View',
      icon: <FaHackerNews className="h-3 w-3" />,
      alternateIcon: <Zap className="h-3 w-3" />,
      emoji: '📰',
      color: '#FF6600',
      gradient: 'from-orange-500 to-orange-600',
      particle: '💡',
    },
    bento: {
      action: 'View',
      icon: <SiBento className="h-3 w-3" />,
      alternateIcon: <Sparkles className="h-3 w-3" />,
      emoji: '🍱',
      color: '#4C0BFE',
      gradient: 'from-purple-700 to-purple-900',
      particle: '✨',
    },
    meetup: {
      action: 'Join',
      icon: <FaMeetup className="h-3 w-3" />,
      alternateIcon: <Users className="h-3 w-3" />,
      emoji: '👥',
      color: '#ED1C40',
      gradient: 'from-red-600 to-red-700',
      particle: '📅',
    },
    blogger: {
      action: 'Read',
      icon: <FaBlogger className="h-2.5 w-2.5" />,
      alternateIcon: <Feather className="h-2.5 w-2.5" />,
      emoji: '✍️',
      color: '#FF5722',
      gradient: 'from-orange-500 to-orange-600',
      particle: '📝',
    },
    flickr: {
      action: 'View',
      icon: <FaFlickr className="h-2.5 w-2.5" />,
      alternateIcon: <Camera className="h-2.5 w-2.5" />,
      emoji: '📷',
      color: '#0063DC',
      gradient: 'from-blue-700 to-indigo-800',
      particle: '🖼️',
    },
    stack: {
      action: 'View',
      icon: <FaStackOverflow className="h-2.5 w-2.5" />,
      alternateIcon: <Code className="h-2.5 w-2.5" />,
      emoji: '🧩',
      color: '#F48024',
      gradient: 'from-orange-500 to-orange-600',
      particle: '❓',
    },
    stackoverflow: {
      action: 'View',
      icon: <FaStackOverflow className="h-2.5 w-2.5" />,
      alternateIcon: <Code className="h-2.5 w-2.5" />,
      emoji: '🧩',
      color: '#F48024',
      gradient: 'from-orange-500 to-orange-600',
      particle: '❓',
    },
    patreon: {
      action: 'Support',
      icon: <ExternalLink className="h-2.5 w-2.5" />,
      alternateIcon: <Heart className="h-2.5 w-2.5" />,
      emoji: '❤️',
      color: '#FF424D',
      gradient: 'from-red-500 to-red-600',
      particle: '💖',
    },
    etsy: {
      action: 'Shop',
      icon: <ExternalLink className="h-2.5 w-2.5" />,
      alternateIcon: <Star className="h-2.5 w-2.5" />,
      emoji: '🛍️',
      color: '#F45800',
      gradient: 'from-orange-600 to-orange-700',
      particle: '🎁',
    },
    opensea: {
      action: 'View',
      icon: <ExternalLink className="h-2.5 w-2.5" />,
      alternateIcon: <Sparkles className="h-2.5 w-2.5" />,
      emoji: '🌊',
      color: '#2081E2',
      gradient: 'from-blue-500 to-blue-600',
      particle: '🖼️',
    },
    substack: {
      action: 'Subscribe',
      icon: <ExternalLink className="h-2.5 w-2.5" />,
      alternateIcon: <Feather className="h-2.5 w-2.5" />,
      emoji: '📬',
      color: '#FF6719',
      gradient: 'from-orange-500 to-orange-600',
      particle: '📖',
    },
    figma: {
      action: 'View',
      icon: <ExternalLink className="h-2.5 w-2.5" />,
      alternateIcon: <Sparkles className="h-2.5 w-2.5" />,
      emoji: '🎨',
      color: '#0ACF83',
      gradient: 'from-green-600 to-green-800',
      particle: '✨',
    },
    notion: {
      action: 'View',
      icon: <ExternalLink className="h-2.5 w-2.5" />,
      alternateIcon: <Feather className="h-2.5 w-2.5" />,
      emoji: '📝',
      color: '#000000',
      gradient: 'from-gray-800 to-black',
      particle: '📄',
    },
    threads: {
      action: 'Follow',
      icon: <ExternalLink className="h-2.5 w-2.5" />,
      alternateIcon: <MessageCircle className="h-2.5 w-2.5" />,
      emoji: '🧵',
      color: '#000000',
      gradient: 'from-gray-800 to-black',
      particle: '💬',
    },
    mastodon: {
      action: 'Follow',
      icon: <ExternalLink className="h-2.5 w-2.5" />,
      alternateIcon: <MessageCircle className="h-2.5 w-2.5" />,
      emoji: '🐘',
      color: '#6364FF',
      gradient: 'from-indigo-500 to-indigo-600',
      particle: '📣',
    },
    bluesky: {
      action: 'Follow',
      icon: <ExternalLink className="h-2.5 w-2.5" />,
      alternateIcon: <Feather className="h-2.5 w-2.5" />,
      emoji: '☁️',
      color: '#0085FF',
      gradient: 'from-blue-400 to-blue-500',
      particle: '✨',
    },
    linktree: {
      action: 'View',
      icon: <ExternalLink className="h-2.5 w-2.5" />,
      alternateIcon: <ExternalLink className="h-2.5 w-2.5" />,
      emoji: '🌳',
      color: '#43E660',
      gradient: 'from-green-400 to-green-500',
      particle: '🔗',
    },
    buymeacoffee: {
      action: 'Support',
      icon: <ExternalLink className="h-2.5 w-2.5" />,
      alternateIcon: <Heart className="h-2.5 w-2.5" />,
      emoji: '☕',
      color: '#FFDD00',
      gradient: 'from-yellow-400 to-yellow-500',
      particle: '❤️',
    },
    kofi: {
      action: 'Support',
      icon: <ExternalLink className="h-2.5 w-2.5" />,
      alternateIcon: <Heart className="h-2.5 w-2.5" />,
      emoji: '☕',
      color: '#00B9FE',
      gradient: 'from-blue-400 to-blue-500',
      particle: '💙',
    },
    beacons: {
      action: 'View',
      icon: <ExternalLink className="h-2.5 w-2.5" />,
      alternateIcon: <Sparkles className="h-2.5 w-2.5" />,
      emoji: '🔗',
      color: '#000000',
      gradient: 'from-gray-800 to-black',
      particle: '✨',
    },
    carrd: {
      action: 'View',
      icon: <ExternalLink className="h-2.5 w-2.5" />,
      alternateIcon: <ExternalLink className="h-2.5 w-2.5" />,
      emoji: '🌐',
      color: '#1C1C1C',
      gradient: 'from-gray-800 to-black',
      particle: '✨',
    },
    gumroad: {
      action: 'Buy',
      icon: <ExternalLink className="h-2.5 w-2.5" />,
      alternateIcon: <Star className="h-2.5 w-2.5" />,
      emoji: '🛒',
      color: '#FF90E8',
      gradient: 'from-pink-400 to-pink-500',
      particle: '💰',
    },
    lemon: {
      action: 'Support',
      icon: <ExternalLink className="h-2.5 w-2.5" />,
      alternateIcon: <Heart className="h-2.5 w-2.5" />,
      emoji: '🍋',
      color: '#FEF74A',
      gradient: 'from-yellow-300 to-yellow-400',
      particle: '💛',
    },
    fiber: {
      action: 'View',
      icon: <ExternalLink className="h-2.5 w-2.5" />,
      alternateIcon: <Radio className="h-2.5 w-2.5" />,
      emoji: '📡',
      color: '#00D95A',
      gradient: 'from-green-500 to-green-600',
      particle: '⚡',
    },
    'youtube-video': {
      action: 'Watch',
      icon: <FaYoutube className="h-2.5 w-2.5" />,
      alternateIcon: <Play className="h-2.5 w-2.5" />,
      emoji: '▶️',
      color: '#FF0000',
      gradient: 'from-red-500 to-red-700',
      particle: '📺',
    },
    'youtube-channel': {
      action: 'Subscribe',
      icon: <FaYoutube className="h-2.5 w-2.5" />,
      alternateIcon: <Users className="h-2.5 w-2.5" />,
      emoji: '📹',
      color: '#FF0000',
      gradient: 'from-red-500 to-red-700',
      particle: '🔔',
    },
    'youtube-playlist': {
      action: 'Play All',
      icon: <FaYoutube className="h-2.5 w-2.5" />,
      alternateIcon: <Play className="h-2.5 w-2.5" />,
      emoji: '🎞️',
      color: '#FF0000',
      gradient: 'from-red-500 to-red-700',
      particle: '🎬',
    },
    'instagram-profile': {
      action: 'Follow',
      icon: <FaInstagram className="h-2.5 w-2.5" />,
      alternateIcon: <Users className="h-2.5 w-2.5" />,
      emoji: '👤',
      color: '#E1306C',
      gradient: 'from-pink-600 to-purple-700',
      particle: '💖',
    },
    'instagram-post': {
      action: 'View',
      icon: <FaInstagram className="h-2.5 w-2.5" />,
      alternateIcon: <Camera className="h-2.5 w-2.5" />,
      emoji: '📷',
      color: '#E1306C',
      gradient: 'from-pink-600 to-purple-700',
      particle: '❤️',
    },
    'instagram-reel': {
      action: 'Watch',
      icon: <FaInstagram className="h-2.5 w-2.5" />,
      alternateIcon: <Play className="h-2.5 w-2.5" />,
      emoji: '🎬',
      color: '#E1306C',
      gradient: 'from-pink-600 to-purple-700',
      particle: '✨',
    },
    'instagram-story': {
      action: 'View',
      icon: <FaInstagram className="h-2.5 w-2.5" />,
      alternateIcon: <Camera className="h-2.5 w-2.5" />,
      emoji: '⭐',
      color: '#E1306C',
      gradient: 'from-pink-600 to-purple-700',
      particle: '📱',
    },
    'twitter-profile': {
      action: 'Follow',
      icon: <FaTwitter className="h-2.5 w-2.5" />,
      alternateIcon: <Users className="h-2.5 w-2.5" />,
      emoji: '👤',
      color: '#1DA1F2',
      gradient: 'from-blue-400 to-blue-600',
      particle: '🐦',
    },
    'twitter-tweet': {
      action: 'View',
      icon: <FaTwitter className="h-2.5 w-2.5" />,
      alternateIcon: <MessageCircle className="h-2.5 w-2.5" />,
      emoji: '💬',
      color: '#1DA1F2',
      gradient: 'from-blue-400 to-blue-600',
      particle: '🔁',
    },
    'twitter-list': {
      action: 'View',
      icon: <FaTwitter className="h-2.5 w-2.5" />,
      alternateIcon: <Users className="h-2.5 w-2.5" />,
      emoji: '📋',
      color: '#1DA1F2',
      gradient: 'from-blue-400 to-blue-600',
      particle: '👥',
    },
    x: {
      action: 'View',
      icon: <FaXTwitter className="h-2.5 w-2.5" />,
      alternateIcon: <Feather className="h-2.5 w-2.5" />,
      emoji: '🐦',
      color: '#000000',
      gradient: 'from-black to-gray-800',
      particle: '✨',
    },
    'tiktok-video': {
      action: 'Watch',
      icon: <FaTiktok className="h-2.5 w-2.5" />,
      alternateIcon: <Play className="h-2.5 w-2.5" />,
      emoji: '📱',
      color: '#000000',
      gradient: 'from-black via-gray-800 to-black',
      particle: '🎵',
    },
    'tiktok-profile': {
      action: 'Follow',
      icon: <FaTiktok className="h-2.5 w-2.5" />,
      alternateIcon: <Users className="h-2.5 w-2.5" />,
      emoji: '👤',
      color: '#000000',
      gradient: 'from-black via-gray-800 to-black',
      particle: '✨',
    },
    'facebook-page': {
      action: 'Follow',
      icon: <FaFacebook className="h-2.5 w-2.5" />,
      alternateIcon: <Users className="h-2.5 w-2.5" />,
      emoji: '📃',
      color: '#1877F2',
      gradient: 'from-blue-600 to-blue-700',
      particle: '👍',
    },
    'facebook-post': {
      action: 'View',
      icon: <FaFacebook className="h-2.5 w-2.5" />,
      alternateIcon: <MessageCircle className="h-2.5 w-2.5" />,
      emoji: '💬',
      color: '#1877F2',
      gradient: 'from-blue-600 to-blue-700',
      particle: '❤️',
    },
    'facebook-group': {
      action: 'Join',
      icon: <FaFacebook className="h-2.5 w-2.5" />,
      alternateIcon: <Users className="h-2.5 w-2.5" />,
      emoji: '👥',
      color: '#1877F2',
      gradient: 'from-blue-600 to-blue-700',
      particle: '🤝',
    },
    'facebook-event': {
      action: 'Attend',
      icon: <FaFacebook className="h-2.5 w-2.5" />,
      alternateIcon: <Users className="h-2.5 w-2.5" />,
      emoji: '📅',
      color: '#1877F2',
      gradient: 'from-blue-600 to-blue-700',
      particle: '🎉',
    },
    'linkedin-profile': {
      action: 'Connect',
      icon: <FaLinkedin className="h-2.5 w-2.5" />,
      alternateIcon: <Users className="h-2.5 w-2.5" />,
      emoji: '👤',
      color: '#0A66C2',
      gradient: 'from-blue-600 to-blue-800',
      particle: '🤝',
    },
    'linkedin-company': {
      action: 'Follow',
      icon: <FaLinkedin className="h-2.5 w-2.5" />,
      alternateIcon: <Users className="h-2.5 w-2.5" />,
      emoji: '🏢',
      color: '#0A66C2',
      gradient: 'from-blue-600 to-blue-800',
      particle: '📈',
    },
    'linkedin-post': {
      action: 'Read',
      icon: <FaLinkedin className="h-2.5 w-2.5" />,
      alternateIcon: <MessageCircle className="h-2.5 w-2.5" />,
      emoji: '📝',
      color: '#0A66C2',
      gradient: 'from-blue-600 to-blue-800',
      particle: '💡',
    },
    'reddit-subreddit': {
      action: 'Join',
      icon: <FaReddit className="h-2.5 w-2.5" />,
      alternateIcon: <Users className="h-2.5 w-2.5" />,
      emoji: '🧩',
      color: '#FF4500',
      gradient: 'from-orange-600 to-orange-700',
      particle: '📊',
    },
    'reddit-user': {
      action: 'Follow',
      icon: <FaReddit className="h-2.5 w-2.5" />,
      alternateIcon: <Users className="h-2.5 w-2.5" />,
      emoji: '👤',
      color: '#FF4500',
      gradient: 'from-orange-600 to-orange-700',
      particle: '⬆️',
    },
    'reddit-post': {
      action: 'View',
      icon: <FaReddit className="h-2.5 w-2.5" />,
      alternateIcon: <MessageCircle className="h-2.5 w-2.5" />,
      emoji: '💬',
      color: '#FF4500',
      gradient: 'from-orange-600 to-orange-700',
      particle: '🔝',
    },
  };

  const renderLink = () => {
    const domain = getDomainName(links);
    const platformConfig = domain ? urlActions[domain.toLowerCase()] : null;

    const defaultConfig = {
      action: 'Open',
      icon: '',
      alternateIcon: <Sparkles className="h-2.5 w-2.5" />,
      emoji: '🔗',
      color: '#374151',
      gradient: 'from-black to-black',
      particle: '✨',
    };

    const config = platformConfig || defaultConfig;

    const positions = {
      default: 'absolute left-3 bottom-3',
      floating: 'fixed bottom-4 right-4',
      centered: 'absolute bottom-3 left-1/2 transform -translate-x-1/2',
      topRight: 'absolute top-3 right-3',
      topLeft: 'absolute top-3 left-3',
    };

    // Creative style variants
    const styleVariants = {
      elegant: () => (
        <motion.div
          className={`relative overflow-hidden bg-gradient-to-r ${config.gradient} flex items-center gap-2 rounded-lg border border-white/10 px-3 py-1.5 text-white shadow-lg backdrop-blur-md transition-all duration-200 ease-out`}
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            initial={{ x: '-200%' }}
            animate={{ x: isHovered ? '200%' : '-200%' }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />
          {config.icon}
          <span className="text-xs font-medium tracking-wide">
            {config.action}
          </span>
          {config.icon === '' && <ArrowUpRight className="h-2.5 w-2.5" />}
        </motion.div>
      ),

      playful: () => (
        <motion.div
          className="relative flex items-center gap-2 rounded-full bg-white px-4 py-2 text-gray-900 shadow-lg"
          whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            animate={isHovered ? { rotate: [0, -10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.5 }}
          >
            {config.emoji}
          </motion.div>
          <span className="text-sm font-bold">{config.action}</span>
          {isHovered && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-8 left-1/2 -translate-x-1/2 transform"
            >
              {config.particle}
            </motion.div>
          )}
        </motion.div>
      ),

      minimal: () => (
        <motion.div
          className="relative flex items-center gap-1.5 rounded-md bg-white/10 px-2.5 py-1 text-white backdrop-blur-sm"
          whileHover={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
        >
          {config.icon}
          <span className="text-xs opacity-90">{config.action}</span>
        </motion.div>
      ),

      glassy: () => (
        <motion.div
          className="relative flex items-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-4 py-2 text-white backdrop-blur-lg"
          whileHover={{
            backgroundColor: 'rgba(255,255,255,0.1)',
            borderColor: 'rgba(255,255,255,0.3)',
          }}
        >
          <motion.div
            animate={isHovered ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            {config.icon}
          </motion.div>
          <span className="text-sm font-medium">{config.action}</span>
          <motion.div
            animate={{ x: isHovered ? 3 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <Send className="h-2.5 w-2.5" />
          </motion.div>
        </motion.div>
      ),

      neon: () => (
        <motion.div
          className={`relative flex items-center gap-2 rounded-lg bg-black px-3 py-1.5 text-white`}
          style={{
            boxShadow: isHovered ? `0 0 20px ${config.color}` : 'none',
            border: `1px solid ${config.color}`,
          }}
          whileHover={{ scale: 1.05 }}
        >
          <motion.div
            animate={
              isHovered
                ? {
                    rotate: [0, 360],
                    scale: [1, 1.2, 1],
                  }
                : {}
            }
            transition={{ duration: 0.5 }}
          >
            {config.alternateIcon}
          </motion.div>
          <span className="text-xs font-medium">{config.action}</span>
          {isHovered && (
            <motion.div
              className="absolute inset-0 rounded-lg"
              style={{ backgroundColor: `${config.color}20` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
          )}
        </motion.div>
      ),

      brutalist: () => (
        <motion.div
          className="relative flex items-center gap-2 border-4 border-black bg-white px-4 py-2 text-black"
          style={{
            boxShadow: isHovered ? '6px 6px 0px black' : '3px 3px 0px black',
          }}
          whileHover={{ x: -3, y: -3 }}
        >
          {config.icon}
          <span className="text-sm font-black uppercase">{config.action}</span>
          {config.icon === '' && <ArrowUpRight className="h-2.5 w-2.5" />}
        </motion.div>
      ),

      retro: () => (
        <motion.div
          className="relative flex items-center gap-2 rounded-none bg-gradient-to-br from-yellow-400 to-orange-500 px-4 py-2 font-mono text-black"
          style={{ boxShadow: '4px 4px 0px rgba(0,0,0,0.2)' }}
          whileHover={{ scale: 1.05 }}
        >
          <div className="rounded-sm bg-black p-1 text-yellow-400">
            {config.icon}
          </div>
          <span className="text-sm font-bold">
            {'>'} {config.action}
          </span>
          <motion.div
            animate={isHovered ? { rotate: 180 } : {}}
            transition={{ duration: 0.3 }}
          >
            <Hash className="h-2.5 w-2.5" />
          </motion.div>
        </motion.div>
      ),

      pill: () => (
        <motion.div
          className={`relative bg-gradient-to-r ${config.gradient} flex items-center gap-2 rounded-full px-4 py-1.5 text-white`}
          whileHover={{ scale: 1.05 }}
          animate={
            isHovered
              ? {
                  boxShadow: [
                    `0 0 0 0 ${config.color}40`,
                    `0 0 0 8px ${config.color}00`,
                  ],
                }
              : {}
          }
          transition={{ duration: 0.5 }}
        >
          {config.icon}
          <span className="text-xs font-medium">{config.action}</span>
          <motion.div
            animate={{ rotate: isHovered ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {config.icon === '' && <ArrowUpRight className="h-2.5 w-2.5" />}
          </motion.div>
        </motion.div>
      ),
    };

    return (
      <motion.div
        className={`${positions[variant]} z-50 cursor-pointer`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => {
          setIsClicked(true);
          setTimeout(() => setIsClicked(false), 200);
          safeWindowOpen(links);
        }}
      >
        {styleVariants[style] && styleVariants[style]()}

        {/* Click feedback */}
        {isClicked && (
          <motion.div
            className="absolute inset-0 rounded-full"
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ backgroundColor: config.color }}
          />
        )}
      </motion.div>
    );
  };

  return renderLink();
};

export default UrlMaker;
