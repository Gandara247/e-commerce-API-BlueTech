import supertest from 'supertest';
import api from '../utils/api/api';
import jwtk from '../utils/jwt';




describe('/category path test', () => {

    const userAdmin = { id: 1, name: "joao", email: "joao@gmail.com", role: "admin" as "admin",};
    const userClient = { id: 2, name: "josue", email: "josue@gmail.com", role: "client" as "client",};

    it('/get - It should return status 200 because this is a free path', (done) => {
       supertest(api)
        .get('/category') 
        .expect(200) 
        .end((err, res) => {
              done();
        });
    });


    it('/post - It should return status 200 if the authentication is valid', (done) => {
  
        const token = jwtk.createToken(userAdmin); 
    
        supertest(api)
          .post('/category') 
          .set('Authorization', `Bearer ${token}`) 
          .expect(200) 
          .end((err, res) => {
                done();
          });
      });

      it('/pst - It should return status 403 because this path is exclusive for the admin user', (done) => {
    
        const token = jwtk.createToken(userClient); 
    
        supertest(api)
          .put('/category') 
          .set('Authorization', `Bearer ${token}`) 
          .expect(403) 
          .end((err, res) => {
                done();
          });
      });
      
    it('/put - It should return status 200 if the authentication is valid', (done) => {
  
        const token = jwtk.createToken(userAdmin); 
    
        supertest(api)
          .put('/order') 
          .set('Authorization', `Bearer ${token}`) 
          .expect(200) 
          .end((err, res) => {
                done();
          });
      });
    
      it('/put - It should return status 403 because this path is exclusive for the admin user', (done) => {
    
        const token = jwtk.createToken(userClient); 
    
        supertest(api)
          .put('/category/:id') 
          .set('Authorization', `Bearer ${token}`) 
          .expect(403) 
          .end((err, res) => {
                done();
          });
      });
    
      it('/delete - It should return status 204 if the authentication is valid', (done) => { 
    
        const token = jwtk.createToken(userAdmin); 
    
        supertest(api)
          .delete('/order/:id') 
          .set('Authorization', `Bearer ${token}`) 
          .expect(204) 
          .end((err, res) => {
                done();
          });
      });

      it('/delete - It should return status 204 if the authentication is valid', (done) => { 
    
        const token = jwtk.createToken(userClient); 
    
        supertest(api)
          .delete('/order/:id') 
          .set('Authorization', `Bearer ${token}`) 
          .expect(403) 
          .end((err, res) => {
                done();
          });
      });
    
      it('It should return error status 400 because the category is invalid', (done) => {
        supertest(api)
          .get('/category/invalid-category') 
          .expect(400) 
          .end((err, res) => {
            done();
          });
      });

      it('/post - It should return error status 401 for trying to acess the path without token/authentication', (done) => {
        supertest(api)
          .get('/caterogy') 
          .expect(401) 
          .end((err, res) => {
            done();
          });
      });
  
  });
  