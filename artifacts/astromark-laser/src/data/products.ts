import batteryWeldingImage from '@assets/astramark-product-images/battery-welding.png';
import customizedFiberMarkingImage from '@assets/astramark-product-images/customized-fiber-marking.png';
import co2CuttingImage from '@assets/astramark-product-images/co2-cutting-engraving.png';
import dieMouldWeldingImage from '@assets/astramark-product-images/die-mould-welding.png';
import fiberMarkingImage from '@assets/astramark-product-images/fiber-marking.png';
import fiberCuttingImage from '@assets/astramark-product-images/fiber-sheet-cutting.png';
import fiberWeldingImage from '@assets/astramark-product-images/fiber-welding.png';
import jewelleryCuttingImage from '@assets/astramark-product-images/jewellery-cutting-engraving.png';
import jewellerySolderingImage from '@assets/astramark-product-images/jewellery-soldering.png';
import onlineMarkingImage from '@assets/astramark-product-images/online-flying-marking.png';
import pipeCuttingImage from '@assets/astramark-product-images/pipe-cutting.png';
import uvMarkingImage from '@assets/astramark-product-images/uv-marking.png';

export type Product = {
  slug: string;
  name: string;
  category: 'Marking' | 'Cutting' | 'Welding' | 'Jewellery';
  image: string;
  summary: string;
  description: string;
  highlights: [string, string][];
  specifications: [string, string][];
  applications: string[];
  features?: string[];
};

