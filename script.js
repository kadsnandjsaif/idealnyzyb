// ============ УНИВЕРСАЛЬНАЯ НАВИГАЦИЯ ============
function createUniversalNavigation() {
    // Проверяем, нужно ли создавать навигацию
    const existingHeader = document.querySelector('.header');
    const existingFooter = document.querySelector('.footer');
    const existingModal = document.getElementById('contactModal');
    
    if (!existingHeader) {
        createHeader();
    }
    if (!existingFooter) {
        createFooter();
    }
    // Всегда создаем модальное окно, даже если на странице есть форма
    if (!existingModal) {
        createContactModal();
    }
}

// ============ АНИМАЦИЯ QUOTE SECTION ============
function initializeQuoteAnimation() {
    const quoteSection = document.querySelector('.quote-section');
    const quoteCards = document.querySelectorAll('.quote-card');
    
    if (quoteSection && quoteCards.length > 0) {
        // Добавляем класс loaded для fallback
        quoteSection.classList.add('loaded');
        
        // Создаем Intersection Observer для анимации
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Наблюдаем за каждой карточкой
        quoteCards.forEach((card) => {
            observer.observe(card);
        });
    }
}

// ============ ФУНКЦИЯ ПОИСКА ============
function initializeSearch() {
    console.log('Инициализация функции поиска...');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.querySelector('.search-input span');
    
    console.log('searchInput найден:', !!searchInput);
    console.log('searchBtn найден:', !!searchBtn);
    
    if (!searchInput) {
        console.log('searchInput не найден, выход из функции');
        return;
    }
    
    // База данных ключевых слов и соответствующих страниц
    const searchDatabase = {
        'лечение': ['lechenie.html', 'treatment.html'],
        'зуб': ['lechenie.html', 'treatment.html', 'pricing.html'],
        'зубы': ['lechenie.html', 'treatment.html', 'pricing.html'],
        'стоматолог': ['specialists.html', 'about.html'],
        'стоматология': ['about.html', 'lechenie.html'],
        'врач': ['specialists.html', 'about.html'],
        'врачи': ['specialists.html', 'about.html'],
        'цена': ['pricing.html'],
        'цены': ['pricing.html'],
        'стоимость': ['pricing.html'],
        'акция': ['promotions.html'],
        'акции': ['promotions.html'],
        'скидка': ['promotions.html'],
        'скидки': ['promotions.html'],
        'отзыв': ['reviews.html'],
        'отзывы': ['reviews.html'],
        'клиника': ['about.html'],
        'услуга': ['lechenie.html', 'treatment.html', 'pricing.html'],
        'услуги': ['lechenie.html', 'treatment.html', 'pricing.html'],
        'кариес': ['lechenie.html', 'treatment.html'],
        'имплант': ['lechenie.html', 'treatment.html', 'pricing.html'],
        'импланты': ['lechenie.html', 'treatment.html', 'pricing.html'],
        'брекет': ['lechenie.html', 'treatment.html', 'pricing.html'],
        'брекеты': ['lechenie.html', 'treatment.html', 'pricing.html'],
        'отбеливание': ['lechenie.html', 'treatment.html', 'pricing.html'],
        'протез': ['lechenie.html', 'treatment.html', 'pricing.html'],
        'протезы': ['lechenie.html', 'treatment.html', 'pricing.html'],
        'удаление': ['lechenie.html', 'treatment.html', 'pricing.html'],
        'пломба': ['lechenie.html', 'treatment.html', 'pricing.html'],
        'пломбы': ['lechenie.html', 'treatment.html', 'pricing.html'],
        'чистка': ['lechenie.html', 'treatment.html', 'pricing.html'],
        'консультация': ['about.html', 'specialists.html'],
        'специалист': ['specialists.html'],
        'специалисты': ['specialists.html'],
        'о нас': ['about.html'],
        'о клинике': ['about.html'],
        'лечить': ['lechenie.html', 'treatment.html'],
        'лечим': ['lechenie.html', 'treatment.html'],
        'лечите': ['lechenie.html', 'treatment.html'],
        'стоматологический': ['about.html', 'lechenie.html'],
        'стоматологическая': ['about.html', 'lechenie.html'],
        'стоматологические': ['about.html', 'lechenie.html']
    };
    
    // Функция поиска
    function performSearch() {
        const query = searchInput.value.trim().toLowerCase();
        console.log('Выполняется поиск для запроса:', query);
        
        if (query.length === 0) {
            showSearchMessage('Введите поисковый запрос', 'info');
            return;
        }
        
        if (query.length < 2) {
            showSearchMessage('Введите минимум 2 символа', 'warning');
            return;
        }
        
        // Поиск совпадений
        const results = [];
        
        // Поиск точных совпадений (высший приоритет)
        if (searchDatabase[query]) {
            results.push(...searchDatabase[query]);
        }
        
        // Поиск частичных совпадений (средний приоритет)
        Object.keys(searchDatabase).forEach(keyword => {
            if (keyword.includes(query) && query.length >= 3) {
                searchDatabase[keyword].forEach(page => {
                    if (!results.includes(page)) {
                        results.push(page);
                    }
                });
            }
        });
        
        // Поиск по началу слова (низший приоритет)
        Object.keys(searchDatabase).forEach(keyword => {
            if (keyword.startsWith(query) && query.length >= 2) {
                searchDatabase[keyword].forEach(page => {
                    if (!results.includes(page)) {
                        results.push(page);
                    }
                });
            }
        });
        
        // Удаление дубликатов
        const uniqueResults = [...new Set(results)];
        console.log('Найденные результаты:', uniqueResults);
        
        if (uniqueResults.length > 0) {
            showSearchResults(uniqueResults, query);
        } else {
            showSearchMessage('По вашему запросу ничего не найдено', 'error');
        }
    }
    
    // Показать результаты поиска
    function showSearchResults(results, query) {
        const message = `Найдено ${results.length} страниц по запросу "${query}":`;
        const resultList = results.map(page => {
            const pageName = getPageDisplayName(page);
            return `<li><a href="${page}" onclick="closeSearchModal()">${pageName}</a></li>`;
        }).join('');
        
        showSearchModal(`
            <div class="search-results">
                <h3>${message}</h3>
                <ul>${resultList}</ul>
            </div>
        `);
    }
    
    // Получить отображаемое имя страницы
    function getPageDisplayName(page) {
        const pageNames = {
            'lechenie.html': 'Лечение зубов',
            'treatment.html': 'Лечение зубов',
            'pricing.html': 'Цены на услуги',
            'specialists.html': 'Наши специалисты',
            'about.html': 'О клинике',
            'promotions.html': 'Акции и скидки',
            'reviews.html': 'Отзывы пациентов'
        };
        return pageNames[page] || page;
    }
    
    // Показать сообщение
    function showSearchMessage(message, type) {
        const className = `search-message search-message-${type}`;
        showSearchModal(`<div class="${className}">${message}</div>`);
    }
    
    // Показать модальное окно с результатами
    function showSearchModal(content) {
        // Удаляем существующее модальное окно
        const existingModal = document.getElementById('searchModal');
        if (existingModal) {
            existingModal.remove();
        }
        
        const modal = document.createElement('div');
        modal.id = 'searchModal';
        modal.className = 'search-modal';
        modal.innerHTML = `
            <div class="search-modal-content">
                <div class="search-modal-header">
                    <h3>Результаты поиска</h3>
                    <button class="search-modal-close" onclick="closeSearchModal()">×</button>
                </div>
                <div class="search-modal-body">
                    ${content}
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Анимация появления
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
    }
    
    // Закрыть модальное окно
    window.closeSearchModal = function() {
        const modal = document.getElementById('searchModal');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
    };
    
    // Обработчики событий
    searchInput.addEventListener('input', function() {
        // Ограничение до 10 символов
        if (this.value.length > 10) {
            this.value = this.value.slice(0, 10);
        }
    });
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            console.log('Поиск по Enter:', searchInput.value);
            performSearch();
        }
    });
    
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            console.log('Поиск по клику:', searchInput.value);
            performSearch();
        });
    }
    
    // Закрытие модального окна при клике вне его
    document.addEventListener('click', function(e) {
        const modal = document.getElementById('searchModal');
        if (modal && e.target === modal) {
            closeSearchModal();
        }
    });
}

function createHeader() {
    const headerHTML = `
        <header class="header">
            <div class="header-top"></div>
            <div class="header-main">
                <div class="header-content">
                    <div class="header-logo">
                        <img src="icons/logo.png" alt="Логотип стоматологии">
                    </div>
                    
                    <div class="header-info">
                        <div class="header-schedule">
                            <div class="info-label">Режим работы:</div>
                            <div class="info-content">Пн-Вс с 9:00 до 21:00</div>
                        </div>
                        <div class="header-phone">
                            <div class="info-label">Телефон:</div>
                            <div class="info-content">+7 (999) 123-45-67</div>
                        </div>
                    </div>
                    
                    <div class="header-search">
                        <input type="text" placeholder="Поиск услуг..." class="search-input">
                        <img src="icons/search-normal.svg" alt="Поиск" class="search-icon">
                    </div>
                    
                    <div class="header-actions">
                        <button class="header-call-btn">Заказать звонок</button>
                        <a href="#" class="header-whatsapp">
                            <img src="icons/whatsapp.svg" alt="WhatsApp">
                            WhatsApp
                        </a>
                    </div>
                </div>
                
                <nav class="header-nav">
                    <a href="index.html" class="nav-link">Главная</a>
                    <a href="about.html" class="nav-link">О клинике</a>
                    <a href="specialists.html" class="nav-link">Специалисты</a>
                    <a href="pricing.html" class="nav-link">Цены</a>
                    <a href="reviews.html" class="nav-link">Отзывы</a>
                    <a href="promotions.html" class="nav-link">Акции</a>
                    <a href="lechenie.html" class="nav-link">Лечение</a>
                </nav>
                
                <!-- Бургер-меню для мобильных -->
                <button class="burger-menu" id="burgerMenu">
                    <div class="burger-line"></div>
                    <div class="burger-line"></div>
                    <div class="burger-line"></div>
                </button>
                
                <!-- Мобильное меню -->
                <div class="mobile-menu" id="mobileMenu">
                    <div class="mobile-menu-content">
                        <nav class="header-nav">
                            <a href="index.html" class="nav-link mobile-nav-link">Главная</a>
                            <a href="about.html" class="nav-link mobile-nav-link">О клинике</a>
                            <a href="specialists.html" class="nav-link mobile-nav-link">Специалисты</a>
                            <a href="pricing.html" class="nav-link mobile-nav-link">Цены</a>
                            <a href="reviews.html" class="nav-link mobile-nav-link">Отзывы</a>
                            <a href="promotions.html" class="nav-link mobile-nav-link">Акции</a>
                            <a href="lechenie.html" class="nav-link mobile-nav-link">Лечение</a>
                        </nav>
                        <button class="header-call-btn mobile-call-btn">Заказать звонок</button>
                    </div>
                </div>
            </div>
        </header>
    `;
    
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
}

function createFooter() {
    const footerHTML = `
        <footer class="footer">
            <div class="footer-main">
                <div class="wrapper">
                    <div class="footer-content">
                        <div class="footer-left">
                            <div class="footer-contact">
                                <div class="contact-info">
                                    <div class="contact-item">
                                        <span class="contact-label">Телефон:</span>
                                        <span class="contact-value">+7 (999) 123-45-67</span>
                                    </div>
                                    <div class="contact-item">
                                        <span class="contact-label">Адрес:</span>
                                        <span class="contact-value">г. Москва, ул. Примерная, д. 123</span>
                                    </div>
                                    <div class="contact-item">
                                        <span class="contact-label">Email:</span>
                                        <span class="contact-value">info@dental.ru</span>
                                    </div>
                                </div>
                                
                                <div class="footer-maps">
                                    <a href="#" class="map-btn google-maps">
                                        <img src="footer/google-maps.svg" alt="Google Maps">
                                    </a>
                                    <a href="#" class="map-btn yandex-maps">
                                        <img src="footer/yandex-maps.svg" alt="Яндекс.Карты">
                                    </a>
                                    <a href="#" class="map-btn gis-maps">
                                        <img src="footer/2gis-maps.svg" alt="2ГИС">
                                    </a>
                                </div>
                                
                                <div class="footer-navigation">
                                    <div class="footer-logo">
                                        <img src="footer/logo-footer.svg" alt="Логотип">
                                    </div>
                                    <nav class="footer-nav">
                                        <a href="index.html" class="footer-link">Главная</a>
                                        <a href="about.html" class="footer-link">О клинике</a>
                                        <a href="specialists.html" class="footer-link">Специалисты</a>
                                        <a href="pricing.html" class="footer-link">Цены</a>
                                        <a href="reviews.html" class="footer-link">Отзывы</a>
                                    </nav>
                                </div>
                                
                                <div class="footer-bottom">
                                    <div class="copyright">
                                        <span>© 2024 Стоматологическая клиника. Все права защищены.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="footer-right">
                            <div class="footer-map">
                                <img src="footer/maps-image.png" alt="Карта" class="map-image">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    `;
    
    document.body.insertAdjacentHTML('beforeend', footerHTML);
}

function createContactModal() {
    const modalHTML = `
        <!-- Уведомление об успешной отправке -->
        <div id="successNotification" class="success-notification notification">
            <div class="notification-content">
                <div class="notification-icon">✅</div>
                <div class="notification-text">
                    <h4>Заявка отправлена!</h4>
                    <p>В ближайшее время с вами свяжется первый освободившийся администратор</p>
                </div>
            </div>
        </div>

        <div class="contact-form-modal" id="contactModal">
            <section class="contact-form-section">
                <button class="modal-close" id="modalClose">&times;</button>
                <div class="contact-form-container">
                    <div class="contact-form-content">
                        <div class="contact-form-left">
                            <h2 class="contact-form-title">Оставьте свои контакты,</h2>
                            <p class="contact-form-subtitle">мы свяжемся с Вами и запишем на удобное для Вас время</p>
                            
                            <form class="contact-form" id="modalContactForm">
                                <div class="contact-form-row">
                                    <div class="contact-form-group">
                                        <input type="text" class="contact-form-input" name="name" placeholder="Ваше имя:" required>
                                    </div>
                                    <div class="contact-form-group">
                                        <input type="tel" class="contact-form-input" name="phone" placeholder="Ваш телефон:" required>
                                    </div>
                                </div>
                                
                                <div class="contact-checkbox-group">
                                    <label class="contact-checkbox">
                                        <input type="checkbox" name="agreement" required>
                                        <span></span>
                                    </label>
                                    <label class="contact-checkbox-label">
                                        Я согласен с <a href="#" target="_blank">политикой конфиденциальности</a>
                                    </label>
                                </div>
                                
                                <button type="submit" class="contact-submit-btn">Отправить</button>
                            </form>
                        </div>
                        
                        <div class="contact-form-image">
                            <img src="images/modal-wuman.png" style="opacity: 0.7;" alt="Консультант">
                        </div>
                    </div>
                </div>
            </section>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function createDeveloperNavigation() {
    // Создаем навигационное меню разработчика только если его еще нет
    if (document.getElementById('devNavigation')) return;
    
    const devNavHTML = `
        <div id="devNavigation" class="developer-navigation">
            <div class="dev-nav-toggle" id="devNavToggle">
                <span>🚀</span>
            </div>
            <div class="dev-nav-menu" id="devNavMenu">
                <div class="dev-nav-header">
                    <h3>Навигация разработчика</h3>
                    <button class="dev-nav-close" id="devNavClose">&times;</button>
                </div>
                <div class="dev-nav-content">
                    <div class="dev-nav-section">
                        <h4>Страницы сайта:</h4>
                        <div class="dev-nav-links">
                            <a href="index.html" class="dev-nav-link">🏠 Главная</a>
                            <a href="about.html" class="dev-nav-link">🏢 О клинике</a>
                            <a href="specialists.html" class="dev-nav-link">👨‍⚕️ Специалисты</a>
                            <a href="pricing.html" class="dev-nav-link">💰 Цены</a>
                            <a href="reviews.html" class="dev-nav-link">⭐ Отзывы</a>
                            <a href="promotions.html" class="dev-nav-link">🎉 Акции</a>
                            <a href="lechenie.html" class="dev-nav-link">🦷 Лечение</a>
                            <a href="treatment.html" class="dev-nav-link">🩺 Процедуры</a>
                        </div>
                    </div>
                    <div class="dev-nav-section">
                        <h4>Быстрые действия:</h4>
                        <div class="dev-nav-actions">
                            <button class="dev-action-btn" id="testModalBtn">📞 Тест модального окна</button>
                            <button class="dev-action-btn" id="testNotificationBtn">🔔 Тест уведомления</button>
                            <button class="dev-action-btn" id="clearStorageBtn">🗑️ Очистить LocalStorage</button>
                            <button class="dev-action-btn" id="toggleMobileBtn">📱 Переключить мобильный вид</button>
                        </div>
                    </div>
                    <div class="dev-nav-section">
                        <h4>Информация:</h4>
                        <div class="dev-info">
                            <p>🌐 Текущая страница: <span id="currentPageInfo"></span></p>
                            <p>📱 Ширина экрана: <span id="screenWidthInfo"></span>px</p>
                            <p>⏰ Время: <span id="currentTimeInfo"></span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', devNavHTML);
    
    // Инициализируем функционал навигации разработчика
    initializeDeveloperNavigation();
}

function initializeDeveloperNavigation() {
    const devNavToggle = document.getElementById('devNavToggle');
    const devNavMenu = document.getElementById('devNavMenu');
    const devNavClose = document.getElementById('devNavClose');
    const testModalBtn = document.getElementById('testModalBtn');
    const testNotificationBtn = document.getElementById('testNotificationBtn');
    const clearStorageBtn = document.getElementById('clearStorageBtn');
    const toggleMobileBtn = document.getElementById('toggleMobileBtn');
    
    // Показать/скрыть меню
    if (devNavToggle) {
        devNavToggle.addEventListener('click', () => {
            devNavMenu.classList.toggle('active');
            updateDevInfo();
        });
    }
    
    // Закрыть меню
    if (devNavClose) {
        devNavClose.addEventListener('click', () => {
            devNavMenu.classList.remove('active');
        });
    }
    
    // Тест модального окна
    if (testModalBtn) {
        testModalBtn.addEventListener('click', () => {
            window.openContactModal();
            devNavMenu.classList.remove('active');
        });
    }
    
    // Тест уведомления
    if (testNotificationBtn) {
        testNotificationBtn.addEventListener('click', () => {
            window.showNotification('Тестовое уведомление', 'Это тестовое сообщение для проверки работы уведомлений');
            devNavMenu.classList.remove('active');
        });
    }
    
    // Очистить LocalStorage
    if (clearStorageBtn) {
        clearStorageBtn.addEventListener('click', () => {
            localStorage.clear();
            sessionStorage.clear();
            window.showNotification('Данные очищены', 'LocalStorage и SessionStorage очищены');
            devNavMenu.classList.remove('active');
        });
    }
    
    // Переключить мобильный вид
    if (toggleMobileBtn) {
        toggleMobileBtn.addEventListener('click', () => {
            const currentWidth = window.innerWidth;
            if (currentWidth > 900) {
                // Имитация мобильного размера
                document.body.style.width = '375px';
                document.body.style.margin = '0 auto';
                document.body.style.border = '2px solid #ccc';
                window.showNotification('Мобильный вид', 'Включен режим мобильного просмотра (375px)');
            } else {
                // Возврат к обычному размеру
                document.body.style.width = '';
                document.body.style.margin = '';
                document.body.style.border = '';
                window.showNotification('Десктопный вид', 'Возврат к обычному размеру экрана');
            }
            devNavMenu.classList.remove('active');
        });
    }
    
    // Закрытие по клику вне меню
    document.addEventListener('click', (e) => {
        if (!e.target.closest('#devNavigation')) {
            devNavMenu.classList.remove('active');
        }
    });
    
    // Закрытие по ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && devNavMenu.classList.contains('active')) {
            devNavMenu.classList.remove('active');
        }
    });
}

function updateDevInfo() {
    const currentPageInfo = document.getElementById('currentPageInfo');
    const screenWidthInfo = document.getElementById('screenWidthInfo');
    const currentTimeInfo = document.getElementById('currentTimeInfo');
    
    if (currentPageInfo) {
        const fileName = window.location.pathname.split('/').pop() || 'index.html';
        currentPageInfo.textContent = fileName;
    }
    
    if (screenWidthInfo) {
        screenWidthInfo.textContent = window.innerWidth;
    }
    
    if (currentTimeInfo) {
        currentTimeInfo.textContent = new Date().toLocaleTimeString();
    }
}

// Основной скрипт
document.addEventListener('DOMContentLoaded', function() {
    // Создаем универсальную навигацию если её нет
    createUniversalNavigation();
    
    // Создаем навигацию разработчика для тестирования
    createDeveloperNavigation();
    
    // Инициализируем анимацию для quote-section
    initializeQuoteAnimation();
    
    // Инициализируем функцию поиска
    initializeSearch();
    // ============ БУРГЕР-МЕНЮ ============
    console.log('=== БУРГЕР-МЕНЮ ИНИЦИАЛИЗАЦИЯ ===');
    
    const burgerMenu = document.getElementById('burgerMenu');
    const mobileMenu = document.getElementById('mobileMenu');
    const body = document.body;
    
    console.log('burgerMenu:', burgerMenu);
    console.log('mobileMenu:', mobileMenu);
    
    // Проверяем, что элементы существуют
    if (!burgerMenu || !mobileMenu) {
        console.error('❌ Burger menu elements not found!');
        console.error('burgerMenu:', burgerMenu);
        console.error('mobileMenu:', mobileMenu);
        return;
    }
    
    console.log('✅ Burger menu elements found!');
    
    // Функция переключения мобильного меню
    function toggleMobileMenu() {
        console.log('🔄 toggleMobileMenu called');
        console.log('burgerMenu.classList before:', burgerMenu.classList.toString());
        console.log('mobileMenu.classList before:', mobileMenu.classList.toString());
        
        burgerMenu.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        
        console.log('burgerMenu.classList after:', burgerMenu.classList.toString());
        console.log('mobileMenu.classList after:', mobileMenu.classList.toString());
        console.log('body.classList after:', body.classList.toString());
    }
    
    // Обработчик клика по бургер-кнопке
    if (burgerMenu) {
        console.log('✅ Adding click listener to burgerMenu');
        burgerMenu.addEventListener('click', function(e) {
            console.log('🖱️ Burger menu clicked!');
            console.log('Event:', e);
            toggleMobileMenu();
        });
    } else {
        console.error('❌ burgerMenu is null!');
    }
    
    // Закрытие меню при клике вне его области
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function(e) {
            if (e.target === mobileMenu) {
                toggleMobileMenu();
            }
        });
    }
    
    // Закрытие меню при изменении размера окна (если стало больше 900px)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 900 && mobileMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
        
        // Переинициализация offers слайдера при изменении размера экрана
        if (typeof $ !== 'undefined' && $.fn.slick) {
            setTimeout(() => {
                initializeOffersSlider();
            }, 100);
        }
    });
    
    // Закрытие меню при клике на ссылки навигации (работает с разными типами меню)
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, .mobile-dev-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', toggleMobileMenu);
    });
    
    // Закрытие меню при клике на крестик
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', toggleMobileMenu);
    }
    
    // Дополнительное закрытие для кнопки "Заказать звонок" в мобильном меню
    const mobileCallBtn = document.querySelector('.mobile-call-btn');
    if (mobileCallBtn) {
        mobileCallBtn.addEventListener('click', toggleMobileMenu);
    }
    
    // Автоматическое переключение стиля бургера в зависимости от фона
    function adjustBurgerStyle() {
        if (burgerMenu) {
            const header = document.querySelector('.header');
            if (header) {
                const headerStyle = window.getComputedStyle(header);
                const backgroundColor = headerStyle.backgroundColor;
                
                // Проверяем, светлый ли фон
                const isLightBackground = backgroundColor.includes('255') || 
                                        backgroundColor.includes('white') || 
                                        backgroundColor.includes('transparent');
                
                if (isLightBackground) {
                    burgerMenu.classList.add('dark');
                } else {
                    burgerMenu.classList.remove('dark');
                }
            }
        }
    }

    // Вызываем функцию при загрузке и изменении размера окна
    adjustBurgerStyle();
    window.addEventListener('resize', adjustBurgerStyle);
    
    // ============ ПОИСК ПО САЙТУ ============
    const searchInput = document.getElementById('searchInput');
    
    // Функция поиска
    // Фокус на поле поиска при клике
    searchInput.addEventListener('focus', function() {
        this.select();
    });
});

// ============ TEAM SLIDER FOR ABOUT PAGE ============
// Функция генерации карточек команды для страницы "О нас", "Лечение" и "Специалисты"
function generateAboutTeamCards(category = 'all') {
    const teamSlider = document.getElementById('teamSlider');
    
    // Работаем только на страницах "О нас", "Лечение", "Treatment" и "Специалисты"
    if (!teamSlider) {
        return;
    }
    
    if (!window.location.pathname.includes('about.html') && !window.location.pathname.includes('lechenie.html') && !window.location.pathname.includes('treatment.html') && !window.location.pathname.includes('specialists.html')) {
        return;
    }
    
    // Фильтруем данные по категории
    let filteredData = aboutTeamData;
    if (category !== 'all') {
        filteredData = aboutTeamData.filter(member => member.category === category);
    }
    
    let html = '';
    
    filteredData.forEach((member, index) => {
        html += `
            <div class="team-card">
                <div class="team-photo">
                    <img src="${member.photo}" alt="${member.name}">
                </div>
                <div class="team-content">
                    <h3 class="team-name">${member.name}</h3>
                    <p class="team-position">${member.position}</p>
                    
                    <div class="team-section-title">Специализации</div>
                    <div class="team-specializations">
                        <ul>
                            ${member.specializations.map(spec => `<li>${spec}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="team-section-title">Опыт</div>
                    <p class="team-experience">${member.experience}</p>
                    
                    <div class="team-buttons">
                        <button class="team-btn-details">Подробнее</button>
                        <button class="team-btn-appointment">Записаться к врачу</button>
                    </div>
                </div>
            </div>
        `;
    });
    
    teamSlider.innerHTML = html;
    
    // Переинициализируем слайдер после изменения контента
    if (window.location.pathname.includes('specialists.html')) {
        // Уничтожаем старый слайдер перед созданием нового
        if (typeof $ !== 'undefined' && $.fn.slick && $('#teamSlider').hasClass('slick-initialized')) {
            $('#teamSlider').slick('unslick');
        }
        // Re-initialize slider after content change
        setTimeout(() => {
            initializeAboutTeamSlider();
        }, 100);
    }
}

// Функция для инициализации селектора категорий врачей
function initializeTeamCategories() {
    const categoryButtons = document.querySelectorAll('.team-category-btn');
    
    if (!categoryButtons.length) {
        return;
    }
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Убираем активный класс у всех кнопок
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // Добавляем активный класс к нажатой кнопке
            this.classList.add('active');
            
            // Получаем категорию из data-атрибута
            const category = this.getAttribute('data-category');
            
            // Генерируем новые карточки с выбранной категорией
            generateAboutTeamCards(category);
        });
    });
}

