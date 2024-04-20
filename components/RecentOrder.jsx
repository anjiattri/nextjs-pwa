import { data } from "@/data/data";
import React from "react";
import { FaShoppingBag } from "react-icons/fa";
const RecentOrder = () => {
  return (
    <div className="w-full col-span-1 relative lg:h-[70vh] h-[50vh] m-auto p-4 rounded-lg border bg-white overflow-scroll">
      <h1>Reecent Orders</h1>
      <ul>
        {data.map((order, id) => (
          <li
            key={id}
            className="bg-gray-50 hover:bg-gray-100  rounded-lg my-3 p-2 flex items-center cursor-pointer"
          >
            <div className="bg-purple-100 rounded-lg p-3">
              <FaShoppingBag className="text-purple-800" />
            </div>
            <div className="pl-4">
              <p className="text-gray-800 font-bold">${order.total}</p>
              <p className="text-gray-400 text-small">{order.name.first}</p>
            </div>
            <p className="lg:flex md:hidden absolute right-6 text-sm">
              {order.date}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentOrder;
