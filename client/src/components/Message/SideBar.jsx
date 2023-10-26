import React from "react";
import { BiMessageAltDetail } from "react-icons/bi";

const SideBar = () => {
  return (
    <div className="rounded-md  col-span-3 flex flex-col">
      <div className="text-slate-600 border-2 border-slate-600 p-2 rounded-full flex justify-center items-center gap-2 ">
        <h2>All Messages</h2>
        <BiMessageAltDetail className="text-lg " />
      </div>
      <div className="text-slate-600 border-2 border-slate-600  rounded-md p-2">
        <div className="overflow-y-scroll h-96">
          <div className="flex gap-2 items-center border-b-2 border-blue-400 ">
            <div>
              <img
                src="https://res.cloudinary.com/walli/image/upload/v1697627718/socioverse_avatar/rhxsp33ccn5a9rmokqzq.jpg"
                className="rounded-full w-16 block"
                alt=""
              />
            </div>

            <div className="flex flex-col h-100 w-100 ">
              <h2 className="text-lg text-slate-950">Kevin Joseph</h2>
              <p>Lorem ipsum dolor sit</p>
            </div>
          </div>
          <div className="flex gap-2 items-center border-b-2 border-blue-400 ">
            <div>
              <img
                src="https://res.cloudinary.com/walli/image/upload/v1697627718/socioverse_avatar/rhxsp33ccn5a9rmokqzq.jpg"
                className="rounded-full w-16 block"
                alt=""
              />
            </div>

            <div className="flex flex-col h-100 w-100 ">
              <h2 className="text-lg text-slate-950">Kevin Joseph</h2>
              <p>Lorem ipsum dolor sit</p>
            </div>
          </div>
          <div className="flex gap-2 items-center border-b-2 border-blue-400 ">
            <div>
              <img
                src="https://res.cloudinary.com/walli/image/upload/v1697627718/socioverse_avatar/rhxsp33ccn5a9rmokqzq.jpg"
                className="rounded-full w-16 block"
                alt=""
              />
            </div>

            <div className="flex flex-col h-100 w-100 ">
              <h2 className="text-lg text-slate-950">Kevin Joseph</h2>
              <p>Lorem ipsum dolor sit</p>
            </div>
          </div>
          <div className="flex gap-2 items-center border-b-2 border-blue-400 ">
            <div>
              <img
                src="https://res.cloudinary.com/walli/image/upload/v1697627718/socioverse_avatar/rhxsp33ccn5a9rmokqzq.jpg"
                className="rounded-full w-16 block"
                alt=""
              />
            </div>

            <div className="flex flex-col h-100 w-100 ">
              <h2 className="text-lg text-slate-950">Kevin Joseph</h2>
              <p>Lorem ipsum dolor sit</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
