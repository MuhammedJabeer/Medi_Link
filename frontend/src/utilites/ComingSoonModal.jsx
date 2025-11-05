import { X } from "lucide-react";

function ComingSoonModal({ isOpen, onClose, feature }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          {feature} 
        </h2>

        {/* Message */}
        <p className="text-gray-600 mb-4">
          This feature is not available yet. Stay tuned, it’s coming soon!
        </p>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
        >
          OK
        </button>
      </div>
    </div>
  );
}

export default ComingSoonModal;
