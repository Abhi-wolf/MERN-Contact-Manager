/* eslint-disable react/prop-types */
import { useState } from "react";
import Modal from "../ui/Modal";
// import { useContacts } from "your-contacts-hook-path"; // Make sure to import the correct hook path
// import { Modal } from "your-modal-library"; // Make sure to import the correct modal component from your library
// import Spinner from "./Spinner"; // Assuming you have a Spinner component

function ContactForm({ contact, afterSave }) {
  const [saving, setSaving] = useState(false);
  // const { updateContact } = useContacts(); // Assuming useContacts is a custom hook to handle contacts

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);

    const formData = new FormData(event.currentTarget);
    const data = {};
    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }

    // await updateContact(contact.id, data);
    afterSave();
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset
        disabled={saving}
        className={`group${saving ? " disabled" : ""}`}
      >
        <div className="mt-8 group-disabled:opacity-50">
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium text-gray-900">Name</label>
              <input
                autoFocus
                className="mt-2 block w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm text-gray-900 shadow-sm sm:leading-6"
                type="text"
                defaultValue={contact.name}
                name="name"
              />
            </div>

            <div>
              <label className="text-sm font-medium leading-6 text-gray-900">
                Role
              </label>
              <input
                className="mt-2 block w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm text-gray-900 shadow-sm sm:leading-6"
                type="text"
                defaultValue={contact.role}
                name="role"
              />
            </div>
            <div>
              <label className="text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <input
                className="mt-2 block w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm text-gray-900 shadow-sm sm:leading-6"
                type="text"
                defaultValue={contact.email}
                name="email"
              />
            </div>
          </div>
        </div>
        <div className="mt-8 space-x-6 text-right">
          <Modal.Close className="rounded px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-600">
            Cancel
          </Modal.Close>
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 group-disabled:pointer-events-none"
          >
            {/* <Spinner
              className={`absolute h-4${
                saving ? " opacity-100" : " opacity-0"
              }`}
            /> */}
            <span
              className={`group-disabled:opacity-0${
                saving ? " opacity-0" : ""
              }`}
            >
              Save
            </span>
          </button>
        </div>
      </fieldset>
    </form>
  );
}

export default ContactForm;
