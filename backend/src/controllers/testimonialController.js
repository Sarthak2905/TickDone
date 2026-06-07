import Testimonial from '../models/Testimonial.js';

export const getAllTestimonials = async (req, res) => {
  try {
    const { published, featured } = req.query;
    const filter = {};

    if (published === 'true') filter.published = true;
    if (featured === 'true') filter.featured = true;

    const testimonials = await Testimonial.find(filter)
      .populate('projectRelated', 'title')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: testimonials,
    });
  } catch (error) {
    console.error('Get testimonials error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch testimonials',
      error: error.message,
    });
  }
};

export const getTestimonialById = async (req, res) => {
  try {
    const { id } = req.params;

    const testimonial = await Testimonial.findById(id).populate('projectRelated', 'title');

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found',
      });
    }

    res.status(200).json({
      success: true,
      data: testimonial,
    });
  } catch (error) {
    console.error('Get testimonial error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch testimonial',
      error: error.message,
    });
  }
};

export const createTestimonial = async (req, res) => {
  try {
    const { clientName, clientTitle, company, content, rating, image, featured, published, projectRelated } =
      req.body;

    // Validation
    if (!clientName || !clientTitle || !company || !content) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
      });
    }

    const testimonial = await Testimonial.create({
      clientName,
      clientTitle,
      company,
      content,
      rating: rating || 5,
      image: image || null,
      featured: featured || false,
      published: published || false,
      projectRelated: projectRelated || null,
    });

    res.status(201).json({
      success: true,
      message: 'Testimonial created successfully',
      data: testimonial,
    });
  } catch (error) {
    console.error('Create testimonial error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create testimonial',
      error: error.message,
    });
  }
};

export const updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const { clientName, clientTitle, company, content, rating, image, featured, published, projectRelated } =
      req.body;

    let testimonial = await Testimonial.findById(id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found',
      });
    }

    // Update fields
    if (clientName) testimonial.clientName = clientName;
    if (clientTitle) testimonial.clientTitle = clientTitle;
    if (company) testimonial.company = company;
    if (content) testimonial.content = content;
    if (rating) testimonial.rating = rating;
    if (image !== undefined) testimonial.image = image;
    if (featured !== undefined) testimonial.featured = featured;
    if (published !== undefined) testimonial.published = published;
    if (projectRelated !== undefined) testimonial.projectRelated = projectRelated;

    testimonial = await testimonial.save();

    res.status(200).json({
      success: true,
      message: 'Testimonial updated successfully',
      data: testimonial,
    });
  } catch (error) {
    console.error('Update testimonial error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update testimonial',
      error: error.message,
    });
  }
};

export const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    const testimonial = await Testimonial.findByIdAndDelete(id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Testimonial deleted successfully',
    });
  } catch (error) {
    console.error('Delete testimonial error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete testimonial',
      error: error.message,
    });
  }
};