const productDefinitions: Product[] = [
  {
    slug: 'fiber-laser-marking-engraving-machine',
    name: 'Fiber Laser Marking / Engraving Machine',
    category: 'Marking',
    image: fiberMarkingImage,
    summary: 'Fiber laser system with 20–200 W options and 100×100 mm to 300×300 mm working areas.',
    description: 'Fiber laser marking and engraving machine with multiple laser power and working-area options listed in the catalogue.',
    highlights: [['Laser power', '20–200 W'], ['Working area', '100×100 to 300×300 mm'], ['Laser type', 'Fiber laser']],
    specifications: [
      ['Laser type', 'Fiber laser'],
      ['Laser power', '20 W / 30 W / 50 W / 60 W / 100 W / 200 W'],
      ['Working area', '100×100 mm / 150×150 mm / 175×175 mm / 220×220 mm / 300×300 mm; customized available'],
      ['Voltage', 'Single phase, 220–230 V / 50 Hz'],
      ['Supported file formats', 'PLT, DXF, BMP, JPG, PNG'],
      ['Operating system', 'Windows compatible'],
      ['Suitable materials', 'Metals including stainless steel, mild steel, carbon steel, aluminum, brass, copper, bronze, titanium and nickel; gold, silver and platinum; coated or plated metals; ABS, PVC, POM, nylon and engineering plastics'],
    ],
    applications: ['Logo marking', 'Serial number and batch coding', 'QR code and barcode marking', 'Nameplate marking', 'Tool and die marking', 'Jewellery engraving', 'Industrial component marking', 'Promotional item engraving'],
  },
  {
    slug: 'fiber-laser-customized-model',
    name: 'Fiber Laser Customized Model',
    category: 'Marking',
    image: customizedFiberMarkingImage,
    summary: 'Customized fiber model with 4×4 ft or 4×8 ft large-bed options.',
    description: 'The catalogue lists a customized fiber laser model with large-bed working-area options.',
    highlights: [['Working area', '4×4 ft / 4×8 ft'], ['Laser power', '30–200 W'], ['Cooling', 'Air cooling']],
    specifications: [
      ['Laser type', 'Fiber laser; Raycus / JPT / IPG optional'],
      ['Working area', '4×4 ft / 4×8 ft large bed size'],
      ['Laser power options', '30 W / 50 W / 60 W / 100 W / 200 W'],
      ['Phase', 'Single phase, 220 V ±10%, 50 Hz'],
      ['Supported file formats', 'PLT, DXF, BMP, JPG, AI, PNG'],
      ['Operating system', 'EZCAD software; Windows-based control system'],
      ['Cooling system', 'Air cooling'],
    ],
    applications: ['Elevator panel marking and design engraving', 'Stainless steel sheet marking', 'Decorative metal sheet engraving', 'Glass frosting and surface marking', '4×8 ft large sheet customization work', 'Architectural and interior design engraving', 'Nameplates and industrial panels'],
  },
  {
    slug: 'fiber-laser-welding-machine',
    name: 'Fiber Laser Welding Machine',
    category: 'Welding',
    image: fiberWeldingImage,
    summary: 'Designed for high-speed, precise welding of metal materials with minimal heat distortion.',
    description: 'Fiber Laser Welding Machine is designed for high-speed, strong, and precise welding of metal materials with minimal heat distortion and smooth finishing.',
    highlights: [['Laser power', '1.5 kW / 2 kW / 3 kW'], ['Welding type', 'Handheld / automatic optional'], ['Cooling', 'Water cooling']],
    specifications: [
      ['Laser power', '1.5 kW / 2 kW / 3 kW'],
      ['Welding type', 'Handheld / automatic optional'],
      ['Welding thickness (approx.)', 'Mild steel: up to 6–8 mm depending on power; stainless steel: up to 6 mm; aluminum: up to 4–5 mm'],
      ['Cooling system', 'Water cooling'],
      ['Voltage', 'Three phase'],
      ['Suitable materials', 'Mild steel (MS), stainless steel (SS), aluminum, brass, carbon steel, galvanized sheet'],
    ],
    applications: ['Metal frames and structures', 'Sheet metal fabrication', 'Stainless steel furniture', 'Kitchen equipment', 'Automotive parts', 'Electrical cabinets'],
    features: ['High welding speed', 'Strong weld joints', 'Minimal heat distortion', 'Easy operation', 'Low maintenance'],
  },
  {
    slug: 'fiber-laser-cutting-machine-sheet-metal',
    name: 'Fiber Laser Cutting Machine (Sheet Metal)',
    category: 'Cutting',
    image: fiberCuttingImage,
    summary: 'High-speed, precision cutting for metal sheets with excellent edge quality.',
    description: 'Laser Cutting Machine is designed for high-speed and precision cutting of metal sheets with excellent edge quality and low operating cost. Ideal for industrial fabrication and manufacturing units.',
    highlights: [['Laser power', '1.5 kW / 2 kW / 3 kW / 6 kW'], ['Working area', '1325 / 1530 / 2040 / 2060; customized available'], ['Control system', 'CNC based']],
    specifications: [
      ['Laser type', 'Fiber laser'],
      ['Laser power', '1.5 kW / 2 kW / 3 kW / 6 kW'],
      ['Working area', '1325 / 1530 / 2040 / 2060; customized available'],
      ['Control system', 'CNC based'],
      ['Voltage', 'Three phase'],
      ['Suitable materials', 'Mild steel (MS), stainless steel (SS), aluminum, brass, copper, carbon steel, galvanized sheet'],
    ],
    applications: ['Decorative and signage cutting', 'Sheet metal fabrication', 'Electrical panels', 'Automotive parts', 'Machine components'],
    features: ['High cutting speed', 'Smooth edge finish', 'Low maintenance', 'High precision performance'],
  },
  {
    slug: 'uv-laser-marking-machine',
    name: 'UV Laser Marking Machine',
    category: 'Marking',
    image: uvMarkingImage,
    summary: 'High-precision, ultra-fine marking for sensitive and non-metal materials.',
    description: 'UV Laser Marking Machine is designed for high-precision and ultra-fine marking on sensitive and non-metal materials. It produces clean, high-contrast marking with minimal heat effect.',
    highlights: [['Laser power', '3 W / 5 W / 10 W / 15 W'], ['Working area', '100×100 / 175×175 / 300×300 mm'], ['Voltage', 'Single phase']],
    specifications: [
      ['Laser power', '3 W / 5 W / 10 W / 15 W'],
      ['Working area', '100×100 mm / 175×175 mm / 300×300 mm'],
      ['Supported file formats', 'PLT / DXF / JPG / PNG'],
      ['Voltage', 'Single phase'],
    ],
    applications: ['Mobile and electronic parts marking', 'PCB and micro component marking', 'Medical device marking', 'Cosmetic packaging marking', 'Pharmaceutical packaging', 'QR code and barcode marking', 'Logo and fine text engraving'],
    features: ['Ultra-fine marking', 'No burning or deformation', 'High precision and stability', 'Ideal for delicate materials'],
  },
  {
    slug: 'online-flying-laser-marking',
    name: 'Online Flying Laser Marking',
    category: 'Marking',
    image: onlineMarkingImage,
    summary: 'High-speed, permanent, ink-free marking for production lines.',
    description: 'The Fly Model Online Laser Printing Machine is designed for high-speed production line marking with permanent, ink-free technology.',
    highlights: [['Laser options', 'Fiber / CO₂ / UV'], ['Marking speed', 'Pipes: 150–200 m/min; bottles: 180–200 BPM'], ['Voltage', 'Single phase']],
    specifications: [
      ['Laser type options', 'Fiber laser / CO₂ laser / UV laser'],
      ['Laser power', 'Fiber: 30 W / 60 W / 100 W; CO₂: 30 W / 60 W; UV: 5 W / 10 W / 15 W'],
      ['Supported formats', 'PLT / DXF / JPG / PNG'],
      ['Marking speed', 'Pipe: 150–200 meters/min depending on material; bottles: 180–200 BPM'],
      ['Voltage', 'Single phase'],
      ['Suitable for', 'PVC and HDPE pipes, plastic bottles, cables and wires, packaging materials, cartons, labels, industrial products'],
    ],
    applications: ['Batch number printing', 'MRP and date coding', 'QR code and barcode marking', 'Logo printing', 'Variable data printing', 'Online production line marking'],
    features: ['Permanent marking', 'No ink or consumables', 'Low maintenance'],
  },
  {
    slug: 'co2-laser-marking-machine',
    name: 'CO₂ Laser Marking Machine',
    category: 'Marking',
    image: fiberMarkingImage,
    summary: 'Non-metal marking and engraving for industrial and packaging applications.',
    description: 'Co2 Laser Marking Machine is specially designed for marking and engraving on non-metal materials. It provides clean, high-speed, and permanent marking for industrial and packaging applications.',
    highlights: [['Laser power', '30 W / 60 W / 100 W'], ['Working area', '100×100 / 175×175 / 300×300 mm'], ['Voltage', 'Single phase']],
    specifications: [
      ['Laser power', '30 W / 60 W / 100 W'],
      ['Working area', '100×100 mm / 175×175 mm / 300×300 mm (optional)'],
      ['Supported file formats', 'PLT / DXF / JPG / PNG'],
      ['Voltage', 'Single phase'],
      ['Suitable materials', 'Acrylic, wood, MDF, leather, rubber, paper and cardboard, glass, ceramic, PVC, packaging materials'],
    ],
    applications: ['Logo marking', 'Serial number and batch coding', 'QR code and barcode marking', 'Nameplate marking', 'Tool and die marking', 'Jewellery engraving'],
    features: ['High-speed marking', 'Smooth engraving finish', 'Ideal for non-metal materials', 'Low maintenance'],
  },
  {
    slug: 'co2-laser-cutting-engraving-machine',
    name: 'CO₂ Laser Cutting & Engraving Machine',
    category: 'Cutting',
    image: co2CuttingImage,
    summary: 'High-precision cutting and engraving of non-metal materials.',
    description: 'Co2 Laser Cutting Machine is designed for high-precision cutting and engraving of non-metal materials. It is widely used in advertising, furniture, packaging, and craft industries.',
    highlights: [['Laser power', '60 W / 80 W / 100 W / 130 W / 150 W'], ['Working area', '600×400 to 1300×2500 mm'], ['Cooling', 'Water cooling']],
    specifications: [
      ['Laser power', '60 W / 80 W / 100 W / 130 W / 150 W'],
      ['Working area', '600×400 mm / 900×600 mm / 1300×900 mm / 1300×2500 mm; optional sizes available'],
      ['Cooling system', 'Water cooling'],
      ['Control system', 'CNC / DSP controller'],
      ['Voltage', 'Single phase'],
      ['Suitable materials', 'Acrylic, MDF and plywood, wood, leather, rubber, fabric, paper and cardboard, plastic (non-metal)'],
    ],
    applications: ['Acrylic letter cutting', 'Wooden craft', 'Cutting MDF and furniture', 'Design rubber stamp making', 'Garment and fabric cutting', 'Packaging and prototype cutting'],
    features: ['Smooth cutting edges', 'High engraving quality', 'Low maintenance', 'Ideal for non-metal industries'],
  },
  {
    slug: 'battery-laser-welding-machine',
    name: 'Battery Laser Welding Machine',
    category: 'Welding',
    image: batteryWeldingImage,
    summary: 'Fiber laser welding system with a customized fixture-based working area.',
    description: 'The catalogue lists a fixture-based fiber laser welding system for battery manufacturing and precision thin-sheet metal applications.',
    highlights: [['Laser power', '1500 W / 2000 W / 3000 W'], ['Working area', 'Customized fixture-based system'], ['Cooling', 'Industrial water chiller']],
    specifications: [
      ['Model type', 'Galvo head welding system / nozzle head welding system'],
      ['Laser type', 'Fiber laser welding system'],
      ['Working area', 'Customized fixture-based system'],
      ['Laser power options', '1500 W / 2000 W / 3000 W (3 kW)'],
      ['Phase', 'Three phase, 380 V'],
      ['Supported file formats', 'CAD compatible'],
      ['Operating system', 'CNC / PLC controlled system'],
      ['Cooling system', 'Industrial water chiller cooling'],
    ],
    applications: ['Lithium battery tab welding', 'Battery pack assembly lines', 'EV battery manufacturing', 'Precision thin sheet metal welding', 'Busbar welding', 'Copper and aluminum welding'],
  },
  {
    slug: 'die-mould-welding-machine',
    name: 'Die Mould Welding Machine',
    category: 'Welding',
    image: dieMouldWeldingImage,
    summary: 'Pulse YAG laser system with a microscope-based precision work area.',
    description: 'The catalogue lists a pulse YAG laser welding system with a microscope-based precision work area for mould and die repair applications.',
    highlights: [['Laser type', 'Pulse YAG laser'], ['Working area', '600×600 mm'], ['Laser power', '300 W / 400 W']],
    specifications: [
      ['Laser type', 'Pulse YAG laser'],
      ['Working area', '600×600 mm; microscope-based precision work area'],
      ['Laser power options', '300 W / 400 W'],
      ['Phase', 'Single phase, 220 V / three phase optional'],
      ['Supported file formats', 'Not required; manual welding operation'],
      ['Operating system', 'Touch panel control system'],
      ['Cooling system', 'Water cooling system'],
    ],
    applications: ['Mould and die repair welding', 'Precision spot welding', 'Tooling repair', 'Injection mould maintenance', 'Crack filling and edge rebuilding', 'Fine metal component repair'],
    features: ['High precision pulse welding', 'Minimal heat affected zone', 'Ideal for mould industry', 'Microscope-based accuracy', 'Strong weld with low distortion', 'Stable water-cooled performance'],
  },
  {
    slug: 'jewellery-cutting-engraving-machine',
    name: 'Jewellery Cutting & Engraving Machine',
    category: 'Jewellery',
    image: jewelleryCuttingImage,
    summary: 'High-precision engraving and fine cutting for precious metals.',
    description: 'Jewellery Engraving & Cutting Machine is designed for high-precision engraving and fine cutting on gold, silver, platinum, and other precious metals. Ideal for jewellery manufacturers and workshops requiring detailed and permanent marking.',
    highlights: [['Laser type', 'Fiber / UV optional'], ['Laser power', '20–100 W'], ['Working area', '100×100 to 200×200 mm']],
    specifications: [
      ['Laser type', 'Fiber laser / UV laser optional'],
      ['Laser power', '20 W / 30 W / 50 W / 60 W / 80 W / 100 W'],
      ['Working area', '100×100 mm / 150×150 mm / 175×175 mm / 200×200 mm'],
      ['Supported file formats', 'PLT / DXF / JPG / PNG'],
      ['Cooling system', 'Air cooling'],
      ['Voltage', 'Single phase, 220 V'],
      ['Suitable materials', 'Gold, silver, platinum, brass, copper, stainless steel'],
    ],
    applications: ['Name engraving on rings and pendants', 'Logo marking', 'Photo engraving', 'Hallmark marking', 'Fine pattern cutting', 'Custom jewellery design'],
    features: ['High precision detailing', 'Smooth and clean finish', 'Permanent marking', 'User-friendly operation'],
  },
  {
    slug: 'jewellery-laser-soldering-machine',
    name: 'Jewellery Laser Soldering Machine',
    category: 'Jewellery',
    image: jewellerySolderingImage,
    summary: 'Precision welding and repair for gold, silver, platinum, and other jewellery.',
    description: 'Jewellery Laser Soldering Machine is specially designed for precision welding and repairing of gold, silver, platinum, and other precious jewellery items without damaging surrounding areas.',
    highlights: [['Laser type', 'YAG laser'], ['Laser power', '100 W / 150 W / 200 W'], ['Wavelength', '1064 nm']],
    specifications: [
      ['Laser type', 'YAG laser'],
      ['Laser power', '100 W / 150 W / 200 W'],
      ['Laser wavelength', '1064 nm'],
      ['Cooling system', 'Water cooling'],
      ['Microscope', 'High-resolution microscope with CCD optional'],
      ['Voltage', 'Single phase'],
      ['Suitable materials', 'Gold, silver, platinum, titanium, stainless steel, brass'],
    ],
    applications: ['Ring resizing and repair', 'Chain repair', 'Prong and claw repair', 'Welding stone setting', 'Repair porosity filling', 'Micro welding of fine jewellery'],
    features: ['Precise micro welding', 'No damage to gemstones', 'Strong and clean joints', 'Low heat effect area', 'Easy operation'],
  },
  {
    slug: 'pipe-laser-cutting-machine',
    name: 'Pipe Laser Cutting Machine',
    category: 'Cutting',
    image: pipeCuttingImage,
    summary: 'High-precision, high-speed cutting of round, square, and rectangular pipes.',
    description: 'Laser Pipe Cutting Machine is specially designed for high-precision and high-speed cutting of round, square, and rectangular pipes with smooth edge finish and accurate results.',
    highlights: [['Laser power', '1.5 kW / 2 kW / 3 kW'], ['Pipe length', 'Up to 6 m; optional customization'], ['Control system', 'CNC based']],
    specifications: [
      ['Laser type', 'Fiber laser'],
      ['Laser power', '1.5 kW / 2 kW / 3 kW'],
      ['Pipe length capacity', 'Up to 6 meters; optional customization'],
      ['Pipe diameter range', 'As per model specification'],
      ['Control system', 'CNC based'],
      ['Voltage', 'Three phase'],
      ['Suitable materials', 'Mild steel (MS), stainless steel (SS), aluminum, brass, carbon steel, galvanized pipes'],
      ['Suitable pipe shapes', 'Round pipe, square pipe, rectangular pipe, oval pipe, channel and special profiles'],
    ],
    applications: ['Furniture manufacturing', 'Automotive components', 'Structural fabrication', 'Fitness equipment', 'Railings and gates'],
  },
  {
    slug: '3d-fiber-laser-engraving-machine',
    name: '3D Fiber Laser Engraving Machine',
    category: 'Marking',
    image: fiberMarkingImage,
    summary: '3D dynamic-focus fiber laser system for deep and curved-surface engraving.',
    description: 'The catalogue lists a 3D dynamic-focus fiber laser system for deep engraving, embossing, mould engraving, curved-surface marking, and 3D logo engraving.',
    highlights: [['Laser type', '3D dynamic focus fiber laser'], ['Laser power', '30 W / 50 W / 60 W / 100 W'], ['Working area', '150×150 / 300×300 mm']],
    specifications: [
      ['Laser type', '3D dynamic focus fiber laser'],
      ['Working area', '150×150 mm / 300×300 mm'],
      ['Laser power', '30 W / 50 W / 60 W / 100 W'],
      ['Phase', 'Single phase, 220 V'],
      ['Supported files', 'STL, DXF, PLT, AI'],
      ['Operating system', 'EZCAD 3 / 3D marking software'],
      ['Cooling system', 'Air cooling'],
    ],
    applications: ['Deep engraving', 'Embossing', 'Mould engraving', 'Curved surface marking', '3D logo engraving'],
  },
];

const catalogueOrder = [
  'fiber-laser-marking-engraving-machine',
  'fiber-laser-customized-model',
  'fiber-laser-welding-machine',
  'fiber-laser-cutting-machine-sheet-metal',
  'uv-laser-marking-machine',
  'online-flying-laser-marking',
  'co2-laser-marking-machine',
  'co2-laser-cutting-engraving-machine',
  'battery-laser-welding-machine',
  'die-mould-welding-machine',
  'pipe-laser-cutting-machine',
  '3d-fiber-laser-engraving-machine',
  'jewellery-cutting-engraving-machine',
  'jewellery-laser-soldering-machine',
];

const productsBySlug = new Map(productDefinitions.map((product) => [product.slug, product]));

export const products = catalogueOrder.map((slug) => {
  const product = productsBySlug.get(slug);
  if (!product) throw new Error(`Missing catalogue product definition: ${slug}`);
  return product;
});
