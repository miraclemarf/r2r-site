/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'icomoon\'">' + entity + '</span>' + html;
	}
	var icons = {
		'icon-icon_accesories': '&#xe914;',
		'icon-icon_hamburger': '&#xe915;',
		'icon-left-arrow': '&#xe601;',
		'icon-right-arrow': '&#xe603;',
		'icon-symbol_food': '&#xe90d;',
		'icon-symbol_hotel': '&#xe910;',
		'icon-symbol_towing_car': '&#xe916;',
		'icon-logo_ring2ring_full': '&#xe903;',
		'icon-logogram_r2r': '&#xe904;',
		'icon-icon_bike': '&#xe905;',
		'icon-icon_camera': '&#xe906;',
		'icon-icon_destination': '&#xe907;',
		'icon-icon_distance': '&#xe908;',
		'icon-icon_duration': '&#xe909;',
		'icon-icon_flight': '&#xe90a;',
		'icon-icon_helmet': '&#xe90b;',
		'icon-icon_id_card': '&#xe90c;',
		'icon-icon_sad': '&#xe90e;',
		'icon-icon_search': '&#xe90f;',
		'icon-icon_terrain': '&#xe911;',
		'icon-icon_warning': '&#xe912;',
		'icon-youtube-play': '&#xe900;',
		'icon-instagram': '&#xe901;',
		'icon-facebook': '&#xe902;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
