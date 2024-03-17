const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// @desc Get all contacts
// @route GET /api/contacts
// @access private
const getContacts = asyncHandler(async (req, res) => {
  console.log(req.body);

  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

// @desc Create New contact
// @route POST /api/contacts
// @access private
const createContact = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { firstName, lastName, address, relation, email, phone, extraInfo } =
    req.body;

  if (!firstName || !email || !phone || !lastName || !relation) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const contact = await Contact.create({
    firstName,
    lastName,
    email,
    phone,
    relation,
    address,
    extraInfo,
    user_id: req.user.id,
  });
  res.status(200).json(contact);
});

// @desc Get a contact
// @route GET /api/contacts/:id
// @access private
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});

// @desc Delete a contact
// @route DELETE /api/contacts/:id
// @access private
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error(
      "user don't have permission top update other user contacts"
    );
  }

  await Contact.findByIdAndDelete(req.params.id);
  res.status(200).json(contact);
});

// @desc Update a contact
// @route PUT /api/contacts/:id
// @access private
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error(
      "user don't have permission top update other user contacts"
    );
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedContact);
});

module.exports = {
  getContacts,
  createContact,
  deleteContact,
  updateContact,
  getContact,
};