// Функция для инициализации слайдера команды на страницах "О нас", "Лечение", "Treatment" и "Специалисты"
function initializeAboutTeamSlider() {
    // Работаем только на страницах "О нас", "Лечение", "Treatment" и "Специалисты"
    if (!window.location.pathname.includes('about.html') && !window.location.pathname.includes('lechenie.html') && !window.location.pathname.includes('treatment.html') && !window.location.pathname.includes('specialists.html')) {
        return;
    }
    
    const teamSlider = document.getElementById('teamSlider');
    if (!teamSlider) {
        return;
    }
    
    if (typeof $ !== 'undefined' && $.fn.slick) {
        // Проверяем существование элементов навигации
        const prevArrow = document.getElementById('teamPrev');
        const nextArrow = document.getElementById('teamNext');
        
        if (!prevArrow || !nextArrow) {
            return;
        }
        
        $('#teamSlider').slick({
            dots: false,
            infinite: true,
            speed: 800,
            easing: 'ease-in-out',
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: false,
            variableWidth: true,
            adaptiveHeight: false,
            prevArrow: '#teamPrev',
            nextArrow: '#teamNext',
            cssEase: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        centerMode: false,
                        variableWidth: true,
                        slidesToShow: 1,
                        speed: 800
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        centerMode: false,
                        variableWidth: false,
                        slidesToShow: 1,
                        speed: 800
                    }
                }
            ]
        });
    }
}



