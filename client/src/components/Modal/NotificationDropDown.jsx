import { useEffect, useRef, useState } from "react";
import { AiOutlineBell } from "react-icons/ai";
import { useSelector } from "react-redux";

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { notify } = useSelector((state) => state.notify);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  console.log("notify", notify);
  return (
    <div ref={dropdownRef} className="relative">
      <button className=" py-4 rounded-md " onClick={toggleDropdown}>
        <AiOutlineBell className="text-2xl" />
        <span className="absolute block bottom-4 left-6 text-red-400">
          {notify.length}
        </span>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white border rounded-md shadow-md">
          {notify.length > 0 ? (
            notify.map((notification) => (
              <div
                key={notification.id}
                className="px-4 py-2 border-b last:border-b-0 hover:bg-gray-100"
              >
                {notification.text}
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-500">No new notifications</div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
