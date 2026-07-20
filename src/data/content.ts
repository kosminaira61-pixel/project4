export interface Service {
  id: string
  title: string
  duration: string
  price: string
  description: string
  features: string[]
  popular?: boolean
}

export interface Route {
  id: string
  title: string
  difficulty: string
  duration: string
  distance: string
  description: string
  image: string
}

export interface Review {
  id: string
  name: string
  text: string
  rating: number
  date: string
}

export interface GalleryImage {
  id: string
  src: string
  alt: string
}

export const services: Service[] = [
  {
    id: 'hour',
    title: 'Годинна поїздка',
    duration: '1 година',
    price: '2 000 ₴',
    description: 'Ідеальний вибір для першого знайомства з квадроциклом. Короткий, але насичений маршрут.',
    features: ['Інструктаж безпеки', 'Спорядження в комплекті', 'Інструктор-супровід'],
  },
  {
    id: 'halfday',
    title: 'Півдня в горах',
    duration: '3 години',
    price: '6 000 ₴',
    description: 'Розширений маршрут з зупинками для фото та відпочинку. Найкращий баланс ціни та вражень.',
    features: ['Розширений маршрут', 'Фото-зупинки', 'Перекус та вода', 'Інструктор-супровід'],
    popular: true,
  },
  {
    id: 'fullday',
    title: 'Повний день пригод',
    duration: '6 годин',
    price: '12 000 ₴',
    description: 'Максимальний досвід: гірські перевали, лісові стежки, річкові береги та обід на природі.',
    features: ['Повний гірський маршрут', 'Обід на природі', 'Професійні фото', 'Інструктор-супровід'],
  },
]

export const routes: Route[] = [
  {
    id: 'windmills',
    title: 'Панорамний маршрут до Вітряків',
    difficulty: 'Середня',
    duration: '2 години',
    distance: '',
    description: 'Подорож мальовничими карпатськими лісами до сучасних вітрових електростанцій, звідки відкриваються неймовірні краєвиди на гори та передгір\'я.',
    image: '/2026-07-18_15.25.38.jpg',
  },
  {
    id: 'tsiukhiv',
    title: 'Оглядова вежа на горі Цюхів',
    difficulty: 'Середня',
    duration: '3 години',
    distance: '',
    description: 'Один із найпопулярніших маршрутів, який веде до сучасної оглядової вежі на горі Цюхів. З вершини відкривається панорамний вид на Трускавець, Борислав, Дрогобич та величні Карпати.',
    image: '/2026-07-18_15.14.06.jpg',
  },
  {
    id: 'breniv',
    title: 'Історичний маршрут на гору Бренів',
    difficulty: 'Складна',
    duration: '5 годин',
    distance: '',
    description: 'Маршрут до гори Бренів поблизу села Орів — місця, де розташована Могила воїнів. Це особлива історична локація, яка поєднує красу карпатської природи з пам\'яттю про події минулого. Подорож дарує можливість насолодитися захоплюючими краєвидами та відчути атмосферу цього визначного місця.',
    image: '/2026-07-18_15.33.23.jpg',
  },
]

export const reviews: Review[] = [
  {
    id: '1',
    name: 'Андрій К.',
    text: 'Незабутні враження! Були вперше на квадроциклі — інструктор все пояснив, маршрут чудовий. Рекомендую!',
    rating: 5,
    date: '2025-06-15',
  },
  {
    id: '2',
    name: 'Олена М.',
    text: 'Відпочивали в Трускавці і вирішили спробувати. Півдня в горах — це найкраще, що ми зробили за весь відпочинок.',
    rating: 5,
    date: '2025-06-20',
  },
  {
    id: '3',
    name: 'Дмитро та Ірина',
    text: 'Взяли двомісний квадроцикл на повний день. Гори, ліс, річка — емоції через край! Дякуємо за круті фото!',
    rating: 5,
    date: '2025-07-01',
  },
  {
    id: '4',
    name: 'Сергій В.',
    text: 'Складний маршрут берегом річки — це адреналін! Багато грязі, води, каміння. Для любителів екстриму — ідеально.',
    rating: 5,
    date: '2025-07-10',
  },
]

export const galleryImages: GalleryImage[] = [
  { id: '1', src: '/2026-07-18_14.51.42.jpg', alt: 'Квадроцикл у горах' },
  { id: '2', src: '/2026-07-18_15.13.56.jpg', alt: 'Поїздка квадроциклом' },
  { id: '3', src: '/2026-07-18_15.14.06.jpg', alt: 'Карпатські краєвиди' },
  { id: '4', src: '/2026-07-18_15.33.23.jpg', alt: 'Історичний маршрут на гору Бренів' },
]

export const PHONE = '067 660 72 56'
export const PHONE_TEL = '+380676607256'
export const INSTAGRAM_URL = 'https://www.instagram.com/truskavets_kvadro'
export const INSTAGRAM_HANDLE = '@truskavets_kvadro'
