/**
 * Created by jamal on 10/30/14.
 */
var Lab = require('lab');
var expect = require('chai').expect;
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
var before = lab.before;
var after = lab.after;

var server = require("../");

describe("Users", function() {
    it("main endpoint lists usernames on the network", function(done) {
        var options = {
            method: "GET",
            url: "/users"
        };

        server.inject(options, function(response) {
            var result = response.result;

            expect(response.statusCode).to.equal(200);
            expect(result).to.be.instanceof(Array);
            expect(result).to.have.length(5);

            done();
        });
    });

    it("creating valid user", function(done) {
        var options = {
            method: "PUT",
            url: "/users/testuser",
            payload: {
                full_name: "Test User",
                age: 19,
                image: "dhown783hhdwinx.png"
            }
        };

        server.inject(options, function(response) {
            var result = response.result,
                payload = options.payload;

            expect(response.statusCode).to.equal(200);
            expect(result.full_name).to.equal(payload.full_name);
            expect(result.age).to.equal(payload.age);
            expect(result.image).to.equal(payload.image);
            expect(result.count).to.equal(0);

            done();
        });
    });
});