const except = require("chai").expect;
const { response } = require("express");
const request = require("request");
const { TESTING_URL } = require("../../constant/test");

// describe("User API", () => {
//   describe("Create user", () => {
//     describe("create user validation ERROR", () => {
//       describe("Create user missing field", () => {
//         const payload = {
//           username: "",
//           email: "test56@gmail.com",
//           password: "626363636363",
//         };

//         it("Status", (done) => {
//           request.post(
//             `${TESTING_URL}/user`,
//             {
//               json: payload,
//             },
//             (_, response) => {
//               except(response.statusCode).to.equal(400);
//               done();
//             }
//           );
//         });
//       });

//       describe("Create user invalid email field", () => {
//         const payload = {
//           username: "putin",
//           email: "view",
//           password: "7373773",
//         };

//         it("Status", (done) => {
//           request.post(
//             `${TESTING_URL}/user`,
//             {
//               json: payload,
//             },
//             (_, response) => {
//               except(response.statusCode).to.equal(400);
//               done();
//             }
//           );
//         });
//       });
//       describe("Create user duplicate", () => {
//         const payload = {
//           username: "Carine",
//           email: "test45@gmail.com",
//           password: "9494934993",
//         };

//         it("Status", (done) => {
//           request.post(
//             `${TESTING_URL}/user`,
//             {
//               json: payload,
//             },
//             (_, response) => {
//               except(response.statusCode).to.equal(400);
//               done();
//             }
//           );
//         });
//       });

//       describe("User sucess", () => {
//         const paylaod = {
//           username: "firdos",
//           email: "fridos.@gmail.com",
//           password: "Firdas2002",
//         };

//         it("Status", (done) => {
//           request.post(
//             `${TESTING_URL}/user`,
//             {
//               json: paylaod,
//             },
//             (_, response) => {
//               except(response.statusCode).to.equal(200);
//               done();
//             }
//           );
//         });
//       });
//     });
//   });
// });

describe("User API", () => {
  describe("CREATE USER", () => {
    describe("Create user validation ERROR", () => {
      describe("Create user missing field", () => {
        const payload = {
          username: "",
          email: "johndoe@recraftrelic.com",
          password: "johndoe",
        };

        it("Status", (done) => {
          request.post(
            `${TESTING_URL}/user`,
            {
              json: payload,
            },
            (_, response) => {
              expect(response.statusCode).to.equal(400);
              done();
            }
          );
        });

        it("Message", (done) => {
          request.post(
            `${TESTING_URL}/user`,
            {
              json: payload,
            },
            (_, response) => {
              expect(response.body.errors.firstName[0]).to.equal(
                "First Name is required"
              );
              done();
            }
          );
        });
      });

      describe("Create user invalid email field", () => {
        const payload = {
          username: "username",
          email: "johndoe",
          password: "johndoe",
        };

        it("Status", (done) => {
          request.post(
            `${TESTING_URL}/user`,
            {
              json: payload,
            },
            (_, response) => {
              expect(response.statusCode).to.equal(400);
              done();
            }
          );
        });

        it("Message", (done) => {
          request.post(
            `${TESTING_URL}/user`,
            {
              json: payload,
            },
            (_, response) => {
              expect(response.body.errors.email[0]).to.equal(
                "Email is invalid"
              );
              done();
            }
          );
        });
      });

      describe("Create user duplicate", () => {
        const payload = {
          username: "John",
          email: "johndoe@recraftrelic.com",
          password: "johndoe",
        };

        it("Status", (done) => {
          request.post(
            `${TESTING_URL}/user`,
            {
              json: payload,
            },
            (_, response) => {
              expect(response.statusCode).to.equal(400);
              done();
            }
          );
        });

        it("Message", (done) => {
          request.post(
            `${TESTING_URL}/user`,
            {
              json: payload,
            },
            (_, response) => {
              expect(response.body.errors.duplicate[0]).to.equal(
                "User with this email id already exist"
              );
              done();
            }
          );
        });
      });
    });

    it("Create user SUCCESS", (done) => {
      request.post(
        `${TESTING_URL}/user`,
        {
          json: {
            username: "John",
            email: "johndoe@recraftrelic.com",
            password: "johndoe",
          },
        },
        (_, response) => {
          expect(response.statusCode).to.equal(200);
          done();
        }
      );
    });
  });
});
