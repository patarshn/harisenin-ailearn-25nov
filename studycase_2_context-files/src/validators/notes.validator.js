/**
 * @param {string} code
 * @param {string} message
 */
const validationError = (code, message) => ({ error: { code, message } });

/** @type {import('express').RequestHandler} */
function validateIdParam(req, res, next) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json(validationError('INVALID_ID', 'id harus integer positif'));
  }
  next();
}

/** @type {import('express').RequestHandler} */
function validateCreateNote(req, res, next) {
  const { title, content } = req.body ?? {};
  if (typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json(validationError('VALIDATION_ERROR', 'title wajib diisi'));
  }
  if (content !== undefined && typeof content !== 'string') {
    return res.status(400).json(validationError('VALIDATION_ERROR', 'content harus string'));
  }
  next();
}

module.exports = { validateIdParam, validateCreateNote };
