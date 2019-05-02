'use strict';

/**
 * @module AbstractSlickCarousel
 * @author OlegDutchenko <dutchenko.o.dev@gmail.com>
 * @version 3.0.0
 */

// ----------------------------------------
// Imports
// ----------------------------------------

import $ from 'jquery';
import 'jquery-inview';
import 'slick-carousel';
import { WebPluginInterface } from 'web-plugin-interface';

// ----------------------------------------
// Public
// ----------------------------------------

/**
 * @implements WebPluginInterface
 */
export class AbstractSlickCarousel extends WebPluginInterface {
	/**
	 * @param {jQuery} $container
	 * @param {SlickCarouselSettings} clientSettings
	 * @param {SlickCarouselSettings} clientProps
	 */
	constructor ($container, clientSettings = {}, clientProps) {
		super();

		this.$container = $container;
		this.$list = $(null);
		this.$dots = $(null);
		this.$prevArrow = $(null);
		this.$nextArrow = $(null);
		this.$arrows = $(null);

		this.isInitialized = false;
		this.firstInitialize = true;

		/** @type {SlickCarouselProps} */
		this.props = {};
		this.clientProps = clientProps;

		/** @type {SlickCarouselSettings} */
		this.settings = {};
		this.clientSettings = clientSettings;
	}

	/**
	 * @type {SlickCarouselProps}
	 */
	get defaultProps () {
		return {
			pauseAutoPlayInOutOfView: true,
			cssReadyClass: 'is-ready',
			cssInitializedClass: 'is-initialized',
			$listSelector: '[data-slick-carousel-list]',
			$dotsSelector: '[data-slick-carousel-dots]',
			$prevArrowSelector: '[data-slick-carousel-prev-arrow]',
			$nextArrowSelector: '[data-slick-carousel-next-arrow]'
		};
	}

	/**
	 * @type {SlickCarouselSettings}
	 */
	get defaultSettings () {
		return super.defaultSettings;
	}

	/**
	 * @protected
	 */
	_setup () {
		// merge props
		this.props = $.extend({}, this.defaultProps, this.clientProps);

		// get elements
		this.$list = this.$container.find(this.props.$listSelector);
		this.$dots = this.$container.find(this.props.$dotsSelector);
		this.$prevArrow = this.$container.find(this.props.$prevArrowSelector);
		this.$nextArrow = this.$container.find(this.props.$nextArrowSelector);
		this.$arrows = this.$prevArrow.add(this.$nextArrow);

		// merge settings
		let responsive = $.extend([], this.defaultSettings);
		let clientResponsive = $.extend([], this.clientSettings.responsive);
		if (responsive.length && clientResponsive.length) {
			clientResponsive.forEach(({ breakpoint, settings }) => {
				const founded = responsive.filter(responsive => {
					if (responsive.breakpoint !== breakpoint) {
						return false;
					}
					return $.extend(true, responsive.settings, settings);
				});
				if (!founded.length) {
					responsive.push({ breakpoint, settings });
				}
			});
		}

		this.settings = $.extend(true, {}, this.defaultSettings, this.clientSettings, {
			responsive,
			appendDots: this.$dots,
			prevArrow: this.$prevArrow,
			nextArrow: this.$nextArrow
		});

		// sanitize
		delete this.clientProps;
		delete this.clientSettings;
	}

	/**
	 * @protected
	 */
	_beforeInitialize () {
		this.$container.addClass(this.props.cssReadyClass);
	}

	/**
	 * @protected
	 */
	_afterInitialize () {
		if (this.props.pauseAutoPlayInOutOfView && this.settings.autoplay) {
			this.$list.on('inview', (event, isInView) => {
				if (this.isInitialized) {
					if (isInView) {
						this.update();
						this.$list.slick('slickPlay');
					} else {
						this.$list.slick('slickPause');
					}
				}
			});
			this.$list.trigger('inview');
		}
		this.$container.addClass(this.props.cssInitializedClass);
	}

