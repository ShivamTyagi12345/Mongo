const chai = require('chai');
const chaiHttp = require('chai-http');


chai.use(chaiHttp);

require('./api/user.test')
require('./api/auth.test')