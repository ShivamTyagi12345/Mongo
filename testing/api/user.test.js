const User = require('../../model/user')
const app = require('../../app') // my express app
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

describe('Users', () => {

    //Before each test we empty the database

    beforeEach((done) => {
        User.deleteMany().then(
            done()
        )
    });


    //actual api test 
    describe('/POST user', () => {
        const user = {
            "first_name": "test user",
            "last_name": "test user",
            "email": "user@test.com",
            "password": "testuser"
        }
        it('it should POST the user', (done) => {
            chai.request('app')
                .post('/create')
                .send(user)
                .end((err, res) => {
                    if(err){
                        console.log(err)
                    }
                    res.should.have.status(200);
                    done();
                });
        });
    })

    describe('/GET users', () => {
        it('it should GET all the users', (done) => {
            chai.request(app)
                .get('/read')
                .end((err, res) => {
                    if(err){
                        console.log(err)
                    }
                    res.should.have.status(200);
                    done();
                });
        });
    })
})