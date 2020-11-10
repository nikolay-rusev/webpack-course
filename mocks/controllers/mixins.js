const cardLink = require("../mixins/cards/card-link");
const cardMini = require("../mixins/cards/card-mini");
const cardNews = require("../mixins/cards/card-news");
const cardTestimonial = require("../mixins/cards/card-testimonial");

const mixinApiPath = "/api/configuration";
module.exports = [
    {
        path: `${mixinApiPath}/card-link`,
        get: true,
        method: function(req, res) {
            res.json(cardLink);
        }
    },
    {
        path: `${mixinApiPath}/card-mini`,
        get: true,
        method: function(req, res) {
            res.json(cardMini);
        }
    },
    {
        path: `${mixinApiPath}/card-news`,
        get: true,
        method: function(req, res) {
            res.json(cardNews);
        }
    },
    {
        path: `${mixinApiPath}/card-testimonial`,
        get: true,
        method: function(req, res) {
            res.json(cardTestimonial);
        }
    }
];
