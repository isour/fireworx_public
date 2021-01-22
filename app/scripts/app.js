import '@fancyapps/fancybox/dist/jquery.fancybox.min.js';
import 'ion-rangeslider/js/ion.rangeSlider.js';
import 'lazysizes';
import objectFitImages from 'object-fit-images';
// import a plugin
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import 'slick-carousel/slick/slick';
import svg4everybody from 'svg4everybody';
import ymaps from 'ymaps';
import 'select2';
// import IMask from 'imask';
import "core-js/es7/array";
import "core-js/es7/object";
import 'select2';
import 'ie11-custom-properties';

const bodyScrollLock = require('body-scroll-lock');
const disableBodyScroll = bodyScrollLock.disableBodyScroll;
const enableBodyScroll = bodyScrollLock.enableBodyScroll;

const targetElement = document.querySelector('.header__service-menu .header__container');
const targetElement2 = document.querySelector('.header__menu-inner');
const targetElement3 = document.querySelector('.filter__content');


require('es6-promise').polyfill();

const btnPrev = '<button type="button" class="slick-arrow slick-prev slick-arrow_portfolio"><svg class="slick-arrow__icon" fill="none"><use xlink:href="/assets/images/icon.svg#icon_arrow"></use></svg></button>';
const btnNext = '<button type="button" class="slick-arrow slick-next slick-arrow_portfolio"><svg class="slick-arrow__icon" fill="none"><use xlink:href="/assets/images/icon.svg#icon_arrow"></use></svg></button>';
global.$ = $;

// if (!String.prototype.includes) {
//     String.prototype.includes = function(search, start) {
//       if (typeof start !== 'number') {
//         start = 0;
//       }

//       if (start + search.length > this.length) {
//         return false;
//       } else {
//         return this.indexOf(search, start) !== -1;
//       }
//     };
//   }

jQuery.event.special.touchstart = {
    setup: function( _, ns, handle ) {
        this.addEventListener('touchstart', handle, { passive: !ns.includes('noPreventDefault') });
    }
};
jQuery.event.special.touchmove = {
    setup: function( _, ns, handle ) {
        this.addEventListener('touchmove', handle, { passive: !ns.includes('noPreventDefault') });
    }
};

