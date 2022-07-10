const dayjs = require('dayjs');

dayjs().format();

const helpers = {};

helpers.dayjs = (date) => {
    return dayjs(date).format('DD/MM/YYYY');
};

module.exports = helpers;