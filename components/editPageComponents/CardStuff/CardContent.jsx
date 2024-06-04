// components/CardStuff/CardContent.js
import React from 'react';
import UrlComponent from './CardTypes/UrlComponent';
import TextComponent from './CardTypes/TextComponent';
import SectionHeading from './CardTypes/SectionHeading';
import useMobileViewport from '@/lib/helpers/useMobileViewport';
import MediaComponent from './CardTypes/ImageComponent';
import NestedCard from './CardTypes/NestedCard';
import FormCard from './CardTypes/RightPanelCards/FormCard';
import ShoppableCard from './CardTypes/RightPanelCards/ShoppableCard';
import CalendarCard from '@/components/editPageComponents/CardStuff/CardTypes/RightPanelCards/CalendarCard';
import MapCard from '@/components/editPageComponents/CardStuff/CardTypes/RightPanelCards/MapCard';
import YouTubeComponent from '@/components/editPageComponents/CardStuff/CardTypes/RightPanelCards/YouTubeComponent';
import DriveComponent from './CardTypes/RightPanelCards/DriveComponent';
import CounterCard from './CardTypes/RightPanelCards/CounterCard';
import CountdownTimerCard from './CardTypes/RightPanelCards/CountdownTimerCard';
import CarouselCard from './CardTypes/RightPanelCards/CarouselCard';
import TestimonialsCard from './CardTypes/RightPanelCards/TestimonialsCard';
import BannerCard from './CardTypes/RightPanelCards/BannerCard';
import MarqueeCard from './CardTypes/RightPanelCards/MarqueeCard';
import InstagramReelCard from './CardTypes/RightPanelCards/InstagramReelCard';

// Helper function to determine if a URL is an embed

