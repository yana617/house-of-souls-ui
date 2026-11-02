# SEO-страницы проекта

Сайт: https://soulhome.by (`SITE_URL`, можно переопределить через `VITE_SITE_URL`)

Общие SEO-настройки лежат в [src/composables/use-seo.js](src/composables/use-seo.js): `useSeo()`, `SHELTER_JSON_LD`, `SITE_NAME`, `SITE_URL`.

| Страница | Путь | Файл | Title | Description | JSON-LD | В sitemap |
|---|---|---|---|---|---|---|
| Каталог животных (главная) | `/` | [src/views/AnimalList.vue](src/views/AnimalList.vue) | Животные из приюта в Минске | Кошки и собаки из мини-приюта Домик Спасённых Душ ищут новый дом... | Да (`SHELTER_JSON_LD`) | Да |
| Как помочь приюту | `/how-to-help` | [src/views/HowToHelp.vue](src/views/HowToHelp.vue) | Как помочь приюту | Подробнее как и чем можно помочь животным из приюта... | Да (`SHELTER_JSON_LD`) | Да |
| Карточка животного | `/animals/:id` | [src/views/Animal.vue](src/views/Animal.vue) | `{имя} — собака/кошка из приюта` (динамически) | Описание животного (до 155 символов) или шаблонный текст | Нет | Нет |

## Примечания

- Карточка животного (`/animals/:id`) формирует title, description, robots, og-теги динамически из данных животного в сторе.
- Для `/animals/:id` `og:image` берется из первого фото животного.
- Страница `/animals/:id` не добавлена в [public/sitemap.xml](public/sitemap.xml).
- Остальные страницы (`/schedule`, `/volunteers`, `/profile`, `/analytics/*`, `/ads`, `/admin/*` и т.д.) SEO не используют, и большинство из них закрыты авторизацией.
