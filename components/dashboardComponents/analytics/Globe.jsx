'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import ThreeGlobe from 'three-globe';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import iso31661 from 'iso-3166-1';
const countryDetail = require('country-js');

// Different globe styless
const globeStyles = [
  {
    name: 'Dark',
    texture: '//unpkg.com/three-globe/example/img/earth-blue-marble.jpg',
    bump: '//unpkg.com/three-globe/example/img/earth-topology.png',
  },
  {
    name: 'Light',
    texture: '//unpkg.com/three-globe/example/img/earth-day.jpg',
    bump: '//unpkg.com/three-globe/example/img/earth-topology.png',
  },
  {
    name: 'Night Lights',
    texture: '//unpkg.com/three-globe/example/img/earth-night.jpg',
    bump: '//unpkg.com/three-globe/example/img/earth-topology.png',
  },
];

// Country name to ISO-2 mapping (manual overrides)
const countryCodeMap = {
  'United States': 'US',
  Türkiye: 'TR',
  Canada: 'CA',
  India: 'IN',
  Ireland: 'IE',
  Singapore: 'SG',
  Unknown: null, // Explicitly exclude Unknown
};

export default function Globe({ analyticsData }) {
  const mountRef = useRef(null);
  const globeRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const [style, setStyle] = useState(globeStyles[0]);
  const [globeData, setGlobeData] = useState([]);

  // Memoize countryData to prevent infinite re-renders
  const countryData = useMemo(() => {
    // Prefer all-time aggregated countries from context if available
    const countries = analyticsData?.countries;
    if (countries && Object.keys(countries).length > 0) {
      return Object.values(countries)
        .map((c) => ({
          country: c.countryCode || c.countryName,
          count: c.visits || 0,
        }))
        .filter((e) => e.count > 0);
    }

    // Fallback: derive from locations
    return Object.entries(analyticsData?.locations || {})
      .reduce((acc, [id, data]) => {
        if (!data || String(data.country || '').toLowerCase() === 'unknown')
          return acc;
        const isoCode =
          countryCodeMap[data.country] ||
          iso31661.whereCountry(data.country)?.alpha2 ||
          data.country;
        const existing = acc.find((c) => c.country === isoCode);
        if (existing) existing.count += data.totalVisits || 0;
        else acc.push({ country: isoCode, count: data.totalVisits || 0 });
        return acc;
      }, [])
      .filter((entry) => entry.count > 0);
  }, [analyticsData?.countries, analyticsData?.locations]);

  // Memoize maxUsers
  const maxUsers = useMemo(() => {
    return Math.max(...countryData.map((d) => d.count), 1);
  }, [countryData]);

  useEffect(() => {
    // Transform analytics data for globe points
    const globePoints = countryData.map(({ country, count }) => {
      const countryInfo = iso31661.whereAlpha2(country);
      const searchResult = countryDetail.search(country);
      const coordinates =
        Array.isArray(searchResult) && searchResult[0]?.geo
          ? searchResult[0].geo
          : { latitude: 0, longitude: 0 };
      return {
        lat: coordinates.latitude,
        lng: coordinates.longitude,
        size: 0.01,
        color: getColorByCount(count, maxUsers),
        country: countryInfo?.country || country,
        count: count,
      };
    });
    setGlobeData(globePoints);
  }, [countryData, maxUsers]); // Now depends on memoized values

  // Auto-select globe style based on local time
  useEffect(() => {
    const getStyleForHour = (hour) => {
      if (hour >= 7 && hour < 18) {
        return globeStyles.find((s) => s.name === 'Light') || globeStyles[0];
      }
      if (hour >= 18 && hour < 20) {
        return globeStyles.find((s) => s.name === 'Dark') || globeStyles[0];
      }
      return (
        globeStyles.find((s) => s.name === 'Night Lights') || globeStyles[0]
      );
    };

    const updateStyle = () => {
      const hour = new Date().getHours();
      const target = getStyleForHour(hour);
      setStyle((prev) => (prev?.name === target?.name ? prev : target));
    };

    updateStyle();
    const id = setInterval(updateStyle, 10 * 60 * 1000); // refresh every 10 minutes
    return () => clearInterval(id);
  }, []);

  // Get color based on user count
  const getColorByCount = (count, maxCount) => {
    const intensity = count / maxCount;
    const r = Math.floor(255 * (1 - intensity));
    const g = Math.floor(100 + 155 * intensity);
    const b = Math.floor(255 * intensity);
    return `rgb(${r}, ${g}, ${b})`;
  };
  useEffect(() => {
    if (!mountRef.current) return;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      60,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1600
    );
    camera.position.set(120, 30, 240);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lights
    scene.add(new THREE.AmbientLight(0xcccccc, Math.PI));
    scene.add(new THREE.DirectionalLight(0xffffff, 0.6 * Math.PI));

    // Stars background
    const starField = new THREE.Mesh(
      new THREE.SphereGeometry(1000, 64, 64),
      new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load(
          '//unpkg.com/three-globe/example/img/night-sky.png'
        ),
        side: THREE.BackSide,
      })
    );
    scene.add(starField);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // smooth motion
    controls.enableZoom = true; // allow zooming
    controls.minDistance = 200; // zoom limits
    controls.maxDistance = 800;
    controls.autoRotate = false;

    // Globe
    const globe = new ThreeGlobe()
      .showAtmosphere(true)
      .atmosphereColor('lightskyblue')
      .atmosphereAltitude(0.15);
    globeRef.current = globe;
    scene.add(globe);

    // Animation
    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }
    animate();

    // Resize handling
    const handleResize = () => {
      if (typeof window === 'undefined') return;
      if (!mountRef.current || !cameraRef.current || !rendererRef.current)
        return;
      camera.aspect =
        mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        mountRef.current.clientWidth,
        mountRef.current.clientHeight
      );
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  useEffect(() => {
    if (!globeRef.current) return;

    globeRef.current
      .pointsData(globeData)
      .pointAltitude(() => 0.001)
      .pointRadius(() => 0.7)
      .pointColor((d) => d.color);

    globeRef.current
      .labelsData(globeData)
      .labelText((d) => `${d.country}: ${d.count}`)
      .labelSize(1.7)
      .labelDotRadius(0.4)
      .labelColor(() => 'white');
  }, [globeData]);

  // Update texture when style changes
  useEffect(() => {
    if (!globeRef.current) return;
    globeRef.current.globeImageUrl(style.texture);
    if (style.bump) globeRef.current.bumpImageUrl(style.bump);
  }, [style]);

  return (
    <div className="relative h-[500px] w-full">
      {/* Globe mount */}
      <div
        className="z-10 h-[100%] w-[100%] overflow-hidden rounded-xl md:rounded-br-none md:rounded-tr-none"
        ref={mountRef}
      />
    </div>
  );
}
