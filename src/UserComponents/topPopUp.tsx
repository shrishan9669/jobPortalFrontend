import { useEffect, useState } from "react";

export default function TopPopup({
  text = "Done!",
  bg = "bg-green-600",
  duration = 2000,
  show,
  onClose,
}:any) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);

      const timer = setTimeout(() => {
        setVisible(false);
        onClose && onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  return (
    <div
      className={`
        fixed top-5 left-1/2 z-50 
        -translate-x-1/2
        px-4 py-2 rounded-lg text-white text-sm font-medium
        transition-all duration-500 ease-in-out
        ${bg}
        ${visible ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0"}
      `}
    >
      {text}
    </div>
  );
}
