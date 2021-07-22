const User = require('./../model/user')
const asyncHandler= require('./../utility/asyncHandler')
const AppError = require('./../utility/appError')

const filterObject = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.me = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};
exports.updateMe = asyncHandler( async(req,res, next)=>{
    // validate user data to update
    if  (req.body.password|| req.body.passwordConfirm){
        next(
            new AppError('This route is not for password update',400)
        )
    };
      // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObject(req.body, 'name', 'email');

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  });
});

exports.deleteMe = asyncHandler(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, { active: false });
  
    res.status(204).json({
      status: 'success',
      data: null
    });
});

exports.getUser = asyncHandler(async (req, res, next) => {
  let user = await User.findById(req.params.id);
  
  if (!user) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});