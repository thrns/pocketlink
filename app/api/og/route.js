import { ImageResponse } from '@vercel/og';
import { createSupabaseClient } from '@/Clients/supabase/server';
import { shapePresets } from '@/constants/shapePresets';

// Helper function to determine what content to use for each item
// const getItemContent = (item) => {
//   if (item.type === "url") {
//     return {
//       content:
//         item.favicon ||
//         `https://www.google.com/s2/favicons?sz=64&domain_url=${item.url}` ||
//         item.displayImage ||
//         null,
//       previewType: item.previewType || "default", // Default to "default" if not specified
//     };
//   } else if (item.type === "image") {
//     return {
//       content: item.image || null,
//       previewType: item.previewType || "default",
//     };
//   } else if (
//     item.type === "text" ||
//     item.type === "section" ||
//     item.type === "section title"
//   ) {
//     return {
//       content: "skeleton", // Placeholder for text skeleton
//       previewType: "default",
//     };
//   } else {
//     return {
//       content: null,
//       previewType: "default",
//     };
//   }
// };

// // Get size ratio for items
// const getItemSize = (item) => {
//   const sizeKey = item.sizeKey || "square";
//   return shapePresets[sizeKey] || shapePresets.square;
// };

// // Convert item dimensions to style for a 12-column context
// const getFlexItemStyle = (size, y, x) => {
//   // Define consistent gap sizes
//   const horizontalGap = 2; // Gap between columns
//   const verticalGap = 10; // Gap between rows

//   // Column width calculation (accounting for gaps)
//   const columnWidth = (100 - horizontalGap * 11) / 12; // 11 gaps for 12 columns
//   const widthPercent = size.w * columnWidth + horizontalGap * (size.w - 1);

//   // Base height for a single row
//   const baseRowHeight = 30;
//   const height = size.h * baseRowHeight + verticalGap * (size.h - 1);

//   // Position calculation with gaps
//   const top = y * (baseRowHeight + verticalGap);

//   // Calculate left position with gaps
//   const leftPercent = x * (columnWidth + horizontalGap);

//   return {
//     width: `${widthPercent}%`,
//     height: `${height}px`,
//     position: "absolute",
//     top: `${top}px`,
//     left: `${leftPercent}%`,
//     flexGrow: 0,
//     flexShrink: 0,
//     boxSizing: "border-box",
//     borderRadius: "12px",
//     border: "1px solid #e5e7eb",
//     boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//     overflow: "hidden",
//     background: "#ffffff",
//     // Remove margin since we're handling spacing through positioning
//   };
// };

// // Get theme-based colors
// const getThemeColors = (theme) => {
//   const themeMode = theme?.mode || "bright";

//   const themes = {
//     bright: {
//       background: theme?.background || "#ffffff",
//       textColor: theme?.textColor || "#000000",
//       itemBackground: "#ffffff",
//       itemTextColor: "#000000",
//       itemBorderColor: "#e5e7eb",
//       skeletonColor: "#e0e0e0",
//     },
//     dark: {
//       background: theme?.background || "#121212",
//       textColor: theme?.textColor || "#ffffff",
//       itemBackground: "#2a2a2a",
//       itemTextColor: "#ffffff",
//       itemBorderColor: "#3a3a3a",
//       skeletonColor: "#444444",
//     },
//   };

//   return themes[themeMode] || themes.bright;
// };

// // Render skeleton for section/section title components or as a fallback
// const renderSkeleton = (width, height, themeColors) => (
//   <div
//     style={{
//       width: "100%",
//       height: "100%",
//       background: themeColors.skeletonColor,
//       borderRadius: "4px",
//     }}
//   />
// );

