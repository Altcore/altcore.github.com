/* ----- styles ----- */
require('./less/all.less');

/* ----- library ----- */
module.exports = jQuery = window.jQuery = window.$  = require('./js/lib/jquery-1.10.2.min.js');
require('./js/lib/jquery.noconflict.js');
require('./js/lib/jquery-ui.min.js');
require('./js/lib/slick.js');
require('./js/lib/jquery.fancybox.js');
require('./js/lib/tap.min.js');
require('./js/lib/jquery.hoverIntent.js');
require('./js/lib/qtip.js');
//require('./js/lib/jquery.validate.js');
require('./js/lib/viewport-units-buggyfill.js').init();
require('./js/lib/jquery.imageloader.js');
require('./js/lib/device.min.js');

/* ----- oggetto ----- */
//require('./js/oggetto/form-validator.js');
//require('./js/oggetto/form.js');
require('./js/main.js');
require('./js/mobile.js');
require('./js/home.js');
//require('./js/oggetto/tip.js');