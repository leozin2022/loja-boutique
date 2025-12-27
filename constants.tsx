
import { Product, Category } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Vestido Midi Seda',
    category: Category.DRESSES,
    price: 299.90,
    oldPrice: 349.90,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAonjvyN1rdATZzcrkpTL2ZNvmFoq7JV7kN5R5344xvI4ABOF78zBT5dNuIS9IcA7AiPdwr3KZB4u1tBO1TfpPu6kVoD27x6ggep88PcICiXfSOW0AuTPpx9D1lKxxj2GffAiTRLkzYr2DbrR64gtRUtfkCRoncET2cgms05XVRDD-WfcYkquLUYqgX-HVcbJMknEp27ugztmTLcizppag6RMNXYqEjJEpOU5LFWqPGGPM7IbAwLysnmUVOxv6SMrj6CJ5AxWIQ4HRg',
    description: '100% Seda Pura • Off White. Caimento leve e fluido.',
    sku: 'VST-0001',
    stock: 12,
    isBestSeller: true,
    isNew: true,
    // Fix: Added missing required property isPromotion
    isPromotion: true
  },
  {
    id: '2',
    name: 'Blusa Linho Premium',
    category: Category.BLOUSES,
    price: 159.90,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6z9LoF2sHRYwGA2-u8ZJDz75sEiOMW1XrWYaHt6gyIhoeyUThpMfxx7nvEi5023tGXwx5smVfI-2qPRzhBUmeFl15D0krO9hoq5JAOeludKst0drVXTZzwJNcTT5h5ZfTcB63LlSceE5CrnpQMeOWhXmYoQdEvshVOzIXDsJT3hn72eK29cVAQm8HxhYEm0EcOMiK2XtE3F_VDWz9Bk91SZKvqi46idATCXtZ5c4slh7cSx1FIGFX73FqP5opF8UE_orwlUHca9RY',
    description: 'Linho Natural • Bege. Frescor e sofisticação para o dia a dia.',
    sku: 'BLS-0212',
    stock: 5,
    // Fix: Added missing required properties isBestSeller and isNew
    isBestSeller: false,
    isNew: false,
    // Fix: Added missing required property isPromotion
    isPromotion: false
  },
  {
    id: '3',
    name: 'Calça Alfaiataria',
    category: Category.PANTS,
    price: 220.00,
    oldPrice: 280.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCiq7phC4rMxL8wIMFJH1p0mfZ4ZhMWb_8KEOnlI0s6W52It719hDOrxJOGsZ9D91fzPzQH3GeQmuCjilfiE8FeyPq_5rioxr6c9AVu4J4LXfHmXrj0qajvDsx3yS70suNnNYxNoOeESLquUQ0yxSd27rhlOzAZMLBO4RVC0X4g6nLf9urwYdj36eIVD0XRiIp0E4u00kEF5FNX5IlyLR6bWLFskCeNmqfwtIXK-45PMXSVxZ9Pb8ahCrT6UwEix-ngRx9BIn-DKnc',
    description: 'Corte Reto • Preto. Essencial para looks formais e modernos.',
    sku: 'CLC-0089',
    stock: 28,
    // Fix: Added missing required properties isBestSeller and isNew
    isBestSeller: false,
    isNew: false,
    // Fix: Added missing required property isPromotion
    isPromotion: true
  },
  {
    id: '4',
    name: 'Vestido Midi Lavanda',
    category: Category.DRESSES,
    price: 289.90,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlI_hiv5LqrlDbBdLUMSi_dKZet4CDh-LAIjZ9f0rkgEy7-8a1Ys0tyZPu5kFNkCKGyOhSe1eFioinBCLKw5IdTejZxiNH3auBREA1E9O-_cVnaNBmTNy4XcbdqJK30pcI-5z3IChz20gJGDz4wlra8EdAavRJH3HldTVqCfzGi32YCa1pRnk9Rc0ad6bhVUPug1M4z5iM4bdQizcF7-h2Z_tIhpwuHMIiZixFzH58f3bu6TDLxOKH64--HPSCQyAgdtLsgiyVteKF',
    description: 'Elegância em tons pastel para ocasiões especiais.',
    sku: 'VST-0042',
    stock: 8,
    // Fix: Added missing required property isBestSeller
    isBestSeller: false,
    isNew: true,
    // Fix: Added missing required property isPromotion
    isPromotion: false
  },
  {
    id: '5',
    name: 'Blazer Alfaiataria Rosa',
    category: Category.SALE,
    price: 359.90,
    oldPrice: 449.90,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBP-wm_cgv8UeTU2aNa2FfPW3oklVxnNY4vn7iGPyJyMjDxSoJXOlwbSzUSKV-79hc9UOuir8iipjlkN7N6OyAhBxwwUY1wXCuvMp7XA9Vu9pDMBgNc88CPtg1klLftprDtJvXJevhnf-6ZDNVlL1fHbbthciTzht0cko6qZAqa-CBpgktIoJDOnUl0UmVZkeQcQPhSaCT9QhyxAEB6ZiztqYRNSVFoY2H08ksIyk3u3HjPKjfQTOR6QfRxYyj89OtXNlrMgKeHme43',
    description: 'Estruturado e feminino. Perfeito para compor camadas.',
    sku: 'CAS-0912',
    stock: 2,
    // Fix: Added missing required properties isBestSeller and isNew
    isBestSeller: false,
    isNew: false,
    // Fix: Added missing required property isPromotion
    isPromotion: true
  }
];