// // Render paragraph-type skeleton for type: text
// const renderParagraphSkeleton = (themeColors) => (
//   <div
//     style={{
//       width: "100%",
//       height: "100%",
//       display: "flex",
//       flexDirection: "column",
//       justifyContent: "center",
//       padding: "20px",
//       gap: "8px",
//     }}
//   >
//     <div
//       style={{
//         width: "90%",
//         height: "12px",
//         background: themeColors.skeletonColor,
//         borderRadius: "4px",
//       }}
//     />
//     <div
//       style={{
//         width: "70%",
//         height: "12px",
//         background: themeColors.skeletonColor,
//         borderRadius: "4px",
//       }}
//     />
//     <div
//       style={{
//         width: "80%",
//         height: "12px",
//         background: themeColors.skeletonColor,
//         borderRadius: "4px",
//       }}
//     />
//     <div
//       style={{
//         width: "60%",
//         height: "12px",
//         background: themeColors.skeletonColor,
//         borderRadius: "4px",
//       }}
//     />
//   </div>
// );

// // Group items by row (y coordinate) for placement
// const groupItemsByRow = (items) => {
//   const rows = {};
//   items.forEach((item) => {
//     const y = item.y || 0;
//     if (!rows[y]) rows[y] = [];
//     rows[y].push(item);
//   });
//   return rows;
// };

export const runtime = 'edge';

