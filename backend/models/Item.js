import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Item title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Item description is required'],
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: [
      'Electronics',
      'Clothing',
      'Accessories',
      'Books',
      'Keys',
      'Bags',
      'Jewelry',
      'Documents',
      'Sports Equipment',
      'Other'
    ]
  },
  type: {
    type: String,
    required: [true, 'Item type is required'],
    enum: ['lost', 'found']
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true,
    maxlength: [100, 'Location cannot exceed 100 characters']
  },
  dateOccurred: {
    type: Date,
    required: [true, 'Date is required'],
    validate: {
      validator: function(date) {
        return date <= new Date();
      },
      message: 'Date cannot be in the future'
    }
  },
  contactInfo: {
    phone: {
      type: String,
      validate: {
        validator: function(phone) {
          return !phone || /^[\+]?[1-9][\d]{0,15}$/.test(phone);
        },
        message: 'Please enter a valid phone number'
      }
    },
    email: {
      type: String,
      validate: {
        validator: function(email) {
          return !email || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
        },
        message: 'Please enter a valid email'
      }
    }
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    publicId: {
      type: String,
      required: true
    }
  }],
  status: {
    type: String,
    enum: ['active', 'resolved', 'pending'],
    default: 'active'
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isApproved: {
    type: Boolean,
    default: true // Auto-approve for now
  }
}, {
  timestamps: true
});

// Index for search optimization
itemSchema.index({ title: 'text', description: 'text', location: 'text' });
itemSchema.index({ category: 1, type: 1, status: 1 });
itemSchema.index({ createdAt: -1 });

const Item = mongoose.model('Item', itemSchema);
export default Item;