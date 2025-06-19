import React, { useState, useEffect, useRef, useCallback } from 'react';

// --- SVG Icons (Inline for consistency and ease of use) ---
const IconPlay = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.38 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.286L7.28 20.32c-1.25.737-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" /></svg>;
const IconStop = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M6.75 5.653A.75.75 0 0 0 6 6.306v11.388c0 .356.332.651.688.651h10.624c.356 0 .688-.295.688-.651V6.306a.75.75 0 0 0-.688-.653H6.75Z" clipRule="evenodd" /></svg>;
const IconCheckFlag = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" /></svg>;
const IconBook = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21c0 .65-.6.988-1.148.659L12 18.067l-8.742 3.592A1.125 1.125 0 0 1 2.5 21V5.507c0-1.47 1.073-2.756 2.57-2.93ZM10.5 12a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0Z" clipRule="evenodd" /></svg>;
const IconSyringe = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M6.924 3.01c-.139-.232-.423-.376-.723-.376H3.75A.75.75 0 0 0 3 3.375V7.5c0 .326-.089.64-.256.914l-1.428 2.38a1.5 1.5 0 0 0 1.111 2.213l.805.201a1.5 1.5 0 0 1 .913.913l.201.805a1.5 1.5 0 0 0 2.213 1.111l2.38-1.428A1.5 1.5 0 0 1 12.375 16h4.125a.75.75 0 0 0 .75-.75V7.83a.75.75 0 0 0-.053-.298l-2.75-5.5a.75.75 0 0 0-.297-.417 11.238 11.238 0 0 1-5.759-4.887ZM13 10.5a.5.5 0 0 0-1 0v.006a.5.5 0 0 0 1 0v-.006Z" clipRule="evenodd" /></svg>;
const IconClock = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h3.75a.75.75 0 0 0 .75-.75V9Z" clipRule="evenodd" /></svg>;
const IconHeartbeat = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M11.47 2.47a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06L12 4.06l-6.97 6.97a.75.75 0 0 1-1.06-1.06l7.5-7.5ZM12 16.5a.75.75 0 0 0-.75.75v2.25h-2.25a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25h2.25a.75.75 0 0 0 0-1.5h-2.25v-2.25a.75.75 0 0 0-.75-.75Z" clipRule="evenodd" /></svg>;
const IconLightning = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M11.25 13.5H9.75a.75.75 0 0 1-.75-.75V7.5a.75.75 0 0 1 .75-.75h1.5A.75.75 0 0 1 12 7.5v5.25A.75.75 0 0 0 11.25 13.5Z" /><path fillRule="evenodd" d="M6.326 21.86a.75.75 0 0 0 1.085.64l4.47-3.693c.1-.083.18-.182.23-.284l.972-1.945a.75.75 0 0 0-.735-1.091L8.527 14.86c-.447.16-.845.348-1.196.56L6.326 21.86ZM18.75 6H17.25a.75.75 0 0 0-.75.75V13.5a.75.75 0 0 0 .75.75h1.5a.75.75 0 0 0 .75-.75V6.75a.75.75 0 0 0-.75-.75ZM12 2.25a.75.75 0 0 1 .75.75v5.25a.75.75 0 0 1-1.5 0V3A.75.75 0 0 1 12 2.25Z" clipRule="evenodd" /><path fillRule="evenodd" d="M12.972 2.723a.75.75 0 0 0-1.09-.27l-5.5 3.333c-.092.055-.166.126-.22.203L2.25 12.398v-.003c0 .138-.01.275-.029.412a.75.75 0 0 0 .201.698l5.5 4.125a.75.75 0 0 0 1.341-.75l-4.28-3.21L8.527 8.36c.447-.16.845-.348 1.196-.56l.972-1.945a.75.75 0 0 1 .735-1.091Z" clipRule="evenodd" /></svg>;
const IconPill = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0V9a1.5 1.5 0 0 0 1.5 1.5h1.5a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-.75.75h-1.5A1.5 1.5 0 0 0 16.5 15V18a4.5 4.5 0 1 1-9 0v-3a1.5 1.5 0 0 0-1.5-1.5H3a.75.75 0 0 1-.75-.75V7.5a.75.75 0 0 1 .75-.75h1.5A1.5 1.5 0 0 0 7.5 6Zm.75 9a5.25 5.25 0 1 0 10.5 0V6a5.25 5.25 0 1 0-10.5 0v9Z" clipRule="evenodd" /><path d="M12 9a.75.75 0 0 1 .75.75v.5h.5a.75.75 0 0 1 0 1.5h-.5v.5a.75.75 0 0 1-1.5 0v-.5h-.5a.75.75 0 0 1 0-1.5h.5v-.5A.75.75 0 0 1 12 9Z" /></svg>;
const IconPrinter = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M7.875 1.5C6.839 1.5 6 2.34 6 3.375v2.25A2.25 2.25 0 0 0 3.75 8.25v10.5A2.25 2.25 0 0 0 6 21.75h9.75A2.25 2.25 0 0 0 18 19.5V8.25A2.25 2.25 0 0 0 15.75 6h-1.5V3.375C14.25 2.34 13.41 1.5 12.375 1.5h-4.5ZM4.5 8.25A.75.75 0 0 1 5.25 7.5h13.5a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-.75.75H6a.75.75 0 0 1-.75-.75V8.25ZM6 3.75C6 3.179 6.449 2.75 7 2.75h4.75a.75.75 0 0 1 0 1.5H7A.75.75 0 0 1 6 3.75Z" clipRule="evenodd" /><path d="M11.25 9.75a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H12a.75.75 0 0 1-.75-.75V9.75Z" /></svg>;
const IconRefresh = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.906-1.906a.75.75 0 0 0-1.06-1.06L16.22 5.394a8.25 8.25 0 1 0 2.208 5.762-.75.75 0 0 0-1.48-.235 6.75 6.75 0 1 1-10.002-4.864l.01-.008-.39.39-.39.39a.75.75 0 1 0 1.06 1.06l.84-.84Z" clipRule="evenodd" /></svg>;
const IconEye = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" /><path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.027 3.75 12.001 3.75c4.974 0 9.189 3.226 10.678 7.697a11.992 11.992 0 0 1-1.322 1.476c-1.459 1.459-2.93 2.837-4.388 4.137A11.992 11.992 0 0 1 12 21.25c-4.974 0-9.189-3.226-10.678-7.697a11.992 11.992 0 0 1 1.322-1.476ZM12 18.75a6.75 6.75 0 1 0 0-13.5 6.75 6.75 0 0 0 0 13.5Z" clipRule="evenodd" /></svg>;
const IconTrash = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M16.5 4.478a.75.75 0 0 0-1.106-.913L12 6.331 8.606 3.565a.75.75 0 0 0-1.106.913L9.123 7.5H4.5A2.25 2.25 0 0 0 2.25 9.75v9A2.25 2.25 0 0 0 4.5 21h15A2.25 2.25 0 0 0 21.75 18.75v-9A2.25 2.25 0 0 0 19.5 7.5h-4.623l1.116-3.022ZM12.75 12a.75.75 0 0 0-1.5 0v3.75a.75.75 0 0 0 1.5 0V12ZM15.75 12a.75.75 0 0 0-1.5 0v3.75a.75.75 0 0 0 1.5 0V12ZM8.75 12a.75.75 0 0 0-1.5 0v3.75a.75.75 0 0 0 1.5 0V12Z" clipRule="evenodd" /></svg>;


