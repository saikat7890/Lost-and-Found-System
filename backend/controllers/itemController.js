import cloudinary from '../config/cloudinary.js'
import Item from '../models/Item.js';

// Helper function to upload image to Cloudinary
const uploadToCloudinary = (buffer, originalName) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        resource_type: 'image',
        folder: 'trackitdown',
        public_id: `${Date.now()}-${originalName}`,
        transformation: [
          { width: 800, height: 600, crop: 'limit' },
          { quality: 'auto' }
        ]
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve({
            url: result.secure_url,
            publicId: result.public_id
          });
        }
      }
    ).end(buffer);
  });
};

// @route   POST /api/items
// @desc    Create a new item post
// @access  Private
const createItem = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      type,
      location,
      dateOccurred,
      contactPhone,
      contactEmail
    } = req.body;
    
    // Validation
    if (!title || !description || !category || !type || !location || !dateOccurred) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Upload images to Cloudinary
    const imageUploadPromises = req.files.map(file => 
      uploadToCloudinary(file.buffer, file.originalname)
    );

    const uploadedImages = await Promise.all(imageUploadPromises);

    // Create item
    const item = new Item({
      title,
      description,
      category,
      type,
      location,
      dateOccurred: new Date(dateOccurred),
      contactInfo: {
        phone: contactPhone || '',
        email: contactEmail || req.user.email
      },
      images: uploadedImages,
      postedBy: req.user._id
    });

    await item.save();
    await item.populate('postedBy', 'name email');

    res.status(201).json({
      success: true,
      message: 'Item posted successfully',
      item
    });

  } catch (error) {
    console.error('Create item error:', error);

    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: errors.join(', ')
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while creating item'
    });
  }
};
// @route   GET /api/items
// @desc    Get all items with pagination and filters
// @access  Public
const getAllItems = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      type,
      category,
      location,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const query = { status: 'active', isApproved: true };

    // Apply filters
    if (type && ['lost', 'found'].includes(type)) {
      query.type = type;
    }

    if (category) {
      query.category = category;
    }

    if (location) {
      query.location = new RegExp(location, 'i');
    }

    if (search) {
      query.$text = { $search: search };
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const items = await Item.find(query)
      .populate('postedBy', 'name')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Item.countDocuments(query);

    res.json({
      success: true,
      items,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });

  } catch (error) {
    console.error('Get items error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching items'
    });
  }
};
// @route   GET /api/items/my-items
// @desc    Get current user's items
// @access  Private
const getMyItems = async (req, res) => {
  try {
    const items = await Item.find({ postedBy: req.user._id })
      .sort({ createdAt: -1 })
      .populate('postedBy', 'name email');

    res.json({
      success: true,
      items
    });

  } catch (error) {
    console.error('Get user items error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching your items'
    });
  }
};
// @route   GET /api/items/:id
// @desc    Get single item by ID
// @access  Public
const getItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)
      .populate('postedBy', 'name email createdAt');

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    res.json({
      success: true,
      item
    });

  } catch (error) {
    console.error('Get item error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching item'
    });
  }
};
// @route   PUT /api/items/:id
// @desc    Update item (only by owner)
// @access  Private
const updateItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    // Check if user owns the item
    if (item.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this item'
      });
    }

    const allowedUpdates = ['title', 'description', 'location', 'status', 'contactInfo'];
    const updates = {};

    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    ).populate('postedBy', 'name email');

    res.json({
      success: true,
      message: 'Item updated successfully',
      item: updatedItem
    });

  } catch (error) {
    console.error('Update item error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating item'
    });
  }
};
// @route   DELETE /api/items/:id
// @desc    Delete item (only by owner)
// @access  Private
const deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    // Check if user owns the item
    if (item.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this item'
      });
    }

    // Delete images from Cloudinary
    const deletePromises = item.images.map(image => 
      cloudinary.uploader.destroy(image.publicId)
    );
    await Promise.all(deletePromises);

    await Item.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Item deleted successfully'
    });

  } catch (error) {
    console.error('Delete item error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting item'
    });
  }
};

export {createItem, getAllItems, getMyItems, getItem, updateItem, deleteItem};