'use strict';

/**
 * @module AbstractSlickCarousel
 * @author OlegDutchenko <dutchenko.o.dev@gmail.com>
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
	 */
	constructor ($container, clientSettings = {}) {
		super();

		this.$container = $container;
		this.clientSettings = clientSettings;
		this.isInitialized = false;
		this.firstInitialize = true;
		this.cssReadyClass = 'is-ready';
		this.pauseAutoPlayInOutOfView = false;

		/** @type {SlickCarouselSettings} */
		this.settings = {};

		this.$list = this.$container.find('[data-slick-carousel-list]');
		this.$dots = this.$container.find('[data-slick-carousel-dots]');
		this.$prevArrow = this.$container.find('[data-slick-carousel-prev-arrow]');
		this.$nextArrow = this.$container.find('[data-slick-carousel-next-arrow]');
		this.$arrows = this.$prevArrow.add(this.$nextArrow);
	}

	/**
	 * @protected
	 */
	_setup () {
		// merge settings
		let responsive = $.extend([], this.defaults);
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

		this.settings = $.extend(true, {}, this.defaults, this.clientSettings, {
			responsive,
			appendDots: this.$dots,
			prevArrow: this.$prevArrow,
			nextArrow: this.$nextArrow
		});

		// out of view for autoplay
		this.pauseAutoPlayInOutOfView = this.settings.autoplay;
	}

	/**
	 * @protected
	 */
	_beforeInitialize () {
		super._beforeInitialize();
	}

	/**
	 * @protected
	 */
	_afterInitialize () {
		if (this.pauseAutoPlayInOutOfView && this.settings.autoplay) {
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
			this.$list.addClass(this.cssReadyClass);
			this.$list.slick(this.settings);
			this.isInitialized = true;
			this._afterInitialize();
		}
	}

	/**
	 * @type {SlickCarouselSettings}
	 */
	get defaults () {
		return super.defaults;
	}

	// ------------------------------
	// extend interface
	// ------------------------------

	destroy () {
		if (this.isInitialized) {
			this.$list.unslick();
			this.$list.removeClass(this.cssReadyClass);
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