$(() => {
	svg4everybody();
	const $b = $('body');
	const $w = $(window);

	if (!!(navigator.userAgent.match(/Trident/) && !navigator.userAgent.match(/MSIE/))){
		$b.addClass('page_ie11');
	}

	function isM(){
		return ($(window).width() < 1025 ) ? true : false;
	}
	let isMobile = isM();
	$w.on('resize', function (){
		isMobile = isM();
	});
	// mobile menu

		// Create Element.remove() function if not exist
	if (!('remove' in Element.prototype)) {
		Element.prototype.remove = function() {
			if (this.parentNode) {
				this.parentNode.removeChild(this);
			}
		};
	}



	function openedMenu(){
		if ($w.width() > 1200){
			return;
		}
		if ($('.js-mainmenu').hasClass('is-opened') || $('.js-service').hasClass('is-opened')){
			$b.addClass('page_menu');
			disableBodyScroll(targetElement);
			disableBodyScroll(targetElement2);
			$('.js-burger').addClass('is-opened');
			console.log('disable scroll')
		} else {
			$b.removeClass('page_menu');
			bodyScrollLock.clearAllBodyScrollLocks();
			$('.js-burger').removeClass('is-opened');
			console.log('enable scroll')
		}
	}
	$b.on('click', '.js-burger', function (e){
		e.preventDefault();
		e.stopPropagation();
		// $(this).toggleClass('is-opened');
		$('.js-mainmenu').toggleClass('is-opened');
		$('.js-service').toggleClass('is-hidden');
		$('.js-service, .js-servicemenu').removeClass('is-opened');
		$('.js-close, .js-phone').removeClass('is-active');
		openedMenu();
	});
	$b.on('click', '.header__service-menu .header__container, .header__menu-inner', function(e){
		e.stopPropagation();
	});
	$b.on('click', '.js-service', function (e){
		e.preventDefault();
		e.stopPropagation();
		$(this).toggleClass('is-opened is-hidden');
		$('.js-servicemenu').toggleClass('is-opened');
		$('.js-mainmenu').removeClass('is-opened');
		$('.js-close, .js-phone').toggleClass('is-active');
		openedMenu();
	});
	$b.on('click', function(){
		$('.js-service').removeClass('is-hidden');
		$('.js-mainmenu').removeClass('is-opened');
		$('.js-service, .js-servicemenu').removeClass('is-opened');
		$('.js-mainmenu .header__menu-inner').removeClass('is-opened');
		$('.js-close, .js-phone').removeClass('is-active');
		$('.category-popup').remove();
		console.log('click body');
		openedMenu();
	});
	$b.on('click', '.js-servicemenu', function(e){
		e.preventDefault();
		console.log('menu-click')
	})
	// $b.on('click', '.js-mainmenu', function(e){
	// 	e.stopPropagation();
	// 	$('.js-service').removeClass('is-hidden');
	// 	$('.js-mainmenu').removeClass('is-opened');
	// 	$('.js-service, .js-servicemenu').removeClass('is-opened');
	// 	$('.js-mainmenu .header__menu-inner').removeClass('is-opened');
	// 	$('.js-close, .js-phone').removeClass('is-active');
	// 	$('.category-popup').remove();
	// 	console.log('click menu');
	// 	openedMenu();
	// });
	// fancybox
	$('[data-fancybox]').fancybox({
		hideScrollbar: false,
		autoFocus: false,
		smallBtn : false,
		buttons : ['close']
	});
	$b.on('click', '.js-popup', function (e){
		e.preventDefault();
		$.fancybox.open(
			{
				src: $(this).attr('data-url'),
				baseClass: $(this).attr('data-class'),
				type: 'ajax',
				autoFocus: false,
				afterLoad: function( t ) {
					if (t.current.baseClass == 'fancybox-cart' && !isMobile){
						$('.popup_cart').css({
							'right': ($w.width() - $('.header__cart').position().left) + 'px',
							'top': $('.header__cart').position().top + 'px'
						}).addClass('is-opened');
					};

					if (t.current.baseClass == 'fancybox-login' && !isMobile){
						$('.popup_login').css({
							'right': ($w.width() - $('.header__profile').position().left) + 'px',
							'top': $('.header__profile').position().top + 'px'
						}).addClass('is-opened');
					};
				},
				afterShow : function( t ) {
					mainSlider($('.popup_product .js-main'));
					var f_hash = $(t.current.$content).find('form input[name="form_hash"]').val();
					$('body').find('input[name="form_hash"]').val(f_hash);

					if(typeof onloadReCaptchaInvisible == 'function') {
						onloadReCaptchaInvisible();
					}
				}
			}
		);
	});
	window.fancybox = $.fancybox;

	// share script
	$b.on('click', '.js-share', function(e){
		e.preventDefault();
		let $t = $(this);
		window.open($t.attr('href'),'','toolbar=0,status=0,width=626,height=436');
	});
	// video
	function findVideos(videos) {

		for (let i = 0; i < videos.length; i++) {
			setupVideo(videos[i]);
		}
	}

	function setupVideo(video) {
		let link = video.querySelector('.video__link');
		let media = video.querySelector('.video__media');
		let button = video.querySelector('.video__button');
		let id = parseMediaURL(media);

		video.addEventListener('click', () => {
			let iframe = createIframe(id);

			link.remove();
			button.remove();
			video.appendChild(iframe);
		});

		link.removeAttribute('href');
		video.classList.add('video_enabled');
	}

	function parseMediaURL(media) {
		let regexp = new RegExp("\/vi\/([^\/]+)\/", "i");
		let url = media.src;
		let match = url.match(regexp);
		if (!url.match(regexp)){
			match = media.getAttribute('data-src').match(regexp)
		};
		return match[1];
	}

	function createIframe(id) {
		let iframe = document.createElement('iframe');

		iframe.setAttribute('allowfullscreen', '');
		iframe.setAttribute('allow', 'autoplay');
		iframe.setAttribute('src', generateURL(id));
		iframe.classList.add('video__media');

		return iframe;
	}

	function generateURL(id) {
		let query = '?rel=0&showinfo=0&autoplay=1';

		return 'https://www.youtube.com/embed/' + id + query;
	}

	findVideos(document.querySelectorAll('.video'));
	// video end
	// map
	if (typeof window.cities == 'undefined') {

	}
	const mapId = 'js-map';
	if (typeof (document.getElementById(mapId)) !== 'undefined' && document.getElementById(mapId) !== null && !navigator.userAgent.match(/Chrome-Lighthouse/i)) {
		const mapCenter = window.mapCenter;
		// if (!isMobile) mapCenter[1] = mapCenter[1] - 0.05;
		const mapSettings = {
			center: mapCenter,
			zoom: 15,
			controls: ['zoomControl']
		};

		ymaps.load('https://api-maps.yandex.ru/2.1/?lang=ru_RU')
			.then(maps => {
				const myMap = new maps.Map(mapId, mapSettings),
					MyIconContentLayout = maps.templateLayoutFactory.createClass('<div>$[properties.iconContent]</div>');
				const tooltipOpts = {
					// Опции.
					// Необходимо указать данный тип макета.
					iconLayout: 'default#imageWithContent',
					// Своё изображение иконки метки.
					iconImageHref: '/assets/images/common/pin.png',
					// Размеры метки.
					iconImageSize: [27, 47],
					// Смещение левого верхнего угла иконки относительно
					// её "ножки" (точки привязки).
					iconImageOffset: [-14, -45],
					// Смещение слоя с содержимым относительно слоя с картинкой.
					iconContentOffset: [15, 15],
					// Макет содержимого.
					iconContentLayout: MyIconContentLayout
				};


				window.marks.forEach(function (entry, index) {
					myMap.geoObjects.add(
						new maps.Placemark(entry.coords, {
							hintContent: entry.title,
							balloonContent:
								'<div class="tip">' +
									entry.content +
								'</div>'
						}, tooltipOpts)
					);
				});

				myMap.behaviors.disable('scrollZoom');

				$b.on('click', '.js-mapbutton', function(e){
					e.preventDefault();
					let ind = $(this).data('index');
					let point = myMap.geoObjects.get(ind)
					let npoint = point.geometry.getCoordinates();
					if (!isMobile) npoint[1] = npoint[1];
					myMap.setCenter(npoint, 13, {checkZoomRange: false});
					$w.scrollTop($('#js-map').offset().top);
					point.balloon.open();
				});
			})
			.catch(error => console.log('Failed to load Yandex Maps', error));
	}
	// map end

	// reviews start
	$('.js-reviews').slick({
		infinite: false,
		arrows: false,
		adaptiveHeight: false,
		dots: false,
		rows: false,
		adaptiveHeight: true,
		prevArrow: btnPrev,
		nextArrow: btnNext,
		mobileFirst: true,
		responsive: [{
			breakpoint: 767,
			settings: {
				slidesToShow: 2,
				adaptiveHeight: true,
				arrows: true,
				adaptiveHeight: true,
				prevArrow: btnPrev,
				nextArrow: btnNext
			}
		},
		{
			breakpoint: 320,
			settings: {
				slidesToShow: 1,
				arrows: true
			}
		}]
	});
	// reviews end

	let $slickHero = $('.js-hero').slick({
		infinite: true,
		arrows: false,
		adaptiveHeight: false,
		dots: true,
		fade: true,
		rows: false,
		cssEase: 'linear',
		autoplay: true,
		autoplaySpeed: 3000,
		mobileFirst: true,
		adaptiveHeight: true,
		responsive: [{
			breakpoint: 767,
			settings: {
				appendDots: $('.section__container_dots')
			}
		},
		{
			breakpoint: 320,
			settings: {

			}
		}]
	});

	function determineActualHeight($div) {
		var $clone = $div.clone().hide().css('height', 'auto').appendTo($div.parent()),
			height = $clone.height();
		$clone.remove();
		return height;
	 }

	$b.on('click', '.js-tab', function(e){
		e.preventDefault();
		let $t = $(this);
		let $par = $(this).closest('.tabs');
		if (!$t.hasClass('tabs__button_active')){
			$par.find('.tabs__button_active').removeClass('tabs__button_active');
			$par.find('.tabs__tab_active').removeClass('tabs__tab_active');
			$t.addClass('tabs__button_active');
			$($t.data('tab')).addClass('tabs__tab_active').find('.slick-initialized').slick('refresh');
		}
	});

	$w.on('scroll', function(){
		if ($w.scrollTop() > 53){
			$('.header').addClass('header_fixed');
		} else {
			$('.header').removeClass('header_fixed');

		};
	});


	$('.js-select .form-select__select').select2({
		templateResult: Select2format
	});

	function Select2format (text) {
		if (!text.id) { return $('<span class="color-option"/><span>' + text.text + '</span>'); }
		let $text;
		if (text.element.getAttribute('data-icon')){
			$text = $(
				`<span class="select-icon level-${text.element.getAttribute('data-level')}"><span class="select-icon__media"><svg class="icon icon_${text.element.getAttribute('data-icon')}" fill="none"><use xlink:href="/assets/images/icon.svg#icon_${text.element.getAttribute('data-icon')}"></use></svg></span>` + text.text + '</span></span>'
			  );
		} else {
			$text = $(
			  `<span class="level-${text.element.getAttribute('data-level')}">` + text.text + '</span>'
			);
		}
		return $text;
	}

	$('.js-device .form-select__select').on('change', function(){
		let $t = $(this);
		if ($t.val() != ''){
			console.log('value')
			$('.js-crash .form-select__select').prop('disabled', false);
		}
	});

	$('.js-brands').slick({
		lazyLoad: 'ondemand',
		rows: false,
		infinite: false,
		arrows: true,
		adaptiveHeight: false,
		dots: false,
		centerMode: true,
		prevArrow: btnPrev,
		nextArrow: btnNext,
		responsive: [{
			breakpoint: 6000,
			settings: 'unslick'
		},
		{
			breakpoint: 1200,
			settings: 'unslick'
		},
		{
			breakpoint: 700,
			settings: {
				centerMode: true,
				centerPadding: '80px',
				initialSlide: 1
			}
		}]
	});

	$('.js-products').slick({
		infinite: false,
		arrows: true,
		rows: false,
		adaptiveHeight: false,
		dots: false,
		prevArrow: btnPrev,
		nextArrow: btnNext,
		mobileFirst: true,
		slidesToShow: 1.3,
		responsive: [{
			breakpoint: 6000,
			settings: {
				slidesToShow: 5
			}
		},
		{
			breakpoint: 1320,
			settings: {
				slidesToShow: 5
			}
		},
		{
			breakpoint: 1200,
			settings: {
				slidesToShow: 4
			}
		},
		{
			breakpoint: 1024,
			settings: {
				slidesToShow: 3.8
			}
		},
		{
			breakpoint: 767,
			settings: {
				slidesToShow: 3.1
			}
		}]
	});

	$('.js-set').slick({
		infinite: false,
		arrows: true,
		rows: false,
		adaptiveHeight: true,
		dots: false,
		prevArrow: btnPrev,
		nextArrow: btnNext,
		mobileFirst: true,
		slidesToShow: 1,
		responsive: [
		{
			breakpoint: 1200,
			settings: {
				slidesToShow: 2
			}
		},
		{
			breakpoint: 700,
			settings: {
				slidesToShow: 3
			}
		}]
	});
	window.ranges_start = function(){
		$('.js-range .form-input__slider').each(function(){
			let $t = $(this);
			const $wr = $t.closest('.fieldset');
			let val = Number($t.val().replace(/[^0-9]/, ''));
			$t.ionRangeSlider({
				// skin: 'isour',
				type: 'double',
				grid: false,
				min: Number($t.data('smin')),
				max: Number($t.data('smax')),
				step: Number($t.data('sstep')),
				from: Number(($t.data('sfrom') + '').replace(/[^0-9]/, '')),
				to: Number(($t.data('sto') + '').replace(/[^0-9]/, '')),
				hide_min_max: true,
				hide_from_to: true,
				onStart: function(data){
					if(typeof window.rangeStart == 'function'){
						window.rangeStart(data);
					}
				},
				onChange: function (data){
					let dd = data.from
					$wr.find('.js-pricefrom .form-input__input').val(data.from);
					$wr.find('.js-priceto .form-input__input').val(data.to);
					if(typeof window.rangeChange == 'function'){
						window.rangeChange(data);
					}
				},
				onFinish: function (obj) {
					if(typeof window.rangeFinish == 'function'){
						window.rangeFinish(obj);
					}
					// $t.click();
				}
			});
		});
	}
	window.ranges_start();
	$b.on('click', '.js-fieldset', function(e){
		e.preventDefault();
		$(this).closest('.fieldset').toggleClass('fieldset_opened');
	});

	$b.on('click', '.js-filter', function(e){
		e.stopPropagation();
		/*let $t = $('.layout__filter');
		if ($t.hasClass('layout__filter_opened')){
			$t.removeClass('layout__filter_opened');
			bodyScrollLock.clearAllBodyScrollLocks();
		} else {
			$t.addClass('layout__filter_opened');
			disableBodyScroll(targetElement3);
			console.log('disabled scroll')
		}*/
		/* обязательно нужно делать флаг открытия меню за пределами обновляемой области, чтобы через ajax фильтр не пропадал при выборе тегов/ползунков */
		if ($b.hasClass('opened_mobile_filter')){
			$b.removeClass('opened_mobile_filter');
			bodyScrollLock.clearAllBodyScrollLocks();
		} else {
			$b.addClass('opened_mobile_filter');
			disableBodyScroll(targetElement3);
			console.log('disabled scroll')
		}
		// $('.layout__filter').toggleClass('layout__filter_opened');
	});

	$b.on('click', '.filter', function(e){
		e.stopPropagation();
	});

	function mainSlider($sel){
		$sel.slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			dots: false
		});
	}

	mainSlider($('.js-main'));

	$b.on('click', '.js-inc', function(e){
		e.preventDefault();
		$(this).closest('.tocart').find('.tocart__input').val(function(i, oldval) {
			return ++oldval;
		});
	});

	$b.on('click', '.js-dec', function(e){
		e.preventDefault();
		if ($(this).closest('.tocart').find('.tocart__input').val() > 1){
			$(this).closest('.tocart').find('.tocart__input').val(function(i, oldval) {
				return --oldval;
			});
		}
	});

	$b.on('change', '.form-file__input', function(e){
		e.preventDefault();
		$(this).closest('.form-file').find('.form-file__fake').attr({'placeholder': $(this)[0].files[0].name});
		console.log($(this)[0].files[0].name)
	});

	$('.js-select .form-select__select').select2();

	let $nav = $('.js-cart');
	if ($w.width() > 992 && $nav.length > 0){
		$nav.css('width', $nav.outerWidth());
		let $h = $nav.offset().top;
		$w.on('scroll', function(){
			if ($w.scrollTop() > $h - 160) {
				$nav.addClass('cart-total_fixed');
			} else {
				$nav.removeClass('cart-total_fixed');
			}
		});
	}

	$b.on('click', '.js-search', function(){
		$('.header__search-form').toggleClass('is-opened');
	});

});
