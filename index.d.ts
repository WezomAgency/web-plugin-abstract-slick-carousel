// ----------------------------------------
// Imports
// ----------------------------------------

import $ from 'jquery';
import 'jquery-inview';
import { WebPluginInterface } from 'web-plugin-interface';

// ----------------------------------------
// Public
// ----------------------------------------



export interface JQuerySlickProps {
	pauseAutoplayInOutOfView: boolean;
	cssReadyClass: string;
	cssInitializedClass: string;
	$listSelector: string;
	$dotsSelector: string;
	$prevArrowSelector: string;
	$nextArrowSelector: string;
}

export interface JQuerySlickOptions {
	/**
	 * Enables tabbing and arrow key navigation
	 * Default: true
	 */
	accessibility?: boolean;

	/**
	 * Enables adaptive height for single slide horizontal carousels.
	 * Default: false
	 */
	adaptiveHeight?: boolean;

	/**
	 * Enables Autoplay
	 * Default: false
	 */
	autoplay?: boolean;

	/**
	 * Autoplay Speed in milliseconds
	 * Default: 3000
	 */
	autoplaySpeed?: number;

	/**
	 * Prev/Next Arrows
	 * Default: true
	 */
	arrows?: boolean;

	/**
	 * Set the slider to be the navigation of other slider
	 * Default: null
	 */
	asNavFor?: Element | JQuery | string;

	/**
	 * Change where the navigation arrows are attached (Selector, htmlString, Array, Element, jQuery object)
	 * `false` will prevent arrows from being created/appended
	 * Default: $(element)
	 */
	appendArrows?: Element | Element[] | JQuery | string | boolean;

	/**
	 * Change where the navigation dots are attached (Selector, htmlString, Array, Element, jQuery object)
	 * Default: $(element)
	 */
	appendDots?: Element | Element[] | JQuery | string;

	/**
	 * Allows you to select a node or customize the HTML for the "Previous" arrow.
	 * Default: <button type="button" class="slick-prev">Previous</button>
	 */
	prevArrow?: Element | JQuery | string;

	/**
	 * Allows you to select a node or customize the HTML for the "Next" arrow.
	 * Default: <button type="button" class="slick-next">Next</button>
	 */
	nextArrow?: Element | JQuery | string;

	/**
	 * Enables centered view with partial prev/next slides. Use with odd numbered slidesToShow counts.
	 * Default: false
	 */
	centerMode?: boolean;

	/**
	 * Side padding when in center mode (px or %)
	 * Default: '50px'
	 */
	centerPadding?: string;

	/**
	 * CSS3 Animation Easing
	 * Default: 'ease'
	 */
	cssEase?: string;

	/**
	 * Custom paging templates. See source for use example.
	 * Default: n/a
	 */
	customPaging?: (slider: any, i: number) => string;

	/**
	 * Show dot indicators
	 * Default: false
	 */
	dots?: boolean;

	/**
	 * Class for slide indicator dots container
	 * Default: 'slick-dots'
	 */
	dotsClass?: string;

	/**
	 * Enable mouse dragging
	 * Default: true
	 */
	draggable?: boolean;

	/**
	 * Enable fade
	 * Default: false
	 */
	fade?: boolean;

	/**
	 * Puts focus on slide after change
	 * Default: false
	 */
	focusOnChange?: boolean;

	/**
	 * Enable focus on selected element (click)
	 * Default: false
	 */
	focusOnSelect?: boolean;

	/**
	 * Add easing for jQuery animate. Use with easing libraries or default easing methods
	 * Default: 'linear'
	 */
	easing?: string;

	/**
	 * Resistance when swiping edges of non-infinite carousels
	 * Default: 0.15
	 */
	edgeFriction?: number;

	/**
	 * Infinite loop sliding
	 * Default: true
	 */
	infinite?: boolean;

	/**
	 * Slide to start on
	 * Default: 0
	 */
	initialSlide?: number;

	/**
	 * Set lazy loading technique. Accepts 'ondemand' or 'progressive'.
	 * Default: 'ondemand'
	 */
	lazyLoad?: string;

