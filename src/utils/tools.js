export function treeToMap(tree, key = 'key') {
  const fn = (tree) => {
    return tree.reduce((pre, next) => {
      return {
        ...pre,
        [next[key]]: next,
        ...(next.children && next.children.length ? fn(next.children) : null),
      };
    }, {});
  };
  return fn(tree);
}

export function isMobile() {
  const regex_match =
    /(nokia|iphone|android|motorola|^mot-|softbank|foma|docomo|kddi|up.browser|up.link|htc|dopod|blazer|netfront|helio|hosin|huawei|novarra|CoolPad|webos|techfaith|palmsource|blackberry|alcatel|amoi|ktouch|nexian|samsung|^sam-|s[cg]h|^lge|ericsson|philips|sagem|wellcom|bunjalloo|maui|symbian|smartphone|midp|wap|phone|windows ce|iemobile|^spice|^bird|^zte-|longcos|pantech|gionee|^sie-|portalmmm|jigs browser|hiptop|^benq|haier|^lct|operas*mobi|opera*mini|320x320|240x320|176x220)/i;
  const u = navigator.userAgent;
  if (null == u) {
    return true;
  }
  const result = regex_match.exec(u);

  if (null == result) {
    return false;
  } else {
    return true;
  }
}
