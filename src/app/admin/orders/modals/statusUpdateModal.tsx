"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface StatusUpdateModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (note: string, emailCustomer: boolean) => void;
  newStatus: string;
  customerName: string;
  orderNumber: string;
}

const StatusUpdateModal = ({
  visible,
  onClose,
  onConfirm,
  newStatus,
  customerName,
  orderNumber,
}: StatusUpdateModalProps) => {
  const [note, setNote] = useState("");
  const [emailCustomer, setEmailCustomer] = useState(true);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed top-0 left-0 right-0 z-50 bg-yellow-100 shadow-md border-b border-yellow-300 p-4"
          initial={{ y: "-100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
        >
          <div className="max-w-2xl mx-auto flex flex-col gap-4">
            <h2 className="text-lg font-bold text-yellow-700">
              Update Order Status
            </h2>
            <p>
              <span className="font-semibold">Order:</span> #{orderNumber} –{" "}
              {customerName}
            </p>
            <p>
              <span className="font-semibold">New Status:</span>{" "}
              <span className="text-yellow-800">{newStatus}</span>
            </p>

            <textarea
              className="border border-yellow-300 rounded p-2 w-full"
              placeholder="Enter special notes (optional)..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
            />

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={emailCustomer}
                onChange={(e) => setEmailCustomer(e.target.checked)}
              />
              Email customer about this update
            </label>

            <div className="flex gap-4 justify-end">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
                onClick={() => {
                  onConfirm(note, emailCustomer);
                  onClose();
                }}
              >
                Send & Update
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StatusUpdateModal;
