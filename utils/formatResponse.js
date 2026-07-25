/**
 * Converts a Mongoose document to a plain object with 'id' instead of '_id'.
 * @param {Object} doc - A Mongoose document
 * @returns {Object} Plain object with 'id' and without '_id' / '__v'
 */
function formatDocument(doc) {
  if (!doc) return null;
  const obj = doc.toObject ? doc.toObject() : doc;
  obj.id = obj._id;
  delete obj._id;
  delete obj.__v;
  return obj;
}

module.exports = { formatDocument };