export function stringifyJsonFields(fields, jsonFields){
  /* fields = object with keys that have json */
  /* jsonFieldsArr = array with key names that are json e.g. ['repositories','contact']*/
  let newFields = {}

  for (var key in fields) {
    if (fields.hasOwnProperty(key)) {
      if (jsonFields.includes(key)) {
        newFields[key] = JSON.stringify(fields[key])
      } else {
        newFields[key] = fields[key]
      }
    }
  }
  return newFields
}

export function safeParseJson(json, defaultVal) {
  try {
    return JSON.parse(json)
  } catch(e) {
    return defaultVal;
  }
}

export function nameToSlug(name) {
  /* only use for role/skill/interest/channel name, those only allow alpha chars and spaces */
  return name.replace(/[ ]/g,'-');
}

export function slugToName(slug) {
  return slug.replace(/[-]/g,' ');
}

export const queryParams = {
  parse: (string) => {
    let obj = {};
    let querystring = string.split('?')[1];
    if (!querystring) return {};

    let arr = querystring.split('#')[0].split('&');
    arr.forEach((pair) => {
      let a = pair.split('=');
      let paramNum;
      let paramName = a[0].replace(/\[\d*\]/, (v)=>{
        paramNum = v.splice(1, -1);
        return '';
      });
      let paramVal = (typeof a[1] === 'undefined') ? true : a[1];
      let val = queryParams.decodeParamValue(paramVal);
      obj[paramName.toLowerCase()] = val.toLowerCase();
    })
    return obj;
  },

  stringify: (obj) => {

  },

  decodeParamValue: (val) => {
    try {
      return decodeURIComponent(val);
    } catch(e) {
      return val
    }
  }
}

export const titleize = (string) => {
  let strArr = string.toLowerCase().replace(/[_]/g,' ').split(' ');
  return strArr.map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ')
}
