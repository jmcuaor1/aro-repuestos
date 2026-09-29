import { useState, useEffect, useRef } from 'react'

// ─── Contact info ───────────────────────────────────────────────────────────

const WHATSAPP_NUMBER = '573112514536'
const PHONE_DISPLAY = '+57 311 251 4536'
const EMAIL = 'microfundicionesperez@hotmail.com'
const ADDRESS = 'Calle 30 Sur #12H-94'
const CITY = 'Bogotá D.C.'
const ADDRESS_FULL = `${ADDRESS}, ${CITY}, Colombia`

function waLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

const MAPS_EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(ADDRESS_FULL)}&output=embed`
const MAPS_DIRECTIONS_LINK = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(ADDRESS_FULL)}`

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Repuestos', href: '#catalogo' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Ventas al por mayor', href: '#mayorista' },
  { label: 'Contacto', href: '#contacto' },
]

const NAV_IDS = NAV_LINKS.map(l => l.href.slice(1))

const TRUST_ITEMS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
      </svg>
    ),
    title: 'Fabricantes',
    desc: 'Producción directa de repuestos',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
    title: 'Distribución al por mayor',
    desc: 'Ventas en volumen para negocios',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
      </svg>
    ),
    title: 'Repuestos especializados',
    desc: 'Catálogo amplio y actualizado',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    ),
    title: 'Atención comercial',
    desc: 'Para negocios y distribuidores',
  },
]

const CATEGORIES = [
  { id: 'all', label: 'Todos' },
  { id: 'licuadora', label: 'Licuadoras' },
  { id: 'olla', label: 'Ollas a presión' },
]

const SUBCATEGORIES: Record<string, { id: string; label: string }[]> = {
  licuadora: [
    { id: 'cuchillas', label: 'Cuchillas' },
    { id: 'bases', label: 'Bases' },
    { id: 'tapas', label: 'Tapas' },
    { id: 'acoples', label: 'Acoples' },
    { id: 'empaques', label: 'Empaques' },
  ],
  olla: [
    { id: 'cauchos', label: 'Cauchos' },
    { id: 'fusibles', label: 'Fusibles' },
    { id: 'pitos-valvulas', label: 'Pitos y válvulas' },
    { id: 'manijas', label: 'Manijas' },
  ],
}

