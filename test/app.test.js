const {expect} = require('chai')
const supertest = require('supertest')
const app = require('../app')

describe('Google play app', () => {
    it('should return a list of books', () => {
        return supertest(app)
        .get('/apps')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
            expect(res.body).to.be.an('array')
            expect(res.body).to.have.lengthOf.at.least(1)
            expect(res.body[0]).to.have.any.keys("App",
            "Category",
            "Rating",
            "Reviews",
            "Size",
            "Installs",
            "Type",
            // "ERROR LINE",
            "Price",
            "Content Rating",
            "Genres",
            "Last Updated",
            "Current Ver",
            "Android Ver", 
            )
        })
        }
    )

    it('should return a list sorted by rating', () => {
        return supertest(app)
        .get("/apps")
        .query({sort: "Rating"})
        .expect(200)
        .expect("Content-Type", /json/)
        .then(res => {
            let sorted = true;
            res.body.forEach((current, index) => {
                if (index != 0) {
                    if (current.Rating < res.body[index - 1].Rating){
                         sorted = false
                }
            }})
            expect(sorted).to.be.true
            
            

        })
    })
})