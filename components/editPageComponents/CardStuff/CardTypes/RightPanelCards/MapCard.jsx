import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Map,
  AlertCircle,
  MapPin,
  Eye,
  EyeOff,
  Edit,
  Search,
} from 'lucide-react';
import { useItems } from '@/app/contexts/ItemsContext';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Custom Map Style - From the provided JSON
const customMapStyle = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#ebe3cd',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#523735',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#f5f1e6',
      },
    ],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#c9b2a6',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#dcd2be',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#ae9e90',
      },
    ],
  },
  {
    featureType: 'administrative.neighborhood',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'landscape.natural',
    elementType: 'geometry',
    stylers: [
      {
        color: '#dfd2ae',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [
      {
        color: '#dfd2ae',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#93817c',
      },
    ],
  },
  {
    featureType: 'poi.business',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#a5b076',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#447530',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        color: '#f5f1e6',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [
      {
        color: '#fdfcf8',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#f8c967',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#e9bc62',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry',
    stylers: [
      {
        color: '#e98d58',
      },
    ],
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#db8555',
      },
    ],
  },
  {
    featureType: 'road.local',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#806b63',
      },
    ],
  },
  {
    featureType: 'transit',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'transit.line',
    elementType: 'geometry',
    stylers: [
      {
        color: '#dfd2ae',
      },
    ],
  },
  {
    featureType: 'transit.line',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#8f7d77',
      },
    ],
  },
  {
    featureType: 'transit.line',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#ebe3cd',
      },
    ],
  },
  {
    featureType: 'transit.station',
    elementType: 'geometry',
    stylers: [
      {
        color: '#dfd2ae',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#b9d3c2',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#92998d',
      },
    ],
  },
];

// CSS for ping animation and atmospheric effects
const pingAnimationCSS = `
  @keyframes ping {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    75% {
      transform: scale(2.5);
      opacity: 0;
    }
    100% {
      transform: scale(3);
      opacity: 0;
    }
  }

  .ping-marker {
    position: relative;
  }

  .ping-marker::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: rgba(79, 121, 255, 0.4);
    z-index: -1;
    animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
  }
  
  /* Cloud/Fog Animation */
  @keyframes drift {
    0% {
      transform: translateX(-5%) translateY(0);
      opacity: 0.6;
    }
    50% {
      transform: translateX(5%) translateY(-2%);
      opacity: 0.9;
    }
    100% {
      transform: translateX(-5%) translateY(0);
      opacity: 0.6;
    }
  }
  
  .cloud-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    pointer-events: none;
    z-index: 3;
  }
  
  .cloud {
    position: absolute;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 50%;
    filter: blur(20px);
    box-shadow: 0 0 40px 10px rgba(255, 255, 255, 0.4);
  }
  
  .cloud-1 {
    width: 200px;
    height: 200px;
    top: 10%;
    left: 10%;
    animation: drift 20s infinite ease-in-out;
  }
  
  .cloud-2 {
    width: 250px;
    height: 150px;
    top: 30%;
    left: 60%;
    animation: drift 25s infinite ease-in-out reverse;
  }
  
  .cloud-3 {
    width: 180px;
    height: 180px;
    top: 70%;
    left: 20%;
    animation: drift 18s infinite ease-in-out 2s;
  }
  
  /* Flight Animation */
  @keyframes fly {
    0% {
      transform: translateX(-110%) translateY(20%) rotate(45deg);
    }
    100% {
      transform: translateX(210%) translateY(-20%) rotate(45deg);
    }
  }
  
  .flight-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    pointer-events: none;
    z-index: 3;
  }
  
  .flight-path {
    position: absolute;
    z-index: 3;
    width: 100%;
    height: 100%;
  }
  
  .airplane {
    position: absolute;
    width: 40px;
    height: 40px;
    background-image: url("/MoreComponentsIcons/airplane.svg");
    background-size: contain;
    background-repeat: no-repeat;
  }
  
  /* Hide Google Maps UI elements */
  .gmnoprint, .gm-style-cc, .gm-control-active {
    display: none !important;
  }
  
  /* Hide Google logo and terms */
  .gm-style a[href^="https://maps.google.com/maps"] {
    display: none !important;
  }
  
  /* Hide the attribution completely */
  .gm-style-cc {
    display: none !important;
  }
`;

