/* iOS PWA splash screens */
const splashScreens = [
  { href: './assets/startup.jpg' },
  { w: 320, h: 568, r: 2, o: 'portrait', f: 'apple-splash-640-1136.jpg' },
  { w: 375, h: 667, r: 2, o: 'portrait', f: 'apple-splash-750-1334.jpg' },
  { w: 414, h: 896, r: 2, o: 'portrait', f: 'apple-splash-828-1792.jpg' },
  { w: 375, h: 812, r: 3, o: 'portrait', f: 'apple-splash-1125-2436.jpg' },
  { w: 390, h: 844, r: 3, o: 'portrait', f: 'apple-splash-1170-2532.jpg' },
  { w: 393, h: 852, r: 3, o: 'portrait', f: 'apple-splash-1179-2556.jpg' },
  { w: 430, h: 932, r: 3, o: 'portrait', f: 'apple-splash-1206-2622.jpg' },
  { w: 414, h: 736, r: 3, o: 'portrait', f: 'apple-splash-1242-2208.jpg' },
  { w: 414, h: 896, r: 3, o: 'portrait', f: 'apple-splash-1242-2688.jpg' },
  { w: 430, h: 932, r: 3, o: 'portrait', f: 'apple-splash-1260-2736.jpg' },
  { w: 428, h: 926, r: 3, o: 'portrait', f: 'apple-splash-1284-2778.jpg' },
  { w: 430, h: 932, r: 3, o: 'portrait', f: 'apple-splash-1290-2796.jpg' },
  { w: 430, h: 932, r: 3, o: 'portrait', f: 'apple-splash-1320-2868.jpg' },
  { w: 375, h: 667, r: 2, o: 'landscape', f: 'apple-splash-1334-750.jpg' },
  { w: 744, h: 1133, r: 2, o: 'portrait', f: 'apple-splash-1488-2266.jpg' },
  { w: 768, h: 1024, r: 2, o: 'portrait', f: 'apple-splash-1536-2048.jpg' },
  { w: 810, h: 1080, r: 2, o: 'portrait', f: 'apple-splash-1620-2160.jpg' },
  { w: 820, h: 1180, r: 2, o: 'portrait', f: 'apple-splash-1640-2360.jpg' },
  { w: 834, h: 1112, r: 2, o: 'portrait', f: 'apple-splash-1668-2224.jpg' },
  { w: 834, h: 1194, r: 2, o: 'portrait', f: 'apple-splash-1668-2388.jpg' },
  { w: 414, h: 896, r: 2, o: 'landscape', f: 'apple-splash-1792-828.jpg' },
  { w: 768, h: 1024, r: 2, o: 'landscape', f: 'apple-splash-2048-1536.jpg' },
  { w: 1024, h: 1366, r: 2, o: 'portrait', f: 'apple-splash-2048-2732.jpg' },
  { w: 810, h: 1080, r: 2, o: 'landscape', f: 'apple-splash-2160-1620.jpg' },
  { w: 414, h: 736, r: 3, o: 'landscape', f: 'apple-splash-2208-1242.jpg' },
  { w: 834, h: 1112, r: 2, o: 'landscape', f: 'apple-splash-2224-1668.jpg' },
  { w: 744, h: 1133, r: 2, o: 'landscape', f: 'apple-splash-2266-1488.jpg' },
  { w: 820, h: 1180, r: 2, o: 'landscape', f: 'apple-splash-2360-1640.jpg' },
  { w: 834, h: 1194, r: 2, o: 'landscape', f: 'apple-splash-2388-1668.jpg' },
  { w: 375, h: 812, r: 3, o: 'landscape', f: 'apple-splash-2436-1125.jpg' },
  { w: 390, h: 844, r: 3, o: 'landscape', f: 'apple-splash-2532-1170.jpg' },
  { w: 393, h: 852, r: 3, o: 'landscape', f: 'apple-splash-2556-1179.jpg' },
  { w: 430, h: 932, r: 3, o: 'landscape', f: 'apple-splash-2622-1206.jpg' },
  { w: 414, h: 896, r: 3, o: 'landscape', f: 'apple-splash-2688-1242.jpg' },
  { w: 1024, h: 1366, r: 2, o: 'landscape', f: 'apple-splash-2732-2048.jpg' },
  { w: 430, h: 932, r: 3, o: 'landscape', f: 'apple-splash-2736-1260.jpg' },
  { w: 428, h: 926, r: 3, o: 'landscape', f: 'apple-splash-2778-1284.jpg' },
  { w: 430, h: 932, r: 3, o: 'landscape', f: 'apple-splash-2796-1290.jpg' },
  { w: 430, h: 932, r: 3, o: 'landscape', f: 'apple-splash-2868-1320.jpg' }
];

/* inject startup images into document head */
splashScreens.forEach(s => {
  const link = document.createElement('link');
  link.rel = 'apple-touch-startup-image';
  if (s.w) {
      link.media = `(device-width: ${s.w}px) and (device-height: ${s.h}px) and (-webkit-device-pixel-ratio: ${s.r}) and (orientation: ${s.o})`;
      link.href = `./assets/${s.f}`;
  } else {
      link.href = s.href;
  }
  document.head.appendChild(link);
});