import { useEffect } from "react";
import { X } from "lucide-react";

const ModalCertificado = ({ isOpen, onRequestClose, urlCertificado }) => {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onRequestClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onRequestClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleOverlayClick}
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden relative w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 h-auto max-h-full p-4">
            <div className="flex justify-end">
              <button
                onClick={onRequestClose}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="relative z-10 flex justify-center items-center w-full h-full">
              <iframe
                src={`${urlCertificado}#toolbar=0`}
                width="100%"
                height="600px"
                allowFullScreen
                title="PDF Viewer"
                style={{ border: "none" }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalCertificado;