export default function CardContent({
  card,
  isEditing,
  tenant,
  username,
  tenantTheme,
  isTenantHovered,
  parentId,
  items,
  mobileItems,
  themeData,
}) {
  const cardId = card?.i;
  const type = card?.type;
  const size = card?.sizeKey;
  const isMobile = useMobileViewport();

  switch (type) {
    case 'url':
      return (
        <UrlComponent
          itemId={cardId}
          size={size}
          card={card}
          isEditing={isEditing}
          isMobile={isMobile}
          isTenant={tenant}
          username={username}
          themeData={themeData ? themeData : tenantTheme}
        />
      );

    case 'image/video':
      return (
        <div>
          <h3 className="font-semibold">IMAGE/VIDEO</h3>
          <img
            src={card?.src}
            alt=""
            style={{ maxWidth: '100%', maxHeight: '100%' }}
          />
        </div>
      );

    case 'section title':
      return (
        <SectionHeading
          itemId={card.i}
          card={card}
          isEditing={isEditing}
          isMobile={isMobile}
          isTenant={tenant}
          themeData={themeData ? themeData : tenantTheme}
        />
      );
    case 'text':
      return (
        <TextComponent
          itemId={cardId}
          card={card}
          themeData={themeData ? themeData : tenantTheme}
          isEditing={isEditing}
          isMobile={isMobile}
          isTenant={tenant}
        />
      );
    case 'image':
      <MediaComponent
        itemId={cardId}
        card={card}
        isEditing={isEditing}
        isMobile={isMobile}
        isTenant={tenant}
        username={username}
        themeData={themeData ? themeData : tenantTheme}
      />;

    case 'video':
      return (
        <MediaComponent
          itemId={cardId}
          card={card}
          isEditing={isEditing}
          isMobile={isMobile}
          isTenant={tenant}
          username={username}
          themeData={themeData ? themeData : tenantTheme}
        />
      );
    case 'nestedCard':
      return (
        <NestedCard
          itemId={card.i}
          card={card}
          isEditing={isEditing}
          isMobile={isMobile}
          isTenantHovered={isTenantHovered}
          tenant={tenant}
          username={username}
          parentId={parentId}
          themeData={themeData ? themeData : tenantTheme}
        />
      );
    case 'formCard':
      return (
        <FormCard
          itemId={card.i}
          card={card}
          isEditing={isEditing}
          isMobile={isMobile}
          isTenantHovered={isTenantHovered}
          tenant={tenant}
          username={username}
          themeData={themeData ? themeData : tenantTheme}
        />
      );
    case 'shopCard':
      return (
        <ShoppableCard
          itemId={card.i}
          card={card}
          isEditing={isEditing}
          isMobile={isMobile}
          isTenantHovered={isTenantHovered}
          tenant={tenant}
          username={username}
          themeData={themeData ? themeData : tenantTheme}
        />
      );
    case 'calendarCard':
      return (
        <CalendarCard
          itemId={card.i}
          card={card}
          isEditing={isEditing}
          isMobile={isMobile}
          isTenantHovered={isTenantHovered}
          tenant={tenant}
          username={username}
          themeData={themeData ? themeData : tenantTheme}
        />
      );
    case 'youtubeCard':
      return (
        <YouTubeComponent
          itemId={card.i}
          card={card}
          isEditing={isEditing}
          isMobile={isMobile}
          isTenant={tenant}
          username={username}
          themeData={themeData ? themeData : tenantTheme}
        />
      );
    case 'driveCard':
      return (
        <DriveComponent
          itemId={card.i}
          card={card}
          isEditing={isEditing}
          isMobile={isMobile}
          isTenant={tenant}
          isTenantHovered={isTenantHovered}
          username={username}
          themeData={themeData ? themeData : tenantTheme}
        />
      );
    case 'mapCard':
      return (
        <MapCard
          itemId={card.i}
          card={card}
          isEditing={isEditing}
          isMobile={isMobile}
          tenant={tenant}
          isTenantHovered={isTenantHovered}
          username={username}
          themeData={themeData ? themeData : tenantTheme}
        />
      );
    case 'counterCard':
      return (
        <CounterCard
          itemId={card.i}
          card={card}
          isEditing={isEditing}
          isMobile={isMobile}
          isTenant={tenant}
          username={username}
          themeData={themeData ? themeData : tenantTheme}
        />
      );
    case 'countdownTimerCard':
      return (
        <CountdownTimerCard
          itemId={card.i}
          card={card}
          sizeKey={size}
          isEditing={isEditing}
          isMobile={isMobile}
          isTenant={tenant}
          username={username}
          themeData={themeData ? themeData : tenantTheme}
        />
      );
    case 'carouselCard':
      return (
        <CarouselCard
          card={card}
          itemId={card.i}
          parentId={parentId}
          isEditing={isEditing}
          isTenant={tenant}
          isMobile={isMobile}
          themeData={themeData || tenantTheme}
          onSelect={null}
          setIsIsolate={() => {}}
          setIsEditing={() => {}}
          enableDrag={false}
          setEnableDrag={() => {}}
          isPhone={false}
          allowEdit={false}
          isTenantHovered={isTenantHovered}
          items={items}
          mobileItems={mobileItems}
        />
      );
    case 'testimonials':
      return (
        <TestimonialsCard
          itemId={card.i}
          card={card}
          isEditing={isEditing}
          sizeKey={size}
          isTenant={tenant}
          isMobile={isMobile}
          parentId={parentId}
          themeData={themeData ? themeData : tenantTheme}
        />
      );
    case 'bannerCard':
      return (
        <BannerCard
          itemId={cardId}
          card={card}
          isEditing={isEditing}
          isMobile={isMobile}
          isTenant={tenant}
          username={username}
          themeData={themeData ? themeData : tenantTheme}
        />
      );
    case 'instagramReelCard':
      return (
        <InstagramReelCard
          itemId={cardId}
          card={card}
          isEditing={isEditing}
          isMobile={isMobile}
          isTenant={tenant}
          username={username}
          themeData={themeData ? themeData : tenantTheme}
        />
      );
    case 'urlCard':
      return (
        <UrlCard
          itemId={cardId}
          card={card}
          isEditing={isEditing}
          isMobile={isMobile}
          isTenant={tenant}
          username={username}
          themeData={themeData ? themeData : tenantTheme}
        />
      );
    case 'youtubeCard':
      return (
        <YoutubeCard
          itemId={cardId}
          card={card}
          isEditing={isEditing}
          isMobile={isMobile}
          isTenant={tenant}
          username={username}
          themeData={themeData ? themeData : tenantTheme}
        />
      );
    case 'shopCard':
      return (
        <ShopCard
          itemId={cardId}
          card={card}
          isEditing={isEditing}
          isMobile={isMobile}
          isTenant={tenant}
          username={username}
          themeData={themeData ? themeData : tenantTheme}
        />
      );
    case 'marquee':
      return (
        <MarqueeCard
          card={card}
          itemId={card.i}
          parentId={parentId}
          isEditing={isEditing}
          isTenant={tenant}
          username={username}
          isMobile={isMobile}
          themeData={themeData ? themeData : tenantTheme}
          onSelect={null}
          setIsIsolate={() => {}}
          setIsEditing={() => {}}
          enableDrag={false}
          setEnableDrag={() => {}}
          isPhone={false}
          allowEdit={false}
          isTenantHovered={isTenantHovered}
          items={items}
          mobileItems={mobileItems}
        />
      );
    default:
      return <p>{card.title}</p>;
  }
}