const PRODUCTS = [
  {
    id: 'auxiliar-olla-express',
    name: 'Auxiliar olla Express',
    category: 'olla',
    subcategory: 'manijas',
    brand: 'Express',
    desc: 'Manija o mango de repuesto para olla a presión Express.',
    img: '/olla-presion/manijas/auxiliar-olla-express.jpg',
  },
  {
    id: 'manija-olla-express-negra',
    name: 'Manija olla Express negra',
    category: 'olla',
    subcategory: 'manijas',
    brand: 'Express',
    desc: 'Manija o mango de repuesto para olla a presión Express.',
    img: '/olla-presion/manijas/manija-olla-express-negra.jpg',
  },
  {
    id: 'manija-olla-express-roja',
    name: 'Manija olla Express roja',
    category: 'olla',
    subcategory: 'manijas',
    brand: 'Express',
    desc: 'Manija o mango de repuesto para olla a presión Express.',
    img: '/olla-presion/manijas/manija-olla-express-roja.jpg',
  },
  {
    id: 'empaque-samurai',
    name: 'Empaque Samurai',
    category: 'licuadora',
    subcategory: 'empaques',
    brand: 'Samurai',
    desc: 'Empaque de repuesto para licuadora Samurai.',
    img: '/licuadora/empaques/empaque-samurai.jpg',
  },
  {
    id: 'base-oster-6-puntas',
    name: 'Base Oster 6 puntas',
    category: 'licuadora',
    subcategory: 'bases',
    brand: 'Oster',
    desc: 'Base de repuesto para licuadora Oster.',
    img: '/licuadora/bases/base-oster-6-puntas.jpg',
  },
  {
    id: 'base-samurai-antigua',
    name: 'Base Samurai antigua',
    category: 'licuadora',
    subcategory: 'bases',
    brand: 'Samurai',
    desc: 'Base de repuesto para licuadora Samurai.',
    img: '/licuadora/bases/base-samurai-antigua.jpg',
  },
  {
    id: 'base-optimix',
    name: 'Base Optimix',
    category: 'licuadora',
    subcategory: 'bases',
    brand: 'Optimix',
    desc: 'Base de repuesto para licuadora Optimix.',
    img: '/licuadora/bases/base-optimix.jpg',
  },
  {
    id: 'base-samurai',
    name: 'Base Samurai',
    category: 'licuadora',
    subcategory: 'bases',
    brand: 'Samurai',
    desc: 'Base de repuesto para licuadora Samurai.',
    img: '/licuadora/bases/base-samurai.jpg',
  },
  {
    id: 'base-oster-3-puntas',
    name: 'Base Oster 3 puntas',
    category: 'licuadora',
    subcategory: 'bases',
    brand: 'Oster',
    desc: 'Base de repuesto para licuadora Oster.',
    img: '/licuadora/bases/base-oster-3-puntas.jpg',
  },
  {
    id: 'base-black-decker',
    name: 'Base Black+Decker',
    category: 'licuadora',
    subcategory: 'bases',
    brand: 'Black+Decker',
    desc: 'Base de repuesto para licuadora Black+Decker.',
    img: '/licuadora/bases/base-black-decker.jpg',
  },
  {
    id: 'tapa-black-decker',
    name: 'Tapa Black+Decker',
    category: 'licuadora',
    subcategory: 'tapas',
    brand: 'Black+Decker',
    desc: 'Tapa de repuesto para licuadora Black+Decker.',
    img: '/licuadora/tapas/tapa-black-decker.jpg',
  },
  {
    id: 'tapa-samurai',
    name: 'Tapa Samurai',
    category: 'licuadora',
    subcategory: 'tapas',
    brand: 'Samurai',
    desc: 'Tapa de repuesto para licuadora Samurai.',
    img: '/licuadora/tapas/tapa-samurai.jpg',
  },
  {
    id: 'tapa-optimix',
    name: 'Tapa Optimix',
    category: 'licuadora',
    subcategory: 'tapas',
    brand: 'Optimix',
    desc: 'Tapa de repuesto para licuadora Optimix.',
    img: '/licuadora/tapas/tapa-optimix.jpg',
  },
  {
    id: 'cuchilla-home-element',
    name: 'Cuchilla Home Element',
    category: 'licuadora',
    subcategory: 'cuchillas',
    brand: 'Home Element',
    desc: 'Cuchilla de repuesto para licuadora Home Element.',
    img: '/licuadora/cuchillas/cuchilla-home-element.jpg',
  },
  {
    id: 'tapa-oster',
    name: 'Tapa Oster',
    category: 'licuadora',
    subcategory: 'tapas',
    brand: 'Oster',
    desc: 'Tapa de repuesto para licuadora Oster.',
    img: '/licuadora/tapas/tapa-oster.jpg',
  },
  {
    id: 'cuchilla-corona',
    name: 'Cuchilla Corona',
    category: 'licuadora',
    subcategory: 'cuchillas',
    brand: 'Corona',
    desc: 'Cuchilla de repuesto para licuadora Corona.',
    img: '/licuadora/cuchillas/cuchilla-corona.jpg',
  },
  {
    id: 'cuchilla-samurai-optimix',
    name: 'Cuchilla Samurai / Optimix',
    category: 'licuadora',
    subcategory: 'cuchillas',
    brand: 'Samurai, Optimix',
    desc: 'Cuchilla de repuesto para licuadora Samurai, Optimix.',
    img: '/licuadora/cuchillas/cuchilla-samurai-optimix.jpg',
  },
  {
    id: 'caucho-india-8-10-litros',
    name: 'Caucho India 8-10 litros',
    category: 'olla',
    subcategory: 'cauchos',
    brand: 'India (siliconado 100%)',
    desc: 'Caucho de sellado para olla a presión India (siliconado 100%).',
    img: '/olla-presion/cauchos/caucho-india-8-10-litros.jpg',
  },
  {
    id: 'cuchilla-samurai',
    name: 'Cuchilla Samurai',
    category: 'licuadora',
    subcategory: 'cuchillas',
    brand: 'Samurai',
    desc: 'Cuchilla de repuesto para licuadora Samurai.',
    img: '/licuadora/cuchillas/cuchilla-samurai.jpg',
  },
  {
    id: 'caucho-india-2-3-litros',
    name: 'Caucho India 2-3 litros',
    category: 'olla',
    subcategory: 'cauchos',
    brand: 'India (siliconado 100%)',
    desc: 'Caucho de sellado para olla a presión India (siliconado 100%).',
    img: '/olla-presion/cauchos/caucho-india-2-3-litros.jpg',
  },
  {
    id: 'caucho-panex-goma-8-10-litros',
    name: 'Caucho Panex goma 8-10 litros',
    category: 'olla',
    subcategory: 'cauchos',
    brand: 'Panex',
    desc: 'Caucho de sellado para olla a presión Panex.',
    img: '/olla-presion/cauchos/caucho-panex-goma-8-10-litros.jpg',
  },
  {
    id: 'caucho-panex-goma-4-6-litros',
    name: 'Caucho Panex goma 4-6 litros',
    category: 'olla',
    subcategory: 'cauchos',
    brand: 'Panex',
    desc: 'Caucho de sellado para olla a presión Panex.',
    img: '/olla-presion/cauchos/caucho-panex-goma-4-6-litros.jpg',
  },
  {
    id: 'caucho-india-4-6-litros',
    name: 'Caucho India 4-6 litros',
    category: 'olla',
    subcategory: 'cauchos',
    brand: 'India (siliconado 100%)',
    desc: 'Caucho de sellado para olla a presión India (siliconado 100%).',
    img: '/olla-presion/cauchos/caucho-india-4-6-litros.jpg',
  },
  {
    id: 'caucho-panex-silicona-8-10-litros',
    name: 'Caucho Panex silicona 8-10 litros',
    category: 'olla',
    subcategory: 'cauchos',
    brand: 'Panex',
    desc: 'Caucho de sellado para olla a presión Panex.',
    img: '/olla-presion/cauchos/caucho-panex-silicona-8-10-litros.jpg',
  },
  {
    id: 'caucho-panex-silicona-4-6-litros',
    name: 'Caucho Panex silicona 4-6 litros',
    category: 'olla',
    subcategory: 'cauchos',
    brand: 'Panex',
    desc: 'Caucho de sellado para olla a presión Panex.',
    img: '/olla-presion/cauchos/caucho-panex-silicona-4-6-litros.jpg',
  },
  {
    id: 'caucho-panex-silicona-2-3-litros',
    name: 'Caucho Panex silicona 2-3 litros',
    category: 'olla',
    subcategory: 'cauchos',
    brand: 'Panex',
    desc: 'Caucho de sellado para olla a presión Panex.',
    img: '/olla-presion/cauchos/caucho-panex-silicona-2-3-litros.jpg',
  },
  {
    id: 'caucho-panex-goma-2-3-litros',
    name: 'Caucho Panex goma 2-3 litros',
    category: 'olla',
    subcategory: 'cauchos',
    brand: 'Panex',
    desc: 'Caucho de sellado para olla a presión Panex.',
    img: '/olla-presion/cauchos/caucho-panex-goma-2-3-litros.jpg',
  },
  {
    id: 'pito-mazal',
    name: 'Pito Mazal',
    category: 'olla',
    subcategory: 'pitos-valvulas',
    brand: 'Mazal',
    desc: 'Pito o válvula de seguridad para olla a presión Mazal.',
    img: '/olla-presion/pitos-valvulas/pito-mazal.jpg',
  },
  {
    id: 'cuchilla-black-decker-pequena',
    name: 'Cuchilla Black+Decker pequeña',
    category: 'licuadora',
    subcategory: 'cuchillas',
    brand: 'Black+Decker',
    desc: 'Cuchilla de repuesto para licuadora Black+Decker.',
    img: '/licuadora/cuchillas/cuchilla-black-decker-pequena.jpg',
  },
  {
    id: 'fusible-silicona-grande',
    name: 'Fusible silicona grande',
    category: 'olla',
    subcategory: 'fusibles',
    brand: 'Universal',
    desc: 'Fusible de seguridad para olla a presión Universal.',
    img: '/olla-presion/fusibles/fusible-silicona-grande.jpg',
  },
  {
    id: 'cuchilla-oster-picahielo',
    name: 'Cuchilla Oster (picahielo, en caja)',
    category: 'licuadora',
    subcategory: 'cuchillas',
    brand: 'Oster',
    desc: 'Cuchilla de repuesto para licuadora Oster.',
    img: '/licuadora/cuchillas/cuchilla-oster-picahielo.jpg',
  },
  {
    id: 'cuchilla-black-decker-grande',
    name: 'Cuchilla Black+Decker grande',
    category: 'licuadora',
    subcategory: 'cuchillas',
    brand: 'Black+Decker',
    desc: 'Cuchilla de repuesto para licuadora Black+Decker.',
    img: '/licuadora/cuchillas/cuchilla-black-decker-grande.jpg',
  },
  {
    id: 'fusible-imusa-pequeno',
    name: 'Fusible Imusa pequeño',
    category: 'olla',
    subcategory: 'fusibles',
    brand: 'Imusa',
    desc: 'Fusible de seguridad para olla a presión Imusa.',
    img: '/olla-presion/fusibles/fusible-imusa-pequeno.jpg',
  },
  {
    id: 'fusible-universal-pequeno',
    name: 'Fusible universal pequeño',
    category: 'olla',
    subcategory: 'fusibles',
    brand: 'Universal',
    desc: 'Fusible de seguridad para olla a presión Universal.',
    img: '/olla-presion/fusibles/fusible-universal-pequeno.jpg',
  },
  {
    id: 'fusible-silicona-pequeno',
    name: 'Fusible silicona pequeño',
    category: 'olla',
    subcategory: 'fusibles',
    brand: 'Universal',
    desc: 'Fusible de seguridad para olla a presión Universal.',
    img: '/olla-presion/fusibles/fusible-silicona-pequeno.jpg',
  },
  {
    id: 'pito-corona',
    name: 'Pito Corona',
    category: 'olla',
    subcategory: 'pitos-valvulas',
    brand: 'Corona',
    desc: 'Pito o válvula de seguridad para olla a presión Corona.',
    img: '/olla-presion/pitos-valvulas/pito-corona.jpg',
  },
  {
    id: 'manija-corona-original',
    name: 'Manija Corona original',
    category: 'olla',
    subcategory: 'manijas',
    brand: 'Corona',
    desc: 'Manija o mango de repuesto para olla a presión Corona.',
    img: '/olla-presion/manijas/manija-corona-original.jpg',
  },
  {
    id: 'acople-kelley',
    name: 'Acople Kelley',
    category: 'licuadora',
    subcategory: 'acoples',
    brand: 'Kelley',
    desc: 'Acople de transmisión para licuadora Kelley.',
    img: '/licuadora/acoples/acople-kelley.jpg',
  },
  {
    id: 'mango-olla-imusa-original',
    name: 'Mango olla Imusa original',
    category: 'olla',
    subcategory: 'manijas',
    brand: 'Imusa',
    desc: 'Manija o mango de repuesto para olla a presión Imusa.',
    img: '/olla-presion/manijas/mango-olla-imusa-original.jpg',
  },
  {
    id: 'pito-imusa',
    name: 'Pito Imusa',
    category: 'olla',
    subcategory: 'pitos-valvulas',
    brand: 'Imusa',
    desc: 'Pito o válvula de seguridad para olla a presión Imusa.',
    img: '/olla-presion/pitos-valvulas/pito-imusa.jpg',
  },
  {
    id: 'pito-campana-universal-original',
    name: 'Pito campana universal original',
    category: 'olla',
    subcategory: 'pitos-valvulas',
    brand: 'Universal',
    desc: 'Pito o válvula de seguridad para olla a presión Universal.',
    img: '/olla-presion/pitos-valvulas/pito-campana-universal-original.jpg',
  },
  {
    id: 'cuchilla-samurai-original',
    name: 'Cuchilla Samurai original',
    category: 'licuadora',
    subcategory: 'cuchillas',
    brand: 'Samurai',
    desc: 'Cuchilla de repuesto para licuadora Samurai.',
    img: '/licuadora/cuchillas/cuchilla-samurai-original.jpg',
  },
  {
    id: 'caucho-panex-azul-siliconado-8-10-litros',
    name: 'Caucho Panex azul siliconado 8-10 litros',
    category: 'olla',
    subcategory: 'cauchos',
    brand: 'Panex',
    desc: 'Caucho de sellado para olla a presión Panex.',
    img: '/olla-presion/cauchos/caucho-panex-azul-siliconado-8-10-litros.jpg',
  },
  {
    id: 'acople-samurai-motor-semi',
    name: 'Acople Samurai motor semi',
    category: 'licuadora',
    subcategory: 'acoples',
    brand: 'Samurai',
    desc: 'Acople de transmisión para licuadora Samurai.',
    img: '/licuadora/acoples/acople-samurai-motor-semi.jpg',
  },
  {
    id: 'acople-chino-motor',
    name: 'Acople chino motor',
    category: 'licuadora',
    subcategory: 'acoples',
    brand: 'Genérico (chino)',
    desc: 'Acople de transmisión para licuadora Genérico (chino).',
    img: '/licuadora/acoples/acople-chino-motor.jpg',
  },
  {
    id: 'caucho-nova-universal-silicona-4-6-litros',
    name: 'Caucho Nova universal silicona 4-6 litros',
    category: 'olla',
    subcategory: 'cauchos',
    brand: 'Nova / Universal',
    desc: 'Caucho de sellado para olla a presión Nova / Universal.',
    img: '/olla-presion/cauchos/caucho-nova-universal-silicona-4-6-litros.jpg',
  },
  {
    id: 'acople-optimix-samurai-original',
    name: 'Acople Optimix / Samurai original',
    category: 'licuadora',
    subcategory: 'acoples',
    brand: 'Optimix, Samurai',
    desc: 'Acople de transmisión para licuadora Optimix, Samurai.',
    img: '/licuadora/acoples/acople-optimix-samurai-original.jpg',
  },
  {
    id: 'caucho-universal-original-4-6-litros',
    name: 'Caucho Universal original 4-6 litros',
    category: 'olla',
    subcategory: 'cauchos',
    brand: 'Universal',
    desc: 'Caucho de sellado para olla a presión Universal.',
    img: '/olla-presion/cauchos/caucho-universal-original-4-6-litros.jpg',
  },
  {
    id: 'acople-corona',
    name: 'Acople Corona',
    category: 'licuadora',
    subcategory: 'acoples',
    brand: 'Corona',
    desc: 'Acople de transmisión para licuadora Corona.',
    img: '/licuadora/acoples/acople-corona.jpg',
  },
  {
    id: 'acople-samurai-cuchilla',
    name: 'Acople Samurai cuchilla',
    category: 'licuadora',
    subcategory: 'acoples',
    brand: 'Samurai',
    desc: 'Acople de transmisión para licuadora Samurai.',
    img: '/licuadora/acoples/acople-samurai-cuchilla.jpg',
  },
  {
    id: 'caucho-panex-azul-siliconado-4-6-litros',
    name: 'Caucho Panex azul siliconado 4-6 litros',
    category: 'olla',
    subcategory: 'cauchos',
    brand: 'Panex',
    desc: 'Caucho de sellado para olla a presión Panex.',
    img: '/olla-presion/cauchos/caucho-panex-azul-siliconado-4-6-litros.jpg',
  },
  {
    id: 'base-optimix-2',
    name: 'Base Optimix (foto 2)',
    category: 'licuadora',
    subcategory: 'bases',
    brand: 'Optimix',
    desc: 'Base de repuesto para licuadora Optimix.',
    img: '/licuadora/bases/base-optimix-2.jpg',
  },
  {
    id: 'manija-olla-universal',
    name: 'Manija olla universal',
    category: 'olla',
    subcategory: 'manijas',
    brand: 'Universal',
    desc: 'Manija o mango de repuesto para olla a presión Universal.',
    img: '/olla-presion/manijas/manija-olla-universal.jpg',
  },
  {
    id: 'caucho-imusa-7-5-litros',
    name: 'Caucho Imusa 7.5 litros',
    category: 'olla',
    subcategory: 'cauchos',
    brand: 'Imusa',
    desc: 'Caucho de sellado para olla a presión Imusa.',
    img: '/olla-presion/cauchos/caucho-imusa-7-5-litros.jpg',
  },
  {
    id: 'acople-universal',
    name: 'Acople universal',
    category: 'licuadora',
    subcategory: 'acoples',
    brand: 'Universal',
    desc: 'Acople de transmisión para licuadora Universal.',
    img: '/licuadora/acoples/acople-universal.jpg',
  },
  {
    id: 'tubo-escape-universal',
    name: 'Tubo de escape universal',
    category: 'olla',
    subcategory: 'pitos-valvulas',
    brand: 'Universal',
    desc: 'Pito o válvula de seguridad para olla a presión Universal.',
    img: '/olla-presion/pitos-valvulas/tubo-escape-universal.jpg',
  },
  {
    id: 'pito-imusa-original',
    name: 'Pito Imusa original',
    category: 'olla',
    subcategory: 'pitos-valvulas',
    brand: 'Imusa',
    desc: 'Pito o válvula de seguridad para olla a presión Imusa.',
    img: '/olla-presion/pitos-valvulas/pito-imusa-original.jpg',
  },
]

