// import data from "../assets/fakeData";
import { useContacts } from "../queries/useCOntacts";
import Contact from "./Contact";
import { DNA } from "react-loader-spinner";

function Contacts() {
  const { contacts, isLoading } = useContacts();

  if (isLoading)
    return (
      <div className="h-[90vh] w-full flex justify-center items-center">
        <DNA
          visible={true}
          height="180"
          width="180"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
      </div>
    );
  if (!contacts) return <h1>No Contacts</h1>;

  return (
    <div className=" md:mx-16 my-10 w-[90%] flex flex-col justify-center ">
      <div className="flex flex-col gap-4 md:justify-center items-center md:items-start  w-full md:w-3/5">
        {contacts.map((contact) => (
          <Contact key={contact._id} contact={contact} />
        ))}
      </div>
    </div>
  );
}

export default Contacts;
