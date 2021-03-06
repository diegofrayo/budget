import { injectGlobal } from 'emotion';

const FONT_SIZE_BASE = 18;

// eslint-disable-next-line
injectGlobal`
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
  width: 100%;
}

body {
  font-family: 'Source Sans Pro', serif;
  font-size: ${FONT_SIZE_BASE}px;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  cursor: default;
  margin: 0;
  padding: 0;
}

ul {
  list-style-type: none;
}

i {
  display: inline-block;
  vertical-align: middle;
}

img,
span {
  vertical-align: middle;
}

button {
  background-color: inherit;
  border: 0;
  outline: 0;
  padding: 0;
}

a {
  text-decoration: none;
}

a:hover {
  color: inherit;
  text-decoration: none;
}

.u-position-right-bottom {
  bottom: 0;
  position: absolute;
  right: 0;
}

.u-position-left-bottom {
  bottom: 0;
  left: 0;
  position: absolute;
}

.u-position-left-top {
  left: 0;
  position: absolute;
  top: 0;
}

.u-position-right-top {
  position: absolute;
  right: 0;
  top: 0;
}

.u-position-bottom {
  bottom: 0;
  left: 0;
  position: absolute;
}

.u-cut-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.u-box-shadow {
  box-shadow: 0 0 10px 1px black;
}

.u-text-center {
  text-align: center !important;
}

.u-text-right {
  text-align: right !important;
}

.u-hidden {
  display: none !important;
}

.u-pos-relative {
  position: relative !important;
}

.u-clearfix {
  overflow: auto !important;
}

.u-pull-right {
  float: right !important;
}

/*
Extra small devices Pho;nes
@media screen and (max-width: 767px) {}

Small devices Tablets
@media screen and (max-width: 991px) {}

Medium devices Desktops
@media screen and (max-width: 1199px) {}

Large devices Desktop
@media screen and (min-width: 1200px) {}
*/
`;
