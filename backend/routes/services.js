import express from 'express';
import { body, validationResult } from 'express-validator';
import { 
  createService, 
  findServices, 
  findServiceById, 
  updateService, 
  deleteService, 
  getServiceCategories, 
  getFeaturedServices 
} from '../models/Service.js';
import { protect, authorize } from '../middleware/auth.js';
import { uploadSingle, handleUploadError } from '../middleware/upload.js';

const router = express.Router();

// Validation middleware
const validateService = [
  body('title')
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage('Title must be between 5 and 100 characters'),
  body('description')
    .trim()
    .isLength({ min: 20, max: 1000 })
    .withMessage('Description must be between 20 and 1000 characters'),
  body('category')
    .isIn(['development', 'design', 'consulting', 'maintenance', 'other'])
    .withMessage('Invalid category'),
  body('features')
    .isArray({ min: 1 })
    .withMessage('At least one feature must be specified'),
  body('technologies')
    .isArray({ min: 1 })
    .withMessage('At least one technology must be specified'),
  body('pricing')
    .isIn(['hourly', 'fixed', 'monthly', 'custom'])
    .withMessage('Invalid pricing model')
];

// @desc    Get all services (public)
// @route   GET /api/services
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const { category, featured, page = 1, limit = 10 } = req.query;

    const result = await findServices(
      { category, featured },
      { page, limit }
    );

    res.json({
      success: true,
      data: result.services,
      pagination: result.pagination
    });

  } catch (error) {
    next(error);
  }
});

// @desc    Get service by ID (public)
// @route   GET /api/services/:id
// @access  Public
router.get('/:id', async (req, res, next) => {
  try {
    const service = await findServiceById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        error: 'Service not found'
      });
    }

    res.json({
      success: true,
      data: service
    });

  } catch (error) {
    next(error);
  }
});

// @desc    Create new service (admin only)
// @route   POST /api/services
// @access  Private/Admin
router.post('/', protect, authorize('admin', 'superadmin'), uploadSingle, validateService, async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const serviceData = {
      ...req.body,
      features: Array.isArray(req.body.features) 
        ? req.body.features 
        : req.body.features.split(',').map(feature => feature.trim()),
      technologies: Array.isArray(req.body.technologies) 
        ? req.body.technologies 
        : req.body.technologies.split(',').map(tech => tech.trim())
    };

    // Add image if uploaded
    if (req.file) {
      serviceData.image = `/uploads/${req.file.filename}`;
    }

    const service = await createService(serviceData);

    res.status(201).json({
      success: true,
      message: 'Service created successfully',
      data: service
    });

  } catch (error) {
    next(error);
  }
});

// @desc    Update service (admin only)
// @route   PUT /api/services/:id
// @access  Private/Admin
router.put('/:id', protect, authorize('admin', 'superadmin'), uploadSingle, validateService, async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const serviceData = { ...req.body };
    
    // Handle arrays
    if (req.body.features) {
      serviceData.features = Array.isArray(req.body.features) 
        ? req.body.features 
        : req.body.features.split(',').map(feature => feature.trim());
    }
    
    if (req.body.technologies) {
      serviceData.technologies = Array.isArray(req.body.technologies) 
        ? req.body.technologies 
        : req.body.technologies.split(',').map(tech => tech.trim());
    }

    // Add new image if uploaded
    if (req.file) {
      serviceData.image = `/uploads/${req.file.filename}`;
    }

    const service = await updateService(req.params.id, serviceData);

    if (!service) {
      return res.status(404).json({
        success: false,
        error: 'Service not found'
      });
    }

    res.json({
      success: true,
      message: 'Service updated successfully',
      data: service
    });

  } catch (error) {
    next(error);
  }
});

// @desc    Delete service (admin only)
// @route   DELETE /api/services/:id
// @access  Private/Admin
router.delete('/:id', protect, authorize('admin', 'superadmin'), async (req, res, next) => {
  try {
    const service = await deleteService(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        error: 'Service not found'
      });
    }

    res.json({
      success: true,
      message: 'Service deleted successfully'
    });

  } catch (error) {
    next(error);
  }
});

// @desc    Get service categories (public)
// @route   GET /api/services/categories/all
// @access  Public
router.get('/categories/all', async (req, res, next) => {
  try {
    const categories = await getServiceCategories();

    res.json({
      success: true,
      data: categories
    });

  } catch (error) {
    next(error);
  }
});

// @desc    Get featured services (public)
// @route   GET /api/services/featured/all
// @access  Public
router.get('/featured/all', async (req, res, next) => {
  try {
    const featuredServices = await getFeaturedServices();

    res.json({
      success: true,
      data: featuredServices
    });

  } catch (error) {
    next(error);
  }
});

// Handle upload errors
router.use(handleUploadError);

export default router;