// Enhance cache control for OG images
export const fetchCache = 'force-cache';
export const revalidate = 600; // Cache for 10 mins

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');
    const uuid = searchParams.get('uuid');

    // Define standard cache headers for all responses
    const cacheHeaders = {
      'Cache-Control':
        'public, max-age=3600, s-maxage=86400, stale-while-revalidate=43200',
      'Content-Type': 'image/png',
      'CDN-Cache-Control': 'public, max-age=86400',
      'Vercel-CDN-Cache-Control': 'public, max-age=86400',
    };

    if (!username && !uuid) {
      return new Response('Username or UUID is required', {
        status: 400,
        headers: {
          'Cache-Control': 'public, max-age=60',
          'Content-Type': 'text/plain',
        },
      });
    }

    const supabase = await createSupabaseClient();

    // Determine which table to query based on the provided parameters
    const table = uuid ? 'claim_data' : 'items_data';
    const queryField = uuid ? 'uuid' : 'username';
    const queryValue = uuid || username;

    const { data, error } = await supabase
      .from(table)
      .select('profile, items, mobileItems, theme, ogPreviewType')
      .eq(queryField, queryValue)
      .single();

    if (error) {
      console.error(`Error fetching user data for OG image: ${error.message}`);

      // Return a generic OG image instead of an error
      const headers = new Headers(cacheHeaders);

      return new ImageResponse(
        (
          <div
            style={{
              display: 'flex',
              fontSize: 60,
              color: 'white',
              background: '#121212',
              width: '100%',
              height: '100%',
              textAlign: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <div style={{ fontSize: 40, opacity: 0.8 }}>Pocketlink</div>
              <div>{queryValue}</div>
            </div>
          </div>
        ),
        {
          width: 1200,
          height: 630,
          headers,
        }
      );
    }

    if (!data) {
      return new Response('User not found', { status: 404 });
    }

    const items = data.items || [];
    // Filter items similar to client-side code (exclude pseudo cards if no parentId)
    const displayedItems = items.filter((item) =>
      item.parentId
        ? item.parentId === null
        : !item.parentId &&
          item.type !== 'pseudoUrlCard' &&
          item.type !== 'pseudoImageCard'
    );

    // Sort items by y first, then x, and limit to 12 items
    const sortedItems = displayedItems
      .sort((a, b) => {
        if (a.y !== b.y) return a.y - b.y;
        return a.x - b.x;
      })
      .slice(0, 12);

    // If no items, return a skeleton layout
    if (sortedItems.length === 0) {
      return new ImageResponse(
        (
          <div
            style={{
              display: 'flex',
              width: '100%',
              height: '100%',
              padding: '20px',
              fontFamily: 'sans-serif',
              background: '#ffffff',
              flexWrap: 'wrap',
              gap: '10px',
            }}
          >
            {Array.from({ length: 8 }, (_, idx) => (
              <div
                key={idx}
                style={{
                  width: '48%',
                  height: '150px',
                  background: '#e0e0e0',
                  borderRadius: '12px',
                }}
              />
            ))}
          </div>
        ),
        {
          width: 1200,
          height: 630,
        }
      );
    }

    // const themeColors = getThemeColors(data.theme);

    // const isProfileLayout = data.ogPreviewType == "profile";

    // console.log("data: ", data);
    // console.log("isProfileLayout: ", isProfileLayout);

    // if (isProfileLayout) {
    //   // Profile layout (existing layout with avatar and cards)
    //   const responseHeaders = new Headers(cacheHeaders);

    //   return new ImageResponse(
    //     (
    //       <div
    //         style={{
    //           display: "flex",
    //           width: "100%",
    //           height: "100%",
    //           padding: "20px",
    //           fontFamily: "sans-serif",
    //           background: themeColors.background,
    //           color: themeColors.textColor,
    //           position: "relative",
    //         }}
    //       >
    //         {/* Left section (1/3) - Avatar and Name */}
    //         <div
    //           style={{
    //             width: "33%",
    //             height: "100%",
    //             display: "flex",
    //             flexDirection: "column",
    //             alignItems: "center",
    //             justifyContent: "center",
    //             padding: "20px",
    //           }}
    //         >
    //           {data.profile?.avatarURL && (
    //             <div
    //               style={{
    //                 width: "192px",
    //                 height: "192px",
    //                 borderRadius: "50%",
    //                 overflow: "hidden",
    //                 marginBottom: "20px",
    //                 background: themeColors.itemBackground,
    //                 border: `2px solid ${themeColors.itemBorderColor}`,
    //                 display: "flex",
    //               }}
    //             >
    //               <img
    //                 src={data.profile.avatarURL}
    //                 alt="Avatar"
    //                 style={{
    //                   width: "100%",
    //                   height: "100%",
    //                   objectFit: "cover",
    //                 }}
    //               />
    //             </div>
    //           )}
    //           <h1
    //             style={{
    //               fontSize: "32px",
    //               fontWeight: "bold",
    //               marginTop: "8px",
    //               marginBottom: "8px",
    //               textAlign: "center",
    //               color: themeColors.textColor,
    //             }}
    //           >
    //             {data.profile?.name || username}
    //           </h1>
    //           {data.profile?.bio && (
    //             <p
    //               style={{
    //                 fontSize: "16px",
    //                 textAlign: "center",
    //                 maxWidth: "90%",
    //                 color: themeColors.textColor,
    //                 opacity: 0.8,
    //               }}
    //             >
    //               {data.profile.bio}
    //             </p>
    //           )}
    //         </div>

    //         {/* Right section (2/3) - Absolute positioned items */}
    //         <div
    //           style={{
    //             width: "67%",
    //             height: "100%",
    //             position: "relative",
    //             padding: "10px",
    //             display: "flex",
    //             flexDirection: "column",
    //           }}
    //         >
    //           {Object.entries(groupItemsByRow(sortedItems)).flatMap(
    //             ([y, rowItems], rowIndex) =>
    //               rowItems.map((item, index) => {
    //                 const size = getItemSize(item);
    //                 const { content, previewType } = getItemContent(item);
    //                 const isSection =
    //                   item.type === "section" || item.type === "section title";

    //                 if (isSection) {
    //                   const leftOffset = ((item.x || 0) / 12) * 100;
    //                   const top = parseInt(y) * 30;
    //                   return (
    //                     <div
    //                       key={`${item.i || `${rowIndex}-${index}`}`}
    //                       style={{
    //                         position: "absolute",
    //                         top: `${top}px`,
    //                         left: `${leftOffset}%`,
    //                         width: `${(size.w / 12) * 100}%`,
    //                         fontSize: "18px",
    //                         fontWeight: "bold",
    //                         color: themeColors.textColor,
    //                       }}
    //                     >
    //                       {/* SKIPPING SECTION HEADINGS */}
    //                     </div>
    //                   );
    //                 }

    //                 const itemStyle = getFlexItemStyle(
    //                   size,
    //                   parseInt(y),
    //                   item.x || 0
    //                 );

    //                 return (
    //                   <div
    //                     key={`${item.i || `${rowIndex}-${index}`}`}
    //                     style={{
    //                       ...itemStyle,
    //                       display: "flex",
    //                       flexDirection: "row",
    //                       alignItems: "center",
    //                       justifyContent: "center",
    //                       background: itemStyle.background,
    //                     }}
    //                   >
    //                     <div
    //                       style={{
    //                         width: "100%",
    //                         height: "100%",
    //                         display: "flex",
    //                         flexDirection: "row",
    //                         alignItems: "center",
    //                         justifyContent: "center",
    //                         padding: "10px",
    //                       }}
    //                     >
    //                       {content && content.startsWith("http") ? (
    //                         <img
    //                           src={content}
    //                           alt={item.title || `Item ${index}`}
    //                           width="100"
    //                           height="100"
    //                           style={{
    //                             width: "100%",
    //                             height: "100%",
    //                             objectFit:
    //                               item.type === "url" ? "contain" : "cover",
    //                             borderRadius: "12px",
    //                           }}
    //                         />
    //                       ) : content === "skeleton" ? (
    //                         item.type === "text" ? (
    //                           renderParagraphSkeleton(themeColors)
    //                         ) : (
    //                           renderSkeleton("100%", "100%", themeColors)
    //                         )
    //                       ) : (
    //                         <div
    //                           style={{
    //                             fontSize: "40px",
    //                             display: "flex",
    //                             alignItems: "center",
    //                             justifyContent: "center",
    //                             width: "100%",
    //                             height: "100%",
    //                             background: themeColors.itemBackground,
    //                           }}
    //                         >
    //                           📌
    //                         </div>
    //                       )}
    //                     </div>
    //                   </div>
    //                 );
    //               })
    //           )}
    //         </div>
    //       </div>
    //     ),
    //     {
    //       width: 1200,
    //       height: 630,
    //       headers: responseHeaders,
    //     }
    //   );
    //  }else {

    const title = data.profile.name;
    const subtitle = username || uuid;
    const themeData = data.theme;

    const responseHeaders = new Headers(cacheHeaders);

    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: themeData.color,
            fontFamily: 'sans-serif',
            color: '#ffffff', // White text for contrast
            padding: '20px',
          }}
        >
          <img
            src={data.profile.avatarURL}
            alt={title}
            style={{
              width: '300px', // Increased from 200px
              height: '300px', // Increased from 200px
              overflow: 'hidden',
              objectFit: 'cover',
              marginBottom: '30px', // Increased from 20px
              borderRadius: '1000px',
            }}
          />
          <h1
            style={{
              fontSize: '72px', // Increased from 48px
              fontWeight: 'bold',
              textAlign: 'center',
              color: '#ffffff',
              margin: '0',
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontSize: '36px', // Increased from 24px
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '15px', // Increased from 10px
              textAlign: 'center',
              color: '#d3d3d3', // Lighter gray for subtitle/hashtag
              margin: '15px 0 0', // Increased from 10px
            }}
          >
            <img
              height="30px" // Increased from 20px
              width="30px" // Increased from 20px
              src="https://pocketlink.co/ogImg.png"
            />{' '}
            / {subtitle}
          </p>
        </div>
      ),
      {
        width: 1200,
        height: 740,
        headers: responseHeaders,
      }
    );
  } catch (e) {
    console.error(e);
    return new Response(`Failed to generate image: ${e.message}`, {
      status: 500,
      headers: {
        'Cache-Control': 'public, max-age=60',
        'Content-Type': 'text/plain',
      },
    });
  }
}