// --- Top Alert Component ---
const TopAlert = ({ message, type, onClose }) => {
  if (!message) return null;

  let bgColor = '';
  let borderColor = '';
  let textColor = '';
  switch (type) {
    case 'success':
      bgColor = 'bg-green-50';
      borderColor = 'border-green-500';
      textColor = 'text-green-800';
      break;
    case 'error':
      bgColor = 'bg-red-50';
      borderColor = 'border-red-500';
      textColor = 'text-red-800';
      break;
    case 'warning':
      bgColor = 'bg-yellow-50';
      borderColor = 'border-yellow-500';
      textColor = 'text-yellow-800';
      break;
    case 'info':
    default:
      bgColor = 'bg-blue-50';
      borderColor = 'border-blue-500';
      textColor = 'text-blue-800';
      break;
  }

  return (
    <div className={`fixed top-0 left-0 right-0 p-4 mb-4 z-50 flex items-center justify-center transition-all duration-300 transform rounded-lg border-l-4 ${bgColor} ${borderColor} ${textColor} ${message ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
      <span className="font-semibold">{message}</span>
      <button onClick={onClose} className="ml-4 text-xl font-bold">&times;</button>
    </div>
  );
};


// --- Custom Modal Component (for general purpose alerts/inputs) ---
const CustomModal = ({ isOpen, onClose, title, children, showConfirmButton = false, onConfirm = () => {}, confirmText = "OK", showCancelButton = false, onCancel = () => {} }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 relative animate-fade-in-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl font-bold"
        >
          &times;
        </button>

        {/* Title */}
        {title && <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">{title}</h2>}

        {/* Content */}
        <div className="mb-6">{children}</div>

        {/* Action Buttons */}
        {(showConfirmButton || showCancelButton) && (
          <div className="flex justify-center gap-4">
            {showCancelButton && (
              <button
                onClick={onCancel}
                className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-lg shadow-md transition-all duration-200"
              >
                Cancel
              </button>
            )}
            {showConfirmButton && (
              <button
                onClick={onConfirm}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200"
              >
                {confirmText}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// --- Image Modal Component (for displaying large algorithm images) ---
const ImageModal = ({ isOpen, onClose, imageUrl, title }) => {
  if (!isOpen) return null;

  const [scale, setScale] = useState(1); // State for image zoom scale
  const imgRef = useRef(null); // Ref to the image element

  const handleImageClick = (e) => {
    // Prevent closing if the click originated from the download or zoom buttons
    if (e.target.tagName === 'A' || e.target.closest('button')) {
      return;
    }
    onClose();
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    // Suggest a filename, but the actual downloaded name might depend on server Content-Disposition header
    link.download = `${title.replace(/\s+/g, '_')}_Algorithm.png`; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleZoomIn = () => {
    setScale(prevScale => Math.min(prevScale + 0.1, 3)); // Max zoom 3x
  };

  const handleZoomOut = () => {
    setScale(prevScale => Math.max(prevScale - 0.1, 0.5)); // Min zoom 0.5x
  };

  // Reset zoom when modal opens or image changes
  useEffect(() => {
    if (isOpen) {
      setScale(1); // Reset scale to 1 when modal opens
    }
  }, [isOpen, imageUrl]);

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl relative animate-fade-in-up flex flex-col items-center p-4 w-full h-full max-w-[95vw] max-h-[95vh]"> {/* Adjusted width/height to fill more */}
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl font-bold z-10"
        >
          &times;
        </button>

        {/* Title */}
        {title && <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 text-center">{title} Algorithm</h2>}

        {/* Image Container with scroll and max dimensions */}
        {/* Adjusted max-h to dynamically take up more space */}
        <div className="flex-grow overflow-auto w-full max-h-[calc(100vh-160px)] items-center justify-center p-2 rounded-lg border border-gray-200">
            <img
              ref={imgRef}
              src={imageUrl}
              alt={`${title} Algorithm`}
              className="object-contain cursor-pointer transition-transform duration-100 ease-out"
              style={{ transform: `scale(${scale})` }} // Apply zoom scale
              onClick={handleImageClick}
            />
        </div>

        {/* Controls for zoom and download */}
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={handleZoomIn}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-md transition-all duration-200 flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M11.25 4.507A.75.75 0 0 1 12 3.75h.75a.75.75 0 0 1 .75.75v.75h.75a.75.75 0 0 1 .75.75v.75h.75a.75.75 0 0 1 .75.75v.75h.75a.75.75 0 0 1 .75.75V12a.75.75 0 0 1-.75.75h-.75V13.5a.75.75 0 0 1-.75.75h-.75V15a.75.75 0 0 1-.75.75h-.75V16.5a.75.75 0 0 1-.75.75h-.75V18a.75.75 0 0 1-.75.75h-.75V19.5a.75.75 0 0 1-.75.75H12a.75.75 0 0 1-.75-.75v-.75H10.5a.75.75 0 0 1-.75-.75V18a.75.75 0 0 1-.75-.75h-.75V16.5a.75.75 0 0 1-.75-.75V15a.75.75 0 0 1-.75-.75h-.75V13.5a.75.75 0 0 1-.75-.75H3a.75.75 0 0 1-.75-.75V12a.75.75 0 0 1 .75-.75h.75V10.5a.75.75 0 0 1 .75-.75h.75V9a.75.75 0 0 1 .75-.75h.75V7.5a.75.75 0 0 1 .75-.75h.75V6a.75.75 0 0 1 .75-.75h.75V4.507ZM12 6a.75.75 0 0 1 .75.75v.75H13.5a.75.75 0 0 1 .75.75v.75H15a.75.75 0 0 1 .75.75v.75H17.25a.75.75 0 0 1 .75.75V12a.75.75 0 0 1-.75.75h-.75v.75a.75.75 0 0 1-.75.75h-.75V15a.75.75 0 0 1-.75.75h-.75V16.5a.75.75 0 0 1-.75.75h-.75V18a.75.75 0 0 1-.75.75h-.75V19.5a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V18a.75.75 0 0 1-.75-.75h-.75V16.5a.75.75 0 0 1-.75-.75V15a.75.75 0 0 1-.75-.75h-.75V13.5a.75.75 0 0 1-.75-.75V12a.75.75 0 0 1 .75-.75h.75V10.5a.75.75 0 0 1 .75-.75h.75V9a.75.75 0 0 1 .75-.75h.75V7.5a.75.75 0 0 1 .75-.75h.75V6a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" /></svg>

            Zoom In
          </button>
          <button
            onClick={handleZoomOut}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-md transition-all duration-200 flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M3.75 12a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5H4.5a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" /></svg>
            Zoom Out
          </button>
        </div>
      </div>
    </div>
  );
};


// --- Main App Component ---
const App = () => {
  const [timer, setTimer] = useState('00:00:00');
  const [cprStartTime, setCprStartTime] = useState(null); // The absolute start time of the current CPR session
  const cprTimerIntervalRef = useRef(null); // Ref for the main timer interval
  const pulseCheckIntervalRef = useRef(null); // Ref for pulse check interval
  const [totalCprDuration, setTotalCprDuration] = useState(null); // For summary of the finished CPR session

  const [adrenalineTimer, setAdrenalineTimer] = useState('00:00'); // Timer for adrenaline reminders
  const adrenalineTimerIntervalRef = useRef(null);
  const adrenalineEndTimeRef = useRef(null);
  const adrenalineDoseRef = useRef(1); // Tracks adrenaline dose count

  const [showAlgorithmMenu, setShowAlgorithmMenu] = useState(false);
  const [showEnergyOptions, setShowEnergyOptions] = useState(false);
  const [energyType, setEnergyType] = useState(''); // Stores type of energy delivery (Defib/Cardioversion)
  
  const [records, setRecords] = useState([]); // List of CPR records
  const [isCprFinished, setIsCprFinished] = useState(false); // State to manage overall CPR session completion

  // Top Alert States
  const [topAlert, setTopAlert] = useState({ message: null, type: 'info' });
  const topAlertTimeoutRef = useRef(null);

  // Reference for the table body to control scrolling
  const tableBodyRef = useRef(null);
  // State for historical records
  const [historicalRecords, setHistoricalRecords] = useState([]);


  // Function to show top alert (for simple notifications)
  const showTopAlert = useCallback((message, type = 'info', duration = 5000) => { // Changed duration to 5000ms
      setTopAlert({ message, type });
      if (topAlertTimeoutRef.current) {
          clearTimeout(topAlertTimeoutRef.current);
      }
      topAlertTimeoutRef.current = setTimeout(() => {
          setTopAlert({ message: null, type: 'info' });
      }, duration);
  }, []);

  // Custom Modal States (for dynamically showing pop-ups that require interaction)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState(null);
  const [modalShowConfirm, setModalShowConfirm] = useState(false);
  const [modalConfirmText, setModalConfirmText] = useState('OK');
  const [modalShowCancel, setModalShowCancel] = useState(false);
  const modalConfirmCallback = useRef(() => {});
  const modalCancelCallback = useRef(() => {});
  const modalInputRef = useRef(null); // Ref for input fields within modals

  // Image Modal States (for displaying large algorithm images)
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [currentImageModalUrl, setCurrentImageModalUrl] = useState('');
  const [currentImageModalTitle, setCurrentImageModalTitle] = useState('');


  // Function to open custom modal (centralized modal control for interactive modals)
  const openCustomModal = useCallback((title, content, showConfirm = false, confirmText = 'OK', onConfirm = () => {}, showCancel = false, onCancel = () => {}) => {
    setModalTitle(title);
    setModalContent(content);
    setModalShowConfirm(showConfirm);
    setModalConfirmText(confirmText);
    modalConfirmCallback.current = onConfirm;
    setModalShowCancel(showCancel);
    modalCancelCallback.current = onCancel;
    setIsModalOpen(true);
  }, []);

  // Function to close custom modal
  const closeCustomModal = useCallback(() => {
    setIsModalOpen(false);
    setModalTitle('');
    setModalContent(null);
    setModalShowConfirm(false);
    setModalConfirmText('OK');
    setModalShowCancel(false);
    modalConfirmCallback.current = () => {}; // Reset callback
    modalCancelCallback.current = () => {}; // Reset callback
  }, []);

  // Function to close Image Modal
  const closeImageModal = useCallback(() => {
    setIsImageModalOpen(false);
    setCurrentImageModalUrl('');
    setCurrentImageModalTitle('');
  }, []);

  // Load records and app state from Local Storage on initial component mount
  useEffect(() => {
    try {
      const storedRecords = localStorage.getItem('cprRecords');
      let parsedRecords = [];
      if (storedRecords) {
        try {
          const tempParsed = JSON.parse(storedRecords);
          if (Array.isArray(tempParsed)) {
            parsedRecords = tempParsed;
          } else {
            console.warn("Stored CPR records in localStorage was not an array, resetting:", tempParsed);
          }
        } catch (e) {
          console.error("Error parsing CPR records from localStorage, resetting:", e);
        }
      }
      setRecords(parsedRecords);

      const storedCprStartTime = localStorage.getItem('cprStartTime');
      const parsedCprStartTime = storedCprStartTime ? new Date(storedCprStartTime) : null;
      setCprStartTime(parsedCprStartTime);

      const storedIsCprFinished = localStorage.getItem('isCprFinished');
      const parsedIsCprFinished = storedIsCprFinished ? JSON.parse(storedIsCprFinished) : false;
      setIsCprFinished(parsedIsCprFinished);

      // Only restart timer if CPR was active and not finished
      if (parsedCprStartTime && !parsedIsCprFinished) {
          const initialElapsedTime = new Date().getTime() - parsedCprStartTime.getTime();
          setTimer(formatElapsedTime(initialElapsedTime));
          cprTimerIntervalRef.current = setInterval(() => {
              setTimer(formatElapsedTime(new Date().getTime() - parsedCprStartTime.getTime()));
          }, 1000);
      } else if (parsedIsCprFinished) {
          setTimer('00:00:00'); // If finished, timer should be 0
      }


      const storedAdrenalineDose = localStorage.getItem('adrenalineDose');
      adrenalineDoseRef.current = storedAdrenalineDose ? parseInt(storedAdrenalineDose, 10) : 1;

      const storedTotalCprDuration = localStorage.getItem('totalCprDuration');
      setTotalCprDuration(storedTotalCprDuration || null);

      // Load historical records
      const storedBackups = localStorage.getItem('cprRecordBackups');
      if (storedBackups) {
          const parsedBackups = JSON.parse(storedBackups);
          if (Array.isArray(parsedBackups)) {
              setHistoricalRecords(parsedBackups);
          } else {
              console.warn("Stored CPR backups in localStorage was not an array, resetting.");
              setHistoricalRecords([]);
          }
      }

    } catch (error) {
      console.error("Error loading app state from Local Storage:", error);
      showTopAlert('Load Error: Failed to load app state.', 'error');
    }
  }, [showTopAlert]);

  // Save records to Local Storage whenever the 'records' state changes
  useEffect(() => {
    try {
      localStorage.setItem('cprRecords', JSON.stringify(records));
    } catch (error) {
      console.error("Error saving records to Local Storage:", error);
      showTopAlert('Save Error: Failed to save records.', 'error');
    }
  }, [records, showTopAlert]);

    // Persist cprStartTime, adrenalineDose, and isCprFinished
  useEffect(() => {
    if (cprStartTime) {
      localStorage.setItem('cprStartTime', cprStartTime.toISOString());
    } else {
      localStorage.removeItem('cprStartTime');
    }
    localStorage.setItem('adrenalineDose', adrenalineDoseRef.current.toString());
    localStorage.setItem('isCprFinished', JSON.stringify(isCprFinished));
  }, [cprStartTime, isCprFinished]);

  useEffect(() => {
    if (totalCprDuration !== null) {
      localStorage.setItem('totalCprDuration', totalCprDuration);
    } else {
      localStorage.removeItem('totalCprDuration');
    }
  }, [totalCprDuration]);

  // Effect to scroll to the top of the table body when records change
  useEffect(() => {
    if (tableBodyRef.current) {
      // Small delay to allow DOM to update after new records are added
      setTimeout(() => {
        tableBodyRef.current.scrollTop = 0; // Scroll to the top
      }, 100);
    }
  }, [records]); // Dependency array: run when records change


  // Helper to format elapsed time (HH:MM:SS)
  const formatElapsedTime = (ms) => {
    if (ms < 0) ms = 0;
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  // Helper to format elapsed time (MM:SS) for individual actions
  const getCprElapsedTime = () => {
    // If cprStartTime is null, it means no session has started or it's finished.
    // In this case, records should be empty or only contain past session data.
    // For a new record, use current timer display if available, otherwise "00:00".
    if (!cprStartTime && cprTimerIntervalRef.current === null && timer === '00:00:00') {
      return '00:00'; // Initial state or after full reset/finish
    }
    // If timer is running or paused, get its current displayed value for the record.
    return timer.substring(3,8); // Return MM:SS from HH:MM:SS timer
  };

  // Helper to parse HH:MM:SS string to milliseconds
  const parseTimeToMs = (timeString) => {
    const parts = timeString.split(':');
    const hours = parseInt(parts[0] || '0', 10);
    const minutes = parseInt(parts[1] || '0', 10);
    const seconds = parseInt(parts[2] || '0', 10);
    return (hours * 3600 + minutes * 60 + seconds) * 1000;
  };

  // Adds a record to the records state
  const addRecord = (action, note = '') => {
    const newRecord = {
      id: Date.now(), // Simple unique ID for local storage
      cprTime: getCprElapsedTime(), // Use the current displayed timer value (MM:SS) for the record
      action: action,
      note: note,
      timestamp: new Date().toISOString(), // Use ISO string for consistent date
      clockTime: new Date().toLocaleTimeString('en-GB', { hour12: false })
    };
    setRecords((prevRecords) => [...prevRecords, newRecord]);
  };

  // Handles starting a new CPR session or resuming a paused one
  const startCPR = () => {
    if (cprTimerIntervalRef.current) { // Check if timer is already running
      showTopAlert('CPR timer is already active.', 'info');
      return;
    }

    // Determine the absolute start time for this *current counting interval*
    // If it's a fresh session or after a full reset/finish, start from 0.
    // If it's a resume from a 'Stop CPR', continue from the displayed time.
    const initialTimeOffset = parseTimeToMs(timer);
    const resumeStartTime = new Date().getTime() - initialTimeOffset;

    // Add a "Start CPR" record every time this button is pressed.
    // If cprStartTime is null, it's the very first start of this *session*.
    // If cprStartTime is not null, it means we are resuming an existing session.
    if (cprStartTime === null) {
        setCprStartTime(new Date()); // Set the absolute start time for the entire session
        addRecord('Start CPR', `Started at ${new Date().toLocaleTimeString('en-GB', { hour12: false })}`);
    } else {
        addRecord('Start CPR', `Resumed at ${new Date().toLocaleTimeString('en-GB', { hour12: false })}`);
    }

    setTotalCprDuration(null); // Reset total duration display until session stops/finishes/rosc
    setIsCprFinished(false); // Ensure buttons are enabled when starting new CPR

    // Clear any existing timer interval before starting a new one
    if (cprTimerIntervalRef.current) {
      clearInterval(cprTimerIntervalRef.current);
    }
    cprTimerIntervalRef.current = setInterval(() => {
        setTimer(formatElapsedTime(new Date().getTime() - resumeStartTime));
    }, 1000);

    // Clear previous pulse check interval if any
    if (pulseCheckIntervalRef.current) {
        clearInterval(pulseCheckIntervalRef.current);
    }
    // Start pulse check alert every 2 minutes (120000 ms)
    pulseCheckIntervalRef.current = setInterval(() => {
      openCustomModal(
        'Check Pulse!',
        'Please check pulse to assess blood circulation.',
        true,
        'Got it!'
      );
    }, 120000);
  };

  // Handles stopping the CPR timer (pausing the session)
  const stopCPR = () => {
    if (!cprTimerIntervalRef.current) {
      showTopAlert('CPR timer is not active.', 'info');
      return;
    }

    clearInterval(cprTimerIntervalRef.current); // Stop the main timer counting
    cprTimerIntervalRef.current = null; // Clear the interval ref
    clearInterval(pulseCheckIntervalRef.current); // Stop pulse check alerts
    pulseCheckIntervalRef.current = null;
    // Timer display will remain at its current value (not reset) as per request.

    // Calculate total duration from the *original* cprStartTime to *current* time
    if (cprStartTime) { // Only calculate if a session was started
        const currentTotalTimeMs = new Date().getTime() - cprStartTime.getTime();
        setTotalCprDuration(formatElapsedTime(currentTotalTimeMs));
    } else {
        setTotalCprDuration(timer); // Fallback to current displayed time if no start time recorded
    }


    addRecord('Stop CPR', `Stopped at ${new Date().toLocaleTimeString('en-GB', { hour12: false })}`);
    // cprStartTime is NOT set to null here, as it signifies a paused session
  };

  // Handles finishing the entire CPR session
  const handleFinishCPR = () => {
    // Check if CPR has ever been started in this session for Finish CPR to be valid
    const hasStartedCpr = records.some(record => record.action === 'Start CPR');
    if (!hasStartedCpr) { // If no "Start CPR" record, it hasn't truly begun a session
        showTopAlert('Cannot finish CPR as it has not started yet. Please use "Start CPR" first.', 'warning');
        return;
    }

    // If CPR is currently running, stop its intervals before finishing
    if (cprTimerIntervalRef.current) {
        clearInterval(cprTimerIntervalRef.current);
        cprTimerIntervalRef.current = null;
    }
    if (pulseCheckIntervalRef.current) {
        clearInterval(pulseCheckIntervalRef.current);
        pulseCheckIntervalRef.current = null;
    }
    
    // Capture current timer value before resetting for total duration calculation if needed
    const currentTimerAtFinish = timer; 

    openCustomModal(
      'Finish CPR Reason',
      <div>
        <label htmlFor="finishReason" className="block text-gray-700 text-sm font-bold mb-2">
          Please provide a reason for finishing CPR:
        </label>
        <input
          type="text"
          id="finishReason"
          ref={modalInputRef}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Reason for finishing"
        />
      </div>,
      true, // Show confirm button
      'Confirm Finish',
      () => {
        const finishReason = modalInputRef.current ? modalInputRef.current.value : '';
        // setTimer('00:00:00'); // Timer display remains at current value, NOT reset for Finish CPR

        // Calculate total duration from the *first* "Start CPR" record to *current* time
        const firstCprStartRecord = records.find(rec => rec.action === 'Start CPR');
        if (firstCprStartRecord && cprStartTime) { // If there's an actual start time from the session
            const startTimestamp = new Date(firstCprStartRecord.timestamp).getTime();
            const finishTimestamp = new Date().getTime(); // Current time as end of CPR
            setTotalCprDuration(formatElapsedTime(finishTimestamp - startTimestamp));
        } else {
             // Fallback if original cprStartTime is somehow lost, use the last displayed timer value
            setTotalCprDuration(currentTimerAtFinish);
        }

        addRecord('Finish CPR', `Finished at ${new Date().toLocaleTimeString('en-GB', { hour12: false })}${finishReason ? `. Reason: ${finishReason}` : ''}`);
        setCprStartTime(null); // Clear session start time as session is concluded
        setIsCprFinished(true); // Mark session as finished to disable most buttons
        closeCustomModal(); // Close the reason input modal
      },
      true, // Show cancel button
      () => {
        closeCustomModal(); // Close the modal without finishing CPR
      }
    );
  };

  // Handles deleting a single record from the log
  const handleDeleteRecord = (id) => {
    openCustomModal(
      'Confirm Deletion',
      'Are you sure you want to delete this record?',
      true,
      'Delete',
      () => {
        setRecords(prevRecords => prevRecords.filter(record => record.id !== id));
        closeCustomModal();
      },
      true,
      closeCustomModal
    );
  };

  // Toggles visibility of the Algorithm CPR menu
  const toggleAlgorithmMenu = () => {
    setShowAlgorithmMenu((prev) => !prev);
  };

  // Image URLs for CPR algorithms
  // These images should be placed in the 'public/images/' directory of your project.
  // For example: public/images/CA.jpg, public/images/TP.jpg, etc.
  const algorithmImages = {
    Cardiac_Arrest: `/images/CA.jpg`, // Removed window.location.origin, using relative path from root
    Tachycardia_with_Pulse: `/images/TP.jpg`,
    Bradycardia: `/images/BCD.jpg`,
    Post_Cardiac_Arrest_Care: `/images/PCAC.jpg` 
  };

  // Displays the selected algorithm image in the ImageModal
  const showAlgorithm = (type) => {
    setCurrentImageModalUrl(algorithmImages[type]);
    setCurrentImageModalTitle(type);
    setIsImageModalOpen(true);
  };

  // Records an Adrenaline dose
  const recordAdrenaline = (route) => {
    const doseText = `Dose ${adrenalineDoseRef.current}`;
    addRecord(`Adrenaline ${route}`, doseText);
    showTopAlert(`Adrenaline ${route} recorded!`, 'success'); // Added alert
    adrenalineDoseRef.current += 1;
  };

  // Starts the adrenaline reminder timer
  const startAdrenalineTimer = (minutes) => {
    clearInterval(adrenalineTimerIntervalRef.current);
    const now = new Date().getTime();
    adrenalineEndTimeRef.current = now + (minutes * 60 * 1000);

    const updateTimer = () => {
      const currentRemaining = adrenalineEndTimeRef.current - new Date().getTime();
      if (currentRemaining <= 0) {
        clearInterval(adrenalineTimerIntervalRef.current);
        setAdrenalineTimer('00:00');
        showTopAlert('Time to administer next Adrenaline dose!', 'warning');
        return;
      }
      setAdrenalineTimer(formatElapsedTime(currentRemaining).substring(3, 8)); // Show only MM:SS
    };

    updateTimer(); // Initial call to set the timer immediately
    adrenalineTimerIntervalRef.current = setInterval(updateTimer, 1000);
  };

  // Stops the adrenaline reminder timer
  const stopAdrenalineTimer = () => {
    clearInterval(adrenalineTimerIntervalRef.current);
    setAdrenalineTimer('00:00');
    adrenalineEndTimeRef.current = null;
  };

  // Toggles display of energy options (Defibrillation/Cardioversion)
  const handleShowEnergyOptions = (type) => {
    if (showEnergyOptions && energyType === type) { // If same button pressed, hide options
      setShowEnergyOptions(false);
      setEnergyType('');
    } else { // Show options for the selected type
      setShowEnergyOptions(true);
      setEnergyType(type);
    }
  };

  // Records energy delivery (Defibrillation or Cardioversion)
  const recordEnergyDelivery = (type, energy) => {
    addRecord(type, `${energy} J`);
    showTopAlert(`${type} ${energy} J Recorded!`, 'success'); // Added alert here
    setShowEnergyOptions(false);
    setEnergyType(''); // Reset energy type
  };

  // Handles recording EKG rhythm from buttons
  const recordEKG = (rhythm) => {
    addRecord('EKG', rhythm);
    showTopAlert(`EKG Selected: ${rhythm}`, 'success');
  };

  // Records selected medication or prompts for "Other" medication name
  const recordSelectedMedication = (e) => {
    const selectedMedication = e.target.value;
    if (selectedMedication) {
      if (selectedMedication === 'Other') {
        openCustomModal(
          'Enter Other Medication',
          <div>
            <label htmlFor="otherMedName" className="block text-gray-700 text-sm font-bold mb-2">
              Please enter medication name:
            </label>
            <input
              type="text"
              id="otherMedName"
              ref={modalInputRef}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Medication Name"
            />
          </div>,
          true,
          'Add Medication',
          () => {
            const otherMedName = modalInputRef.current ? modalInputRef.current.value : '';
            if (otherMedName) {
              addRecord('Medication', otherMedName);
              showTopAlert(`Medication Added!: ${otherMedName}`, 'success');
            } else {
              showTopAlert('Please enter a medication name.', 'warning');
            }
            // Always close the medication input modal after Add/Cancel
            closeCustomModal(); 
            e.target.value = ''; // Reset dropdown after input
          },
          true,
          () => {
            e.target.value = ''; // Reset dropdown if cancelled
            closeCustomModal(); // Always close on cancel
          }
        );
      } else {
        addRecord('Medication', selectedMedication);
        showTopAlert(`Medication Added!: ${selectedMedication}`, 'success');
        e.target.value = ''; // Reset dropdown
      }
    }
  };

  // Records Return of Spontaneous Circulation (ROSC)
  const recordROSC = () => {
    if (!cprTimerIntervalRef.current && !cprStartTime) {
        showTopAlert('Cannot record ROSC as CPR is not running or has not started.', 'warning');
        return;
    }
    clearInterval(cprTimerIntervalRef.current);
    cprTimerIntervalRef.current = null;
    clearInterval(pulseCheckIntervalRef.current);
    pulseCheckIntervalRef.current = null;
    // Timer display will remain at its current value (not reset) as per request.

    // Calculate total duration from the *first* "Start CPR" record to *current* time
    const firstCprStartRecord = records.find(rec => rec.action === 'Start CPR');
    if (firstCprStartRecord && cprStartTime) { // Ensure cprStartTime is valid for accurate calculation
        const startTimestamp = new Date(firstCprStartRecord.timestamp).getTime();
        const roscTimestamp = new Date().getTime();
        setTotalCprDuration(formatElapsedTime(roscTimestamp - startTimestamp));
    }


    addRecord('ROSC', `ROSC at ${new Date().toLocaleTimeString('en-GB', { hour12: false })}`);
    setCprStartTime(null); // Clear session start time as session is concluded
    showTopAlert('ROSC Recorded!', 'success');
  };

  // Resets the entire CPR application state and clears local storage
  const resetCPR = () => {
    clearInterval(cprTimerIntervalRef.current);
    cprTimerIntervalRef.current = null;
    clearInterval(pulseCheckIntervalRef.current);
    pulseCheckIntervalRef.current = null;
    clearInterval(adrenalineTimerIntervalRef.current);
    adrenalineTimerIntervalRef.current = null;

    setTimer('00:00:00');
    setCprStartTime(null);
    setAdrenalineTimer('00:00');
    adrenalineEndTimeRef.current = null;
    adrenalineDoseRef.current = 1;
    setShowAlgorithmMenu(false);
    setShowEnergyOptions(false);
    setEnergyType('');
    setTotalCprDuration(null);
    setIsCprFinished(false); // Enable all buttons on reset

    // Clear records from Local Storage
    try {
      localStorage.removeItem('cprRecords');
      localStorage.removeItem('cprStartTime');
      localStorage.removeItem('adrenalineDose');
      localStorage.removeItem('totalCprDuration');
      localStorage.removeItem('isCprFinished');
      showTopAlert('CPR Reset! All records cleared and timers reset.', 'success');
    } catch (e) {
      console.error("Error clearing records from Local Storage:", e);
      showTopAlert('Reset Error: Failed to clear local records.', 'error');
    }
    setRecords([]); // Clear local records state
  };

  // Generates printable content for the CPR record
  const printRecordContent = (name, recordsToPrint, durationToPrint) => { // Added recordsToPrint, durationToPrint as arguments
    // Generate table content specifically for printing, excluding the delete column
    const printableTableRows = recordsToPrint.map(record => `
      <tr>
        <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-700">${record.cprTime}</td>
        <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-700">${record.clockTime}</td>
        <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-700">${record.action}</td>
        <td class="px-4 py-2 text-sm text-gray-700 max-w-xs overflow-hidden text-ellipsis">${record.note}</td>
      </tr>
    `).join('');

    const signedByHTML = `<div style="margin-bottom: 20px; font-weight: bold; text-align: center;">พยาบาลผู้บันทึก: ${name}</div>`; // Changed text
    const totalDurationHTML = durationToPrint ? `<div style="margin-top: 10px; font-weight: bold; text-align: center;">Total CPR Duration: ${durationToPrint}</div>` : '';

    const printWindow = window.open();
    if (!printWindow) {
      showTopAlert('Print window blocked. Please allow pop-ups for this site.', 'error');
      return;
    }
    printWindow.document.write(`
      <html>
        <head>
          <title>Print CPR Record</title>
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
          <style>
            body { font-family: 'Inter', sans-serif; padding: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #0099CC; color: white; }
            .print-section { page-break-inside: avoid; }
          </style>
        </head>
        <body>
          <div class="print-section">
            <table id="printTable">
              <thead>
                <tr>
                  <th>CPR Time</th>
                  <th>Clock Time</th>
                  <th>Action</th>
                  <th>Note</th>
                </tr>
              </thead>
              <tbody>
                ${printableTableRows}
              </tbody>
            </table>
          </div>
          ${totalDurationHTML}
          ${signedByHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.location.reload();
    printWindow.close();
  };

  // Handles saving a backup and then printing the record
  const handlePrintAndBackup = () => {
    openCustomModal(
      'Enter Your Name',
      <div>
        <label htmlFor="signerName" className="block text-gray-700 text-sm font-bold mb-2">
          พยาบาลผู้บันทึก:
        </label>
        <input
          type="text"
          id="signerName"
          ref={modalInputRef}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Your Name"
        />
      </div>,
      true, // Show confirm button
      'Print',
      () => {
        const name = modalInputRef.current ? modalInputRef.current.value : '';
        if (!name) {
          openCustomModal('Input Required', 'Please enter a name before printing.', true);
          return;
        }

        // 1. Capture current state for backup
        const backupEntry = {
          id: Date.now(),
          timestamp: new Date().toISOString(),
          name: name,
          totalDuration: totalCprDuration || timer, // Use actual total duration if calculated, else current timer
          records: records // The full current records array
        };

        // 2. Save to historical records
        setHistoricalRecords(prev => {
          const updatedHistory = [...prev, backupEntry];
          localStorage.setItem('cprRecordBackups', JSON.stringify(updatedHistory));
          return updatedHistory;
        });
        showTopAlert('Current record backed up!', 'info');

        // 3. Proceed with printing
        printRecordContent(name, records, totalCprDuration || timer); // Pass records and totalDuration explicitly
        closeCustomModal();
      },
      true, // Show cancel button
      closeCustomModal
    );
  };

  // Handles viewing a historical record
  const handleViewHistoricalRecord = (backup) => {
    // Confirm with user before replacing current records
    openCustomModal(
        'View Historical Record',
        `คุณต้องการโหลดบันทึกของ "${backup.name}" (${new Date(backup.timestamp).toLocaleString('th-TH')}) หรือไม่? การกระทำนี้จะแทนที่ข้อมูลปัจจุบันของคุณที่ยังไม่ได้บันทึก.`,
        true,
        'โหลดบันทึก',
        () => {
            // Stop any active timers
            clearInterval(cprTimerIntervalRef.current);
            cprTimerIntervalRef.current = null;
            clearInterval(pulseCheckIntervalRef.current);
            pulseCheckIntervalRef.current = null;
            clearInterval(adrenalineTimerIntervalRef.current);
            adrenalineTimerIntervalRef.current = null;

            setRecords(backup.records);
            setTimer('00:00:00'); // Historical records are static, so timer should be reset
            setCprStartTime(null); // No active CPR session
            setTotalCprDuration(backup.totalDuration); // Load the total duration from backup
            setIsCprFinished(true); // Mark as finished, as it's a past record
            setAdrenalineTimer('00:00');
            adrenalineDoseRef.current = 1; // Reset adrenaline counter

            showTopAlert(`โหลดบันทึกย้อนหลังของ "${backup.name}" แล้ว`, 'info');
            closeCustomModal();
        },
        true,
        closeCustomModal
    );
};

// Handles printing a historical record directly
const handlePrintHistoricalRecord = (backup) => {
    openCustomModal(
        'พิมพ์บันทึกย้อนหลัง',
        `คุณต้องการพิมพ์บันทึกของ "${backup.name}" (${new Date(backup.timestamp).toLocaleString('th-TH')}) หรือไม่?`,
        true,
        'พิมพ์',
        () => {
            // Use the records and totalDuration from the backup object for printing
            printRecordContent(backup.name, backup.records, backup.totalDuration);
            closeCustomModal();
        },
        true,
        closeCustomModal
    );
};

// Handles deleting a historical record
const handleDeleteHistoricalRecord = (id) => {
    openCustomModal(
        'ยืนยันการลบบันทึกย้อนหลัง',
        'คุณแน่ใจหรือไม่ว่าต้องการลบบันทึกย้อนหลังนี้อย่างถาวร? การกระทำนี้ไม่สามารถย้อนกลับได้.',
        true,
        'ลบ',
        () => {
            setHistoricalRecords(prev => {
                const updatedHistory = prev.filter(b => b.id !== id);
                localStorage.setItem('cprRecordBackups', JSON.stringify(updatedHistory));
                return updatedHistory;
            });
            showTopAlert('บันทึกย้อนหลังถูกลบแล้ว.', 'success');
            closeCustomModal();
        },
        true,
        closeCustomModal
    );
};


  return (
    <div className="min-h-screen bg-cover bg-fixed bg-center p-4" style={{ backgroundImage: `url('https://cpr123.com/wp-content/uploads/2021/07/Heart-Rate-with-Heart.jpg')`, fontFamily: 'Inter, sans-serif' }}>
      {/* Overlay to ensure readability over background image */}
      <div className="bg-white bg-opacity-90 min-h-[calc(100vh-2rem)] rounded-xl shadow-xl p-6 md:p-8 max-w-4xl mx-auto flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
          CPR Digital Record
        </h1>

        <div className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 tracking-wide" id="timer">
          {timer}
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-6">
          <button
            className={`px-6 py-3 text-white font-semibold rounded-lg shadow-md transition-all duration-200 ease-in-out transform flex items-center justify-center gap-2 ${
              // Start is disabled if timer is running (cprTimerIntervalRef.current is not null) OR if CPR session is finished
              cprTimerIntervalRef.current !== null || isCprFinished
                ? 'bg-green-300 cursor-not-allowed' // Disabled state style
                : 'bg-green-500 hover:bg-green-600 hover:scale-105' // Enabled state style
            }`}
            onClick={startCPR}
            disabled={cprTimerIntervalRef.current !== null || isCprFinished}
          >
            <IconPlay /> Start CPR
          </button>
          <button
            className={`px-6 py-3 text-white font-semibold rounded-lg shadow-md transition-all duration-200 ease-in-out transform flex items-center justify-center gap-2 ${
              // Stop is disabled if timer is NOT running (cprTimerIntervalRef.current is null) OR if CPR session is finished
              cprTimerIntervalRef.current === null || isCprFinished
                ? 'bg-red-300 cursor-not-allowed'
                : 'bg-red-500 hover:bg-red-600 hover:scale-105'
            }`}
            onClick={stopCPR}
            disabled={cprTimerIntervalRef.current === null || isCprFinished}
          >
            <IconStop /> Stop CPR
          </button>
          <button
            className={`px-6 py-3 text-white font-semibold rounded-lg shadow-md transition-all duration-200 ease-in-out transform flex items-center justify-center gap-2 ${
              // Finish is disabled if CPR session is already finished OR no Start CPR record exists yet
              isCprFinished || records.filter(rec => rec.action === 'Start CPR').length === 0
                ? 'bg-red-500 cursor-not-allowed'
                : 'bg-red-700 hover:bg-red-800 hover:scale-105'
            }`}
            onClick={handleFinishCPR}
            disabled={isCprFinished || records.filter(rec => rec.action === 'Start CPR').length === 0}
          >
            <IconCheckFlag /> Finish CPR
          </button>
          <button
            className={`px-6 py-3 text-gray-800 font-semibold rounded-lg shadow-md transition-all duration-200 ease-in-out transform flex items-center justify-center gap-2 ${
              // Disabled if CPR is finished AND algorithm menu is NOT open
              isCprFinished && !showAlgorithmMenu
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-gray-200 hover:bg-gray-300 hover:scale-105'
            }`}
            onClick={toggleAlgorithmMenu}
            disabled={isCprFinished && !showAlgorithmMenu}
          >
            <IconBook /> Algorithm CPR
          </button>
        </div>

        {showAlgorithmMenu && (
          <div className="flex flex-wrap justify-center gap-3 mb-6 p-4 bg-gray-100 rounded-lg shadow-inner">
            <button
              className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 font-medium rounded-lg transition-all duration-200"
              onClick={() => showAlgorithm('Cardiac_Arrest')}
            >
              Cardiac Arrest
            </button>
            <button
              className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 font-medium rounded-lg transition-all duration-200"
              onClick={() => showAlgorithm('Tachycardia_with_Pulse')}
            >
              Tachycardia with Pulse
            </button>
            <button
              className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 font-medium rounded-lg transition-all duration-200"
              onClick={() => showAlgorithm('Bradycardia')}
            >
              Bradycardia
            </button>
            <button
              className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 font-medium rounded-lg transition-all duration-200"
              onClick={() => showAlgorithm('Post_Cardiac_Arrest_Care')}
            >
              Post Cardiac Arrest Care
            </button>
          </div>
        )}

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6 w-full max-w-lg">
          <button
            className={`px-4 py-2 text-pink-800 font-semibold rounded-lg shadow-sm transition-all duration-200 w-full md:w-auto flex items-center justify-center gap-2 ${
              isCprFinished // Disabled only if CPR is finished
                ? 'bg-pink-100 opacity-50 cursor-not-allowed'
                : 'bg-pink-100 hover:bg-pink-200'
            }`}
            onClick={() => recordAdrenaline('1:1,000')}
            disabled={isCprFinished}
          >
            <IconSyringe /> Adrenaline 1:1,000
          </button>

          <div className="text-2xl font-bold text-gray-700 w-24 text-center" id="timer2">
            {adrenalineTimer}
          </div>

          <button
            className={`px-4 py-2 text-pink-800 font-semibold rounded-lg shadow-sm transition-all duration-200 w-full md:w-auto flex items-center justify-center gap-2 ${
              isCprFinished // Disabled only if CPR is finished
                ? 'bg-pink-100 opacity-50 cursor-not-allowed'
                : 'bg-pink-100 hover:bg-pink-200'
            }`}
            onClick={() => recordAdrenaline('1:10,000')}
            disabled={isCprFinished}
          >
            <IconSyringe /> Adrenaline 1:10,000
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button
            className={`w-16 h-8 text-yellow-800 text-sm font-semibold rounded-full shadow-sm transition-all duration-200 flex items-center justify-center gap-1 ${
              isCprFinished // Disabled only if CPR is finished
                ? 'bg-yellow-100 opacity-50 cursor-not-allowed'
                : 'bg-yellow-100 hover:bg-yellow-200'
            }`}
            onClick={() => startAdrenalineTimer(3)}
            disabled={isCprFinished}
          >
            <IconClock /> 3 min
          </button>
          <button
            className={`w-16 h-8 text-yellow-800 text-sm font-semibold rounded-full shadow-sm transition-all duration-200 flex items-center justify-center gap-1 ${
              isCprFinished // Disabled only if CPR is finished
                ? 'bg-yellow-100 opacity-50 cursor-not-allowed'
                : 'bg-yellow-100 hover:bg-yellow-200'
            }`}
            onClick={() => startAdrenalineTimer(4)}
            disabled={isCprFinished}
          >
            <IconClock /> 4 min
          </button>
          <button
            className={`w-16 h-8 text-yellow-800 text-sm font-semibold rounded-full shadow-sm transition-all duration-200 flex items-center justify-center gap-1 ${
              isCprFinished // Disabled only if CPR is finished
                ? 'bg-yellow-100 opacity-50 cursor-not-allowed'
                : 'bg-yellow-100 hover:bg-yellow-200'
            }`}
            onClick={() => startAdrenalineTimer(5)}
            disabled={isCprFinished}
          >
            <IconClock /> 5 min
          </button>
          <button
            className={`w-16 h-8 text-red-800 text-sm font-semibold rounded-full shadow-sm transition-all duration-200 flex items-center justify-center gap-1 ${
              isCprFinished // Disabled only if CPR is finished
                ? 'bg-red-100 opacity-50 cursor-not-allowed'
                : 'bg-red-100 hover:bg-red-200'
            }`}
            onClick={stopAdrenalineTimer}
            disabled={isCprFinished}
          >
            <IconStop /> Stop
          </button>
        </div>

        {/* EKG Buttons instead of dropdown */}
        <div className="relative mb-6 flex flex-wrap justify-center gap-3">
            <span className="font-semibold text-gray-700 mr-2 self-center">EKG:</span>
            <button
                className={`px-4 py-2 text-blue-800 font-semibold rounded-lg shadow-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                  isCprFinished ? 'bg-blue-100 opacity-50 cursor-not-allowed' : 'bg-blue-100 hover:bg-blue-200'
                }`}
                onClick={() => recordEKG('PEA')}
                disabled={isCprFinished}
            >
                <IconHeartbeat /> PEA
            </button>
            <button
                className={`px-4 py-2 text-blue-800 font-semibold rounded-lg shadow-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                  isCprFinished ? 'bg-blue-100 opacity-50 cursor-not-allowed' : 'bg-blue-100 hover:bg-blue-200'
                }`}
                onClick={() => recordEKG('pVT')}
                disabled={isCprFinished}
            >
                <IconHeartbeat /> pVT
            </button>
            <button
                className={`px-4 py-2 text-blue-800 font-semibold rounded-lg shadow-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                  isCprFinished ? 'bg-blue-100 opacity-50 cursor-not-allowed' : 'bg-blue-100 hover:bg-blue-200'
                }`}
                onClick={() => recordEKG('VF')}
                disabled={isCprFinished}
            >
                <IconHeartbeat /> VF
            </button>
        </div>


        <div className="flex flex-wrap justify-center gap-3 mb-6">
          <button
            className={`px-5 py-2 text-purple-800 font-semibold rounded-lg shadow-sm transition-all duration-200 transform flex items-center justify-center gap-2 ${
              isCprFinished // Disabled only if CPR is finished
                ? 'bg-purple-100 opacity-50 cursor-not-allowed'
                : 'bg-purple-100 hover:bg-purple-200 hover:scale-105'
            }`}
            onClick={() => handleShowEnergyOptions('Defibrillation')}
            disabled={isCprFinished}
          >
            <IconLightning /> Defibrillation
          </button>
          <button
            className={`px-5 py-2 text-blue-800 font-semibold rounded-lg shadow-sm transition-all duration-200 transform flex items-center justify-center gap-2 ${
              isCprFinished // Disabled only if CPR is finished
                ? 'bg-blue-100 opacity-50 cursor-not-allowed'
                : 'bg-blue-100 hover:bg-blue-200 hover:scale-105'
            }`}
            onClick={() => handleShowEnergyOptions('Synchronize Cardioversion')}
            disabled={isCprFinished}
          >
            <IconLightning /> Synchronize Cardioversion
          </button>
        </div>

        {showEnergyOptions && (
          <div className="flex flex-wrap justify-center gap-2 mb-6 p-4 bg-gray-100 rounded-lg shadow-inner">
            {energyType === 'Defibrillation' && (
              <>
                <button className="px-4 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-800 text-sm font-medium rounded-lg transition-all duration-200" onClick={() => recordEnergyDelivery('Defibrillation', 100)}>100 J</button>
                <button className="px-4 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-800 text-sm font-medium rounded-lg transition-all duration-200" onClick={() => recordEnergyDelivery('Defibrillation', 150)}>150 J</button>
                <button className="px-4 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-800 text-sm font-medium rounded-lg transition-all duration-200" onClick={() => recordEnergyDelivery('Defibrillation', 200)}>200 J</button>
              </>
            )}
            {energyType === 'Synchronize Cardioversion' && (
              <>
                <button className="px-4 py-2 bg-cyan-100 hover:bg-cyan-200 text-cyan-800 text-sm font-medium rounded-lg transition-all duration-200" onClick={() => recordEnergyDelivery('Synchronize Cardioversion', 50)}>50 J</button>
                <button className="px-4 py-2 bg-cyan-100 hover:bg-cyan-200 text-cyan-800 text-sm font-medium rounded-lg transition-all duration-200" onClick={() => recordEnergyDelivery('Synchronize Cardioversion', 100)}>100 J</button>
                <button className="px-4 py-2 bg-cyan-100 hover:bg-cyan-200 text-cyan-800 text-sm font-medium rounded-lg transition-all duration-200" onClick={() => recordEnergyDelivery('Synchronize Cardioversion', 150)}>150 J</button>
                <button className="px-4 py-2 bg-cyan-100 hover:bg-cyan-200 text-cyan-800 text-sm font-medium rounded-lg transition-all duration-200" onClick={() => recordEnergyDelivery('Synchronize Cardioversion', 200)}>200 J</button>
              </>
            )}
          </div>
        )}

        <div className="flex flex-col items-center mb-8 w-full max-w-md">
          <button className="px-5 py-2 bg-indigo-100 text-indigo-800 font-semibold rounded-lg shadow-sm mb-2 w-full flex items-center justify-center gap-2">
            <IconPill /> Other Medication
          </button>
          <select
            id="otherMedicationDropdown"
            className={`border border-gray-300 rounded-lg p-2 text-base shadow-sm transition-all duration-200 w-full ${
              isCprFinished // Disabled only if CPR is finished
                ? 'bg-gray-100 opacity-50 cursor-not-allowed'
                : 'focus:ring-blue-500 focus:border-blue-500'
            }`}
            onChange={recordSelectedMedication}
            defaultValue=""
            disabled={isCprFinished}
          >
            <option value="" disabled>Select Medication</option>
            <option value="Atropine">Atropine</option>
            <option value="Adenosine 6 mg">Adenosine 6 mg</option>
            <option value="Adenosine 12 mg">Adenosine 12 mg </option>
            <option value="Cordarone">Cordarone</option>
            <option value="MgSO4">MgSO4</option>
            <option value="NaHCO3">NaHCO3</option>
            <option value="Amiodarone 150 mg IV">Amiodarone 150 mg IV</option>
            <option value="Amiodarone 300 mg IV">Amiodarone 300 mg IV</option>
            <option value="10% Calcium gluconate 10 ml IV">10% Calcium gluconate 10 ml IV</option>
            <option value="7.5% NaHCO3 1 amp IV">7.5% NaHCO3 1 amp IV</option>
            <option value="7.5% NaHCO3 2 amp IV">7.5% NaHCO3 2 amp IV</option>
            <option value="Lidocaine 1 mg IV">Lidocaine 1 mg IV</option>
            <option value="Lidocaine 1.5 mg IV">Lidocaine 1.5 mg IV</option>
            <option value="50% MgSO4 1 ml IV">50% MgSO4 1 ml IV</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <button
            className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-md transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2"
            onClick={handlePrintAndBackup}
          >
            <IconPrinter /> Print Record
          </button>
          <button
            className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-md transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2"
            onClick={resetCPR}
          >
            <IconRefresh /> Reset CPR
          </button>
          <button
            className={`px-6 py-3 text-green-800 font-semibold rounded-lg shadow-md transition-all duration-200 transform flex items-center justify-center gap-2 ${
              isCprFinished // Disabled only if CPR is finished
                ? 'bg-green-100 opacity-50 cursor-not-allowed'
                : 'bg-green-100 hover:bg-green-200 hover:scale-105'
            }`}
            onClick={recordROSC}
            disabled={isCprFinished}
          >
            <IconHeartbeat /> ROSC
          </button>
        </div>

        <div className="w-full bg-white bg-opacity-90 rounded-lg shadow-lg p-6 overflow-x-auto">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 text-center">Real-Time CPR Log</h2>
          {/* Added a container for table with overflow-y to enable scrolling */}
          <div className="max-h-96 overflow-y-auto" ref={tableBodyRef}>
            <table className="min-w-full divide-y divide-gray-200" id="realTimeTable">
              {/* Compacted thead for strict DOM nesting */}
              <thead className="bg-blue-600 sticky top-0"><tr><th className="px-4 py-2 text-left text-xs font-medium text-white uppercase tracking-wider rounded-tl-lg">CPR Time</th><th className="px-4 py-2 text-left text-xs font-medium text-white uppercase tracking-wider">Clock Time</th><th className="px-4 py-2 text-left text-xs font-medium text-white uppercase tracking-wider">Action</th><th className="px-4 py-2 text-left text-xs font-medium text-white uppercase tracking-wider">Note</th><th className="px-4 py-2 text-left text-xs font-medium text-white uppercase tracking-wider rounded-tr-lg">Delete</th></tr></thead>
              <tbody>
                {(records || []).map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{record.cprTime}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{record.clockTime}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{record.action}</td>
                    <td className="px-4 py-2 text-sm text-gray-700 max-w-xs overflow-hidden text-ellipsis">{record.note}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                      {/* Conditionally render delete button based on action type */}
                      {record.action !== 'Start CPR' && record.action !== 'Stop CPR' && record.action !== 'Finish CPR' && record.action !== 'ROSC' && (
                        <button
                          onClick={() => handleDeleteRecord(record.id)}
                          className="px-3 py-1 bg-red-400 hover:bg-red-500 text-white rounded-md text-xs font-semibold flex items-center justify-center gap-1"
                        >
                          <IconTrash /> Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div> {/* End of max-h-96 overflow-y-auto container */}
          {records.length === 0 && (
            <p className="text-center text-gray-500 mt-4">No records yet. Start CPR to begin logging!</p>
          )}
          {totalCprDuration && (
            <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-400 text-blue-800 rounded-lg shadow-md">
              <p className="text-lg font-semibold text-center">Total CPR Duration: {totalCprDuration}</p>
            </div>
          )}
        </div>

        {/* Historical Records Section */}
        <div className="w-full bg-white bg-opacity-90 rounded-lg shadow-lg p-6 mt-10">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 text-center">Historical Records (บันทึกย้อนหลัง)</h2>
            {historicalRecords.length === 0 ? (
                <p className="text-center text-gray-500">No historical records saved yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">Name</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">Date & Time</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">Total Duration</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {historicalRecords.map(backup => (
                                <tr key={backup.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{backup.name}</td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                                        {new Date(backup.timestamp).toLocaleString('th-TH', {
                                            year: 'numeric', month: 'short', day: 'numeric',
                                            hour: '2-digit', minute: '2-digit', second: '2-digit'
                                        })}
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{backup.totalDuration}</td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700 flex flex-wrap gap-2"> {/* Added flex and gap */}
                                        <button
                                            onClick={() => handleViewHistoricalRecord(backup)}
                                            className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-xs font-semibold flex items-center justify-center gap-1"
                                        >
                                            <IconEye /> ดู
                                        </button>
                                        <button
                                            onClick={() => handlePrintHistoricalRecord(backup)}
                                            className="px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded-md text-xs font-semibold flex items-center justify-center gap-1"
                                        >
                                            <IconPrinter /> พิมพ์
                                        </button>
                                        <button
                                            onClick={() => handleDeleteHistoricalRecord(backup.id)}
                                            className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md text-xs font-semibold flex items-center justify-center gap-1"
                                        >
                                            <IconTrash /> ลบ
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div> {/* End of Historical Records Section */}


      </div>

      {/* Custom Modal Render */}
      <CustomModal
        isOpen={isModalOpen}
        onClose={closeCustomModal}
        title={modalTitle}
        showConfirmButton={modalShowConfirm}
        confirmText={modalConfirmText}
        onConfirm={() => {
          modalConfirmCallback.current();
          // For simple confirmations, close it here if the callback doesn't handle it.
          // This ensures modals from input prompts stay open until valid input.
          if (modalConfirmText === 'OK' || modalConfirmText === 'Got it!' || modalConfirmText === 'Delete' || modalConfirmText === 'Print') {
            closeCustomModal();
          }
        }}
        showCancelButton={modalShowCancel}
        onCancel={() => {
            modalCancelCallback.current();
            closeCustomModal();
        }}
      >
        {modalContent}
      </CustomModal>

      {/* Image Modal Render */}
      <ImageModal
        isOpen={isImageModalOpen}
        onClose={closeImageModal}
        imageUrl={currentImageModalUrl}
        title={currentImageModalTitle}
      />

      {/* Top Alert Render */}
      <TopAlert message={topAlert.message} type={topAlert.type} onClose={() => setTopAlert({ message: null, type: 'info' })} />
    </div>
  );
};

export default App;
