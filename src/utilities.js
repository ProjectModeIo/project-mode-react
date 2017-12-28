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
