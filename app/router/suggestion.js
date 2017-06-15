

'use strict';

// const suggestions = require('../controller/suggestion.js');

module.exports = app => {
    app.post('/api/suggestions', 'suggestion.create');
    app.get('/api/suggestions', 'suggestion.retrives'); // query phone?=...
    app.get('/api/suggestions/:id', 'suggestion.retrivesOneSug');
}