// Данные для всех категорий прайс-листа
const pricingDataAll = {
    treatment: {
        title: "Лечение зубов",
        services: [
            { 
                name: "Лечение среднего кариеса", 
                description: "", 
                clinicPrice: "15 000", 
                cityPrice: "19 000" 
            },
            { 
                name: "Лечение начального кариеса", 
                description: "Инструментальная и медикаментозная обработка корневого канала — временное пломбирование корневых каналов лечебными пастами — пломбирование корневого канала зуба — восстановление зуба пломбой после эндодонтического лечения — шлифование — полирование — необходимое количество приемов", 
                clinicPrice: "15 000", 
                cityPrice: "19 000" 
            },
            { 
                name: "Лечение глубокого кариеса", 
                description: "", 
                clinicPrice: "15 000", 
                cityPrice: "19 000" 
            },
            { 
                name: "Лечение множественного кариеса", 
                description: "", 
                clinicPrice: "15 000", 
                cityPrice: "19 000" 
            }
        ]
    },
    surgery: {
        title: "Хирургия",
        services: [
            { 
                name: "Удаление зуба простое", 
                description: "Осмотр, анестезия, удаление зуба, обработка лунки", 
                clinicPrice: "3 500", 
                cityPrice: "5 000" 
            },
            { 
                name: "Удаление зуба сложное", 
                description: "Осмотр, анестезия, удаление зуба с разрезом десны, наложение швов", 
                clinicPrice: "8 000", 
                cityPrice: "12 000" 
            },
            { 
                name: "Удаление зуба мудрости", 
                description: "Осмотр, анестезия, удаление ретинированного зуба мудрости", 
                clinicPrice: "12 000", 
                cityPrice: "18 000" 
            }
        ]
    },
    orthodontics: {
        title: "Ортодонтия",
        services: [
            { 
                name: "Консультация ортодонта", 
                description: "Осмотр, составление плана лечения, расчет стоимости", 
                clinicPrice: "2 000", 
                cityPrice: "3 000" 
            },
            { 
                name: "Установка брекет-системы", 
                description: "Подготовка, установка брекетов на одну челюсть", 
                clinicPrice: "45 000", 
                cityPrice: "60 000" 
            },
            { 
                name: "Коррекция брекет-системы", 
                description: "Замена дуги, активация брекет-системы", 
                clinicPrice: "3 500", 
                cityPrice: "5 000" 
            }
        ]
    },
    orthopedics: {
        title: "Ортопедия",
        services: [
            { 
                name: "Коронка металлокерамическая", 
                description: "Подготовка зуба, снятие слепков, изготовление и установка коронки", 
                clinicPrice: "25 000", 
                cityPrice: "35 000" 
            },
            { 
                name: "Коронка из диоксида циркония", 
                description: "Подготовка зуба, снятие слепков, изготовление и установка коронки", 
                clinicPrice: "35 000", 
                cityPrice: "50 000" 
            },
            { 
                name: "Вкладка керамическая", 
                description: "Подготовка полости, снятие слепков, изготовление и установка вкладки", 
                clinicPrice: "20 000", 
                cityPrice: "30 000" 
            }
        ]
    },
    prosthetics: {
        title: "Протезирование",
        services: [
            { 
                name: "Съемный протез акриловый", 
                description: "Осмотр, снятие слепков, изготовление и установка протеза", 
                clinicPrice: "30 000", 
                cityPrice: "45 000" 
            },
            { 
                name: "Съемный протез бюгельный", 
                description: "Осмотр, снятие слепков, изготовление и установка протеза", 
                clinicPrice: "50 000", 
                cityPrice: "70 000" 
            },
            { 
                name: "Имплантация с коронкой", 
                description: "Установка импланта, изготовление и установка коронки", 
                clinicPrice: "80 000", 
                cityPrice: "120 000" 
            }
        ]
    }
};

const pricingDataCaries = [
    {
        category: "Лечение кариеса",
        services: [
            { name: "Лечение кариеса", clinicPrice: "15 000", cityPrice: "19 000" },
            { name: "Лечение пульпита", clinicPrice: "15 000", cityPrice: "19 000" },
            { name: "Лечение периодонтита", clinicPrice: "15 000", cityPrice: "19 000" }
        ]
    }
];


// Массив данных для прайс-листа
const pricingData = [
    {
        category: "Имплантация",
        services: [
            { name: "Установка импланта Osstem", clinicPrice: "15 000", cityPrice: "19 000" },
            { name: "Установка импланта Straumann", clinicPrice: "15 000", cityPrice: "19 000" },
            { name: "Установка импланта Neodent", clinicPrice: "15 000", cityPrice: "19 000" }
        ]
    },
    {
        category: "Лечение зубов",
        services: [
            { name: "Лечение кариеса", clinicPrice: "15 000", cityPrice: "19 000"},
            { name: "Лечение пульпита", clinicPrice: "15 000", cityPrice: "19 000" }
        ]
    },
    {
        category: "Удаление зубов",
        services: [
            { name: "Удаление зуба", clinicPrice: "15 000", cityPrice: "19 000" }
        ]
    },
    {
        category: "Гигиена и отбеливание",
        services: [
            { name: "Гигиена зубов", clinicPrice: "15 000", cityPrice: "19 000" },
            { name: "Отбеливание зубов", clinicPrice: "15 000", cityPrice: "19 000" }
        ]
    }
];

// Функция для генерации прайс-листа
function generatePricingTable(category = 'treatment') {
    const pricingContent = document.getElementById('pricingContent');
    
    if (!pricingContent) return;
    
    // Определяем, какой массив данных использовать в зависимости от страницы
    let dataToUse;
    if (window.location.pathname.includes('treatment.html')) {
        dataToUse = pricingDataCaries;
    } else if (window.location.pathname.includes('pricing.html')) {
        // Используем данные из новой структуры для страницы pricing.html
        const categoryData = pricingDataAll[category];
        if (!categoryData) return;
        
        let html = '';
        
        // Добавляем заголовки колонок
        html += `
            <div class="pricing-column-headers">
                <div class="pricing-category-title">Название услуги</div>
                <div class="pricing-category-title">Что входит в стоимость</div>
                <div class="pricing-price-header">Цена в клинике:</div>
                <div class="pricing-price-header">Цена по городу:</div>
            </div>
        `;
        
        // Добавляем услуги
        categoryData.services.forEach(service => {
            html += `
                <div class="pricing-service">
                    <div class="pricing-service-name">${service.name}</div>
                    <div class="pricing-service-description">${service.description}</div>
                    <div class="pricing-price">${service.clinicPrice} ₽</div>
                    <div class="pricing-price-city">${service.cityPrice} ₽</div>
                </div>
            `;
        });
        
        pricingContent.innerHTML = html;
        return;
    } else {
        dataToUse = pricingData;
    }
    
    let html = '';
    
    // Добавляем заголовки колонок справа
    html += `
        <div class="pricing-column-headers">
            <div class="pricing-category-title"></div>
            <div class="pricing-price-header">Цена в клинике:</div>
            <div class="pricing-price-header">Цена по городу:</div>
        </div>
    `;
    
    dataToUse.forEach(category => {
        // Добавляем заголовок категории
        html += `
            <div class="pricing-category">
                <div class="pricing-category-title">${category.category}</div>
                <div class="pricing-price"></div>
                <div class="pricing-price-city"></div>
            </div>
        `;
        
        // Добавляем услуги в категории
        category.services.forEach(service => {
            html += `
                <div class="pricing-service">
                    <div class="pricing-service-name">${service.name}</div>
                    <div class="pricing-price">${service.clinicPrice} ₽</div>
                    <div class="pricing-price-city">${service.cityPrice} ₽</div>
                </div>
            `;
        });
    });
    
    pricingContent.innerHTML = html;
}

// Функция для инициализации селектора категорий прайс-листа
function initializePricingCategories() {
    const categoryButtons = document.querySelectorAll('.pricing-category-btn');
    
    if (!categoryButtons.length) return;
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Убираем активный класс у всех кнопок
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // Добавляем активный класс к нажатой кнопке
            this.classList.add('active');
            
            // Получаем категорию из data-атрибута
            const category = this.getAttribute('data-category');
            
            // Генерируем новую таблицу с выбранной категорией
            generatePricingTable(category);
        });
    });
}

// Массив для хранения данных форм
let consultationData = [];

