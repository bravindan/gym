const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

//create a new user
router.post("/create", async (request, response) => {
  try {
    //check if the fields data exists and return error if not
    if (
      !request.body.firstName ||
      !request.body.lastName ||
      !request.body.phoneNumber ||
      !request.body.emailAddress ||
      !request.body.gender ||
      !request.body.password
    ) {
      return response.status(400).send({ message: "All fields are required" });
    }
    //create a new user object
    const newUser={
        firstName: request.body.firstName, 
        lastName: request.body.lastName, 
        phoneNumber: request.body.phoneNumber, 
        emailAddress: request.body.emailAddress, 
        gender: request.body.gender, 
        password: request.body.password,
        role: request.body.role

    }

    //post the request to the server
    const user = await User.create(newUser);
    return response.json({msg: "user created"});

    //catch the error if something goes wrong
  } catch (error) {
    console.log(error.message);
    response.status(500).send(error.message);
  }
});

//getting all users from the db
router.get("/", async (request, response) => {
    const users = await User.find();
    response.json({count: users.length, data: users});
  });

// get user by id
router.get("/:id", async (request, response) => {
    const {id} = request.params;
    const userData = await User.findById(id);
    response.send(userData );
});


//edit user
router.patch("/edit/:id", async (request, response) => {
    const {id} = request.params;
    try{    
      const checkUser = await User.findById(id);
      if(!checkUser) return response.status(404).send("User not found");

      const updatedUser = await User.findByIdAndUpdate(id, request.body, {new: true});
      response.json({msg:"Updated successfully", updatedUser});

    }catch(error){
        response.send(error.message);
    }
});
    
//delete user
router.delete("/delete/:id", async (request, response) => {
    const {id} = request.params;
    const deleteUser = await User.findByIdAndDelete(id);
    response.json({message: `user has been deleted`});
});

module.exports = router;
