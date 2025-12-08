import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X, Info } from 'lucide-react'; // Import icon Info

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info'; // Tipe info sudah ada di interface
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialog = ({
  isOpen,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = 'danger',
  onConfirm,
  onCancel
}: ConfirmDialogProps) => {
  if (!isOpen) return null;

  // Konfigurasi Warna & Icon Berdasarkan Tipe
  const styles = {
    danger: {
      iconBg: 'bg-red-100 text-red-600',
      btnBg: 'bg-red-600 hover:bg-red-700',
      icon: AlertTriangle
    },
    warning: {
      iconBg: 'bg-yellow-100 text-yellow-600',
      btnBg: 'bg-yellow-600 hover:bg-yellow-700', // Warna kuning gelap agar teks putih terbaca
      icon: AlertTriangle
    },
    info: {
      iconBg: 'bg-blue-100 text-blue-600',
      btnBg: 'bg-blue-600 hover:bg-blue-700',
      icon: Info
    }
  };

  const currentStyle = styles[type];
  const Icon = currentStyle.icon;

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onCancel}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white w-full max-w-md rounded-xl shadow-2xl p-6 overflow-hidden z-10"
        >
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-full shrink-0 ${currentStyle.iconBg}`}>
              <Icon className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900">{title}</h3>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                {message}
              </p>
            </div>
            <button onClick={onCancel} className="text-gray-400 hover:text-gray-600 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors shadow-sm ${currentStyle.btnBg}`}
            >
              {confirmText}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
};