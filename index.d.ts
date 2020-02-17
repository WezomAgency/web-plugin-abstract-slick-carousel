// ----------------------------------------
// Imports
// ----------------------------------------

import $ from 'jquery';
import 'jquery-inview';
import { WebPluginInterface } from 'web-plugin-interface';
import { JQuerySlickOptions } from 'web-plugin-abstract-slick-carousel/slick-carousel';

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
