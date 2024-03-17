/* eslint-disable react/prop-types */
import { Avatar, Box, Card, Flex, IconButton, Text } from "@radix-ui/themes";
import { EyeOpenIcon, Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import AddContactForm from "./AddContactForm";
import DeleteConfirm from "./DeleteConfirm";
import Modal from "../ui/Modal";
import { useDeleteContact } from "../queries/useDeleteContact";
import ProfileCard from "./ProfileCard";

function Contact({ contact }) {
  const { deleteContact, isDeleting } = useDeleteContact();

  return (
    <Card
      size="3"
      className="w-full lg:w-4/6 lg:2/6 transition delay-100 duration-100 ease-in-out"
    >
      <div className="flex justify-between items-center">
        <Flex gap="6" align="center">
          <Avatar size="5" radius="full" fallback="T" color="indigo" />
          <Box>
            <Text as="div" size="4" weight="bold">
              Name: {contact && contact.firstName} {contact && contact.lastName}
            </Text>
            <Text as="div" size="3" color="gray">
              Email : {contact && contact?.email}
            </Text>
            <Text as="div" size="3" color="gray">
              Phone : {contact && contact?.phone}
            </Text>
            <Text as="div" size="3" color="gray">
              Relation : {contact && contact?.relation}
            </Text>
          </Box>
        </Flex>
        <div className="flex flex-col justify-between gap-2 ">
          <Modal>
            <Modal.Open opens="editContact">
              <IconButton size="1">
                <Pencil2Icon />
              </IconButton>
            </Modal.Open>

            <Modal.Window name="editContact">
              <AddContactForm editContact={contact} />
            </Modal.Window>
          </Modal>

          <Modal>
            <Modal.Open opens="addContact">
              <IconButton size="1">
                <TrashIcon />
              </IconButton>
            </Modal.Open>

            <Modal.Window name="addContact">
              <DeleteConfirm
                disabled={isDeleting}
                onConfirm={() => deleteContact({ id: contact._id })}
              />
            </Modal.Window>
          </Modal>

          <Modal>
            <Modal.Open opens="editContact">
              <IconButton size="1">
                <EyeOpenIcon />
              </IconButton>
            </Modal.Open>

            <Modal.Window name="editContact">
              <ProfileCard contact={contact} />
            </Modal.Window>
          </Modal>
        </div>
      </div>
    </Card>
  );
}

export default Contact;
