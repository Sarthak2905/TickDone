import Appointment from '../models/Appointment.js';

export const getAllAppointments = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};

    const appointments = await Appointment.find(filter).sort({ appointmentDate: 1 });

    res.status(200).json({
      success: true,
      data: appointments,
    });
  } catch (error) {
    console.error('Get appointments error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch appointments',
      error: error.message,
    });
  }
};

export const getAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found',
      });
    }

    res.status(200).json({
      success: true,
      data: appointment,
    });
  } catch (error) {
    console.error('Get appointment error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch appointment',
      error: error.message,
    });
  }
};

export const createAppointment = async (req, res) => {
  try {
    const {
      clientName,
      clientEmail,
      clientPhone,
      appointmentDate,
      appointmentTime,
      duration,
      subject,
      notes,
      appointmentType,
    } = req.body;

    // Validation
    if (!clientName || !clientEmail || !clientPhone || !appointmentDate || !appointmentTime || !subject) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
      });
    }

    const appointment = await Appointment.create({
      clientName,
      clientEmail,
      clientPhone,
      appointmentDate,
      appointmentTime,
      duration: duration || 60,
      subject,
      notes: notes || '',
      status: 'scheduled',
      appointmentType: appointmentType || 'consultation',
    });

    res.status(201).json({
      success: true,
      message: 'Appointment created successfully',
      data: appointment,
    });
  } catch (error) {
    console.error('Create appointment error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create appointment',
      error: error.message,
    });
  }
};

export const updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      clientName,
      clientEmail,
      clientPhone,
      appointmentDate,
      appointmentTime,
      duration,
      subject,
      notes,
      status,
      appointmentType,
    } = req.body;

    let appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found',
      });
    }

    // Update fields
    if (clientName) appointment.clientName = clientName;
    if (clientEmail) appointment.clientEmail = clientEmail;
    if (clientPhone) appointment.clientPhone = clientPhone;
    if (appointmentDate) appointment.appointmentDate = appointmentDate;
    if (appointmentTime) appointment.appointmentTime = appointmentTime;
    if (duration) appointment.duration = duration;
    if (subject) appointment.subject = subject;
    if (notes !== undefined) appointment.notes = notes;
    if (status) appointment.status = status;
    if (appointmentType) appointment.appointmentType = appointmentType;

    appointment = await appointment.save();

    res.status(200).json({
      success: true,
      message: 'Appointment updated successfully',
      data: appointment,
    });
  } catch (error) {
    console.error('Update appointment error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update appointment',
      error: error.message,
    });
  }
};

export const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findByIdAndDelete(id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Appointment deleted successfully',
    });
  } catch (error) {
    console.error('Delete appointment error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete appointment',
      error: error.message,
    });
  }
};
