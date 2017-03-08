/*
* Is a field numeric?
* @param {string} type - Input esri field type
* @return {boolean} - Yes/no on if field is numeric
*/
export default function isNumeric (type) {
  // NOTE: type can be one of the following:
  // "esriFieldTypeSmallInteger", "esriFieldTypeInteger", "esriFieldTypeSingle", "esriFieldTypeDouble",
  // "esriFieldTypeString",
  // "esriFieldTypeDate",
  // "esriFieldTypeOID", "esriFieldTypeGlobalID",
  // "esriFieldTypeGeometry", "esriFieldTypeBlob", "esriFieldTypeRaster", "esriFieldTypeGUID", "esriFieldTypeXML"
  const numericTypes = ['esriFieldTypeSmallInteger', 'esriFieldTypeInteger', 'esriFieldTypeSingle', 'esriFieldTypeDouble', 'esriFieldTypeFloat'];
  return numericTypes.indexOf(type) > -1;
}
