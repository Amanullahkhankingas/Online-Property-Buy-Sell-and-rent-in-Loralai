import Listing from '../models/listing.model.js';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';

export const createListing = async (req, res, next) => {
  try {
    const user = req.user.id;
    const userdata = await User.findById(req.user.id);
    const email = userdata.email;
    const userAllListingsId = user.slice(-3) + email.slice(-13,-10) + user.slice(7,9) + email.slice(2,3) + user.slice(5,7);
    console.log(userAllListingsId);
    const bodydata= req.body;
    let body = {...bodydata,userAllListingsId};
    const listing = await Listing.create(body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(errorHandler(404, 'Listing not found!'));
  }

  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, 'You can only delete your own listings!'));
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json('Listing has been deleted!');
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, 'Listing not found!'));
  }
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, 'You can only update your own listings!'));
  }

  try {

    const user = req.user.id;
    const userdata = await User.findById(req.user.id);
    const email = userdata.email;
    const userAllListingsId = user.slice(-3) + email.slice(-13,-10) + user.slice(7,9) + email.slice(2,3) + user.slice(5,7);
    console.log(userAllListingsId);
    const bodydata= req.body;
    let body = {...bodydata,userAllListingsId};

    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, 'Listing not found!'));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;

   
    
    let offer = req.query.offer;

    if (offer === undefined || offer === 'false') {
      offer = { $in: [false, true] };
    }

    let furnished = req.query.furnished;

    if (furnished === undefined || furnished === 'false') {
      furnished = { $in: [false, true] };
    }

    let parking = req.query.parking;

    if (parking === undefined || parking === 'false') {
      parking = { $in: [false, true] };
    }

    let type = req.query.type;

    if (type === undefined || type === 'all') {
      type = { $in: ['sale', 'rent'] };
    }

    const searchTerm = req.query.searchTerm || '';
    const userAllListingsId = req.query.userAllListingsId || '';
    const address = req.query.address || '';

    const sort = req.query.sort || 'createdAt';

    const order = req.query.order || 'desc';

    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: 'i' },
      userAllListingsId: { $regex: userAllListingsId},
      address: { $regex: address, $options: 'i' },
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
