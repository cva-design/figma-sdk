/** RGB color in functional notation (e.g. rgb(255, 0, 0)) */
export type RGB = `rgb(${number}, ${number}, ${number})`;

/** RGBA color in functional notation (e.g. rgba(255, 0, 0, 0.5)) */
export type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;

/** HSL color in functional notation (e.g. hsl(0, 100%, 50%)) */
export type HSL = `hsl(${number}, ${number}%, ${number}%)`;

/** HSLA color in functional notation (e.g. hsla(0, 100%, 50%, 0.5)) */
export type HSLA = `hsla(${number}, ${number}%, ${number}%, ${number})`;

/** Hexadecimal color (e.g. #ff0000, #f00) */
export type HEX = `#${string}`;

/** Modern space-separated RGB(A) notation (e.g. rgb(255 0 0 / 50%)) */
export type ModernRGB =
  `rgb(${number} ${number} ${number}${'' | ` / ${number}%`})`;

/** Modern space-separated HSL(A) notation (e.g. hsl(0 100% 50% / 50%)) */
export type ModernHSL =
  `hsl(${number} ${number}% ${number}%${'' | ` / ${number}%`})`;

/** CSS color keywords (e.g. 'red', 'blue', 'transparent') */
export type ColorKeyword =
  | 'transparent'
  | 'currentColor'
  | 'inherit'
  | 'initial'
  | 'unset'
  | 'aliceblue'
  | 'antiquewhite'
  | 'aqua'
  | 'aquamarine'
  | 'azure'
  | 'beige'
  | 'bisque'
  | 'black'
  | 'blanchedalmond'
  | 'blue'
  | 'blueviolet'
  | 'brown'
  | 'burlywood'
  | 'cadetblue'
  | 'chartreuse'
  | 'chocolate'
  | 'coral'
  | 'cornflowerblue'
  | 'cornsilk'
  | 'crimson'
  | 'cyan'
  | 'darkblue'
  | 'darkcyan'
  | 'darkgoldenrod'
  | 'darkgray'
  | 'darkgreen'
  | 'darkgrey'
  | 'darkkhaki'
  | 'darkmagenta'
  | 'darkolivegreen'
  | 'darkorange'
  | 'darkorchid'
  | 'darkred'
  | 'darksalmon'
  | 'darkseagreen'
  | 'darkslateblue'
  | 'darkslategray'
  | 'darkslategrey'
  | 'darkturquoise'
  | 'darkviolet'
  | 'deeppink'
  | 'deepskyblue'
  | 'dimgray'
  | 'dimgrey'
  | 'dodgerblue'
  | 'firebrick'
  | 'floralwhite'
  | 'forestgreen'
  | 'fuchsia'
  | 'gainsboro'
  | 'ghostwhite'
  | 'gold'
  | 'goldenrod'
  | 'gray'
  | 'green'
  | 'greenyellow'
  | 'grey'
  | 'honeydew'
  | 'hotpink'
  | 'indianred'
  | 'indigo'
  | 'ivory'
  | 'khaki'
  | 'lavender'
  | 'lavenderblush'
  | 'lawngreen'
  | 'lemonchiffon'
  | 'lightblue'
  | 'lightcoral'
  | 'lightcyan'
  | 'lightgoldenrodyellow'
  | 'lightgray'
  | 'lightgreen'
  | 'lightgrey'
  | 'lightpink'
  | 'lightsalmon'
  | 'lightseagreen'
  | 'lightskyblue'
  | 'lightslategray'
  | 'lightslategrey'
  | 'lightsteelblue'
  | 'lightyellow'
  | 'lime'
  | 'limegreen'
  | 'linen'
  | 'magenta'
  | 'maroon'
  | 'mediumaquamarine'
  | 'mediumblue'
  | 'mediumorchid'
  | 'mediumpurple'
  | 'mediumseagreen'
  | 'mediumslateblue'
  | 'mediumspringgreen'
  | 'mediumturquoise'
  | 'mediumvioletred'
  | 'midnightblue'
  | 'mintcream'
  | 'mistyrose'
  | 'moccasin'
  | 'navajowhite'
  | 'navy'
  | 'oldlace'
  | 'olive'
  | 'olivedrab'
  | 'orange'
  | 'orangered'
  | 'orchid'
  | 'palegoldenrod'
  | 'palegreen'
  | 'paleturquoise'
  | 'palevioletred'
  | 'papayawhip'
  | 'peachpuff'
  | 'peru'
  | 'pink'
  | 'plum'
  | 'powderblue'
  | 'purple'
  | 'rebeccapurple'
  | 'red'
  | 'rosybrown'
  | 'royalblue'
  | 'saddlebrown'
  | 'salmon'
  | 'sandybrown'
  | 'seagreen'
  | 'seashell'
  | 'sienna'
  | 'silver'
  | 'skyblue'
  | 'slateblue'
  | 'slategray'
  | 'slategrey'
  | 'snow'
  | 'springgreen'
  | 'steelblue'
  | 'tan'
  | 'teal'
  | 'thistle'
  | 'tomato'
  | 'turquoise'
  | 'violet'
  | 'wheat'
  | 'white'
  | 'whitesmoke'
  | 'yellow'
  | 'yellowgreen';

/** CSS custom property reference (e.g. var(--my-color)) */
export type CSSVar = `var(${string})`;

/** Any valid CSS color value */
export type Color =
  | RGB
  | RGBA
  | HSL
  | HSLA
  | HEX
  | ModernRGB
  | ModernHSL
  | ColorKeyword
  | CSSVar;