// Функция для инициализации формы консультации
function initializeConsultationForm() {
    const form = document.getElementById('consultationForm');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    
    if (form) {
        // Обработка имени - автоматическая заглавная буква
        if (nameInput) {
            nameInput.addEventListener('input', function(e) {
                let value = e.target.value;
                if (value.length > 0) {
                    value = value.charAt(0).toUpperCase() + value.slice(1);
                    e.target.value = value;
                }
            });
        }
        
        // Обработка телефона - форматирование и валидация
        if (phoneInput) {
            phoneInput.addEventListener('input', function(e) {
                let cursorPosition = e.target.selectionStart;
                let oldValue = e.target.value;
                let newValue = e.target.value;
                
                // Убираем все кроме цифр
                let numbers = newValue.replace(/\D/g, '');
                
                // Ограничиваем количество цифр до 11 (без учета кода страны)
                if (numbers.length > 11) {
                    numbers = numbers.substring(0, 11);
                }
                
                // Обрабатываем логику префикса
                if (numbers.length > 0) {
                    // Если первая цифра 9, добавляем 7 в начало
                    if (numbers.charAt(0) === '9') {
                        numbers = '7' + numbers;
                    }
                    // Если первая цифра не 7, заменяем на 7
                    else if (numbers.charAt(0) !== '7') {
                        numbers = '7' + numbers.substring(1);
                    }
                }
                
                // Форматируем номер
                let formatted = '';
                if (numbers.length > 0) {
                    formatted = '+7';
                    if (numbers.length > 1) {
                        formatted += ' (' + numbers.substring(1, 4);
                        if (numbers.length > 4) {
                            formatted += ') ' + numbers.substring(4, 7);
                            if (numbers.length > 7) {
                                formatted += ' ' + numbers.substring(7, 9);
                                if (numbers.length > 9) {
                                    formatted += '-' + numbers.substring(9, 11);
                                }
                                if (numbers.length > 11) {
                                    formatted += '-' + numbers.substring(11, 12);
                                }
                            }
                        }
                    }
                }
                
                // Устанавливаем новое значение
                e.target.value = formatted;
                
                // Простая логика позиционирования курсора
                let newCursorPosition = formatted.length;
                
                // Если вводится первая цифра
                if (oldValue === '' && newValue.length === 1) {
                    newCursorPosition = 6; // Позиция после первой цифры в скобках
                }
                // Если удаляется символ
                else if (oldValue.length > newValue.length) {
                    // Оставляем курсор в конце
                    newCursorPosition = formatted.length;
                }
                // Если добавляется символ
                else if (oldValue.length < newValue.length) {
                    // Ставим курсор в конец
                    newCursorPosition = formatted.length;
                }
                
                // Устанавливаем курсор в правильную позицию
                setTimeout(() => {
                    e.target.setSelectionRange(newCursorPosition, newCursorPosition);
                }, 0);
            });
            
            // Обработка вставки
            phoneInput.addEventListener('paste', function(e) {
                e.preventDefault();
                let pastedText = (e.clipboardData || window.clipboardData).getData('text');
                let numbers = pastedText.replace(/\D/g, '');
                
                if (numbers.length > 0) {
                    // Ограничиваем количество цифр до 10 (без учета кода страны)
                    if (numbers.length > 11) {
                        numbers = numbers.substring(0, 11);
                    }
                    
                    // Обрабатываем логику префикса
                    if (numbers.charAt(0) === '9') {
                        numbers = '7' + numbers;
                    } else if (numbers.charAt(0) !== '7') {
                        numbers = '7' + numbers.substring(1);
                    }
                    
                    // Форматируем номер
                    let formatted = '';
                    if (numbers.length > 0) {
                        formatted = '+7';
                        if (numbers.length > 1) {
                            formatted += ' (' + numbers.substring(1, 4);
                            if (numbers.length > 4) {
                                formatted += ') ' + numbers.substring(4, 7);
                                if (numbers.length > 7) {
                                    formatted += ' ' + numbers.substring(7, 9);
                                    if (numbers.length > 9) {
                                        formatted += '-' + numbers.substring(9, 11);
                                    }
                                    if (numbers.length > 11) {
                                        formatted += '-' + numbers.substring(11, 12);
                                    }
                                }
                            }
                        }
                    }
                    
                    this.value = formatted;
                }
            });
        }
        
        // Обработка отправки формы
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = nameInput ? nameInput.value.trim() : '';
            const phone = phoneInput ? phoneInput.value.trim() : '';
            const privacy = document.getElementById('privacy') ? document.getElementById('privacy').checked : false;
            
            // Валидация
            if (!name) {
                alert('Пожалуйста, введите ваше имя');
                nameInput.focus();
                return;
            }
            
            // Проверяем формат телефона +7 (XXX) XXX XX-XX или +7 (XXX) XXX XX-X
            const phoneRegex = /^\+7\s\(\d{3}\)\s\d{3}\s\d{2}-\d{1,2}$/;
            if (!phone || !phoneRegex.test(phone)) {
                alert('Пожалуйста, введите корректный номер телефона в формате +7 (XXX) XXX XX-XX');
                phoneInput.focus();
                return;
            }
            
            if (!privacy) {
                alert('Необходимо согласие с политикой конфиденциальности');
                document.getElementById('privacy').focus();
                return;
            }
            
            // Создаем объект с данными
            const formData = {
                id: Date.now(), // Уникальный ID
                name: name,
                phone: phone,
                privacy: privacy,
                timestamp: new Date().toISOString(),
                status: 'new'
            };
            
            // Добавляем в массив
            consultationData.push(formData);
            
            // Выводим в консоль для проверки
            console.log('Новая заявка:', formData);
            console.log('Все заявки:', consultationData);
            
            // Показываем уведомление об успешной отправке
            showSuccessNotification();
            
            // Очищаем форму
            form.reset();
        });
    }
}

// Функция для показа уведомления об успешной отправке
function showSuccessNotification() {
    const notification = document.getElementById('successNotification');
    if (notification) {
        notification.classList.add('show');
        
        // Скрываем уведомление через 5 секунд
        setTimeout(() => {
            notification.classList.remove('show');
        }, 5000);
    }
}

// Функция для инициализации кнопки телефона
function initializePhoneButton() {
    const phoneButton = document.querySelector('.phone-screen-button');
    
    if (phoneButton) {
        phoneButton.addEventListener('click', function() {
            // Открываем диалог звонка или перенаправляем на номер телефона
            const phoneNumber = '83832500002'; // Номер из хедера
            window.open(`tel:${phoneNumber}`, '_self');
        });
    }
}

