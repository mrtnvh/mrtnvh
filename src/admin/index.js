/**
 * The default export of `netlify-cms` is an object with all of the Netlify CMS
 * extension registration methods, such as `registerWidget` and
 * `registerPreviewTemplate`.
 */

import CMS from "netlify-cms";
import * as ColorWidget from "netlify-cms-widget-color";

CMS.registerWidget("color", ColorWidget.Control);
