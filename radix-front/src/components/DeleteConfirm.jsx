/* eslint-disable react/prop-types */
import { Button, Theme } from "@radix-ui/themes";
import { useTheme } from "../contexts/ThemeContext";

function DeleteConfirm({ onConfirm, disabled }) {
  const { theme } = useTheme();

  return (
    <Theme
      accentColor="red"
      radius="medium"
      grayColor="gray"
      panelBackground="solid"
      appearance={theme}
    >
      <div className="flex flex-col justify-center items-center gap-6  px-5 py-10">
        <h1 className="text-2xl font-semibold capitalize">
          Confirm Delete Contact
        </h1>
        <div className="flex flex-col gap-2">
          <Button
            variant="solid"
            className=" font-bold uppercase"
            onClick={onConfirm}
            disabled={disabled}
          >
            Delete
          </Button>
        </div>
      </div>
    </Theme>
  );
}

export default DeleteConfirm;