// Функция для экспорта данных в JSON
function exportConsultationData() {
    const dataStr = JSON.stringify(consultationData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'consultation_data.json';
    link.click();
    URL.revokeObjectURL(url);
}

// Функция для получения всех заявок (для отладки)
function getAllConsultations() {
    return consultationData;
}

// Функция для очистки всех заявок (для отладки)
function clearAllConsultations() {
    consultationData = [];
    console.log('Все заявки очищены');
}

// Массив данных блога
const blogData = {
    mainArticle: {
        id: 1,
        title: "Ультразвуковое отбеливание зубов",
        date: "14.07.2025",
        badge: "Новости",
        image: "images/отбеливание.jpg",
        slug: "ultrasonic-teeth-whitening"
    },
    articles: [
        {
            id: 2,
            title: "Инновационный способ лечения",
            date: "14.07.2025",
            slug: "innovative-treatment-method"
        },
        {
            id: 3,
            title: "Инновационный способ лечения",
            date: "14.07.2025", 
            slug: "innovative-treatment-method-2"
        }
    ]
};

// Массив данных лицензий
const licensesData = [
    {
        id: 1,
        image: "sertificats/sertificat.png",
        title: "Лицензия на медицинскую деятельность"
    },
    {
        id: 2,
        image: "sertificats/sertificat.png", 
        title: "Благодарственное письмо"
    },
    {
        id: 3,
        image: "sertificats/sertificat.png",
        title: "Сертификат качества"
    },
    {
        id: 4,
        image: "sertificats/sertificat.png",
        title: "Государственная лицензия"
    },
    {
        id: 5,
        image: "sertificats/sertificat.png",
        title: "Аккредитация клиники"
    }
];

// Массив данных для слайдера команды на странице "О нас"
const aboutTeamData = [
    {
        id: 1,
        name: "Калашников Денис Анатольевич",
        position: "Главный врач стоматологии",
        specializations: [
            "Стоматолог-хирург",
            "Стоматолог-ортопед"
        ],
        experience: "Опыт работы 22 год",
        photo: "sertificats/none-face.png",
        category: "surgeon"
    },
    {
        id: 2,
        name: "Иванова Елена Сергеевна",
        position: "Врач-терапевт",
        specializations: [
            "Терапевтическая стоматология",
            "Эндодонтия"
        ],
        experience: "Опыт работы 15 лет",
        photo: "sertificats/none-face.png",
        category: "therapist"
    },
    {
        id: 3,
        name: "Петров Алексей Михайлович",
        position: "Врач-ортодонт",
        specializations: [
            "Исправление прикуса",
            "Брекет-системы"
        ],
        experience: "Опыт работы 12 лет",
        photo: "sertificats/none-face.png",
        category: "orthodontist"
    },
    {
        id: 4,
        name: "Смирнова Анна Владимировна",
        position: "Врач-пародонтолог",
        specializations: [
            "Лечение десен",
            "Профилактика"
        ],
        experience: "Опыт работы 8 лет",
        photo: "sertificats/none-face.png",
        category: "hygienist"
    },
    {
        id: 5,
        name: "Сидоров Михаил Петрович",
        position: "Хирург-имплантолог",
        specializations: [
            "Имплантация зубов",
            "Хирургическая стоматология"
        ],
        experience: "Опыт работы 18 лет",
        photo: "sertificats/none-face.png",
        category: "surgeon"
    },
    {
        id: 6,
        name: "Козлова Ольга Александровна",
        position: "Стоматолог-гигиенист",
        specializations: [
            "Профессиональная гигиена",
            "Отбеливание зубов"
        ],
        experience: "Опыт работы 10 лет",
        photo: "sertificats/none-face.png",
        category: "hygienist"
    }
];



// Массив данных команды (в реальном проекте будет приходить с сервера)
const teamData = [
    {
        name: "Юрасов Николай Сергеевич",
        description: "Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях. При создании генератора мы использовали.",
        experience: "Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях.",
        certificates: ["sertificat.png", "sertificat.png", "sertificat.png"],
        photo: "none-face.png"
    },
    {
        name: "Иванов Иван Иванович",
        description: "Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях. При создании генератора мы использовали.",
        experience: "Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях.",
        certificates: ["sertificat.png", "sertificat.png", "sertificat.png"],
        photo: "none-face.png"
    },
    {
        name: "Петрова Анна Сергеевна",
        description: "Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях. При создании генератора мы использовали.",
        experience: "Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях.",
        certificates: ["sertificat.png", "sertificat.png", "sertificat.png"],
        photo: "none-face.png"
    },
    {
        name: "Сидоров Алексей Петрович",
        description: "Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях. При создании генератора мы использовали.",
        experience: "Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях.",
        certificates: ["sertificat.png", "sertificat.png", "sertificat.png"],
        photo: "none-face.png"
    },
    {
        name: "Козлова Мария Александровна",
        description: "Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях. При создании генератора мы использовали.",
        experience: "Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях.",
        certificates: ["sertificat.png", "sertificat.png", "sertificat.png"],
        photo: "none-face.png"
    }
];

// Функция для генерации карточек команды (только для главной страницы)
function generateTeamCards() {
    const teamSlider = document.getElementById('teamSlider');
    
    // Не работаем на странице "О нас"
    if (!teamSlider || window.location.pathname.includes('about.html')) {
        console.log('Team slider not found or on about page');
        return;
    }
    
    let html = '';
    
    teamData.forEach((member, index) => {
        html += `
            <div class="team-card">
                <div class="team-photo">
                    <img src="sertificats/${member.photo}" alt="${member.name}">
                </div>
                <div class="team-content">
                    <h3 class="team-name">${member.name}</h3>
                    <p class="team-description">${member.description}</p>
                    
                    <div class="team-section-title">Сертификаты</div>
                    <div class="team-certificates">
                        ${member.certificates.map(cert => `
                            <div class="certificate-item" onclick="openCertificateModal('sertificats/${cert}')">
                                <img src="sertificats/${cert}" alt="Сертификат">
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="team-section-title">Опыт</div>
                    <p class="team-experience">${member.experience}</p>
                </div>
            </div>
        `;
    });
    
    teamSlider.innerHTML = html;
    console.log('Team cards generated:', html);
}

// Функция для инициализации слайдера команды
function initializeTeamSlider() {
    if (typeof $ !== 'undefined' && $.fn.slick) {
        $('#teamSlider').slick({
            dots: false,
            infinite: true,
            speed: 800,
            easing: 'ease-in-out',
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: false,
            variableWidth: true,
            adaptiveHeight: false,
            prevArrow: '#teamPrev',
            nextArrow: '#teamNext',
            cssEase: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        centerMode: false,
                        variableWidth: true,
                        slidesToShow: 1,
                        speed: 800
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        centerMode: false,
                        variableWidth: false,
                        slidesToShow: 1,
                        speed: 800
                    }
                }
            ]
        });
    }
}



// Функции для работы с модальным окном сертификатов
function createCertificateModal() {
    // Создаем модальное окно, если его еще нет
    if (!document.getElementById('certificateModal')) {
        const modal = document.createElement('div');
        modal.id = 'certificateModal';
        modal.className = 'certificate-modal';
        modal.innerHTML = `
            <div class="certificate-modal-content">
                <button class="certificate-modal-close" onclick="closeCertificateModal()">&times;</button>
                <img class="certificate-modal-image" id="certificateModalImage" src="" alt="Сертификат">
            </div>
        `;
        document.body.appendChild(modal);
        
        // Добавляем обработчики для закрытия модалки
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeCertificateModal();
            }
        });
        
        // Закрытие по Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                closeCertificateModal();
            }
        });
        
        // Закрытие при прокрутке колеса
        document.addEventListener('wheel', function(e) {
            if (modal.classList.contains('show')) {
                closeCertificateModal();
            }
        });
        
        // Закрытие при любом клике на странице (кроме самой модалки)
        document.addEventListener('click', function(e) {
            if (modal.classList.contains('show') && !modal.contains(e.target) && !e.target.closest('.certificate-item')) {
                closeCertificateModal();
            }
        });
    }
}

function openCertificateModal(imageSrc) {
    createCertificateModal();
    
    const modal = document.getElementById('certificateModal');
    const image = document.getElementById('certificateModalImage');
    
    image.src = imageSrc;
    modal.classList.add('show');
    document.body.classList.add('modal-open');
}

function closeCertificateModal() {
    const modal = document.getElementById('certificateModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.classList.remove('modal-open');
    }
}

// Функция для генерации карточек отзывов
function generateReviewCards() {
    const reviewsSlider = document.getElementById('reviewsSlider');
    
    if (!reviewsSlider) {
        console.log('Reviews slider not found');
        return;
    }
    
    let html = '';
    
    reviewsData.forEach(review => {
        const stars = '★'.repeat(review.rating);
        
        html += `
            <div class="review-card">
                <div class="review-date">${review.date}</div>
                <div class="review-rating">
                    ${Array.from({length: review.rating}, () => '<span class="review-star">★</span>').join('')}
                </div>
                <img src="icons/'.svg" alt="Кавычки" class="review-quote">
                <p class="review-text">${review.text}</p>
                <div class="review-author">
                    <div class="review-avatar">
                        <img src="${review.author.avatar}" alt="${review.author.name}">
                    </div>
                    <div class="review-author-info">
                        <div class="review-author-name">${review.author.name}</div>
                        ${review.author.badge ? `<div class="review-author-badge">${review.author.badge}</div>` : ''}
                    </div>
                </div>
            </div>
        `;
    });
    
    // Добавляем карточку 2ГИС
    html += `
        <div class="review-card gis-card" onclick="window.open('https://2gis.ru/penza/search/совершенство%20стоматология%20пенза/firm/5911502791915944?m=44.998539%2C53.191463%2F12.62', '_blank')">
            <div class="gis-content">
                <img src="footer/finger.png" alt="Палец вверх" class="gis-finger">
                <h3 class="gis-title">Еще больше <br>отзывов тут</h3>
                <img src="footer/2gis.png" alt="2ГИС" class="gis-logo">
            </div>
        </div>
    `;
    
    reviewsSlider.innerHTML = html;
    console.log('Review cards generated:', html);
}

// Функция для инициализации слайдера отзывов
function initializeReviewsSlider() {
    if (typeof $ !== 'undefined' && $.fn.slick) {
        $('#reviewsSlider').slick({
            dots: false,
            infinite: true,
            speed: 800,
            easing: 'ease-in-out',
            slidesToShow: 4,
            slidesToScroll: 1,
            centerMode: false,
            variableWidth: false,
            adaptiveHeight: false,
            prevArrow: '#reviewsPrev',
            nextArrow: '#reviewsNext',
            cssEase: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                        speed: 800
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        speed: 800
                    }
                }
            ]
        });
    }
}

// Функция для генерации карточек лицензий
function generateLicenseCards() {
    const licensesSlider = document.getElementById('licensesSlider');
    
    if (!licensesSlider) {
        console.log('Licenses slider not found');
        return;
    }
    
    let html = '';
    
    licensesData.forEach(license => {
        html += `
            <div class="license-card">
                <img src="${license.image}" alt="${license.title}" class="license-image">
            </div>
        `;
    });
    
    licensesSlider.innerHTML = html;
    console.log('License cards generated:', html);
}

// Функция для инициализации слайдера лицензий
function initializeLicensesSlider() {
    if (typeof $ !== 'undefined' && $.fn.slick) {
        $('#licensesSlider').slick({
            dots: false,
            infinite: true,
            speed: 800,
            easing: 'ease-in-out',
            slidesToShow: 4,
            slidesToScroll: 1,
            centerMode: false,
            variableWidth: true,
            adaptiveHeight: false,
            prevArrow: '#licensesPrev',
            nextArrow: '#licensesNext',
            cssEase: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                        variableWidth: true,
                        speed: 800
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        variableWidth: false,
                        speed: 800
                    }
                }
            ]
        });
    }
}

// Функция для инициализации обработчиков блога
function initializeBlogHandlers() {
    const blogCards = document.querySelectorAll('.main-blog-card, .card-item:not(.btn-card)');
    const readMoreBtn = document.querySelector('.btn-card');
    
    // Добавляем обработчики кликов для карточек статей
    blogCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            if (index === 0) {
                // Главная карточка
                navigateToArticle('ultrasound-teeth-whitening');
            } else {
                // Другие карточки
                navigateToArticle('innovative-treatment-method');
            }
        });
    });
    
    // Обработчик для кнопки "Читать еще"
    if (readMoreBtn) {
        readMoreBtn.addEventListener('click', () => {
            navigateToBlog();
        });
    }
    
    console.log('Blog handlers initialized');
}

// Функция навигации к статье (заглушка)
function navigateToArticle(slug) {
    // Заглушка - показываем alert вместо реального перехода
    alert(`Переход к статье: /blog/${slug}\n\nЭто заглушка. В реальном проекте здесь будет переход на страницу статьи.`);
    
    // В реальном проекте будет:
    // window.location.href = `/blog/${slug}`;
}

// Функция навигации к странице блога
function navigateToBlog() {
    // Заглушка - показываем alert вместо реального перехода
    alert(`Переход к странице блога: /blog\n\nЭто заглушка. В реальном проекте здесь будет переход на страницу со всеми статьями.`);
    
    // В реальном проекте будет:
    // window.location.href = '/blog';
}

// Инициализация прайс-листа при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    generatePricingTable();
    initializeConsultationForm();
    initializePhoneButton();
    
    // Генерируем карточки команды только НЕ на странице "О нас"
    if (!window.location.pathname.includes('about.html')) {
    generateTeamCards();
    } else {
        // Генерируем карточки для страницы "О нас"
        generateAboutTeamCards();
    }
    
    generateReviewCards();
    generateLicenseCards();
    initializeBlogHandlers();
    createCertificateModal();
    
    // ============ ФУНКЦИЯ ИНИЦИАЛИЗАЦИИ OFFERS SLIDER ============
    function initializeOffersSlider() {
        if (typeof $ !== 'undefined' && $.fn.slick) {
            // Уничтожаем существующий слайдер если он есть
            if ($('.offers-slider').hasClass('slick-initialized')) {
                $('.offers-slider').slick('unslick');
            }
            
            $('.offers-slider').slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
                dots: true,
                arrows: true,
                autoplay: false,
                centerMode: false,
                responsive: [
                    {
                        breakpoint: 1200,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            centerMode: true,
                            centerPadding: "60px"
                        }
                    },
                    {
                        breakpoint: 450,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            centerMode: false,
                            centerPadding: "0px"
                        }
                    }
                ]
            });
            
            // Добавляем обработчики для кнопок навигации в header
            $('#offersPrev').on('click', function() {
                $('.offers-slider').slick('slickPrev');
            });
            
            $('#offersNext').on('click', function() {
                $('.offers-slider').slick('slickNext');
            });
        }
    }
    
    // Инициализируем слайдеры после загрузки jQuery и Slick
    setTimeout(() => {
        initializeTeamSlider();
        initializeAboutTeamSlider(); // Для страниц "О нас" и "Лечение"
        initializeReviewsSlider();
        initializeLicensesSlider();
        initializeOffersSlider();
    }, 100);

    // ============ МОДАЛЬНОЕ ОКНО ФОРМЫ ОБРАТНОЙ СВЯЗИ ============
    const contactModal = document.getElementById('contactModal');
    const modalClose = document.getElementById('modalClose');
    const contactForm = document.getElementById('contactForm');
    
    // Функция открытия модального окна (глобальная)
    window.openContactModal = function() {
        const modal = document.getElementById('contactModal');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    // Функция закрытия модального окна (глобальная)
    window.closeContactModal = function() {
        const modal = document.getElementById('contactModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    // Закрытие по кнопке X
    if (modalClose) {
        modalClose.addEventListener('click', window.closeContactModal);
    }
    
    // Закрытие по клику на overlay
    if (contactModal) {
        contactModal.addEventListener('click', function(e) {
            if (e.target === contactModal) {
                window.closeContactModal();
            }
        });
    }
    
    // Закрытие по ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && contactModal && contactModal.classList.contains('active')) {
            window.closeContactModal();
        }
    });
    
    // Обработка всех кнопок "Заказать звонок"
    const callButtons = document.querySelectorAll('.header-call-btn, .unique-btn, .hero-btn, [data-action="call"]');
    callButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            window.openContactModal();
        });
    });
    
    // Обработка формы с полным функционалом (только модальное окно)
    document.addEventListener('submit', function(e) {
        // Проверяем, что это форма именно из модального окна
        if (e.target && e.target.id === 'modalContactForm') {
            e.preventDefault();
            console.log('🚀 Модальная форма отправляется!', e.target);
            
            const contactForm = e.target;
            
            // Получаем данные формы
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const phone = formData.get('phone');
            const agreement = formData.get('agreement');
            
            // Валидация
            if (!window.validateForm(name, phone, agreement)) {
                return;
            }
            
            // Блокируем кнопку во время отправки
            const submitBtn = contactForm.querySelector('.contact-submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Отправляется...';
            
            // Имитация отправки на сервер
            setTimeout(() => {
                // Здесь можно добавить реальную отправку данных
                console.log('Данные формы:', { name, phone, agreement });
                
                // Показываем уведомление
                window.showNotification('Заявка отправлена!', 'В ближайшее время с вами свяжется наш администратор');
                
                // Очищаем форму и закрываем модальное окно
                contactForm.reset();
                window.closeContactModal();
                
                // Восстанавливаем кнопку
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }, 1500);
        }
    });
    
    // Функция валидации формы (глобальная)
    window.validateForm = function(name, phone, agreement) {
        let isValid = true;
        
        // Очищаем предыдущие ошибки
        window.clearValidationErrors();
        
        // Валидация имени
        if (!name || name.trim().length < 2) {
            window.showFieldError('name', 'Введите корректное имя (минимум 2 символа)');
            isValid = false;
        }
        
        // Валидация телефона
        const phoneRegex = /^[\+]?[0-9\(\)\-\s]{10,}$/;
        if (!phone || !phoneRegex.test(phone.replace(/\s/g, ''))) {
            window.showFieldError('phone', 'Введите корректный номер телефона');
            isValid = false;
        }
        
        // Валидация согласия
        if (!agreement) {
            window.showFieldError('agreement', 'Необходимо согласие с политикой конфиденциальности');
            isValid = false;
        }
        
        return isValid;
    }
    
    // Функция показа ошибки поля (только в модальном окне)
    window.showFieldError = function(fieldName, message) {
        const modal = document.getElementById('contactModal');
        const field = modal ? modal.querySelector(`[name="${fieldName}"]`) : null;
        if (field) {
            field.style.borderColor = '#ff4444';
            
            // Убираем существующие ошибки
            const existingError = field.parentNode.querySelector('.field-error');
            if (existingError) {
                existingError.remove();
            }
            
            // Добавляем новую ошибку
            const errorDiv = document.createElement('div');
            errorDiv.className = 'field-error';
            errorDiv.textContent = message;
            errorDiv.style.color = '#ff4444';
            errorDiv.style.fontSize = '12px';
            errorDiv.style.marginTop = '5px';
            field.parentNode.appendChild(errorDiv);
            
            // Убираем ошибку при фокусе
            field.addEventListener('focus', function() {
                field.style.borderColor = '';
                const error = field.parentNode.querySelector('.field-error');
                if (error) error.remove();
            }, { once: true });
        }
    }
    
    // Функция очистки ошибок валидации (только в модальном окне)
    window.clearValidationErrors = function() {
        const modal = document.getElementById('contactModal');
        if (modal) {
            const errors = modal.querySelectorAll('.field-error');
            errors.forEach(error => error.remove());
            
            const fields = modal.querySelectorAll('.contact-form-input');
            fields.forEach(field => {
                field.style.borderColor = '';
            });
        }
    }

    // Функция показа уведомления (глобальная)
    window.showNotification = function(title, message) {
        const notification = document.querySelector('.notification');
        if (notification) {
            const titleEl = notification.querySelector('h4');
            const messageEl = notification.querySelector('p');
            
            if (titleEl) titleEl.textContent = title;
            if (messageEl) messageEl.textContent = message;
            
            notification.style.display = 'flex';
            
            // Автоматически скрываем через 5 секунд
            setTimeout(() => {
                notification.style.display = 'none';
            }, 5000);
        }
    }
});


// ===================== Блок "Наши врачи помогут" =====================
const helpServicesData = [
    {
        text: "Установить имплант нового поколения быстро и без боли",
        img: "images/help.png"
    },
    {
        text: "Провести профессиональную чистку и отбеливание зубов",
        img: "images/help.png"
    },
    {
        text: "Вылечить кариес и его осложнения",
        img: "images/help.png"
    },
    {
        text: "Удалить зуб любой сложности",
        img: "images/help.png"
    },
    {
        text: "Исправить прикус и сделать художественную реставрацию",
        img: "images/help.png"
    },
    {
        text: "Исправить прикус и сделать художественную реставрацию винирами",
        img: "images/help.png"
    },
    {
        text: "Восстановить зубы различными ортопедическими конструкциями",
        img: "images/help.png"
    }
];

function generateHelpServices() {
    if (!window.location.pathname.includes('about.html')) return;
    const list = document.getElementById('helpList');
    if (!list) return;

    helpServicesData.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'help-item' + (index === 0 ? ' active' : '');
        li.textContent = item.text;
        li.addEventListener('click', () => setActiveHelpService(index));
        list.appendChild(li);
    });
}

function setActiveHelpService(index) {
    const imageEl = document.getElementById('helpImage');
    if (!imageEl) return;

    const listItems = document.querySelectorAll('.help-item');
    listItems.forEach((li, i) => {
        li.classList.toggle('active', i === index);
    });

    // Анимация смены изображения
    imageEl.style.opacity = '0';
    setTimeout(() => {
        imageEl.src = helpServicesData[index].img;
        imageEl.onload = () => {
            imageEl.style.opacity = '1';
        };
    }, 150);
}

// ===================== Блок "Расчет цены" =====================
const calculatorData = {
    caries: {
        description: "Следует отметить, что постоянный количественный рост и сфера нашей активности позволяет оценить значение новых предложений. И нет сомнений, что действия представителей оппозиции представлены в исключительно положительном свете. Задача организации, в особенности же социально-экономическое развитие требует от нас анализа соответствующих условий активизации. Принимая во внимание показатели успешности, существующая теория способствует повышению качества экономической целесообразности принимаемых решений.",
        details: "Являясь всего лишь частью общей картины, сделанные на базе интернет-аналитики выводы лишь добавляют фракционных разногласий и разоблачены. Для современного мира граница обучения кадров создаёт предпосылки для анализа существующих паттернов поведения. Современные технологии достигли такого уровня, что семантический разбор внешних противодействий однозначно определяет каждого участника как способного принимать собственные решения касательно распределения внутренних резервов и ресурсов.",
        image: "images/lechenie.png"
    },
    pulpitis: {
        description: "Лечение пульпита требует особого подхода и современных технологий. Мы используем передовые методы эндодонтического лечения, которые позволяют сохранить зуб и избежать его удаления. Процедура включает в себя тщательную диагностику, удаление воспаленной пульпы и качественное пломбирование корневых каналов с использованием биосовместимых материалов.",
        details: "Стоимость лечения пульпита зависит от сложности случая, количества корневых каналов и выбранных материалов. В нашей клинике применяются только проверенные методики и качественные пломбировочные материалы, что гарантирует долговечный результат лечения и комфорт пациента во время процедуры.",
        image: "images/lechenie.png"
    },
    periodontitis: {
        description: "Периодонтит - это серьезное заболевание, требующее комплексного подхода к лечению. Наши специалисты используют современные методы диагностики и лечения, включая рентгенографию, профессиональную чистку и при необходимости хирургическое вмешательство. Важно начать лечение на ранней стадии для сохранения зубов.",
        details: "Цена лечения периодонтита формируется исходя из степени поражения тканей, необходимости дополнительных процедур и выбранного плана лечения. Мы предлагаем индивидуальный подход к каждому пациенту и составляем оптимальный план лечения с учетом клинической картины и финансовых возможностей.",
        image: "images/lechenie.png"
    },
    other: {
        description: "Наша клиника предлагает широкий спектр стоматологических услуг, включая профилактику, отбеливание, установку коронок и виниров, исправление прикуса и многое другое. Каждая процедура выполняется с использованием современного оборудования и качественных материалов ведущих производителей.",
        details: "Стоимость дополнительных услуг рассчитывается индивидуально в зависимости от объема работ, выбранных материалов и технологий. Мы всегда предоставляем подробную консультацию и составляем прозрачный план лечения с указанием всех этапов и их стоимости.",
        image: "images/lechenie.png"
    }
};

function initializeCalculator() {
    if (!window.location.pathname.includes('lechenie.html')) return;
    
    const tabs = document.querySelectorAll('.calculator-tab');
    const description = document.getElementById('calculatorDescription');
    const details = document.getElementById('calculatorDetails');
    const image = document.querySelector('.calculator-image');
    
    if (!tabs.length || !description || !details || !image) return;
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Убираем активный класс у всех табов
            tabs.forEach(t => t.classList.remove('active'));
            
            // Добавляем активный класс к текущему табу
            tab.classList.add('active');
            
            // Получаем данные для текущего таба
            const tabData = calculatorData[tab.dataset.tab];
            
            if (tabData) {
                // Обновляем контент с плавной анимацией
                description.style.opacity = '0';
                details.style.opacity = '0';
                image.style.opacity = '0';
                
                setTimeout(() => {
                    description.textContent = tabData.description;
                    details.textContent = tabData.details;
                    image.src = tabData.image;
                    
                    // Возвращаем видимость
                    description.style.opacity = '1';
                    details.style.opacity = '1';
                    image.style.opacity = '1';
                }, 150);
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    generateHelpServices();
    initializeCalculator();
    
    // Инициализация отзывов для about.html
    if (window.location.pathname.includes('about.html')) {
        generateReviewCards();
        initializeReviewsSlider();
        initializeConsultationForm();
        generateLicenseCards();
        initializeLicensesSlider();
    }
    
    // Инициализация команды для lechenie.html
    if (window.location.pathname.includes('lechenie.html')) {
        generateAboutTeamCards();
        initializeAboutTeamSlider();
        generateReviewCards();
        initializeReviewsSlider();
        generateLicenseCards();
        initializeLicensesSlider();
        initializeConsultationForm();
        
        // Инициализация FAQ
        initializeFAQAccordion();
        initializeFAQContactForm();
    }
    
    // Инициализация для treatment.html
    if (window.location.pathname.includes('treatment.html')) {
        generatePricingTable();
        generateAboutTeamCards();
        initializeAboutTeamSlider();
        generateReviewCards();
        initializeReviewsSlider();
        
        // Инициализация FAQ
        initializeFAQAccordion();
        initializeFAQContactForm();
    }
    
    // Инициализация для pricing.html
    if (window.location.pathname.includes('pricing.html')) {
        generatePricingTable('treatment'); // По умолчанию показываем лечение зубов
        initializePricingCategories();
    }
    
    // Инициализация для specialists.html
    if (window.location.pathname.includes('specialists.html')) {
        generateAboutTeamCards('all'); // По умолчанию показываем всех врачей
        initializeTeamCategories();
        // Инициализируем слайдер после генерации контента
        setTimeout(() => {
            initializeAboutTeamSlider();
        }, 100);
    }
    
    // Инициализация для reviews.html
    if (window.location.pathname.includes('reviews.html')) {
        console.log('Инициализация страницы отзывов...');
        console.log('reviewsPageData:', reviewsPageData);
        console.log('filteredReviews:', filteredReviews);
        console.log('Элемент reviewsGrid:', document.getElementById('reviewsGrid'));
        generateReviewsPageCards();
        initializeReviewsFilters();
        initializeLoadMore();
    }
});

// ============ ФУНКЦИИ ДЛЯ СТРАНИЦЫ ОТЗЫВОВ ============

// Переменные для пагинации (будут инициализированы после объявления массива данных)
let currentPage = 1;
const reviewsPerPage = 6;
let filteredReviews = [];

// Функция генерации карточек отзывов для страницы отзывов
function generateReviewsPageCards() {
    console.log('generateReviewsPageCards вызвана');
    const reviewsGrid = document.getElementById('reviewsGrid');
    console.log('reviewsGrid:', reviewsGrid);
    if (!reviewsGrid) {
        console.log('reviewsGrid не найден!');
        return;
    }
    
    const startIndex = 0;
    const endIndex = reviewsPerPage;
    const reviewsToShow = filteredReviews.slice(startIndex, endIndex);
    console.log('reviewsToShow:', reviewsToShow);
    
    let html = '';
    
    if (reviewsToShow.length === 0) {
        // Показываем сообщение об отсутствии отзывов
        html = generateNoReviewsHTML();
    } else {
        reviewsToShow.forEach(review => {
            html += generateReviewCardHTML(review);
        });
    }
    
    console.log('Сгенерированный HTML:', html);
    reviewsGrid.innerHTML = html;
    updateLoadMoreButton();
}

// Функция генерации HTML для случая отсутствия отзывов
function generateNoReviewsHTML() {
    const serviceFilter = document.getElementById('serviceFilter');
    const doctorFilter = document.getElementById('doctorFilter');
    
    const selectedService = serviceFilter ? serviceFilter.value : '';
    const selectedDoctor = doctorFilter ? doctorFilter.value : '';
    
    let serviceText = '';
    let doctorText = '';
    
    if (selectedService) {
        const serviceOptions = {
            'treatment': 'лечения зубов',
            'surgery': 'хирургии',
            'orthodontics': 'ортодонтии',
            'prosthetics': 'протезирования',
            'hygiene': 'гигиены'
        };
        serviceText = serviceOptions[selectedService] || selectedService;
    }
    
    if (selectedDoctor) {
        const doctorOptions = {
            'kalashnikov': 'Калашникова Дениса Анатольевича',
            'ivanova': 'Ивановой Анны Сергеевны',
            'petrov': 'Петрова Михаила Владимировича',
            'sidorova': 'Сидоровой Елены Александровны'
        };
        doctorText = doctorOptions[selectedDoctor] || selectedDoctor;
    }
    
    let message = 'Отзывы не найдены';
    if (selectedService && selectedDoctor) {
        message = `Отзывы по услуге "${serviceText}" у специалиста ${doctorText} не найдены`;
    } else if (selectedService) {
        message = `Отзывы по услуге "${serviceText}" не найдены`;
    } else if (selectedDoctor) {
        message = `Отзывы специалиста ${doctorText} не найдены`;
    }
    
    return `
        <div class="no-reviews-message">
         
            <h3 class="no-reviews-title">${message}</h3>
            <p class="no-reviews-subtitle">Вы можете оставить первый отзыв об этой услуге у этого специалиста</p>
            <button class="no-reviews-btn" onclick="openReviewModal()">Оставить отзыв</button>
        </div>
    `;
}

// Функция генерации HTML карточки отзыва
function generateReviewCardHTML(review) {
    const stars = generateStarsHTML(review.rating);
    const servicesList = review.services.join(', ');
    const avatarInitials = getInitials(review.name);
    
    return `
        <div class="review-card" data-id="${review.id}">
            <div class="review-header">
                <div class="review-avatar">${avatarInitials}</div>
                <div class="review-info">
                    <div class="review-name">${review.name}</div>
                    <div class="review-meta">
                        <span class="review-date">${review.date}</span>
                        <span class="review-source">${review.source}</span>
                    </div>
                </div>
            </div>
            
            <div class="review-rating">
                ${stars}
            </div>
            
            <div class="review-text">
                ${review.text}
            </div>
            
            <div class="review-details">
                <div class="review-detail">
                    <div class="detail-label">Лечащий врач:</div>
                    <div class="detail-value">${review.doctor}</div>
                </div>
                <div class="review-detail">
                    <div class="detail-label">Оказанные услуги:</div>
                    <div class="detail-value">${servicesList}</div>
                </div>
            </div>
        </div>
    `;
}

// Функция генерации звездочек
function generateStarsHTML(rating) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            html += '<span class="star">★</span>';
        } else {
            html += '<span class="star empty">★</span>';
        }
    }
    return html;
}

// Функция получения инициалов из имени
function getInitials(name) {
    const names = name.split(' ');
    if (names.length >= 2) {
        return names[0][0] + names[1][0];
    }
    return name[0] + name[1] || name[0];
}

// Функция инициализации фильтров
function initializeReviewsFilters() {
    const serviceFilter = document.getElementById('serviceFilter');
    const doctorFilter = document.getElementById('doctorFilter');
    
    if (serviceFilter) {
        serviceFilter.addEventListener('change', filterReviews);
    }
    
    if (doctorFilter) {
        doctorFilter.addEventListener('change', filterReviews);
    }
}

// Функция фильтрации отзывов
function filterReviews() {
    const serviceFilter = document.getElementById('serviceFilter');
    const doctorFilter = document.getElementById('doctorFilter');
    
    const selectedService = serviceFilter ? serviceFilter.value : '';
    const selectedDoctor = doctorFilter ? doctorFilter.value : '';
    
    filteredReviews = reviewsPageData.filter(review => {
        const serviceMatch = !selectedService || review.category === selectedService;
        const doctorMatch = !selectedDoctor || review.doctorId === selectedDoctor;
        return serviceMatch && doctorMatch;
    });
    
    currentPage = 1;
    generateReviewsPageCards();
}

// Функция инициализации кнопки "Показать ещё"
function initializeLoadMore() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreReviews);
    }
}

// Функция загрузки дополнительных отзывов
function loadMoreReviews() {
    const reviewsGrid = document.getElementById('reviewsGrid');
    if (!reviewsGrid) return;
    
    const startIndex = currentPage * reviewsPerPage;
    const endIndex = startIndex + reviewsPerPage;
    const reviewsToShow = filteredReviews.slice(startIndex, endIndex);
    
    if (reviewsToShow.length > 0) {
        let html = '';
        reviewsToShow.forEach(review => {
            html += generateReviewCardHTML(review);
        });
        
        reviewsGrid.insertAdjacentHTML('beforeend', html);
        currentPage++;
        updateLoadMoreButton();
    }
}

// Функция обновления состояния кнопки "Показать ещё"
function updateLoadMoreButton() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (!loadMoreBtn) return;
    
    const totalShown = currentPage * reviewsPerPage;
    const hasMore = totalShown < filteredReviews.length;
    
    if (hasMore) {
        loadMoreBtn.style.display = 'inline-block';
        loadMoreBtn.disabled = false;
    } else {
        loadMoreBtn.style.display = 'none';
    }
}

// ============ ФУНКЦИИ МОДАЛЬНОГО ОКНА ОТЗЫВА ============

// Открытие модального окна
function openReviewModal() {
    const modal = document.getElementById('reviewModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Инициализируем рейтинг звездочки
        initializeRatingStars();
        
        // Инициализируем форму
        initializeReviewForm();
        
        // Добавляем обработчик клика вне модального окна
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeReviewModal();
            }
        });
        
        // Добавляем обработчик клавиши Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeReviewModal();
            }
        });
    }
}

// Закрытие модального окна
function closeReviewModal() {
    const modal = document.getElementById('reviewModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Сбрасываем форму
        resetReviewForm();
    }
}

// Инициализация звездочек рейтинга
function initializeRatingStars() {
    const stars = document.querySelectorAll('.rating-star');
    const ratingInput = document.getElementById('reviewRating');
    
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            ratingInput.value = rating;
            
            // Обновляем визуальное отображение
            stars.forEach((s, index) => {
                if (index < rating) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
        });
        
        // Hover эффекты
        star.addEventListener('mouseenter', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            stars.forEach((s, index) => {
                if (index < rating) {
                    s.style.color = '#FFD700';
                }
            });
        });
        
        star.addEventListener('mouseleave', function() {
            const currentRating = parseInt(ratingInput.value);
            stars.forEach((s, index) => {
                if (index < currentRating) {
                    s.style.color = '#FFD700';
                } else {
                    s.style.color = '#E5E7EB';
                }
            });
        });
    });
    
    // Устанавливаем рейтинг по умолчанию (5 звезд)
    ratingInput.value = 5;
    stars.forEach((s, index) => {
        if (index < 5) {
            s.classList.add('active');
        }
    });
}

// Инициализация формы отзыва
function initializeReviewForm() {
    const form = document.getElementById('reviewForm');
    const nameInput = document.getElementById('reviewName');
    
    if (!form) return;
    
    // Автоматическая заглавная буква для имени
    if (nameInput) {
        nameInput.addEventListener('input', function(e) {
            let value = e.target.value;
            if (value.length > 0) {
                value = value.charAt(0).toUpperCase() + value.slice(1);
                e.target.value = value;
            }
        });
    }
    
    // Обработка отправки формы
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        submitReview();
    });
}

// Сброс формы
function resetReviewForm() {
    const form = document.getElementById('reviewForm');
    if (form) {
        form.reset();
        
        // Сбрасываем звездочки
        const stars = document.querySelectorAll('.rating-star');
        const ratingInput = document.getElementById('reviewRating');
        
        stars.forEach(star => {
            star.classList.remove('active');
            star.style.color = '#E5E7EB';
        });
        
        if (ratingInput) {
            ratingInput.value = 5;
        }
        
        // Устанавливаем 5 звезд по умолчанию
        stars.forEach((s, index) => {
            if (index < 5) {
                s.classList.add('active');
                s.style.color = '#FFD700';
            }
        });
    }
}

// Отправка отзыва
function submitReview() {
    const form = document.getElementById('reviewForm');
    const submitBtn = form.querySelector('.btn-primary');
    const originalText = submitBtn.textContent;
    
    // Получаем данные формы
    const formData = new FormData(form);
    const name = formData.get('name');
    const service = formData.get('service');
    const doctor = formData.get('doctor');
    const rating = formData.get('rating');
    const text = formData.get('text');
    const privacy = formData.get('privacy');
    
    // Валидация
    if (!name || !service || !doctor || !rating || !text || !privacy) {
        alert('Пожалуйста, заполните все обязательные поля');
        return;
    }
    
    // Показываем состояние загрузки
    submitBtn.textContent = 'Отправляем...';
    submitBtn.disabled = true;
    
    // Имитация отправки
    setTimeout(() => {
        // Здесь можно добавить логику отправки на сервер
        
        // Показываем сообщение об успехе
        showReviewSuccessMessage();
        
        // Закрываем модальное окно
        setTimeout(() => {
            closeReviewModal();
        }, 2000);
        
        // Восстанавливаем кнопку
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

// Показ сообщения об успешной отправке
function showReviewSuccessMessage() {
    const modal = document.getElementById('reviewModal');
    if (!modal) return;
    
    const content = modal.querySelector('.review-modal-content');
    const originalContent = content.innerHTML;
    
    content.innerHTML = `
        <div class="review-success-message">
            <div class="success-icon">✅</div>
            <h3 class="success-title">Отзыв отправлен на модерацию</h3>
            <p class="success-subtitle">Спасибо за ваш отзыв! Мы рассмотрим его в ближайшее время.</p>
        </div>
    `;
}

// Массив данных отзывов клиентов (для слайдера на главной странице)
const reviewsData = [
    {
        date: "09.04.2023",
        rating: 5,
        text: "Уже почти 2 месяца хожу сюда, но у Соколенко Юлии была на записи первичке, и была очень удивлена,мне все так понравилась, была на зубе у неё, все классно и песок и стоматолог, потом на стерилизы, блин она так подготовилась, даже обезболом накрылая.спасибо Юлии больное, наполнила энергией ❤️",
        author: {
            name: "Инкар Мухаметкан",
            avatar: "face/face1.png",
            badge: null
        }
    },
    {
        date: "09.04.2023", 
        rating: 5,
        text: "Уже почти 2 месяца хожу сюда, но у Соколенко Юлии была на записи первичке, и была очень удивлена,мне все так понравилась, была на зубе у неё, все классно и песок и стоматолог, потом на стерилизы, блин она так подготовилась, даже обезболом накрылая.спасибо Юлии больное, наполнила энергией ❤️",
        author: {
            name: "Петр Маралов",
            avatar: "face/face1.png",
            badge: null
        }
    },
    {
        date: "09.04.2023",
        rating: 5, 
        text: "Уже почти 2 месяца хожу сюда, но у Соколенко Юлии была на записи первичке, и была очень удивлена,мне все так понравилась, была на зубе у неё, все классно и песок и стоматолог, потом на стерилизы, блин она так подготовилась, даже обезболом накрылая.спасибо Юлии больное, наполнила энергией ❤️",
        author: {
            name: "Сергей Кузнецов", 
            avatar: "face/face1.png",
            badge: null
        }
    },
    {
        date: "09.04.2023",
        rating: 5,
        text: "Уже почти 2 месяца хожу сюда, но у Соколенко Юлии была на записи первичке, и была очень удивлена,мне все так понравилась, была на зубе у неё, все классно и песок и стоматолог, потом на стерилизы, блин она так подготовилась, даже обезболом накрылая.спасибо Юлии больное, наполнила энергией ❤️",
        author: {
            name: "Антон Косицын",
            avatar: "face/face1.png", 
            badge: null
        }
    },
    {
        date: "10.04.2023",
        rating: 5,
        text: "Отличная клиника! Современное оборудование, вежливый персонал. Особенно хочу отметить работу доктора Сидорова - настоящий профессионал своего дела. Имплантация прошла быстро и безболезненно. Рекомендую всем!",
        author: {
            name: "Мария Иванова",
            avatar: "face/face1.png",
            badge: null
        }
    },
    {
        date: "12.04.2023", 
        rating: 5,
        text: "Лучшая стоматология в городе! Делал здесь отбеливание зубов - результат превосходный. Врачи настоящие мастера, все объяснили, показали. Цены адекватные, качество на высоте. Буду обращаться только сюда!",
        author: {
            name: "Дмитрий Волков",
            avatar: "face/face1.png",
            badge: null
        }
    }
];

// ============ ДАННЫЕ ОТЗЫВОВ ДЛЯ СТРАНИЦЫ ОТЗЫВОВ ============
const reviewsPageData = [
    {
        id: 1,
        name: "Инкар Мухаметкан",
        date: "13.09.2023",
        rating: 5,
        source: "Яндекс",
        text: "Отличная клиника! Врачи профессионалы своего дела. Лечил кариес у Калашникова Дениса Анатольевича - все прошло быстро и безболезненно. Очень доволен результатом и отношением персонала.",
        doctor: "Калашников Денис Анатольевич",
        services: ["Лечение кариеса", "Профессиональная чистка"],
        category: "treatment",
        doctorId: "kalashnikov"
    },
    {
        id: 2,
        name: "Петр Маралов",
        date: "13.08.2023",
        rating: 5,
        source: "2ГИС",
        text: "Приходил на удаление зуба мудрости. Операция прошла идеально, никаких осложнений. Врач объяснил все этапы лечения, успокоил перед процедурой. Рекомендую!",
        doctor: "Петров Михаил Владимирович",
        services: ["Удаление зуба мудрости", "Анестезия"],
        category: "surgery",
        doctorId: "petrov"
    },
    {
        id: 3,
        name: "Антон Косицын",
        date: "25.07.2023",
        rating: 5,
        source: "Продокторов",
        text: "Долго искал хорошего ортодонта. Обратился к Ивановой Анне Сергеевне - не пожалел! Установили брекеты, процесс идет отлично. Врач внимательная и опытная.",
        doctor: "Иванова Анна Сергеевна",
        services: ["Установка брекетов", "Консультация ортодонта"],
        category: "orthodontics",
        doctorId: "ivanova"
    },
    {
        id: 4,
        name: "Елена Смирнова",
        date: "10.07.2023",
        rating: 5,
        source: "Яндекс",
        text: "Делала протезирование зубов. Сидорова Елена Александровна - настоящий мастер! Протезы выглядят как настоящие зубы, никакого дискомфорта. Спасибо за красивую улыбку!",
        doctor: "Сидорова Елена Александровна",
        services: ["Протезирование зубов", "Изготовление коронок"],
        category: "prosthetics",
        doctorId: "sidorova"
    },
    {
        id: 5,
        name: "Мария Козлова",
        date: "28.06.2023",
        rating: 5,
        source: "2ГИС",
        text: "Регулярно хожу на профессиональную чистку зубов. Процедура безболезненная, результат отличный. Персонал вежливый, клиника чистая и современная.",
        doctor: "Калашников Денис Анатольевич",
        services: ["Профессиональная чистка", "Отбеливание"],
        category: "hygiene",
        doctorId: "kalashnikov"
    },
    {
        id: 6,
        name: "Дмитрий Волков",
        date: "15.06.2023",
        rating: 5,
        source: "Продокторов",
        text: "Лечил пульпит. Врач Калашников Денис Анатольевич провел лечение в несколько этапов, все объяснил. Зуб больше не болит, очень доволен качеством работы.",
        doctor: "Калашников Денис Анатольевич",
        services: ["Лечение пульпита", "Пломбирование каналов"],
        category: "treatment",
        doctorId: "kalashnikov"
    },
    {
        id: 7,
        name: "Ольга Новикова",
        date: "03.06.2023",
        rating: 5,
        source: "Яндекс",
        text: "Устанавливала виниры у Сидоровой Елены Александровны. Результат превзошел все ожидания! Зубы стали идеально белыми и ровными. Очень благодарна врачу.",
        doctor: "Сидорова Елена Александровна",
        services: ["Установка виниров", "Эстетическая реставрация"],
        category: "prosthetics",
        doctorId: "sidorova"
    },
    {
        id: 8,
        name: "Александр Морозов",
        date: "20.05.2023",
        rating: 5,
        source: "2ГИС",
        text: "Приходил на консультацию по исправлению прикуса. Иванова Анна Сергеевна подробно объяснила план лечения, показала варианты. Начинаем лечение в следующем месяце.",
        doctor: "Иванова Анна Сергеевна",
        services: ["Консультация ортодонта", "Планирование лечения"],
        category: "orthodontics",
        doctorId: "ivanova"
    },
    {
        id: 9,
        name: "Татьяна Соколова",
        date: "12.05.2023",
        rating: 5,
        source: "Продокторов",
        text: "Удаляла зуб у Петрова Михаила Владимировича. Процедура прошла быстро и безболезненно. Врач опытный, все сделал аккуратно. Рекомендую!",
        doctor: "Петров Михаил Владимирович",
        services: ["Удаление зуба", "Анестезия"],
        category: "surgery",
        doctorId: "petrov"
    },
    {
        id: 10,
        name: "Сергей Лебедев",
        date: "05.05.2023",
        rating: 5,
        source: "Яндекс",
        text: "Лечил кариес и устанавливал пломбу. Калашников Денис Анатольевич - профессионал! Пломба незаметна, зуб не болит. Очень доволен качеством работы.",
        doctor: "Калашников Денис Анатольевич",
        services: ["Лечение кариеса", "Установка пломбы"],
        category: "treatment",
        doctorId: "kalashnikov"
    },
    {
        id: 11,
        name: "Наталья Воробьева",
        date: "28.04.2023",
        rating: 5,
        source: "2ГИС",
        text: "Делала отбеливание зубов. Процедура прошла отлично, результат заметен сразу. Персонал внимательный, клиника современная. Буду рекомендовать знакомым.",
        doctor: "Сидорова Елена Александровна",
        services: ["Отбеливание зубов", "Профессиональная чистка"],
        category: "hygiene",
        doctorId: "sidorova"
    },
    {
        id: 12,
        name: "Игорь Семенов",
        date: "18.04.2023",
        rating: 5,
        source: "Продокторов",
        text: "Устанавливал имплант. Петров Михаил Владимирович провел операцию безупречно. Процесс заживления прошел без осложнений. Очень доволен результатом.",
        doctor: "Петров Михаил Владимирович",
        services: ["Имплантация", "Хирургическая подготовка"],
        category: "surgery",
        doctorId: "petrov"
    }
];

// Инициализация переменных для страницы отзывов
filteredReviews = [...reviewsPageData];

// ============ FAQ АККОРДЕОН ============
function initializeFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Закрываем все активные элементы
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Открываем текущий элемент, если он не был активен
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// ============ FAQ КОНТАКТНАЯ ФОРМА ============
function initializeFAQContactForm() {
    const faqContactForm = document.getElementById('faqContactForm');
    const nameInput = document.getElementById('faqName');
    const phoneInput = document.getElementById('faqPhone');
    
    if (!faqContactForm) return;
    
    // Обработка имени - автоматическая заглавная буква
    if (nameInput) {
        nameInput.addEventListener('input', function(e) {
            let value = e.target.value;
            if (value.length > 0) {
                value = value.charAt(0).toUpperCase() + value.slice(1);
                e.target.value = value;
            }
        });
    }
    
    // Обработка телефона - форматирование и валидация (точно как в consultation)
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let cursorPosition = e.target.selectionStart;
            let oldValue = e.target.value;
            let newValue = e.target.value;
            
            // Убираем все кроме цифр
            let numbers = newValue.replace(/\D/g, '');
            
            // Ограничиваем количество цифр до 11 (без учета кода страны)
            if (numbers.length > 11) {
                numbers = numbers.substring(0, 11);
            }
            
            // Обрабатываем логику префикса
            if (numbers.length > 0) {
                // Если первая цифра 9, добавляем 7 в начало
                if (numbers.charAt(0) === '9') {
                    numbers = '7' + numbers;
                }
                // Если первая цифра не 7, заменяем на 7
                else if (numbers.charAt(0) !== '7') {
                    numbers = '7' + numbers.substring(1);
                }
            }
            
            // Форматируем номер
            let formatted = '';
            if (numbers.length > 0) {
                formatted = '+7';
                if (numbers.length > 1) {
                    formatted += ' (' + numbers.substring(1, 4);
                    if (numbers.length > 4) {
                        formatted += ') ' + numbers.substring(4, 7);
                        if (numbers.length > 7) {
                            formatted += ' ' + numbers.substring(7, 9);
                            if (numbers.length > 9) {
                                formatted += '-' + numbers.substring(9, 11);
                            }
                            if (numbers.length > 11) {
                                formatted += '-' + numbers.substring(11, 12);
                            }
                        }
                    }
                }
            }
            
            // Устанавливаем новое значение
            e.target.value = formatted;
            
            // Простая логика позиционирования курсора
            let newCursorPosition = formatted.length;
            
            // Если вводится первая цифра
            if (oldValue === '' && newValue.length === 1) {
                newCursorPosition = 6; // Позиция после первой цифры в скобках
            }
            // Если удаляется символ
            else if (oldValue.length > newValue.length) {
                // Оставляем курсор в конце
                newCursorPosition = formatted.length;
            }
            // Если добавляется символ
            else if (oldValue.length < newValue.length) {
                // Ставим курсор в конец
                newCursorPosition = formatted.length;
            }
            
            // Устанавливаем курсор в правильную позицию
            setTimeout(() => {
                e.target.setSelectionRange(newCursorPosition, newCursorPosition);
            }, 0);
        });
        
        // Обработка вставки
        phoneInput.addEventListener('paste', function(e) {
            e.preventDefault();
            let pastedText = (e.clipboardData || window.clipboardData).getData('text');
            let numbers = pastedText.replace(/\D/g, '');
            
            if (numbers.length > 0) {
                // Ограничиваем количество цифр до 11 (без учета кода страны)
                if (numbers.length > 11) {
                    numbers = numbers.substring(0, 11);
                }
                
                // Обрабатываем логику префикса
                if (numbers.charAt(0) === '9') {
                    numbers = '7' + numbers;
                } else if (numbers.charAt(0) !== '7') {
                    numbers = '7' + numbers.substring(1);
                }
                
                // Форматируем номер
                let formatted = '';
                if (numbers.length > 0) {
                    formatted = '+7';
                    if (numbers.length > 1) {
                        formatted += ' (' + numbers.substring(1, 4);
                        if (numbers.length > 4) {
                            formatted += ') ' + numbers.substring(4, 7);
                            if (numbers.length > 7) {
                                formatted += ' ' + numbers.substring(7, 9);
                                if (numbers.length > 9) {
                                    formatted += '-' + numbers.substring(9, 11);
                                }
                                if (numbers.length > 11) {
                                    formatted += '-' + numbers.substring(11, 12);
                                }
                            }
                        }
                    }
                }
                
                this.value = formatted;
            }
        });
    }
    
    // Обработка отправки формы
    faqContactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = nameInput ? nameInput.value.trim() : '';
        const phone = phoneInput ? phoneInput.value.trim() : '';
        const privacy = document.getElementById('faqPrivacy') ? document.getElementById('faqPrivacy').checked : false;
        
        // Валидация
        if (!name) {
            showFAQFormError('Пожалуйста, введите ваше имя');
            nameInput.focus();
            return;
        }
        
        // Проверяем формат телефона +7 (XXX) XXX XX-XX или +7 (XXX) XXX XX-X
        const phoneRegex = /^\+7\s\(\d{3}\)\s\d{3}\s\d{2}-\d{1,2}$/;
        if (!phone || !phoneRegex.test(phone)) {
            showFAQFormError('Пожалуйста, введите корректный номер телефона в формате +7 (XXX) XXX XX-XX');
            phoneInput.focus();
            return;
        }
        
        if (!privacy) {
            showFAQFormError('Необходимо согласие с политикой конфиденциальности');
            document.getElementById('faqPrivacy').focus();
            return;
        }
        
        // Имитация отправки данных
        const submitBtn = faqContactForm.querySelector('.contact-form-btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Отправляем...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            // Создаем объект с данными (как в основной форме)
            const formData = {
                id: Date.now(), // Уникальный ID
                name: name,
                phone: phone,
                privacy: privacy,
                timestamp: new Date().toISOString(),
                status: 'new',
                source: 'FAQ форма'
            };
            
            // Добавляем в массив consultationData (как в основной форме)
            consultationData.push(formData);
            
            // Выводим в консоль для проверки
            console.log('Новая заявка из FAQ:', formData);
            console.log('Все заявки:', consultationData);
            
            // Показываем уведомление об успехе
            showFAQFormSuccess();
            
            // Сбрасываем форму
            faqContactForm.reset();
            
            // Восстанавливаем кнопку
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// Показать ошибку формы FAQ
function showFAQFormError(message) {
    // Удаляем предыдущие уведомления
    const existingNotifications = document.querySelectorAll('.faq-notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = 'faq-notification faq-notification-error';
    notification.textContent = message;
    
    const form = document.getElementById('faqContactForm');
    form.insertBefore(notification, form.firstChild);
    
    // Автоматически удаляем через 5 секунд
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Показать успех формы FAQ
function showFAQFormSuccess() {
    // Удаляем предыдущие уведомления
    const existingNotifications = document.querySelectorAll('.faq-notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = 'faq-notification faq-notification-success';
    notification.innerHTML = `
        <div class="faq-notification-content">
            <div class="faq-notification-icon">✓</div>
            <div class="faq-notification-text">
                <strong>Спасибо!</strong><br>
                Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.
            </div>
        </div>
    `;
    
    const form = document.getElementById('faqContactForm');
    form.insertBefore(notification, form.firstChild);
    
    // Автоматически удаляем через 8 секунд
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 8000);
}



// Функции режима разработчика
function toggleDevMode() {
    console.log('Режим разработчика переключен');
    // Здесь можно добавить логику переключения режима разработчика
    alert('Режим разработчика переключен');
}

function showDevTools() {
    console.log('Открытие инструментов разработчика');
    // Здесь можно добавить логику открытия инструментов разработчика
    alert('Инструменты разработчика открыты');
}

function clearCache() {
    console.log('Очистка кэша');
    // Здесь можно добавить логику очистки кэша
    if (confirm('Вы уверены, что хотите очистить кэш?')) {
        localStorage.clear();
        sessionStorage.clear();
        alert('Кэш очищен');
        location.reload();
    }
}

function reloadPage() {
    console.log('Перезагрузка страницы');
    location.reload();
}

