import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { RxSketchLogo, RxDashboard, RxPerson } from "react-icons/rx";
import { FiCamera, FiSettings } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";

const Sidebar = ({ children }) => {
  const router = useRouter();

  const isLinkActive = (href) => {
    return router.pathname === href;
  };

  return (
    <div className="flex">
      <div className="fixed w-20 h-screen p-4 bg-white border-r-[1px] flex flex-col justify-between">
        <div className="flex flex-col items-center">
          <button
            onClick={() => {
              if (!isLinkActive("/")) {
                router.push("/");
              }
            }}
          >
            <div
              className={`bg-purple-800 text-white p-3 rounded-lg inline-block ${
                isLinkActive("/") ? "pointer-events-none" : "cursor-pointer"
              }`}
            >
              <RxSketchLogo size={20} />
            </div>
          </button>
          <span className="border-b-[1px] border-gray-200 w-full p-2"></span>
          <button
            onClick={() => {
              if (!isLinkActive("/")) {
                router.push("/");
              }
            }}
          >
            <div
              className={`bg-gray-100 hover:bg-gray-200 ${
                isLinkActive("/") ? "pointer-events-none" : "cursor-pointer"
              } m-4 p-3 rounded-lg inline-block`}
            >
              <RxDashboard size={20} />
            </div>
          </button>
          {/* <button
            onClick={() => {
              if (!isLinkActive("/orders")) {
                router.push("/orders");
              }
            }}
          >
            <div
              className={`bg-gray-100 hover:bg-gray-200 ${
                isLinkActive("/orders")
                  ? "pointer-events-none"
                  : "cursor-pointer"
              } m-4 p-3 rounded-lg inline-block`}
            >
              <HiOutlineShoppingBag size={20} />
            </div>
          </button> */}
          <button
            onClick={() => {
              if (!isLinkActive("/settings")) {
                router.push("/settings");
              }
            }}
          >
            <div
              className={`bg-gray-100 hover:bg-gray-200 ${
                isLinkActive("/settings")
                  ? "pointer-events-none"
                  : "cursor-pointer"
              } m-4 p-3 rounded-lg inline-block`}
            >
              <FiSettings size={20} />
            </div>
          </button>
          <button
            onClick={() => {
              if (!isLinkActive("/camera")) {
                router.push("/camera");
              }
            }}
          >
            <div
              className={`bg-gray-100 hover:bg-gray-200 ${
                isLinkActive("/camera")
                  ? "pointer-events-none"
                  : "cursor-pointer"
              } m-4 p-3 rounded-lg inline-block`}
            >
              <RxPerson size={20} />
            </div>
          </button>
          {/* <button
            onClick={() => {
              if (!isLinkActive("/camera")) {
                router.push("/camera");
              }
            }}
          >
            <div
              className={`bg-gray-100 hover:bg-gray-200 ${
                isLinkActive("/camera")
                  ? "pointer-events-none"
                  : "cursor-pointer"
              } m-4 p-3 rounded-lg inline-block`}
            >
              <FiCamera size={20} />
            </div>
          </button> */}
        </div>
      </div>
      <main className="ml-20 w-full">{children}</main>
    </div>
  );
};

export default Sidebar;