	/**
	 * Responsive settings use mobile first calculation
	 * Default: false
	 */
	mobileFirst?: boolean;

	/**
	 * Pause Autoplay On Focus
	 * Default: true
	 */
	pauseOnFocus?: boolean;

	/**
	 * Pause Autoplay On Hover
	 * Default: true
	 */
	pauseOnHover?: boolean;

	/**
	 * Pause Autoplay when a dot is hovered
	 * Default: false
	 */
	pauseOnDotsHover?: boolean;

	/**
	 * Width that responsive object responds to. Can be 'window', 'slider' or 'min' (the smaller of the two)
	 * Default: 'window'
	 */
	respondTo?: string;

	/**
	 * Object containing breakpoints and settings objects (see demo).
	 * Enables settings sets at given screen width.
	 * Set settings to "unslick" instead of an object to disable slick at a given breakpoint.
	 * Default: none
	 */
	responsive?: Object;

	/**
	 * Setting this to more than 1 initializes grid mode. Use slidesPerRow to set how many slides should be in each row.
	 * Default: 1
	 */
	rows?: number;

	/**
	 * Element query to use as slide
	 * Default: 'div'
	 */
	slide?: string;

	/**
	 * With grid mode intialized via the rows option, this sets how many slides are in each grid row.
	 * Default: 1
	 */
	slidesPerRow?: number;

	/**
	 * # of slides to show
	 * Default: 1
	 */
	slidesToShow?: number;

	/**
	 * # of slides to scroll
	 * Default: 1
	 */
	slidesToScroll?: number;

	/**
	 * Slide/Fade animation speed (ms)
	 * Default: 300
	 */
	speed?: number;

	/**
	 * Enable swiping
	 * Default: true
	 */
	swipe?: boolean;

	/**
	 * Allow users to drag or swipe directly to a slide irrespective of slidesToScroll.
	 * Default: false
	 */
	swipeToSlide?: boolean;

	/**
	 * Enable slide motion with touch
	 * Default: true
	 */
	touchMove?: boolean;

	/**
	 * To advance slides, the user must swipe a length of (1/touchThreshold) * the width of the slider.
	 * Default: 5
	 */
	touchThreshold?: number;

	/**
	 * Enable/Disable CSS Transitions
	 * Default: true
	 */
	useCSS?: boolean;

	/**
	 * Enable/Disable CSS Transforms
	 * Default: true
	 */
	useTransform?: boolean;

	/**
	 * Variable width slides.
	 * Default: false
	 */
	variableWidth?: boolean;

	/**
	 * Vertical slide mode
	 * Default: false
	 */
	vertical?: boolean;

	/**
	 * Vertical swipe mode
	 * Default: false
	 */
	verticalSwiping?: boolean;

	/**
	 * Change the slider's direction to become right-to-left
	 * Default: false
	 */
	rtl?: boolean;

	/**
	 * Change the slider's direction to become right-to-left
	 * Default: false
	 */
	waitForAnimate?: boolean;

	/**
	 * Set the zIndex values for slides, useful for IE9 and lower
	 * Default: 1000
	 */
	zIndex?: number;
}

export class AbstractSlickCarousel extends WebPluginInterface {
	$container: JQuery;
	props: Partial<JQuerySlickProps>;
	settings: Partial<JQuerySlickOptions>;
	$list: JQuery;
	$dots: JQuery;
	$prevArrow: JQuery;
	$nextArrow: JQuery;
	$arrows: JQuery;
	isInitialized: boolean;
	firstInitialize: boolean;

	constructor(
		$container: JQuery,
		clientSettings: Partial<JQuerySlickOptions> = {},
		clientProps: Partial<JQuerySlickProps> = {}
	);
	get defaultProps(): Partial<JQuerySlickProps>;
	get defaultSettings(): Partial<JQuerySlickOptions>;
	protected _setup(): void;
	protected _beforeInitialize(): void;
	protected _afterInitialize(): void;
	protected _initialize(): void;
	public initialize(): void;
	// extend interface
	protected _autoplayInViewObserver(): void
	public destroy(): void
	public update(): void
}
