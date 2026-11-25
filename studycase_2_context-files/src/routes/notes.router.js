const { Router } = require('express');
const notesController = require('../controllers/notes.controller');
const { validateCreateNote, validateIdParam } = require('../validators/notes.validator');

const router = Router();

router.get('/', notesController.listNotes);
router.get('/:id', validateIdParam, notesController.getNote);
router.post('/', validateCreateNote, notesController.createNote);

module.exports = router;
