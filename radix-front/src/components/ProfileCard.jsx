/* eslint-disable react/prop-types */
import { Avatar } from "@radix-ui/themes";

function ProfileCard({ contact }) {
  return (
    <div className="w-full md:w-[500px]  pt-10 md:p-12  flex  flex-col gap-8  ">
      <div className="flex  gap-8 ">
        <Avatar size="6" radius="full" fallback="" color="indigo" />
        <div className="flex flex-col gap-2">
          <h2 className="capitalize font-bold text-2xl">
            {contact.firstName} {contact.lastName}
          </h2>
          <p className="capitalize text-xl">
            <span className="font-semibold">Relation</span> : {contact.relation}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2 text-lg">
        <h3 className="">
          <span className="font-semibold">Email : </span> {contact.email}
        </h3>
        <h3>
          <span className="font-semibold">Mobile : </span> {contact.phone}
        </h3>
        <h3>
          <span className="font-semibold">Address : </span> {contact.address}
        </h3>
        <p>
          <span className="font-semibold">Extra Information : </span>
          {contact.extraInfo}
        </p>
      </div>
    </div>
  );
}

export default ProfileCard;
