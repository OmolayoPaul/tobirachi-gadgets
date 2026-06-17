export type Product = {
  id: string;
  name: string;
  brand: string;
  category: "phones" | "laptops" | "accessories" | "smart-devices";
  subcategory?: string;
  spec: string;
  price: number;
  image: string;
  badge?: "HOT" | "NEW" | "BEST SELLER";
};

const U = (id: string, w = 800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

// Curated real product photos (Unsplash)
const IMG = {
  iphonePro: U("1695048133142-1a20484d2569"),
  iphone: U("1592750475338-74b7b21085ab"),
  iphoneBlack: U("1605236453806-6ff36851218e"),
  samsungS: U("1610945265064-0e34e5519bbf"),
  samsungFold: U("1675953935267-e039b5b1d4ce"),
  androidPhone: U("1511707171634-5f897ff02aa9"),
  infinix: U("1567581935884-3349723552ca"),
  budgetPhone: U("1574944985070-8f3ebc6b79d2"),
  macbook: U("1517336714731-489689fd1ca8"),
  macbookPro: U("1611186871348-b1ce696e52c9"),
  laptopDell: U("1496181133206-80ce9b88a853"),
  laptopHP: U("1593642632559-0c6d3fc62b89"),
  laptopLenovo: U("1588872657578-7efd1f1555ed"),
  laptopAsus: U("1541807084-5c52b6b3adef"),
  laptopGaming: U("1603302576837-37561b2e2302"),
  airpods: U("1606220945770-b5b6c2c55bf1"),
  airpodsMax: U("1625245488747-0ef129f1dd6f"),
  galaxyBuds: U("1631176093617-63490a3d785a"),
  earbudsGeneric: U("1606741965509-717b9ddb43ec"),
  earphones: U("1574920162043-b872873f19c8"),
  headphones: U("1583394838336-acd977736f90"),
  jblBuds: U("1590658268037-6bf12165a8df"),
  screenGuard: U("1601784551446-20c9e07cdbdb"),
  phoneCase: U("1601593346740-925612772716"),
  charger: U("1583863788434-e58a36330cf0"),
  cable: U("1583863788434-e58a36330cf0"),
  powerbank: U("1609592807905-cfc0db77a93e"),
  speaker: U("1608043152269-423dbba4e7e1"),
  echoDot: U("1543512214-318c7553f230"),
  echoShow: U("1558089687-f282ffcbc126"),
  nestMini: U("1558002038-1055907df827"),
  smartPlug: U("1558002038-1055907df827"),
  smartBulb: U("1565636192335-2e1f6e09a1cc"),
  smartLock: U("1558618666-fcd25c85cd64"),
  camera: U("1502920917128-1aa500764cbd"),
  cctv: U("1557804506-669a67965ba0"),
  ringDoorbell: U("1558002038-1055907df827"),
  vlogCamera: U("1496181133206-80ce9b88a853"),
  smartwatchApple: U("1546868871-7041f2a55e12"),
  smartwatchGalaxy: U("1579586337278-3befd40fd17a"),
  smartwatchFitbit: U("1551816230-ef5deaed4a26"),
  ps5: U("1606813907291-d86efa9b94db"),
  gameController: U("1542751371-adc38448a05e"),
};

export const products: Product[] = [
  // Phones
  { id: "iphone-16-pro", name: "iPhone 16 Pro", brand: "Apple", category: "phones", spec: '6.3", A18 Pro, 128GB', price: 1050000, image: IMG.iphonePro, badge: "HOT" },
  { id: "iphone-15", name: "iPhone 15", brand: "Apple", category: "phones", spec: '6.1", A16, 128GB', price: 720000, image: IMG.iphone },
  { id: "iphone-13", name: "iPhone 13", brand: "Apple", category: "phones", spec: '6.1", A15, 128GB', price: 440000, image: IMG.iphoneBlack },
  { id: "galaxy-s25", name: "Galaxy S25", brand: "Samsung", category: "phones", spec: '6.2", 12GB/256GB', price: 850000, image: IMG.samsungS, badge: "HOT" },
  { id: "galaxy-z-fold-6", name: "Galaxy Z Fold 6", brand: "Samsung", category: "phones", spec: '7.6", 12GB/512GB', price: 1850000, image: IMG.samsungFold, badge: "NEW" },
  { id: "galaxy-a15", name: "Galaxy A15", brand: "Samsung", category: "phones", spec: '6.5", 4GB/128GB', price: 140000, image: IMG.androidPhone },
  { id: "note-40-pro", name: "Note 40 Pro", brand: "Infinix", category: "phones", spec: '6.78", 12GB/256GB', price: 190000, image: IMG.infinix, badge: "BEST SELLER" },
  { id: "hot-40-pro", name: "Hot 40 Pro", brand: "Infinix", category: "phones", spec: '6.78", 8GB/256GB', price: 105000, image: IMG.infinix },
  { id: "spark-20-pro", name: "Spark 20 Pro", brand: "Tecno", category: "phones", spec: '6.67", 8GB/128GB', price: 110000, image: IMG.androidPhone },
  { id: "redmi-note-13", name: "Redmi Note 13", brand: "Redmi", category: "phones", spec: '6.67", 8GB/256GB', price: 175000, image: IMG.androidPhone },
  { id: "itel-a70", name: "Itel A70", brand: "Itel", category: "phones", spec: '6.6", 3GB/64GB', price: 48000, image: IMG.budgetPhone },
  { id: "vivo-y18", name: "Vivo Y18", brand: "Vivo", category: "phones", spec: '6.56", 4GB/128GB', price: 90000, image: IMG.budgetPhone },

  // Laptops
  { id: "macbook-air-m3", name: "MacBook Air M3", brand: "Apple", category: "laptops", spec: "Apple M3, 8GB, 256GB", price: 1350000, image: IMG.macbook, badge: "HOT" },
  { id: "macbook-pro-14", name: "MacBook Pro 14 M3", brand: "Apple", category: "laptops", spec: "M3 Pro, 16GB, 512GB", price: 2100000, image: IMG.macbookPro },
  { id: "dell-xps-13", name: "Dell XPS 13", brand: "Dell", category: "laptops", spec: "Core i7, 16GB, 512GB SSD", price: 950000, image: IMG.laptopDell },
  { id: "dell-inspiron-15", name: "Dell Inspiron 15 5000", brand: "Dell", category: "laptops", spec: "Core i5, 8GB, 512GB SSD", price: 480000, image: IMG.laptopDell },
  { id: "hp-pavilion-15", name: "HP Pavilion 15", brand: "HP", category: "laptops", spec: "Core i5, 8GB, 512GB SSD", price: 450000, image: IMG.laptopHP },
  { id: "hp-envy-14", name: "HP Envy 14", brand: "HP", category: "laptops", spec: "Core i7, 16GB, 512GB SSD", price: 780000, image: IMG.laptopHP },
  { id: "lenovo-ideapad-5", name: "Lenovo IdeaPad 5", brand: "Lenovo", category: "laptops", spec: "Core i5, 12GB, 512GB SSD", price: 430000, image: IMG.laptopLenovo },
  { id: "lenovo-thinkpad-e15", name: "ThinkPad E15", brand: "Lenovo", category: "laptops", spec: "Core i7, 16GB, 512GB SSD", price: 680000, image: IMG.laptopLenovo },
  { id: "asus-zenbook-14", name: "Asus ZenBook 14", brand: "Asus", category: "laptops", spec: "Core i7, 16GB, 512GB SSD", price: 680000, image: IMG.laptopAsus },
  { id: "asus-rog-strix", name: "Asus ROG Strix G16", brand: "Asus", category: "laptops", spec: "i7, RTX 4060, 16GB, 1TB", price: 1450000, image: IMG.laptopGaming, badge: "NEW" },
  { id: "acer-aspire-5", name: "Acer Aspire 5", brand: "Acer", category: "laptops", spec: "Core i5, 8GB, 512GB SSD", price: 360000, image: IMG.laptopAsus },

  // Accessories
  { id: "airpods-pro-2", name: "Apple AirPods Pro (2nd Gen)", brand: "Apple", category: "accessories", subcategory: "Earphones & Earbuds", spec: "Active Noise Cancellation", price: 95000, image: IMG.airpods },
  { id: "airpods-3", name: "Apple AirPods (3rd Gen)", brand: "Apple", category: "accessories", subcategory: "Earphones & Earbuds", spec: "Spatial Audio", price: 65000, image: IMG.airpods },
  { id: "airpods-max", name: "AirPods Max", brand: "Apple", category: "accessories", subcategory: "Earphones & Earbuds", spec: "Over-ear ANC", price: 320000, image: IMG.airpodsMax },
  { id: "galaxy-buds3-pro", name: "Samsung Galaxy Buds3 Pro", brand: "Samsung", category: "accessories", subcategory: "Earphones & Earbuds", spec: "ANC + 360 Audio", price: 75000, image: IMG.galaxyBuds },
  { id: "oraimo-freepods-4", name: "Oraimo FreePods 4", brand: "Oraimo", category: "accessories", subcategory: "Earphones & Earbuds", spec: "ANC, 36hr battery", price: 18000, image: IMG.earbudsGeneric },
  { id: "jbl-tune-130nc", name: "JBL Tune 130NC TWS", brand: "JBL", category: "accessories", subcategory: "Earphones & Earbuds", spec: "ANC, Pure Bass", price: 35000, image: IMG.jblBuds },
  { id: "sony-wf-1000xm5", name: "Sony WF-1000XM5", brand: "Sony", category: "accessories", subcategory: "Earphones & Earbuds", spec: "Best-in-class ANC", price: 130000, image: IMG.earbudsGeneric },
  { id: "wired-3-5mm", name: "Wired 3.5mm Earphones", brand: "Generic", category: "accessories", subcategory: "Earphones & Earbuds", spec: "Universal fit", price: 4000, image: IMG.earphones },
  { id: "tempered-iphone", name: "Tempered Glass (iPhone)", brand: "Generic", category: "accessories", subcategory: "Screen Guards", spec: "9H hardness", price: 4000, image: IMG.screenGuard },
  { id: "tempered-samsung", name: "Tempered Glass (Samsung)", brand: "Generic", category: "accessories", subcategory: "Screen Guards", spec: "9H hardness", price: 3500, image: IMG.screenGuard },
  { id: "silicone-case", name: "Silicone Case", brand: "Generic", category: "accessories", subcategory: "Phone Cases", spec: "Soft-touch finish", price: 5500, image: IMG.phoneCase },
  { id: "leather-case", name: "Leather Wallet Case", brand: "Generic", category: "accessories", subcategory: "Phone Cases", spec: "Card slots + stand", price: 9000, image: IMG.phoneCase },
  { id: "20w-charger", name: "20W USB-C Charger", brand: "Generic", category: "accessories", subcategory: "Chargers & Cables", spec: "Fast charging", price: 8500, image: IMG.charger },
  { id: "type-c-cable", name: "Braided Type-C Cable", brand: "Generic", category: "accessories", subcategory: "Chargers & Cables", spec: "2m, 60W PD", price: 4500, image: IMG.cable },
  { id: "powerbank-20k", name: "20,000mAh Power Bank", brand: "Oraimo", category: "accessories", subcategory: "Power Banks", spec: "PD + QC fast charge", price: 28000, image: IMG.powerbank },
  { id: "jbl-clip-5", name: "JBL Clip 5 Speaker", brand: "JBL", category: "accessories", subcategory: "Speakers", spec: "Portable, waterproof", price: 65000, image: IMG.speaker },

  // Smart devices
  { id: "echo-dot-5", name: "Amazon Echo Dot (5th Gen)", brand: "Amazon", category: "smart-devices", subcategory: "Smart Home / Alexa", spec: "Alexa voice assistant", price: 45000, image: IMG.echoDot },
  { id: "echo-show-5", name: "Amazon Echo Show 5", brand: "Amazon", category: "smart-devices", subcategory: "Smart Home / Alexa", spec: '5.5" smart display', price: 85000, image: IMG.echoShow },
  { id: "google-nest-mini", name: "Google Nest Mini", brand: "Google", category: "smart-devices", subcategory: "Smart Home / Alexa", spec: "Google Assistant", price: 40000, image: IMG.nestMini },
  { id: "tp-link-plug", name: "TP-Link Smart Plug", brand: "TP-Link", category: "smart-devices", subcategory: "Smart Home / Alexa", spec: "Voice control, scheduling", price: 12000, image: IMG.smartPlug },
  { id: "smart-rgb-bulb", name: "Smart LED Bulb (RGB)", brand: "Generic", category: "smart-devices", subcategory: "Smart Home / Alexa", spec: "16M colors, app control", price: 13000, image: IMG.smartBulb },
  { id: "smart-door-lock", name: "Smart Door Lock", brand: "Generic", category: "smart-devices", subcategory: "Smart Home / Alexa", spec: "Fingerprint + PIN + key", price: 115000, image: IMG.smartLock },
  { id: "tapo-c210", name: "TP-Link Tapo C210 WiFi Camera", brand: "TP-Link", category: "smart-devices", subcategory: "Cameras & Surveillance", spec: "1080p, night vision", price: 35000, image: IMG.cctv },
  { id: "ring-doorbell", name: "Ring Video Doorbell", brand: "Ring", category: "smart-devices", subcategory: "Cameras & Surveillance", spec: "1080p HD, 2-way talk", price: 65000, image: IMG.cctv },
  { id: "sony-zv-1f", name: "Sony ZV-1F Vlog Camera", brand: "Sony", category: "smart-devices", subcategory: "Cameras & Surveillance", spec: "4K vlog camera", price: 380000, image: IMG.vlogCamera },
  { id: "ps5-slim", name: "PlayStation 5 Slim", brand: "Sony", category: "smart-devices", subcategory: "Gaming & Streaming", spec: "1TB SSD, disc edition", price: 720000, image: IMG.ps5, badge: "HOT" },
  { id: "dualsense", name: "DualSense Controller", brand: "Sony", category: "smart-devices", subcategory: "Gaming & Streaming", spec: "Wireless, haptic feedback", price: 85000, image: IMG.gameController },
  { id: "apple-watch-s10", name: "Apple Watch Series 10", brand: "Apple", category: "smart-devices", subcategory: "Smartwatches", spec: "GPS, 45mm", price: 380000, image: IMG.smartwatchApple, badge: "NEW" },
  { id: "galaxy-watch-7", name: "Galaxy Watch 7", brand: "Samsung", category: "smart-devices", subcategory: "Smartwatches", spec: "44mm, BioActive sensor", price: 220000, image: IMG.smartwatchGalaxy },
  { id: "fitbit-versa-4", name: "Fitbit Versa 4", brand: "Fitbit", category: "smart-devices", subcategory: "Smartwatches", spec: "GPS, 6+ day battery", price: 95000, image: IMG.smartwatchFitbit },
];

export const formatNaira = (n: number) =>
  "₦" + n.toLocaleString("en-NG");
