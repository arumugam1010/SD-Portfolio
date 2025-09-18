import express from 'express';
import { body, validationResult } from 'express-validator';
import { 
  createPortfolio, 
  findPortfolios, 
  findPortfolioById, 
  updatePortfolio, 
  deletePortfolio, 
  getPortfolioCategories, 
  getFeaturedPortfolios 
} from '../models/Portfolio.js';
import { protect, authorize } from '../middleware/auth.js';
import { uploadSingle, handleUploadError } from '../middleware/upload.js';

const router = express.Router();

// Validation middleware
const validatePortfolio = [
  body('title')
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage('Title must be between 5 and 100 characters'),
  body('description')
    .trim()
    .isLength({ min: 20, max: 1000 })
    .withMessage('Description must be between 20 and 1000 characters'),
  body('category')
    .isIn(['web-development', 'mobile-app', 'ui-ux', 'e-commerce', 'saas', 'other'])
    .withMessage('Invalid category'),
  body('technologies')
    .isArray({ min: 1 })
    .withMessage('At least one technology must be specified'),
  body('liveUrl')
    .optional()
    .isURL()
    .withMessage('Live URL must be a valid URL'),
  body('githubUrl')
    .optional()
    .isURL()
    .withMessage('GitHub URL must be a valid URL')
];

// @desc    Get all portfolio projects (public)
// @route   GET /api/portfolio
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const { category, featured, page = 1, limit = 12, search } = req.query;

    const result = await findPortfolios(
      { category, featured, search },
      { page, limit }
    );

    res.json({
      success: true,
      data: result.projects,
      pagination: result.pagination
    });

  } catch (error) {
    next(error);
  }
});

// @desc    Get portfolio project by ID (public)
// @route   GET /api/portfolio/:id
// @access  Public
router.get('/:id', async (req, res, next) => {
  try {
    const project = await findPortfolioById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found'
      });
    }

    res.json({
      success: true,
      data: project
    });

  } catch (error) {
    next(error);
  }
});

// @desc    Create new portfolio project (admin only)
// @route   POST /api/portfolio
// @access  Private/Admin
router.post('/', protect, authorize('admin', 'superadmin'), uploadSingle, validatePortfolio, async (req, res, next) => {
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

    const projectData = {
      ...req.body,
      technologies: Array.isArray(req.body.technologies) 
        ? req.body.technologies 
        : req.body.technologies.split(',').map(tech => tech.trim())
    };

    // Add image if uploaded
    if (req.file) {
      projectData.thumbnail = `/uploads/${req.file.filename}`;
      projectData.images = [`/uploads/${req.file.filename}`];
    }

    const project = await createPortfolio(projectData);

    res.status(201).json({
      success: true,
      message: 'Portfolio project created successfully',
      data: project
    });

  } catch (error) {
    next(error);
  }
});

// @desc    Update portfolio project (admin only)
// @route   PUT /api/portfolio/:id
// @access  Private/Admin
router.put('/:id', protect, authorize('admin', 'superadmin'), uploadSingle, validatePortfolio, async (req, res, next) => {
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

    const projectData = { ...req.body };
    
    // Handle technologies array
    if (req.body.technologies) {
      projectData.technologies = Array.isArray(req.body.technologies) 
        ? req.body.technologies 
        : req.body.technologies.split(',').map(tech => tech.trim());
    }

    // Add new image if uploaded
    if (req.file) {
      projectData.thumbnail = `/uploads/${req.file.filename}`;
      // Add to existing images array
      const existingProject = await findPortfolioById(req.params.id);
      if (existingProject) {
        projectData.images = [...existingProject.images, `/uploads/${req.file.filename}`];
      }
    }

    const project = await updatePortfolio(req.params.id, projectData);

    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found'
      });
    }

    res.json({
      success: true,
      message: 'Portfolio project updated successfully',
      data: project
    });

  } catch (error) {
    next(error);
  }
});

// @desc    Delete portfolio project (admin only)
// @route   DELETE /api/portfolio/:id
// @access  Private/Admin
router.delete('/:id', protect, authorize('admin', 'superadmin'), async (req, res, next) => {
  try {
    const project = await deletePortfolio(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found'
      });
    }

    res.json({
      success: true,
      message: 'Portfolio project deleted successfully'
    });

  } catch (error) {
    next(error);
  }
});

// @desc    Get portfolio categories (public)
// @route   GET /api/portfolio/categories/all
// @access  Public
router.get('/categories/all', async (req, res, next) => {
  try {
    const categories = await getPortfolioCategories();

    res.json({
      success: true,
      data: categories
    });

  } catch (error) {
    next(error);
  }
});

// @desc    Get featured projects (public)
// @route   GET /api/portfolio/featured/all
// @access  Public
router.get('/featured/all', async (req, res, next) => {
  try {
    const featuredProjects = await getFeaturedPortfolios();

    res.json({
      success: true,
      data: featuredProjects
    });

  } catch (error) {
    next(error);
  }
});

// Handle upload errors
router.use(handleUploadError);

export default router;