const WHOLESALE_BENEFITS = [
  'Venta al por mayor',
  'Variedad de referencias',
  'Fabricación y distribución directa',
  'Atención comercial personalizada',
  'Catálogo actualizado',
]

// ─── Scroll utilities ───────────────────────────────────────────────────────

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          observer.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const handler = () => {
      const scrollPos = window.scrollY + 140
      let current = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= scrollPos) current = id
      }
      setActive(current)
    }
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [ids])

  return active
}

// ─── Privacy consent (Ley 1581 de 2012) ────────────────────────────────────────

let privacyDialogEl: HTMLDialogElement | null = null
function openPrivacyPolicy() {
  privacyDialogEl?.showModal()
}

function PrivacyPolicyDialog() {
  return (
    <dialog
      ref={el => { privacyDialogEl = el }}
      className="rounded-sm p-0 w-[calc(100%-2rem)] max-w-lg shadow-2xl"
    >
      <div className="bg-white p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
        <h3 className="text-[#1C1F23] font-bold text-xl mb-4">Política de tratamiento de datos personales</h3>
        <div className="text-[#6B7280] text-sm leading-relaxed space-y-3">
          <p>
            ARO recopila los datos que usted proporciona en nuestros formularios (nombre, empresa, teléfono y correo electrónico)
            con el único fin de gestionar su solicitud comercial: brindar información sobre disponibilidad de repuestos, enviar
            catálogos y dar seguimiento a su consulta.
          </p>
          <p>
            Sus datos no se venden ni se comparten con terceros, salvo obligación legal, y se conservan mientras exista una
            relación comercial vigente o mientras sea necesario para los fines aquí descritos.
          </p>
          <p>
            Conforme a la Ley 1581 de 2012 y sus decretos reglamentarios, usted tiene derecho a conocer, actualizar, rectificar y
            suprimir sus datos personales, así como a revocar esta autorización en cualquier momento, escribiendo a{' '}
            <span className="font-medium text-[#1C1F23]">{EMAIL}</span>.
          </p>
        </div>
        <button
          type="button"
          onClick={() => privacyDialogEl?.close()}
          className="mt-6 w-full bg-[#1C1F23] hover:bg-[#E4751F] text-white font-semibold py-3 rounded-sm text-sm transition-colors"
        >
          Cerrar
        </button>
      </div>
    </dialog>
  )
}

