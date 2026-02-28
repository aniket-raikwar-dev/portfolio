import React, { useState } from "react";
import GreenBoy from "@/assets/images/peoples/greenBoy.jpeg";
import PinkGirl from "@/assets/images/peoples/pinkGirl.jpeg";
import AdultBoy from "@/assets/images/peoples/adultBoy.jpeg";
import BlueGirl from "@/assets/images/peoples/blueGirl.jpeg";

import {
  RiChat3Fill,
  RiVidiconFill,
  RiBookmark2Fill,
  RiSendPlane2Fill,
  RiHeart2Fill,
} from "react-icons/ri";

const actionItems = [
  {
    id: 1,
    title: "Chats",
    icon: <RiChat3Fill />,
    notification: 3,
    type: "action",
  },
  {
    id: 2,
    title: "Video Calls",
    icon: <RiVidiconFill />,
    notification: 0,
    type: "action",
  },
  {
    id: 3,
    title: "Saved Items",
    icon: <RiBookmark2Fill />,
    notification: 0,
    type: "action",
  },
  {
    id: 4,
    title: "Direct Messages",
    icon: <RiSendPlane2Fill />,
    notification: 0,
    type: "action",
  },
  {
    id: 5,
    title: "Activity",
    icon: <RiHeart2Fill />,
    notification: 0,
    type: "action",
  },
  {
    id: 6,
    title: "Projects",
    notification: 0,
    type: "hashtag",
  },
  {
    id: 7,
    title: "Feedback",
    notification: 0,
    type: "hashtag",
  },
  {
    id: 8,
    title: "Reev Reichard",
    type: "people",
    img: AdultBoy,
  },
  {
    id: 9,
    title: "Jessica Cantles",
    type: "people",
    img: BlueGirl,
  },
  {
    id: 10,
    title: "Peter Parker",
    type: "people",
    img: GreenBoy,
  },
  {
    id: 11,
    title: "Ruwe Mosesson",
    type: "people",
    img: PinkGirl,
  },
];

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [activeItem, setActiveItem] = useState("chats");

  const toggleCollapsed = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <div className="craft-layout">
      <div
        className={`craft-sidebar-container transition-all duration-300 ease-in-out ${
          isCollapsed ? "w-[60px] flex flex-col items-center" : "w-[280px]"
        }`}
      >
        <div className="title flex justify-between items-center h-7">
          {!isCollapsed && <p>Messages</p>}
          <button
            className="w-4.5 h-4.5 rounded-full bg-[#e6e6e6] flex items-center justify-center cursor-pointer"
            onClick={toggleCollapsed}
          >
            {isCollapsed ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path>
              </svg>
            )}
          </button>
        </div>
        <div className="sidebar-list relative">
          {hoverIndex !== null && (
            <div
              className="hover-indicator absolute left-0 w-full h-[40px] bg-gray-100 z-0 transition-all duration-200"
              style={{ top: `${hoverIndex * 40}px` }}
            />
          )}

          {actionItems.map((item, index) => {
            const isActive = activeItem === item.title.toLowerCase();

            return (
              <div
                key={item.id}
                className={`sidebar-item ${isActive ? "active-item" : ""} `}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
                onClick={() => setActiveItem(item.title.toLowerCase())}
              >
                {item.type === "action" && (
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                      <div className="w-4.5 text-gray-500">{item.icon}</div>
                      {!isCollapsed && (
                        <p className="item-text">{item.title}</p>
                      )}
                    </div>
                    {!isCollapsed && item.notification > 0 && (
                      <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center text-white dotted">
                        {item.notification}
                      </div>
                    )}
                  </div>
                )}

                {item.type === "hashtag" && (
                  <div className="w-full flex justify-between items-center cursor-pointer">
                    <div className="flex items-center gap-4">
                      <span style={{ marginLeft: "3px" }}>#</span>
                      {!isCollapsed && (
                        <p className="item-text ml-5">{item.title}</p>
                      )}
                    </div>

                    {!isCollapsed && (
                      <svg
                        className="w-4.5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z" />
                      </svg>
                    )}
                  </div>
                )}

                {item.type === "people" && (
                  <div className="flex items-center gap-3">
                    <div className="people-img">
                      <img src={item.img} alt={`Person - ${item.title}`} />
                    </div>
                    {!isCollapsed && <p className="item-text">{item.title}</p>}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="heading">React Sidebar</div>
    </div>
  );
};

export default Sidebar;
