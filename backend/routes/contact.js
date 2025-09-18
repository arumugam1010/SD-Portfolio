import express from 'express';
import { body, validationResult } from 'express-validator';
import { 
  createContact, 
  findContacts, 
  findContactById, 
  updateContact, 
  deleteContact, 
  getContactStats 
} from '../models/Contact.js';
import { sendContactEmail, sendNotificationToSaro } from '../utils/emailService.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Validation middleware
const validateContact = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('subject')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Subject must be between 5 and 200 characters'),
  body('message')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters')
];

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
router.post('/', validateContact, async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Get the first error message for a more user-friendly response
      const firstError = errors.array()[0];
      return res.status(400).json({
        success: false,
        error: `Validation failed: ${firstError.msg}`,
        details: errors.array()
      });
    }

    const { name, email, subject, message } = req.body;

    // Create contact entry
    const contact = await createContact({
      name,
      email,
      subject,
      message,
      source: 'WEBSITE',
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    // Send email notification (if email service is configured)
    try {
      await sendContactEmail(contact);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Don't fail the request if email fails
    }



    // Send notification email to saro994320@gmail.com
    try {
      await sendNotificationToSaro(contact);
    } catch (notificationError) {
      console.error('Notification email to saro994320@gmail.com failed:', notificationError);
      // Don't fail the request if notification email fails
    }

    res.status(201).json({
      success: true,
      message: 'Thank you for your message! We will get back to you soon.',
      data: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
        submittedAt: contact.createdAt
      }
    });

  } catch (error) {
    next(error);
  }
});

// @desc    Get all contacts (admin only)
// @route   GET /api/contact
// @access  Private/Admin
router.get('/', protect, authorize('admin', 'superadmin'), async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status, priority, search } = req.query;

    const result = await findContacts(
      { status, priority, search },
      { page, limit }
    );

    res.json({
      success: true,
      data: result.contacts,
      pagination: result.pagination
    });

  } catch (error) {
    next(error);
  }
});

// @desc    Get contact by ID (admin only)
// @route   GET /api/contact/:id
// @access  Private/Admin
router.get('/:id', protect, authorize('admin', 'superadmin'), async (req, res, next) => {
  try {
    const contact = await findContactById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        error: 'Contact not found'
      });
    }

    res.json({
      success: true,
      data: contact
    });

  } catch (error) {
    next(error);
  }
});

// @desc    Update contact status (admin only)
// @route   PUT /api/contact/:id
// @access  Private/Admin
router.put('/:id', protect, authorize('admin', 'superadmin'), async (req, res, next) => {
  try {
    const { status, priority, adminNotes } = req.body;

    const contact = await updateContact(req.params.id, { status, priority });

    if (!contact) {
      return res.status(404).json({
        success: false,
        error: 'Contact not found'
      });
    }

    res.json({
      success: true,
      message: 'Contact updated successfully',
      data: contact
    });

  } catch (error) {
    next(error);
  }
});

// @desc    Delete contact (admin only)
// @route   DELETE /api/contact/:id
// @access  Private/Admin
router.delete('/:id', protect, authorize('admin', 'superadmin'), async (req, res, next) => {
  try {
    const contact = await deleteContact(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        error: 'Contact not found'
      });
    }

    res.json({
      success: true,
      message: 'Contact deleted successfully'
    });

  } catch (error) {
    next(error);
  }
});

// @desc    Get contact statistics (admin only)
// @route   GET /api/contact/stats/overview
// @access  Private/Admin
router.get('/stats/overview', protect, authorize('admin', 'superadmin'), async (req, res, next) => {
  try {
    const stats = await getContactStats();

    res.json({
      success: true,
      data: stats
    });

  } catch (error) {
    next(error);
  }
});

export default router;
