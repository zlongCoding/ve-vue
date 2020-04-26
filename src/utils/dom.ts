// 该属性只有IE-浏览器支持 document.documentMode
// import { EventListener } from './dom'
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
const trim = function (string: String): string {
  return (string || "").replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, "");
};
export const on = (function () {
  if (document.addEventListener) {
    return function (element: Element, event: any, handler: (this: Element, ev: any) => any) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false);
      }
    };
  } else {
    return function (element: any, event: any, handler: (this: Element, ev: any) => any) {
      if (element && event && handler) {
        //IE11浏览器不支持attachEvent
        element.attachEvent("on" + event, handler);
      }
    };
  }
})();

export const off = (function () {
  if (document.removeEventListener) {
    return function (element: Element, event: any, handler: (this: Element, ev: any) => any) {
      if (element && event) {
        element.removeEventListener(event, handler, false);
      }
    };
  } else {
    return function (element: any, event: any, handler: (this: Element, ev: any) => any) {
      if (element && event) {
        element.detachEvent("on" + event, handler);
      }
    };
  }
})();

export const once = function (el: Element, event: any, fn: Function) {
  let listener = function () {
    if (fn) {
      fn.apply(this, arguments);
    }
    off(el, event, listener);
  };
  on(el, event, listener);
};

export function hasClass(el: Element, cls: string) {
  if (!el || !cls) return false;
  if (cls.indexOf(" ") !== -1)
    throw new Error("className should not contain space.");
  if (el.classList) {
    return el.classList.contains(cls);
  } else {
    return (" " + el.className + " ").indexOf(" " + cls + " ") > -1;
  }
}

export function addClass(el: Element, cls: String) {
  if (!el) return;
  let curClass = el.className;
  let classes = (cls || "").split(" ");

  for (let i = 0, j = classes.length; i < j; i++) {
    let clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.add(clsName);
    } else if (!hasClass(el, clsName)) {
      curClass += " " + clsName;
    }
  }
  if (!el.classList) {
    el.className = curClass;
  }
}

export function removeClass(el: Element, cls: String) {
  if (!el || !cls) return;
  let classes = cls.split(" ");
  let curClass = " " + el.className + " ";

  for (let i = 0, j = classes.length; i < j; i++) {
    let clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.remove(clsName);
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(" " + clsName + " ", " ");
    }
  }
  if (!el.classList) {
    el.className = trim(curClass);
  }
}


