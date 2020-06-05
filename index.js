'use strict';

/**
 * @module AbstractSlickCarousel
 * @author OlegDutchenko <dutchenko.o.dev@gmail.com>
 * @version 3.1.0
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

export class AbstractSlickCarousel extends WebPluginInterface {
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

		this.props = {};
		this.clientProps = clientProps;

		this.settings = {};
		this.clientSettings = clientSettings;
	}

	get defaultProps () {
		return {
			pauseAutoplayInOutOfView: false,
			cssReadyClass: 'is-ready',
			cssInitializedClass: 'is-initialized',
			$listSelector: '[data-slick-carousel-list]',
			$dotsSelector: '[data-slick-carousel-dots]',
			$prevArrowSelector: '[data-slick-carousel-prev-arrow]',
			$nextArrowSelector: '[data-slick-carousel-next-arrow]'
		};
	}

	get defaultSettings () {
		return super.defaultSettings;
	}

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
		let responsive = $.extend([], this.defaultSettings.settings || []);
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

	_beforeInitialize () {
		this.$container.addClass(this.props.cssReadyClass);
	}

	_afterInitialize () {
		if (this.props.pauseAutoplayInOutOfView && this.settings.autoplay) {
			this._autoplayInViewObserver();
		}
		this.$container.addClass(this.props.cssInitializedClass);
	}

	initialize () {
		if (this.isInitialized) {
			this.update();
		} else {
			if (this.firstInitialize) {
				this._setup();
				this._beforeInitialize();
			}

			this.$list.slick(this.settings);
			this.isInitialized = true;

			if (this.firstInitialize) {
				this._afterInitialize();
				this.firstInitialize = false;
			}
		}
	}

	_autoplayInViewObserver () {
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

	destroy () {
		if (this.isInitialized) {
			this.$list.slick('unslick');
			this.isInitialized = false;
		}
	}

	update () {
		if (this.isInitialized && this.$list.is(':visible')) {
			this.$list.slick('setPosition');
		}
	}
}