export default function MapCard({
  itemId,
  card,
  isEditing,
  isMobile = false,
  tenant,
  isTenantHovered,
  username,
}) {
  const { updateItemContent } = useItems();
  const mapRef = useRef(null);

  // State
  const [mapLoaded, setMapLoaded] = useState(false);
  const [location, setLocation] = useState(card?.location || '');
  const [mapStyle, setMapStyle] = useState(card?.mapStyle || 'roadmap');
  const [showMap, setShowMap] = useState(true);
  const [error, setError] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);
  const [coordinates, setCoordinates] = useState(
    card?.coordinates || {
      lat: 40.7128, // Default to New York City
      lng: -74.006,
    }
  );
  // Add state for animations
  const [showPingAnimation, setShowPingAnimation] = useState(
    card?.showPingAnimation !== false
  );
  const [showClouds, setShowClouds] = useState(card?.showClouds || false);
  const [showFlightPath, setShowFlightPath] = useState(
    card?.showFlightPath || false
  );

  // References for animations
  const flightRef = useRef(null);
  const flightAnimationFrame = useRef(null);
  const flightPath = useRef([]);
  const currentPosition = useRef(0);

  // Add useEffect to remove Google copyright elements when they appear
  useEffect(() => {
    // Function to remove Google copyright elements
    const removeGoogleElements = () => {
      const googleElements = document.querySelectorAll(
        '.gmnoprint, .gm-style-cc'
      );
      googleElements.forEach((el) => {
        el.style.display = 'none';
      });

      // Remove Google logo
      const googleLogoImg = document.querySelector('img[src*="google_white"]');
      if (googleLogoImg && googleLogoImg.parentNode) {
        const parentA = googleLogoImg.closest('a');
        if (parentA) {
          parentA.style.display = 'none';
        }
      }
    };

    // Run immediately and set interval to catch elements that might be added later
    removeGoogleElements();
    const interval = setInterval(removeGoogleElements, 500);

    return () => clearInterval(interval);
  }, [mapLoaded]);

  // Add the CSS for the animations
  useEffect(() => {
    // Insert the CSS only once
    if (!document.getElementById('map-animations-style')) {
      const style = document.createElement('style');
      style.id = 'map-animations-style';
      style.textContent = pingAnimationCSS;
      document.head.appendChild(style);
    }
  }, []);

  // Load Google Maps API script
  useEffect(() => {
    if (window.google?.maps || document.getElementById('google-maps-script')) {
      setMapLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.id = 'google-maps-script';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.onload = () => {
      setMapLoaded(true);
    };
    document.head.appendChild(script);

    return () => {
      // Cleanup if component unmounts before script loads
      const existingScript = document.getElementById('google-maps-script');
      if (existingScript && !window.google?.maps) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  // Function to update the marker ping animation
  const updateMarkerAnimation = () => {
    if (!mapRef.current?.marker?.div) return;

    try {
      // Get the marker's div
      const markerDiv = mapRef.current.marker.div;
      if (!markerDiv) return;

      // Update the className based on animation state
      markerDiv.className = showPingAnimation ? 'ping-marker' : '';
    } catch (error) {
      console.error('Error updating marker animation:', error);
    }
  };

  // Effect to update marker animation when the animation state changes
  useEffect(() => {
    updateMarkerAnimation();
  }, [showPingAnimation]);

  // Toggle clouds animation
  const toggleClouds = () => {
    const newValue = !showClouds;
    setShowClouds(newValue);
    updateItemContent(itemId, { showClouds: newValue });
  };

  // Toggle flight path animation
  const toggleFlightPath = () => {
    const newValue = !showFlightPath;
    setShowFlightPath(newValue);

    if (newValue) {
      generateRandomFlightPath();
      startFlightAnimation();
    } else {
      stopFlightAnimation();
    }

    updateItemContent(itemId, { showFlightPath: newValue });
  };

  // Initialize map when API is loaded and component mounts
  useEffect(() => {
    if (!mapLoaded || isInitialized || !showMap) return;

    try {
      // If we have valid coordinates from saved card data
      const center = card?.coordinates || coordinates;

      const mapOptions = {
        center: center,
        zoom: card?.zoom || 13,
        mapTypeId: getGoogleMapType(mapStyle),
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        zoomControl: false, // Disable zoom controls
        styles: customMapStyle, // Apply the custom map style
        disableDefaultUI: true, // Disable all UI controls
        clickableIcons: false, // Prevent POIs from being clickable
        attributionControl: false, // Hide attribution
      };

      const map = new google.maps.Map(mapRef.current, mapOptions);

      // Create a custom div for our dot marker
      const customMarkerDiv = document.createElement('div');
      customMarkerDiv.className = showPingAnimation ? 'ping-marker' : '';
      customMarkerDiv.style.position = 'absolute';
      customMarkerDiv.style.transform = 'translate(-50%, -50%)';
      customMarkerDiv.style.zIndex = '1'; // Ensure marker is above the map

      // Create the inner dot (replacing the pin)
      const dot = document.createElement('div');
      dot.style.width = '40px';
      dot.style.height = '40px';
      dot.style.borderRadius = '50%';
      dot.style.backgroundColor = '#4f79ff'; // Blue color as in the image
      dot.style.border = '6px solid white';
      dot.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';

      customMarkerDiv.appendChild(dot);

      // Create the custom overlay for our dot
      const CustomMarker = function (position, map) {
        this.position = position;
        this.div = customMarkerDiv;
        this.setMap(map);
      };

      CustomMarker.prototype = new google.maps.OverlayView();

      CustomMarker.prototype.onAdd = function () {
        const panes = this.getPanes();
        panes.overlayLayer.appendChild(this.div);
      };

      CustomMarker.prototype.draw = function () {
        const overlayProjection = this.getProjection();
        const position = overlayProjection.fromLatLngToDivPixel(this.position);

        this.div.style.left = position.x + 'px';
        this.div.style.top = position.y + 'px';
      };

      CustomMarker.prototype.onRemove = function () {
        if (this.div && this.div.parentNode) {
          this.div.parentNode.removeChild(this.div);
        }
      };

      CustomMarker.prototype.getPosition = function () {
        return this.position;
      };

      CustomMarker.prototype.setPosition = function (position) {
        this.position = position;
        this.draw();
      };

      // Create the custom marker
      const marker = new CustomMarker(center, map);

      // Store map data to be accessible in other methods
      mapRef.current.mapInstance = map;
      mapRef.current.marker = marker;

      // Save the map state for pan/zoom operations
      google.maps.event.addListener(map, 'idle', () => {
        if (isEditing) {
          const newCenter = map.getCenter();
          const newZoom = map.getZoom();

          setCoordinates({
            lat: newCenter.lat(),
            lng: newCenter.lng(),
          });

          // Only update in database if significantly changed to avoid constant updates
          updateItemContent(itemId, {
            coordinates: {
              lat: newCenter.lat(),
              lng: newCenter.lng(),
            },
            zoom: newZoom,
          });
        }
      });

      setIsInitialized(true);
    } catch (error) {
      console.error('Error initializing map:', error);
      setError('Failed to initialize map');
    }
  }, [
    mapLoaded,
    isInitialized,
    showMap,
    mapStyle,
    card,
    coordinates,
    isEditing,
    itemId,
    updateItemContent,
    showPingAnimation,
  ]);

  // Render cloud animation elements
  const renderClouds = () => {
    if (!showClouds) return null;

    return (
      <div className="cloud-container">
        <div className="cloud cloud-1"></div>
        <div className="cloud cloud-2"></div>
        <div className="cloud cloud-3"></div>
      </div>
    );
  };

  // Render flight path animation
  const renderFlightPath = () => {
    if (!showFlightPath) return null;

    return (
      <div className="flight-container">
        <div
          ref={flightRef}
          className="airplane"
          style={{
            position: 'absolute',
            left: '0%',
            top: '0%',
          }}
        />
      </div>
    );
  };

  // Convert string map style to Google Maps mapTypeId
  const getGoogleMapType = (style) => {
    if (!window.google?.maps) return style;

    switch (style) {
      case 'roadmap':
        return google.maps.MapTypeId.ROADMAP;
      case 'satellite':
        return google.maps.MapTypeId.SATELLITE;
      case 'hybrid':
        return google.maps.MapTypeId.HYBRID;
      case 'terrain':
        return google.maps.MapTypeId.TERRAIN;
      default:
        return google.maps.MapTypeId.ROADMAP;
    }
  };

  // Update map when style changes
  useEffect(() => {
    if (!isInitialized || !mapRef.current?.mapInstance) return;

    const map = mapRef.current.mapInstance;
    map.setMapTypeId(getGoogleMapType(mapStyle));

    // Apply custom map style when map style changes
    map.setOptions({ styles: customMapStyle });
  }, [mapStyle, isInitialized]);

  // Toggle animation state
  const togglePingAnimation = () => {
    const newValue = !showPingAnimation;
    setShowPingAnimation(newValue);
    updateItemContent(itemId, { showPingAnimation: newValue });
  };

  // Search for a location using Geocoding
  const searchLocation = async (query) => {
    return new Promise((resolve, reject) => {
      if (!window.google?.maps?.Geocoder) {
        reject(new Error('Google Geocoder not loaded'));
        return;
      }

      const geocoder = new google.maps.Geocoder();

      geocoder.geocode({ address: query }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
          const location = results[0].geometry.location;
          resolve({
            coordinates: {
              lat: location.lat(),
              lng: location.lng(),
            },
            locationName: results[0].formatted_address,
            zoom: 15,
          });
        } else {
          reject(new Error(`Geocoding error: ${status}`));
        }
      });
    });
  };

  // Update the map with new location data
  const updateMap = (locationData) => {
    if (!locationData || !locationData.coordinates) return;

    setCoordinates(locationData.coordinates);
    setLocation(locationData.locationName || 'Selected Location');

    // If map is initialized, update it
    if (mapRef.current?.mapInstance) {
      const map = mapRef.current.mapInstance;
      const marker = mapRef.current.marker;

      // Update map center and zoom
      map.setCenter(locationData.coordinates);
      if (locationData.zoom) {
        map.setZoom(locationData.zoom);
      }

      // Update marker position
      if (marker && marker.setPosition) {
        marker.setPosition(locationData.coordinates);
      }

      // Maintain custom map style
      map.setOptions({ styles: customMapStyle });
    }

    // Store data in the database
    updateItemContent(itemId, {
      coordinates: locationData.coordinates,
      location: locationData.locationName || 'Selected Location',
      mapStyle: mapStyle,
      zoom: locationData.zoom || 15,
      showPingAnimation: showPingAnimation,
      showClouds: showClouds,
      showFlightPath: showFlightPath,
    });
  };

  // Handle direct search
  const handleSearch = async () => {
    if (!searchQuery) {
      setError('Please enter a search query');
      return;
    }

    setIsSearching(true);
    setError('');

    try {
      const locationData = await searchLocation(searchQuery);
      if (locationData) {
        updateMap(locationData);
      } else {
        setError('No results found for this search');
      }
    } catch (error) {
      console.error('Search error:', error);
      setError('Search failed');
    } finally {
      setIsSearching(false);
    }
  };

  // Update map style
  const handleMapStyleChange = (style) => {
    setMapStyle(style);
    updateItemContent(itemId, { mapStyle: style });

    if (mapRef.current?.mapInstance) {
      mapRef.current.mapInstance.setMapTypeId(getGoogleMapType(style));

      // Always apply the custom map style
      mapRef.current.mapInstance.setOptions({ styles: customMapStyle });
    }
  };

  // Rendering for empty state
  const renderEmptyState = () => {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <MapPin className="mb-2 h-12 w-12 text-gray-300" />
        <p className="text-center text-sm text-gray-500">
          {tenant ? 'Enter a location to show map' : 'No map location set'}
        </p>
      </div>
    );
  };

  // Generate random flight path
  const generateRandomFlightPath = () => {
    // Clear existing path
    flightPath.current = [];
    currentPosition.current = 0;

    // Generate 5-8 random waypoints
    const numPoints = Math.floor(Math.random() * 4) + 5;

    // Create starting point (typically off-screen)
    flightPath.current.push({
      x: Math.random() < 0.5 ? -10 : 110, // Start from left or right edge
      y: 10 + Math.random() * 80, // Random height
    });

    // Generate midpoints that traverse the map
    for (let i = 1; i < numPoints - 1; i++) {
      // Create points that ensure the plane crosses the visible area
      flightPath.current.push({
        x: 10 + Math.random() * 80, // Points within visible area
        y: 10 + Math.random() * 80,
      });
    }

    // Create ending point (off-screen, opposite from start)
    const startPoint = flightPath.current[0];
    flightPath.current.push({
      x: startPoint.x < 50 ? 110 : -10, // Exit on opposite side from where we started
      y: 10 + Math.random() * 80,
    });
  };

  // Start flight animation
  const startFlightAnimation = () => {
    if (!flightRef.current) return;

    // Cancel any existing animation
    stopFlightAnimation();

    // Animation state
    const animState = {
      startTime: Date.now(),
      animationDuration: 15000, // 15 seconds to cross the map
      sourcePoint: flightPath.current[currentPosition.current],
      targetPoint:
        flightPath.current[
          (currentPosition.current + 1) % flightPath.current.length
        ],
      lastFrameTime: 0,
    };

    // Calculate angle for rotation
    const calculateAngle = (source, target) => {
      return (
        Math.atan2(target.y - source.y, target.x - source.x) * (180 / Math.PI)
      );
    };

    // Animation loop
    const animate = (timestamp) => {
      if (!flightRef.current || !showFlightPath) return;

      // First frame initialization
      if (!animState.lastFrameTime) {
        animState.lastFrameTime = timestamp;
      }

      // Throttle updates to avoid DOM thrashing
      if (timestamp - animState.lastFrameTime < 16) {
        // Approx 60fps
        flightAnimationFrame.current = requestAnimationFrame(animate);
        return;
      }

      animState.lastFrameTime = timestamp;

      const now = Date.now();
      const elapsed = now - animState.startTime;
      const progress = Math.min(1, elapsed / animState.animationDuration);

      // Interpolate between points
      if (animState.sourcePoint && animState.targetPoint && flightRef.current) {
        // Linear interpolation
        const x =
          animState.sourcePoint.x +
          (animState.targetPoint.x - animState.sourcePoint.x) * progress;
        const y =
          animState.sourcePoint.y +
          (animState.targetPoint.y - animState.sourcePoint.y) * progress;

        // Calculate rotation to face direction of travel
        const angle = calculateAngle(
          animState.sourcePoint,
          animState.targetPoint
        );

        // Apply position and rotation - account for the natural 45-degree angle of the SVG
        flightRef.current.style.left = `${x}%`;
        flightRef.current.style.top = `${y}%`;
        flightRef.current.style.transform = `rotate(${angle + 45}deg)`;
      }

      // If we've reached the target point, move to the next one
      if (progress >= 1) {
        // Advance to next waypoint
        currentPosition.current =
          (currentPosition.current + 1) % flightPath.current.length;

        // If we've completed a full cycle, generate a new flight path
        if (currentPosition.current === 0) {
          generateRandomFlightPath();
        }

        // Update source and target points
        animState.sourcePoint = flightPath.current[currentPosition.current];
        animState.targetPoint =
          flightPath.current[
            (currentPosition.current + 1) % flightPath.current.length
          ];

        // Reset start time for next animation
        animState.startTime = now;
      }

      // Continue animation loop
      flightAnimationFrame.current = requestAnimationFrame(animate);
    };

    // Start the animation loop
    flightAnimationFrame.current = requestAnimationFrame(animate);
  };

  // Stop flight animation
  const stopFlightAnimation = () => {
    if (flightAnimationFrame.current) {
      cancelAnimationFrame(flightAnimationFrame.current);
      flightAnimationFrame.current = null;
    }
  };

  // Handle flight animation when showFlightPath changes
  useEffect(() => {
    if (showFlightPath) {
      generateRandomFlightPath();
      startFlightAnimation();
    } else {
      stopFlightAnimation();
    }

    return () => {
      stopFlightAnimation();
    };
  }, [showFlightPath]);

  // Component initialization for flight path
  useEffect(() => {
    // Initialize flight path if needed
    if (showFlightPath) {
      generateRandomFlightPath();
      startFlightAnimation();
    }

    return () => {
      // Cleanup all animations on unmount
      stopFlightAnimation();
    };
  }, []);

  return (
    <div
      onClick={(e) => {
        if (!isEditing && tenant && coordinates) {
          // Open map in Google Maps when clicked
          window.open(
            `https://www.google.com/maps/search/?api=1&query=${coordinates.lat},${coordinates.lng}`,
            '_blank'
          );
        }
      }}
      className={`relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl bg-gray-100 ${
        isEditing
          ? 'cursor-move'
          : tenant && coordinates
            ? 'cursor-pointer'
            : 'cursor-default'
      }`}
      style={{ background: card?.background || 'transparent' }}
    >
      {/* Map content */}
      <div className="relative h-full w-full">
        {!showMap ? (
          <p className="text-center text-sm text-gray-500">Map hidden</p>
        ) : (
          <>
            {!mapLoaded || !coordinates ? (
              renderEmptyState()
            ) : (
              <div
                ref={mapRef}
                className="absolute inset-0 h-full w-full overflow-hidden rounded-lg"
              />
            )}

            {/* Render cloud and flight animations */}
            {renderClouds()}
            {renderFlightPath()}
          </>
        )}

        {/* Overlay for dragging in edit mode */}
        {isEditing && (
          <div
            className="absolute inset-0 z-40 cursor-move bg-transparent"
            aria-hidden="true"
            onClick={(e) => e.stopPropagation()}
          />
        )}
      </div>

      {/* Edit controls */}
      {isEditing && (
        <div className="absolute right-2 top-2 z-50 flex items-center gap-2">
          <TooltipProvider>
            {/* Toggle visibility */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowMap(!showMap);
                    updateItemContent(itemId, { showMap: !showMap });
                  }}
                >
                  {showMap ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{showMap ? 'Hide Map' : 'Show Map'}</p>
              </TooltipContent>
            </Tooltip>

            {/* Toggle ping animation */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant={showPingAnimation ? 'default' : 'secondary'}
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePingAnimation();
                  }}
                >
                  <span className="flex h-4 w-4 items-center justify-center">
                    {/* Simple ping icon */}
                    <span className="relative flex h-3 w-3">
                      <span
                        className={`absolute inline-flex h-full w-full animate-ping rounded-full ${
                          showPingAnimation
                            ? 'bg-white opacity-75'
                            : 'bg-gray-400 opacity-50'
                        }`}
                      ></span>
                      <span
                        className={`relative inline-flex h-3 w-3 rounded-full ${
                          showPingAnimation ? 'bg-blue-500' : 'bg-gray-500'
                        }`}
                      ></span>
                    </span>
                  </span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {showPingAnimation
                    ? 'Disable Ping Effect'
                    : 'Enable Ping Effect'}
                </p>
              </TooltipContent>
            </Tooltip>

            {/* Toggle clouds animation */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant={showClouds ? 'default' : 'secondary'}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleClouds();
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-cloud"
                  >
                    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>
                  </svg>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{showClouds ? 'Disable Clouds' : 'Enable Clouds'}</p>
              </TooltipContent>
            </Tooltip>

            {/* Toggle flight path animation */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant={showFlightPath ? 'default' : 'secondary'}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFlightPath();
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-plane"
                  >
                    <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"></path>
                  </svg>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {showFlightPath
                    ? 'Disable Flight Path'
                    : 'Enable Flight Path'}
                </p>
              </TooltipContent>
            </Tooltip>

            {/* Location input */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      size="icon"
                      variant="secondary"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MapPin className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-80 p-3"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="space-y-3">
                      <div>
                        <p className="mb-2 text-sm font-medium">
                          Search for a location
                        </p>
                        <div className="flex space-x-2">
                          <Input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search for a place..."
                            className="flex-1"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleSearch();
                              }
                            }}
                          />
                          <Button
                            size="sm"
                            onClick={handleSearch}
                            disabled={isSearching || !searchQuery}
                          >
                            {isSearching ? (
                              '...'
                            ) : (
                              <Search className="h-4 w-4" />
                            )}
                          </Button>
                        </div>

                        {/* Error message */}
                        {error && (
                          <div className="mt-1 flex items-center text-xs text-red-500">
                            <AlertCircle className="mr-1 h-3 w-3" />
                            {error}
                          </div>
                        )}
                      </div>

                      {/* Map style options */}
                      <div className="border-t pt-3">
                        <p className="mb-2 text-sm font-medium">Map style</p>
                        <Select
                          value={mapStyle}
                          onValueChange={handleMapStyleChange}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select map style" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="roadmap">Road Map</SelectItem>
                            <SelectItem value="satellite">Satellite</SelectItem>
                            <SelectItem value="terrain">Terrain</SelectItem>
                            <SelectItem value="hybrid">Hybrid</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Animation options - Updated to include new animations */}
                      <div className="border-t pt-3">
                        <p className="mb-2 text-sm font-medium">
                          Visual effects
                        </p>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <p className="text-sm">Ping animation</p>
                            <Button
                              size="sm"
                              variant={
                                showPingAnimation ? 'default' : 'outline'
                              }
                              onClick={togglePingAnimation}
                            >
                              {showPingAnimation ? 'On' : 'Off'}
                            </Button>
                          </div>

                          <div className="flex items-center justify-between">
                            <p className="text-sm">Cloud effect</p>
                            <Button
                              size="sm"
                              variant={showClouds ? 'default' : 'outline'}
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleClouds();
                              }}
                            >
                              {showClouds ? 'On' : 'Off'}
                            </Button>
                          </div>

                          <div className="flex items-center justify-between">
                            <p className="text-sm">Flight animation</p>
                            <Button
                              size="sm"
                              variant={showFlightPath ? 'default' : 'outline'}
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFlightPath();
                              }}
                            >
                              {showFlightPath ? 'On' : 'Off'}
                            </Button>
                          </div>
                        </div>
                      </div>

                      {location && (
                        <div className="border-t pt-3">
                          <p className="mb-1 text-sm font-medium">
                            Current location
                          </p>
                          <p className="break-words rounded-md bg-gray-50 p-2 text-sm text-gray-600">
                            {location}
                          </p>
                        </div>
                      )}
                    </div>
                  </PopoverContent>
                </Popover>
              </TooltipTrigger>
              <TooltipContent>
                <p>Set Location</p>
              </TooltipContent>
            </Tooltip>

            {/* Done editing button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="default"
                  onClick={(e) => {
                    e.stopPropagation();
                    updateItemContent(itemId, { isEditing: false });
                  }}
                >
                  Done
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Exit Edit Mode</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
    </div>
  );
}
