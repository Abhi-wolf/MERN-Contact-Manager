/* eslint-disable react/prop-types */
import { PersonIcon } from "@radix-ui/react-icons";
import {
  Button,
  IconButton,
  TextArea,
  TextField,
  Theme,
} from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { useAddContact } from "../queries/useAddContact";
import { useTheme } from "../contexts/ThemeContext";
import { useUpdateContact } from "../queries/useUpdateContact";

// eslint-disable-next-line react/display-name
function AddContactForm({ editContact, onCloseModal }) {
  const { addContact, isLoading } = useAddContact();
  const { updateContact, isUpdating } = useUpdateContact();
  const { theme } = useTheme();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      firstName: editContact?.firstName || "",
      lastName: editContact?.lastName || "",
      email: editContact?.email || "",
      phone: editContact?.phone || "",
      extraInfo: editContact?.extraInfo || "",
      address: editContact?.address || "",
      relation: editContact?.relation || "",
    },
  });

  function onSubmit(data) {
    console.log(data);
    if (editContact) {
      const newEditedContact = { ...data, id: editContact._id };

      updateContact(
        { newEditedContact },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      addContact(
        { data },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    }
  }

  return (
    <Theme
      accentColor="red"
      radius="medium"
      grayColor="gray"
      panelBackground="solid"
      appearance={theme}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 text-xl w-full justify-center items-center p-4"
      >
        <div className="w-5/6 flex flex-col justify-center items-center gap-3 border-b-2  mb-3">
          <IconButton radius="full" size="4">
            <PersonIcon />
          </IconButton>
          <h4 className="text-2xl pb-1">Add Contact</h4>
        </div>
        <div className="w-full grid grid-cols-2 gap-x-4 justify-between">
          <div>
            <TextField.Input
              type="text"
              size="3"
              placeholder="First name *"
              {...register("firstName", {
                required: "First name is required",
              })}
            />
            {errors.firstName && (
              <p className="text-red-300 text-sm capitalize">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div>
            <TextField.Input
              type="text"
              size="3"
              placeholder="Last name *"
              {...register("lastName", {
                required: "Last name is required",
              })}
            />
            {errors.lastName && (
              <p className="text-red-300 text-sm capitalize">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        <div className="w-full grid grid-cols-2 gap-x-4 justify-between">
          <div>
            <TextField.Input
              type="tel"
              size="3"
              placeholder="phone Number *"
              {...register("phone", {
                required: "phone Number is required",
                pattern: {
                  value: /^[0-9]{10}$/, // Use regular expression to match 10-digit phone number
                  message: "Please enter a valid 10-digit phone number",
                },
              })}
            />
            {errors.phone && (
              <p className="text-red-300 capitalize text-sm">
                {errors.phone.message}
              </p>
            )}
          </div>

          <select {...register("relation")} className="px-2 rounded-md">
            <option selected value="friend">
              Friend
            </option>
            <option value="father">Father</option>
            <option value="mother">Mother</option>
            <option value="sister">Sister</option>
            <option value="brother">Brother</option>
            <option value="relative">Relative</option>
          </select>
        </div>

        <div className="w-full  flex flex-col gap-1">
          <TextField.Input
            type="email"
            size="3"
            placeholder="Email address *"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Please enter a valid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-300 text-sm capitalize">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="w-full  flex flex-col gap-1">
          <TextField.Input
            type="text"
            size="3"
            placeholder="Address "
            {...register("address")}
          />
          {errors.address && (
            <p className="text-red-300 text-sm capitalize">
              {errors.address.message}
            </p>
          )}
        </div>

        <div className="w-full  flex flex-col gap-1">
          <TextArea
            size="3"
            placeholder="Extra Information…"
            {...register("extraInfo")}
          />
        </div>
        <div className="flex gap-8">
          <Button size="3" disabled={isLoading || isUpdating}>
            {editContact?.firstName ? "Edit Contact" : " Add Contact"}
          </Button>
        </div>
      </form>
    </Theme>
  );
}

export default AddContactForm;
