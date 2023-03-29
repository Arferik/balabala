import cloneDeep from "lodash/cloneDeep";
export const toSnakeCase = (str: string): string => {
  return str
    .replace(/([A-Z])/g, (g) => (g[0] ? `-${g[0].toLowerCase()}` : ""))
    .replace(/^-/, "");
};

/**
 * 合并className
 * @param classNames
 * @returns
 */
export const twClass = (...classNames: string[]): string =>
  classNames.reduce((total: string, cur: string, index: number) => {
    total +=
      index === 0
        ? cur.replaceAll(/(\n|\s+)/g, " ")
        : ` ${cur.replaceAll(/(\n|\s+)/g, " ")}`;
    return total;
  }, "");

/**
 * 是否为空数组
 * @param value
 * @returns
 */
export const isEmptyArr = (value: any): boolean => {
  if (value === null || value === undefined || !Array.isArray(value)) {
    return true;
  }
  return Array.isArray(value) && value.length === 0;
};

const colorToHex = (color: number) => {
  const hexadecimal = color.toString(16);
  return hexadecimal.length == 1 ? "0" + hexadecimal : hexadecimal;
};

//rgb to hex
export const rgbToHex = ([r, g, b]: [r: number, g: number, g: number]) => {
  return `#${colorToHex(r)}${colorToHex(g)}${colorToHex(b)}`;
};

export const timeToString = (time: number): string => {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
};

// fork from vue-router@3.0.2
// src/util/scroll.js
export function getElementPosition(el: Element): {
  x: number;
  y: number;
} {
  const docEl = document.documentElement;
  const docRect = docEl.getBoundingClientRect();
  const elRect = el.getBoundingClientRect();
  return {
    x: elRect.left - docRect.left,
    y: elRect.top - docRect.top,
  };
}

export function toStringify(params: any): string {
  if (!params) {
    return "";
  }
  return JSON.stringify(params);
}

export function JSON2Object<T>(params: string): T {
  if (!params) {
    return {} as T;
  }
  try {
    return JSON.parse(params) as T;
  } catch (error) {
    return {} as T;
  }
}

/**
 * 设定区间随机数
 * @param min
 * @param max
 * @returns
 */
export function randomTimeStampSeconds(min: number, max: number) {
  return parseInt(`${Math.random() * (max - min) + min}`);
}

/**
 * 屏蔽字段
 * @param cc
 * @param num
 * @param len
 * @param mask
 * @returns
 */
export function secretMask(cc = "", num = 4, len = 32, mask = "*"): string {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const newStr = cloneDeep(cc) as string;
  return newStr ? newStr.slice(-num).padStart(len, mask) : "";
}

export function joinKey(...keys: string[]) {
  return keys.reduce((total, cur) => {
    return total + ":" + cur;
  });
}

export const capitalized = (word: string) =>
  word.charAt(0).toUpperCase() + word.slice(1);