function PrivacyConsentField() {
  return (
    <label className="flex items-start gap-3 text-xs text-[#6B7280] leading-snug">
      <input type="checkbox" required className="mt-0.5 accent-[#E4751F]" />
      <span>
        Acepto el tratamiento de mis datos personales para fines comerciales y de contacto, conforme a la Ley 1581 de 2012.{' '}
        <button type="button" onClick={openPrivacyPolicy} className="text-[#E4751F] font-medium hover:underline">
          Ver política
        </button>
        .
      </span>
    </label>
  )
}

// ─── Components ──────────────────────────────────────────────────────────────

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const activeId = useActiveSection(NAV_IDS)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#1C1F23] shadow-xl' : 'bg-[#1C1F23]/95 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between h-16 md:h-18">
        {/* Logo */}
        <a href="#inicio" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 bg-[#E4751F] rounded flex items-center justify-center">
            <span className="font-bold text-white text-lg leading-none" style={{ fontFamily: 'Poppins, sans-serif' }}>A</span>
          </div>
          <span className="text-white font-bold text-xl tracking-wider" style={{ fontFamily: 'Poppins, sans-serif' }}>
            ARO
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map(l => (
            <a
              key={l.href}
              href={l.href}
              className={`relative text-sm font-medium transition-colors duration-200 tracking-wide py-2 ${
                activeId === l.href.slice(1) ? 'text-white' : 'text-white/75 hover:text-white'
              }`}
            >
              {l.label}
              <span
                className={`absolute left-0 -bottom-0.5 h-0.5 bg-[#E4751F] transition-all duration-300 ${
                  activeId === l.href.slice(1) ? 'w-full' : 'w-0'
                }`}
              />
            </a>
          ))}
        </nav>

        {/* CTA + hamburger */}
        <div className="flex items-center gap-3">
          <a
            href="#catalogo"
            className="hidden md:inline-flex items-center gap-2 bg-[#E4751F] hover:bg-[#C45F0F] text-white text-sm font-semibold px-5 py-2.5 rounded transition-colors duration-200"
          >
            Solicitar catálogo
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-white p-2"
            aria-label="Menú"
          >
            {menuOpen ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-[#1C1F23] border-t border-white/10 px-5 py-4 flex flex-col gap-1">
          {NAV_LINKS.map(l => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-white/80 hover:text-white py-3 text-base font-medium border-b border-white/5 transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#catalogo"
            onClick={() => setMenuOpen(false)}
            className="mt-3 inline-flex items-center justify-center bg-[#E4751F] text-white font-semibold py-3 px-6 rounded text-base"
          >
            Solicitar catálogo
          </a>
        </div>
      )}
    </header>
  )
}

