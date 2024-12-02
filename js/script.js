const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
  
    // If we need pagination
    // pagination: {
    //   el: '.swiper-pagination',
    // },
  
    // Navigation arrows
    // navigation: {
    //   nextEl: '.swiper-button-next',
    //   prevEl: '.swiper-button-prev',
    // },
  
    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });

//Меню бургер
const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
if (iconMenu) { //Если иконка меню вообще есть на странице
    iconMenu.addEventListener("click", function (e) {
        document.body.classList.toggle('_lock'); //Запрет скролла при открытом меню смотри css
        iconMenu.classList.toggle('_active');
        menuBody.classList.toggle('_active');
    });
}
//Будет искать только элементы .menu__link с атрибутом data-goto
const menuLinks = document.querySelectorAll('.menu__link[data-goto]');

if (menuLinks.length > 0) {
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener('click', onMenuLinkClick);
    });

    function onMenuLinkClick(e) {
        const menuLink = e.target; //Объект, по которому произошёл клик (ссылка в данном случае)
        //Если такой объект есть на странице и атрибут data-goto указывает на существующий объект на странице
        if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
            //Получаем его
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            //Местоположение объекта gotoBlock в пикселях + прокрутка экрана в пикселях - высота шапки для идеального наведения
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

            //Прокрутка к требуемому разделу при нажатии на меню в мобильной версии
            if (iconMenu.classList.contains('_active')) {
                document.body.classList.remove('_lock');
                iconMenu.classList.remove('_active');
                menuBody.classList.remove('_active');
            }

            //Скроллим
            window.scrollTo({
                top: gotoBlockValue,
                behavior: "smooth" //Плавная прокрутка
            });
            e.preventDefault();//??? Включает работу
        }
    }
}