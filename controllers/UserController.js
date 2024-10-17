const User = require("../models/UserModels")
const bcrypt = require("bcryptjs");

// create User

exports.insertUser = async(req, res) => {
    try{
        const {name, username, email, password} = req.body;

        const normalizedEmail  = email.toLowerCase();

        // find user by email
        let user = await User.findOne({email: normalizedEmail});
        if(user){
            return res.status(200).json({
                success: false,
                message: "user already exist!!"
            })
        }

        // create new User
        user = await User.create({
            name,
            username,
            email: normalizedEmail,
            password
        });

        // Generated JWT Token
        const token =user.getJWTToken();
        
        //save token
        user.token = token;
        await user.save();

        res.status(200).json({
            success: true,
            message: "User created successfully",
            data: user,
        });

    }catch(err){
        console.log(err);
        res.status(400).send("something went wrong!!");
    }
}

// --------------------Login user--------------------------------------

exports.loginUser = async(req, res)=>{
    
    try{
        const {email, password} = req.body;
    const normalizedEmail = email.toLowerCase();

    // check if user given both password and email
    if(!normalizedEmail || !password){
        return res.status(400).json({
            success: false,
            message: "Please enter email and password",
        });
    }

    //Find User
    let user = await User.findOne({email: normalizedEmail}).select(
        "+password"
    );
    if(!user){
        return res.status(400).json({
            success: false,
            message: "invalid email or password"
        })
    }

    // compare password
    const isMatched = await bcrypt.compare(password, user.password);
    // if password not matched
    if(!isMatched){
        return res.status(400).json({
            success: false,
            message: "Invalid email or password",
        })
    }

    // Generated JWT
    token = user.getJWTToken();
        // Save User Token
        user.token = token;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Login successfully",
            data: user,
      
        });
    }
    catch(err){
        console.log(err);
        res.status(400).send("Something went wrong.");
    }

};


// -------------------------- Get ALl User -------------------------------------

exports.getALLUser = async(req, res)=>{

    try{
        const user = await User.find();

        res.status(200).json({
            success: true,
            message: "All user retrieved successfully ",
            data: user,
        })
    }
    catch(err){
        console.log(err);
        res.status(200).json({
            success: false,
            message: "NO user found",
            
        })
    }

    }

// ------------------------ find single user -----------------------------------

    exports.getSingleUser = async(req, res)=>{

        try{
            const user = await User.findById(req.params.id);
            res.status(200).json({
                success: true,
                message: "User found successfully",
                data: user
            })
        }catch(err){
            console.log(err);
            res.status(400).json({
                success: false,
                message: "User not found ",
            
            })
        }
    }


//  ------------------------- update user -----------------------

exports.updateUser = async(req, res)=>{

    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });
        res.status(200).json({
            success: true,
            message: "User update successfully",
            data: user,
        })
    }catch(err){
        console.log(err);
        res.status(400).send("Something went wrong.");
      
    }
};

// -------------------------- delete API --------------------------------

exports.deleteUser = async(req, res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id);
    
        res.status(200).json({
            success: true,
            message: "user deleted successfully",
            data: user
        })
    }catch(err){
        console.log(err);
        res.status(400).send("Something went wrong.");
        
    }
}