	initialize () {
		if (this.isInitialized) {
			this.update();
		} else {
			if (this.firstInitialize) {
				this._setup();
				this.firstInitialize = false;
			}
			this._beforeInitialize();
			this.$list.slick(this.settings);
			this.isInitialized = true;
			this._afterInitialize();
		}
	}

	// ------------------------------
	// extend interface
	// ------------------------------

	destroy () {
		if (this.isInitialized) {
			this.$list.unslick();
			this.$list.removeClass(this.props.cssReadyClass);
		}
	}

	update () {
		if (this.isInitialized && this.$list.is(':visible')) {
			this.$list.slick('setPosition');
		}
	}
}

// ----------------------------------------
// Definitions
// ----------------------------------------

/**
 * @typedef {Object} SlickCarouselProps
 * @property {boolean} [pauseAutoPlayInOutOfView] - true,
 * @property {string} [cssReadyClass] - 'is-ready',
 * @property {string} [cssInitializedClass] - 'is-initialized',
 * @property {string} [$listSelector] - '[data-slick-carousel-list]',
 * @property {string} [$dotsSelector] - '[data-slick-carousel-dots]',
 * @property {string} [$prevArrowSelector] - '[data-slick-carousel-prev-arrow]',
 * @property {string} [$nextArrowSelector] - '[data-slick-carousel-next-arrow]'
 */

/**
 * @typedef {Object} SlickCarouselSettings
 * @property {boolean} [accessibility=true]
 * @property {boolean} [adaptiveHeight=true]
 * @property {boolean} [autoplay=false]
 * @property {number} [autoplaySpeed=3000]
 * @property {boolean} [arrows=true]
 * @property {string|Selector} [asNavFor=null]
 * @property {string|Selector|htmlString|Array|Element|jQuery} [appendArrows=$(element)]
 * @property {string|Selector|htmlString|Array|Element|jQuery} [appendDots=$(element)]
 * @property {Selector|Element|jQuery} [prevArrow='<button type="button" class="slick-prev">Previous</button>']
 * @property {Selector|Element|jQuery} [nextArrow='<button type="button" class="slick-next">Next</button>']
 * @property {boolean} [centerMode=false]
 * @property {string} [centerPadding='50px']
 * @property {string} [cssEase='ease']
 * @property {function} [customPaging]
 * @property {boolean} [dots=false]
 * @property {string} [dotsClass='slick-dots']
 * @property {boolean} [draggable=true]
 * @property {boolean} [fade=false]
 * @property {boolean} [focusOnSelect=false]
 * @property {string} [easing='linear']
 * @property {number} [edgeFriction=0.5]
 * @property {boolean} [infinite=true]
 * @property {number} [initialSlide=0]
 * @property {string} [lazyLoad='ondemand']
 * @property {boolean} [mobileFirst=false]
 * @property {boolean} [pauseOnFocus=true]
 * @property {boolean} [pauseOnHover=true]
 * @property {boolean} [pauseOnDotsHover=false]
 * @property {string} [respondTo='window']
 * @property {Array<SlickCarouselSettingsResponsive>} [responsive]
 * @property {number} [rows=1]
 * @property {Selector|Element|jQuery} [slide]
 * @property {number} [slidesPerRow=1]
 * @property {number} [slidesToShow=1]
 * @property {number} [slidesToScroll=1]
 * @property {number} [speed=300]
 * @property {boolean} [swipe=true]
 * @property {boolean} [swipeToSlide=false]
 * @property {boolean} [touchMove=true]
 * @property {number} [touchThreshold=5]
 * @property {boolean} [useCSS=true]
 * @property {boolean} [useTransform=true]
 * @property {boolean} [variableWidth=false]
 * @property {boolean} [vertical=false]
 * @property {boolean} [verticalSwiping=false]
 * @property {boolean} [rtl=false]
 * @property {boolean} [waitForAnimate=true]
 * @property {number} [zIndex=5]
 */

/**
 * @typedef {Object} SlickCarouselSettingsResponsive
 * @property {number} breakpoint
 * @property {SlickCarouselSettings} settings
 */
