import axios from "axios";
import { REACT_APP_BASE_URL } from "../../constants";

export async function getContacts() {
  let data = {};

  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("JWT token not found");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.get(`${REACT_APP_BASE_URL}/contacts/`, config);
    data = res.data;
    console.log(res.data);
  } catch (err) {
    console.log(err.message);
    throw new Error(err.message);
  }

  return data;
}

export async function addContact(contact) {
  let data = {};

  let postContact = contact.data;

  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("JWT token not found");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.post(
      `${REACT_APP_BASE_URL}/contacts/`,
      postContact,
      config
    );
    data = res.data;
    console.log(res.data);
  } catch (err) {
    console.log(err.message);
    throw new Error(err.message);
  }

  return data;
}

export async function deleteContact(id) {
  console.log(id);
  id = id.id;

  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("JWT token not found");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.delete(
      `${REACT_APP_BASE_URL}/contacts/${id}`,
      config
    );
    console.log(res.data);
  } catch (err) {
    console.log(err.message);
    throw new Error(err.message);
  }
}

export async function updateContact(newEditedContact) {
  let updatedData = {};

  const putContact = newEditedContact.newEditedContact;
  const id = putContact.id;

  console.log(putContact);
  console.log(id);

  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("JWT token not found");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.put(
      `${REACT_APP_BASE_URL}/contacts/${id}`,
      putContact,
      config
    );
    updatedData = res.data;
    console.log(res.data);
  } catch (err) {
    console.log(err.message);
    throw new Error(err.message);
  }

  return updatedData;
}