function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#1C1F23] pt-16"
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1606337321936-02d1b1a4d5ef?w=1600&h=900&fit=crop&auto=format')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#1C1F23] via-[#1C1F23]/90 to-[#1C1F23]/50" />

      {/* Orange accent line */}
      <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-[#E4751F]" />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8 py-20 grid lg:grid-cols-2 gap-12 items-center w-full">
        {/* Text */}
        <div>
          <div className="inline-flex items-center gap-2 bg-[#E4751F]/15 border border-[#E4751F]/30 rounded-sm px-3 py-1.5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E4751F]" />
            <span className="text-[#E4751F] text-xs font-semibold tracking-widest uppercase">Colombia · B2B · Mayorista</span>
          </div>

          <h1 className="text-white text-4xl md:text-5xl xl:text-6xl font-bold leading-[1.1] mb-6">
            Repuestos para licuadoras y ollas a presión,{' '}
            <span className="text-[#E4751F]">al por mayor.</span>
          </h1>

          <p className="text-white/65 text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
            Fabricamos y distribuimos repuestos para negocios, distribuidores y profesionales en Colombia.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#catalogo"
              className="inline-flex items-center justify-center gap-2 bg-[#E4751F] hover:bg-[#C45F0F] text-white font-semibold text-base px-7 py-3.5 rounded transition-colors duration-200"
            >
              Ver repuestos
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
              </svg>
            </a>
            <a
              href="#contacto"
              className="inline-flex items-center justify-center gap-2 border border-white/30 hover:border-white/60 text-white font-semibold text-base px-7 py-3.5 rounded transition-colors duration-200"
            >
              Solicitar catálogo
            </a>
          </div>

          {/* Stats row */}
          <div className="mt-14 flex flex-wrap gap-8">
            {[
              { val: 'B2B', label: 'Enfoque mayorista' },
              { val: '2 líneas', label: 'Licuadoras y ollas' },
              { val: 'Colombia', label: 'Cobertura nacional' },
            ].map(s => (
              <div key={s.label}>
                <div className="text-[#E4751F] font-bold text-2xl leading-none mb-1">{s.val}</div>
                <div className="text-white/50 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Product mosaic */}
        <div className="hidden lg:grid grid-cols-2 gap-3">
          {[
            'https://images.unsplash.com/photo-1548683726-203119be6a39?w=500&h=500&fit=crop&auto=format',
            'https://images.unsplash.com/photo-1625464733985-753756e466c5?w=500&h=500&fit=crop&auto=format',
            'https://images.unsplash.com/photo-1759790475932-ac8c04b17727?w=500&h=500&fit=crop&auto=format',
            'https://images.unsplash.com/photo-1769147339214-076740872485?w=500&h=500&fit=crop&auto=format',
          ].map((url, i) => (
            <div
              key={i}
              className={`overflow-hidden rounded bg-[#2A2E34] ${i === 0 ? 'row-span-2' : ''}`}
            >
              <img
                src={url}
                alt="Repuesto ARO"
                className="w-full h-full object-cover opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-500"
                style={{ minHeight: i === 0 ? '320px' : '155px' }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <div className="w-px h-10 bg-white/20" />
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-white/30">
          <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
        </svg>
      </div>
    </section>
  )
}

function TrustBar() {
  const revealRef = useReveal<HTMLDivElement>()
  return (
    <section className="bg-white border-b border-[#E8E8E6]">
      <div ref={revealRef} data-reveal className="max-w-7xl mx-auto px-5 md:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-[#E8E8E6]">
          {TRUST_ITEMS.map(item => (
            <div key={item.title} className="flex flex-col items-center text-center px-6 gap-3">
              <div className="text-[#E4751F]">{item.icon}</div>
              <div>
                <div className="font-bold text-[#1C1F23] text-sm md:text-base mb-0.5">{item.title}</div>
                <div className="text-[#6B7280] text-xs md:text-sm leading-snug">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Categories() {
  const revealRef = useReveal<HTMLDivElement>()
  return (
    <section className="bg-[#F5F4F1] py-20">
      <div ref={revealRef} data-reveal className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="mb-12">
          <span className="text-[#E4751F] text-xs font-semibold tracking-widest uppercase">Nuestro catálogo</span>
          <h2 className="text-[#1C1F23] text-3xl md:text-4xl font-bold mt-2 mb-3">Repuestos para licuadoras<br /> y ollas a presión.</h2>
          <p className="text-[#6B7280] text-lg max-w-xl">Contamos con un amplio inventario de repuestos clasificados por línea de producto y tipo de componente.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Licuadoras */}
          <div className="bg-white rounded-sm overflow-hidden group">
            <div className="relative h-48 overflow-hidden bg-[#1C1F23]">
              <img
                src="https://images.unsplash.com/photo-1625464733985-753756e466c5?w=800&h=400&fit=crop&auto=format"
                alt="Repuestos para licuadoras"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover opacity-60 group-hover:opacity-75 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 flex items-end p-6">
                <h3 className="text-white text-2xl font-bold">Licuadoras</h3>
              </div>
            </div>
            <div className="p-6">
              <div className="flex flex-wrap gap-2">
                {SUBCATEGORIES.licuadora.map(sub => (
                  <a
                    key={sub.id}
                    href="#catalogo"
                    className="inline-flex items-center gap-1.5 bg-[#F5F4F1] hover:bg-[#E4751F] hover:text-white text-[#1C1F23] text-sm font-medium px-3 py-1.5 rounded-sm transition-colors duration-200"
                  >
                    {sub.label}
                  </a>
                ))}
              </div>
              <a href="#catalogo" className="mt-5 inline-flex items-center gap-2 text-[#E4751F] font-semibold text-sm hover:gap-3 transition-all">
                Ver catálogo
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Ollas */}
          <div className="bg-white rounded-sm overflow-hidden group">
            <div className="relative h-48 overflow-hidden bg-[#1C1F23]">
              <img
                src="https://images.unsplash.com/photo-1548683726-203119be6a39?w=800&h=400&fit=crop&auto=format"
                alt="Repuestos para ollas a presión"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover opacity-60 group-hover:opacity-75 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 flex items-end p-6">
                <h3 className="text-white text-2xl font-bold">Ollas a presión</h3>
              </div>
            </div>
            <div className="p-6">
              <div className="flex flex-wrap gap-2">
                {SUBCATEGORIES.olla.map(sub => (
                  <a
                    key={sub.id}
                    href="#catalogo"
                    className="inline-flex items-center gap-1.5 bg-[#F5F4F1] hover:bg-[#E4751F] hover:text-white text-[#1C1F23] text-sm font-medium px-3 py-1.5 rounded-sm transition-colors duration-200"
                  >
                    {sub.label}
                  </a>
                ))}
              </div>
              <a href="#catalogo" className="mt-5 inline-flex items-center gap-2 text-[#E4751F] font-semibold text-sm hover:gap-3 transition-all">
                Ver catálogo
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Catalog() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeSubcategory, setActiveSubcategory] = useState('all')
  const [search, setSearch] = useState('')
  const [inquiryProduct, setInquiryProduct] = useState<string | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)

  const selectCategory = (id: string) => {
    setActiveCategory(id)
    setActiveSubcategory('all')
  }

  const filtered = PRODUCTS.filter(p => {
    const matchCat = activeCategory === 'all' || p.category === activeCategory
    const matchSubcat = activeSubcategory === 'all' || p.subcategory === activeSubcategory
    const matchSearch = search === '' || p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSubcat && matchSearch
  })

  const openInquiry = (name: string) => {
    setInquiryProduct(name)
    dialogRef.current?.showModal()
  }

  const closeInquiry = () => {
    dialogRef.current?.close()
    setInquiryProduct(null)
  }

  return (
    <section id="catalogo" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="mb-10">
          <span className="text-[#E4751F] text-xs font-semibold tracking-widest uppercase">Catálogo de repuestos</span>
          <h2 className="text-[#1C1F23] text-3xl md:text-4xl font-bold mt-2 mb-3">Nuestros productos</h2>
          <p className="text-[#6B7280] text-lg max-w-xl">Consulte disponibilidad y condiciones de compra mayorista para cada referencia.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <svg viewBox="0 0 20 20" fill="currentColor" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]">
              <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clipRule="evenodd" />
            </svg>
            <input
              type="text"
              placeholder="Buscar por nombre o marca…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-[#E8E8E6] rounded-sm text-sm text-[#1C1F23] placeholder-[#9CA3AF] focus:outline-none focus:border-[#E4751F] transition-colors"
            />
          </div>
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => selectCategory(cat.id)}
                className={`px-4 py-2.5 rounded-sm text-sm font-semibold transition-colors duration-200 ${
                  activeCategory === cat.id
                    ? 'bg-[#1C1F23] text-white'
                    : 'bg-[#F5F4F1] text-[#1C1F23] hover:bg-[#E8E8E6]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Subcategory tabs */}
        {SUBCATEGORIES[activeCategory] ? (
          <div className="flex flex-wrap gap-2 mb-10">
            <button
              onClick={() => setActiveSubcategory('all')}
              className={`px-3 py-1.5 rounded-sm text-xs font-medium border transition-colors duration-200 ${
                activeSubcategory === 'all'
                  ? 'border-[#E4751F] text-[#E4751F] bg-[#E4751F]/10'
                  : 'border-[#E8E8E6] text-[#6B7280] hover:border-[#E4751F]/50'
              }`}
            >
              Todas
            </button>
            {SUBCATEGORIES[activeCategory].map(sub => (
              <button
                key={sub.id}
                onClick={() => setActiveSubcategory(sub.id)}
                className={`px-3 py-1.5 rounded-sm text-xs font-medium border transition-colors duration-200 ${
                  activeSubcategory === sub.id
                    ? 'border-[#E4751F] text-[#E4751F] bg-[#E4751F]/10'
                    : 'border-[#E8E8E6] text-[#6B7280] hover:border-[#E4751F]/50'
                }`}
              >
                {sub.label}
              </button>
            ))}
          </div>
        ) : (
          <div className="mb-6" />
        )}

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map(product => (
            <div
              key={product.id}
              className="group bg-[#F5F4F1] rounded-sm overflow-hidden border border-transparent hover:border-[#E4751F]/30 transition-all duration-200 flex flex-col h-full"
            >
              <div className="relative h-52 bg-white overflow-hidden">
                <img
                  src={product.img}
                  alt={product.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm ${
                    product.category === 'licuadora'
                      ? 'bg-[#1C1F23] text-white'
                      : 'bg-[#E4751F] text-white'
                  }`}>
                    {product.category === 'licuadora' ? 'Licuadora' : 'Olla a presión'}
                  </span>
                </div>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <div className="text-[#9CA3AF] text-xs font-medium uppercase tracking-wide mb-1">{product.brand}</div>
                <h3 className="text-[#1C1F23] font-bold text-sm mb-2 leading-snug line-clamp-2">{product.name}</h3>
                <p className="text-[#6B7280] text-xs leading-relaxed mb-4 line-clamp-2">{product.desc}</p>
                <button
                  onClick={() => openInquiry(product.name)}
                  className="w-full mt-auto bg-[#1C1F23] hover:bg-[#E4751F] text-white text-xs font-semibold py-2.5 px-3 rounded-sm transition-colors duration-200"
                >
                  Consultar disponibilidad
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-[#9CA3AF]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12 mx-auto mb-4 opacity-40">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 15.803 7.5 7.5 0 0 0 15.803 15.803Z" />
            </svg>
            <p className="font-medium">No se encontraron resultados.</p>
          </div>
        )}

        {/* Inquiry dialog */}
        <dialog
          ref={dialogRef}
          className="rounded-sm p-0 w-[calc(100%-2rem)] max-w-md shadow-2xl"
        >
          <div className="bg-white p-6 sm:p-8">
            <h3 className="text-[#1C1F23] font-bold text-xl mb-1">Consultar disponibilidad</h3>
            <p className="text-[#6B7280] text-sm mb-6">{inquiryProduct}</p>
            <form onSubmit={e => { e.preventDefault(); closeInquiry() }} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Nombre y empresa"
                required
                className="border border-[#E8E8E6] rounded-sm px-4 py-3 text-sm text-[#1C1F23] focus:outline-none focus:border-[#E4751F]"
              />
              <input
                type="tel"
                placeholder="Teléfono o WhatsApp"
                required
                className="border border-[#E8E8E6] rounded-sm px-4 py-3 text-sm text-[#1C1F23] focus:outline-none focus:border-[#E4751F]"
              />
              <textarea
                placeholder="¿Qué cantidad necesita? Cualquier detalle adicional…"
                rows={3}
                className="border border-[#E8E8E6] rounded-sm px-4 py-3 text-sm text-[#1C1F23] resize-none focus:outline-none focus:border-[#E4751F]"
              />
              <PrivacyConsentField />
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={closeInquiry} className="flex-1 border border-[#E8E8E6] text-[#1C1F23] font-semibold py-3 rounded-sm text-sm hover:bg-[#F5F4F1] transition-colors">
                  Cancelar
                </button>
                <button type="submit" className="flex-1 bg-[#E4751F] text-white font-semibold py-3 rounded-sm text-sm hover:bg-[#C45F0F] transition-colors">
                  Enviar consulta
                </button>
              </div>
            </form>
          </div>
        </dialog>
      </div>
    </section>
  )
}

function Wholesale() {
  const revealRef = useReveal<HTMLDivElement>()
  return (
    <section id="mayorista" className="bg-[#1C1F23] py-20 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1730584474338-aa8d9d186bf7?w=1600&h=900&fit=crop&auto=format')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div ref={revealRef} data-reveal className="relative max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="min-w-0">
            <span className="text-[#E4751F] text-xs font-semibold tracking-widest uppercase">Ventas al por mayor</span>
            <h2 className="text-white text-3xl md:text-4xl font-bold mt-3 mb-5 leading-tight">
              Soluciones para<br />tu negocio
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-10">
              Abastecemos negocios, distribuidores y profesionales con repuestos para licuadoras y ollas a presión.
            </p>
            <ul className="space-y-4 mb-10">
              {WHOLESALE_BENEFITS.map(b => (
                <li key={b} className="flex items-center gap-3 text-white/80">
                  <div className="w-5 h-5 rounded-sm bg-[#E4751F] flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3 text-white">
                      <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="font-medium">{b}</span>
                </li>
              ))}
            </ul>
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 bg-[#E4751F] hover:bg-[#C45F0F] text-white font-bold text-base px-7 py-4 rounded-sm transition-colors duration-200"
            >
              Quiero comprar al por mayor
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
              </svg>
            </a>
          </div>

          {/* Visual card */}
          <div className="relative min-w-0">
            <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-[#E4751F]/30" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-[#E4751F]/30" />
            <div className="relative bg-[#2A2E34] rounded-sm overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1735494033576-9c882e80504c?w=700&h=500&fit=crop&auto=format"
                alt="Fabricación ARO"
                loading="lazy"
                decoding="async"
                className="w-full h-72 object-cover opacity-70"
              />
              <div className="p-8">
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { label: 'Líneas de producto', value: '2' },
                    { label: 'Referencias en catálogo', value: `+${PRODUCTS.length}` },
                    { label: 'Modelo de negocio', value: 'B2B' },
                    { label: 'Cobertura', value: 'Colombia' },
                  ].map(s => (
                    <div key={s.label} className="min-w-0">
                      <div className="text-[#E4751F] font-bold text-2xl break-words">{s.value}</div>
                      <div className="text-white/50 text-xs mt-0.5">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Distributors() {
  const revealRef = useReveal<HTMLDivElement>()
  return (
    <section className="bg-[#F5F4F1] py-20">
      <div ref={revealRef} data-reveal className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="bg-white rounded-sm overflow-hidden">
          <div className="grid lg:grid-cols-2">
            <div className="p-10 md:p-14 min-w-0">
              <span className="text-[#E4751F] text-xs font-semibold tracking-widest uppercase">Distribuidores</span>
              <h2 className="text-[#1C1F23] text-3xl md:text-4xl font-bold mt-3 mb-5 leading-tight">
                Conviértete en<br />distribuidor
              </h2>
              <p className="text-[#6B7280] text-lg leading-relaxed mb-8">
                Encuentra en ARO un aliado para abastecer tu negocio con repuestos de alta rotación para licuadoras y ollas a presión.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={waLink('Hola, quiero información para ser distribuidor de ARO.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold px-7 py-4 rounded-sm transition-colors duration-200"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                  </svg>
                  Hablar con un asesor
                </a>
                <a
                  href="#contacto"
                  className="inline-flex items-center gap-2 border border-[#1C1F23] text-[#1C1F23] hover:bg-[#1C1F23] hover:text-white font-semibold px-7 py-4 rounded-sm transition-colors duration-200"
                >
                  Más información
                </a>
              </div>
            </div>
            <div className="relative overflow-hidden bg-[#1C1F23] min-h-64">
              <img
                src="https://images.unsplash.com/photo-1759790475932-ac8c04b17727?w=700&h=600&fit=crop&auto=format"
                alt="Empaques y repuestos para distribución"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 flex flex-col justify-center p-10 md:p-14">
                <div className="space-y-4">
                  {[
                    'Repuestos de alta rotación',
                    'Inventario disponible',
                    'Atención comercial directa',
                    'Condiciones especiales para distribuidores',
                  ].map(item => (
                    <div key={item} className="flex items-center gap-3 text-white">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#E4751F] flex-shrink-0" />
                      <span className="font-medium text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function About() {
  const revealRef = useReveal<HTMLDivElement>()
  return (
    <section id="nosotros" className="bg-white py-20">
      <div ref={revealRef} data-reveal className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Images collage */}
          <div className="relative hidden lg:block">
            <div className="grid grid-cols-2 gap-3">
              <img
                src="https://images.unsplash.com/photo-1730584474338-aa8d9d186bf7?w=500&h=600&fit=crop&auto=format"
                alt="Fabricación"
                loading="lazy"
                decoding="async"
                className="rounded-sm h-72 w-full object-cover"
              />
              <div className="flex flex-col gap-3 pt-8">
                <img
                  src="https://images.unsplash.com/photo-1606337321936-02d1b1a4d5ef?w=500&h=300&fit=crop&auto=format"
                  alt="Inventario"
                  loading="lazy"
                  decoding="async"
                  className="rounded-sm h-40 w-full object-cover"
                />
                <div className="bg-[#E4751F] rounded-sm p-5 flex flex-col justify-center">
                  <div className="text-white font-bold text-3xl mb-1">B2B</div>
                  <div className="text-white/75 text-sm">Fabricantes y distribuidores</div>
                </div>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="min-w-0">
            <span className="text-[#E4751F] text-xs font-semibold tracking-widest uppercase">Quiénes somos</span>
            <h2 className="text-[#1C1F23] text-3xl md:text-4xl font-bold mt-3 mb-6 leading-tight">
              Fabricamos.<br />Distribuimos.<br />Abastecemos.
            </h2>
            <p className="text-[#6B7280] text-lg leading-relaxed mb-6">
              ARO es una empresa colombiana especializada en la fabricación y distribución de repuestos para licuadoras y ollas a presión.
            </p>
            <p className="text-[#6B7280] text-base leading-relaxed mb-8">
              Nuestro enfoque es estrictamente B2B: trabajamos con negocios, distribuidores, ferreterías y profesionales que necesitan un proveedor confiable de repuestos con inventario real y atención comercial directa.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-[#E8E8E6]">
              {[
                { label: 'Experiencia en el sector', icon: '⚙' },
                { label: 'Capacidad de distribución', icon: '🚚' },
                { label: 'Conocimiento técnico', icon: '🔩' },
                { label: 'Enfoque mayorista', icon: '📦' },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-[#1C1F23] font-medium text-sm">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FinalCTA() {
  const revealRef = useReveal<HTMLDivElement>()
  return (
    <section className="bg-[#E4751F] py-20">
      <div ref={revealRef} data-reveal className="max-w-7xl mx-auto px-5 md:px-8 text-center">
        <h2 className="text-white text-3xl md:text-5xl font-bold mb-5 max-w-3xl mx-auto leading-tight">
          ¿Buscas un proveedor de repuestos?
        </h2>
        <p className="text-white/80 text-xl mb-10 max-w-xl mx-auto">
          Solicita nuestro catálogo y conoce las referencias disponibles para tu negocio.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#contacto"
            className="inline-flex items-center justify-center gap-2 bg-white text-[#E4751F] font-bold text-base px-8 py-4 rounded-sm hover:bg-[#F5F4F1] transition-colors duration-200"
          >
            Solicitar catálogo
          </a>
          <a
            href={waLink('Hola, quiero solicitar el catálogo de repuestos de ARO.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 bg-[#1C1F23] text-white font-bold text-base px-8 py-4 rounded-sm hover:bg-[#2A2E34] transition-colors duration-200"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
            </svg>
            Contactar por WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [sent, setSent] = useState(false)
  const revealRef = useReveal<HTMLDivElement>()

  return (
    <section id="contacto" className="bg-[#F5F4F1] py-20">
      <div ref={revealRef} data-reveal className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          <div className="min-w-0">
            <span className="text-[#E4751F] text-xs font-semibold tracking-widest uppercase">Contacto</span>
            <h2 className="text-[#1C1F23] text-3xl md:text-4xl font-bold mt-3 mb-6">Hablemos de tu negocio</h2>
            <p className="text-[#6B7280] text-lg mb-10">
              Comunícate con nuestro equipo comercial para conocer condiciones de venta al por mayor y disponibilidad de referencias.
            </p>
            <div className="space-y-5">
              {[
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                    </svg>
                  ),
                  label: 'Teléfono',
                  value: PHONE_DISPLAY,
                  href: `tel:+${WHATSAPP_NUMBER}`,
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                  ),
                  label: 'Correo',
                  value: EMAIL,
                  href: `mailto:${EMAIL}`,
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                  ),
                  label: 'Ubicación',
                  value: ADDRESS_FULL,
                  href: MAPS_DIRECTIONS_LINK,
                },
              ].map(item => (
                <div key={item.label} className="flex items-start gap-4 group">
                  <div className="w-10 h-10 bg-white border border-[#E8E8E6] rounded-sm flex items-center justify-center flex-shrink-0 text-[#E4751F] group-hover:bg-[#E4751F] group-hover:text-white group-hover:border-[#E4751F] transition-colors duration-200">
                    {item.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[#9CA3AF] text-xs font-medium mb-0.5">{item.label}</div>
                    {item.href ? (
                      <a
                        href={item.href}
                        {...(item.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        className="text-[#1C1F23] font-medium hover:text-[#E4751F] transition-colors break-words"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <div className="text-[#1C1F23] font-medium break-words">{item.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Map */}
            <div className="mt-8 rounded-sm overflow-hidden border border-[#E8E8E6]">
              <iframe
                title="Ubicación de ARO en el mapa"
                src={MAPS_EMBED_SRC}
                className="w-full h-56 grayscale-[40%] contrast-[1.05]"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a
                href={MAPS_DIRECTIONS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-white hover:bg-[#F5F4F1] text-[#1C1F23] font-semibold text-sm py-3 transition-colors border-t border-[#E8E8E6]"
              >
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-[#E4751F]">
                  <path fillRule="evenodd" d="M8.157 2.175a1.5 1.5 0 0 1 1.686 0l4.25 2.883a1.5 1.5 0 0 1 .657 1.238v9.129a1.5 1.5 0 0 1-2.078 1.386l-3.514-1.464a1.5 1.5 0 0 0-1.156 0L4.487 16.81A1.5 1.5 0 0 1 2.5 15.425V6.296a1.5 1.5 0 0 1 .657-1.238l4.25-2.883a1.5 1.5 0 0 1 .75-.25v14.283Z" clipRule="evenodd" />
                </svg>
                Cómo llegar
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-sm p-8 md:p-10 min-w-0">
            {sent ? (
              <div className="text-center py-10">
                <div className="w-14 h-14 bg-[#E4751F]/10 rounded-sm flex items-center justify-center mx-auto mb-5">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7 text-[#E4751F]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </div>
                <h3 className="text-[#1C1F23] font-bold text-xl mb-2">¡Mensaje enviado!</h3>
                <p className="text-[#6B7280]">Nuestro equipo comercial se pondrá en contacto contigo pronto.</p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-6 text-[#E4751F] text-sm font-medium hover:underline"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setSent(true) }} className="flex flex-col gap-5">
                <div>
                  <label className="text-[#1C1F23] text-sm font-semibold mb-1.5 block">Nombre y empresa *</label>
                  <input
                    type="text"
                    required
                    placeholder="Tu nombre y el nombre del negocio"
                    className="w-full border border-[#E8E8E6] rounded-sm px-4 py-3 text-sm text-[#1C1F23] placeholder-[#9CA3AF] focus:outline-none focus:border-[#E4751F] transition-colors"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-[#1C1F23] text-sm font-semibold mb-1.5 block">Teléfono *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+57 300 000 0000"
                      className="w-full border border-[#E8E8E6] rounded-sm px-4 py-3 text-sm text-[#1C1F23] placeholder-[#9CA3AF] focus:outline-none focus:border-[#E4751F] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[#1C1F23] text-sm font-semibold mb-1.5 block">Correo</label>
                    <input
                      type="email"
                      placeholder="tu@empresa.com"
                      className="w-full border border-[#E8E8E6] rounded-sm px-4 py-3 text-sm text-[#1C1F23] placeholder-[#9CA3AF] focus:outline-none focus:border-[#E4751F] transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[#1C1F23] text-sm font-semibold mb-1.5 block">Tipo de consulta</label>
                  <select className="w-full border border-[#E8E8E6] rounded-sm px-4 py-3 text-sm text-[#1C1F23] focus:outline-none focus:border-[#E4751F] transition-colors bg-white appearance-none">
                    <option>Solicitar catálogo</option>
                    <option>Compra al por mayor</option>
                    <option>Ser distribuidor</option>
                    <option>Consulta de disponibilidad</option>
                    <option>Otro</option>
                  </select>
                </div>
                <div>
                  <label className="text-[#1C1F23] text-sm font-semibold mb-1.5 block">Mensaje</label>
                  <textarea
                    rows={4}
                    placeholder="Cuéntanos sobre tu negocio y qué repuestos necesitas…"
                    className="w-full border border-[#E8E8E6] rounded-sm px-4 py-3 text-sm text-[#1C1F23] placeholder-[#9CA3AF] resize-none focus:outline-none focus:border-[#E4751F] transition-colors"
                  />
                </div>
                <PrivacyConsentField />
                <button
                  type="submit"
                  className="w-full bg-[#1C1F23] hover:bg-[#E4751F] text-white font-bold py-4 px-6 rounded-sm transition-colors duration-200 text-base"
                >
                  Enviar mensaje
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-[#1C1F23] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-[#E4751F] rounded flex items-center justify-center">
                <span className="font-bold text-white text-lg leading-none" style={{ fontFamily: 'Poppins, sans-serif' }}>A</span>
              </div>
              <span className="text-white font-bold text-xl tracking-wider" style={{ fontFamily: 'Poppins, sans-serif' }}>ARO</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Fabricantes y distribuidores de repuestos para licuadoras y ollas a presión.
            </p>
          </div>

          {/* Empresa */}
          <div>
            <div className="text-white font-semibold text-sm mb-4 tracking-wide">Empresa</div>
            <ul className="space-y-2.5">
              {['Nosotros', 'Ventas al por mayor', 'Contacto'].map(l => (
                <li key={l}>
                  <a href="#nosotros" className="text-white/50 hover:text-white text-sm transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Productos */}
          <div>
            <div className="text-white font-semibold text-sm mb-4 tracking-wide">Productos</div>
            <ul className="space-y-2.5">
              {['Repuestos para licuadoras', 'Repuestos para ollas a presión'].map(l => (
                <li key={l}>
                  <a href="#catalogo" className="text-white/50 hover:text-white text-sm transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <div className="text-white font-semibold text-sm mb-4 tracking-wide">Contacto</div>
            <ul className="space-y-2.5">
              <li>
                <a href={waLink('Hola, quisiera más información sobre los repuestos de ARO.')} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-[#E4751F] flex-shrink-0">
                    <path d="M3.505 2.365A41.369 41.369 0 0 1 9 2c1.863 0 3.697.124 5.495.365 1.247.167 2.18 1.108 2.435 2.268a4.45 4.45 0 0 0-.577-.069 43.141 43.141 0 0 0-4.706 0C9.229 4.696 7.5 6.727 7.5 8.998v2.24c0 1.413.67 2.735 1.76 3.562l-2.98 2.98C6.056 17.954 5.5 17.754 5.5 17.25V8.999c0-.184.093-.356.232-.467A4.49 4.49 0 0 1 7.5 7.5a4.49 4.49 0 0 1-2.5.999 4.44 4.44 0 0 1-2.495-1.001C2.2 7.226 2 6.809 2 6.375v-.012c0-1.768 1.338-3.215 3.005-3.352a4.44 4.44 0 0 1-.5-.646Z" />
                  </svg>
                  <span className="min-w-0 break-words">WhatsApp</span>
                </a>
              </li>
              <li>
                <a href={`tel:+${WHATSAPP_NUMBER}`} className="flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-[#E4751F] flex-shrink-0">
                    <path d="M3.505 2.365A41.369 41.369 0 0 1 9 2c1.863 0 3.697.124 5.495.365 1.247.167 2.18 1.108 2.435 2.268a4.45 4.45 0 0 0-.577-.069 43.141 43.141 0 0 0-4.706 0C9.229 4.696 7.5 6.727 7.5 8.998v2.24c0 1.413.67 2.735 1.76 3.562l-2.98 2.98C6.056 17.954 5.5 17.754 5.5 17.25V8.999c0-.184.093-.356.232-.467A4.49 4.49 0 0 1 7.5 7.5a4.49 4.49 0 0 1-2.5.999 4.44 4.44 0 0 1-2.495-1.001C2.2 7.226 2 6.809 2 6.375v-.012c0-1.768 1.338-3.215 3.005-3.352a4.44 4.44 0 0 1-.5-.646Z" />
                  </svg>
                  <span className="min-w-0 break-words">{PHONE_DISPLAY}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-[#E4751F] flex-shrink-0">
                    <path d="M3 4a2 2 0 0 0-2 2v1.161l8.441 4.221a1.25 1.25 0 0 0 1.118 0L19 7.162V6a2 2 0 0 0-2-2H3Z" />
                    <path d="m19 8.839-7.77 3.885a2.75 2.75 0 0 1-2.46 0L1 8.839V14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.839Z" />
                  </svg>
                  <span className="min-w-0 break-words">{EMAIL}</span>
                </a>
              </li>
              <li>
                <a href={MAPS_DIRECTIONS_LINK} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 text-white/50 hover:text-white text-sm transition-colors">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-[#E4751F] flex-shrink-0 mt-0.5">
                    <path fillRule="evenodd" d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.309-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" clipRule="evenodd" />
                  </svg>
                  <span className="min-w-0 break-words">{ADDRESS_FULL}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm">© 2024 ARO. Todos los derechos reservados.</p>
          <p className="text-white/30 text-sm">Fabricantes y distribuidores · Colombia</p>
        </div>
      </div>
    </footer>
  )
}

// ─── WhatsApp FAB ─────────────────────────────────────────────────────────────
function WhatsAppFAB() {
  return (
    <a
      href={waLink('Hola, quisiera más información sobre los repuestos de ARO.')}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#25D366] hover:bg-[#1ebe5d] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
      aria-label="Contactar por WhatsApp"
    >
      <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
      </svg>
    </a>
  )
}

// ─── Back to top ────────────────────────────────────────────────────────────────
function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 700)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Volver arriba"
      className={`fixed bottom-24 right-6 z-40 w-11 h-11 bg-[#1C1F23] hover:bg-[#2A2E34] rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-3 pointer-events-none'
      }`}
    >
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-white">
        <path fillRule="evenodd" d="M14.77 12.79a.75.75 0 0 1-1.06.02L10 9.06l-3.71 3.75a.75.75 0 1 1-1.08-1.04l4.25-4.5a.75.75 0 0 1 1.08 0l4.25 4.5a.75.75 0 0 1-.02 1.06Z" clipRule="evenodd" />
      </svg>
    </button>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <Categories />
        <Catalog />
        <Wholesale />
        <Distributors />
        <About />
        <FinalCTA />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFAB />
      <BackToTop />
      <PrivacyPolicyDialog />
    </>
  )
}
