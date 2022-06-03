import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

interface Props {
  type: 'success' | 'danger' | 'info' | 'default' | 'warning';
  isVibile: boolean;
  message: string;
  autoHide: boolean;
  closable: true;
  show?: boolean;
  LeftIcon?: () => JSX.Element;
}
enum COLORS {
  success = 'green',
  danger = 'red',
  info = 'blue',
  default = 'zinc',
  warning = 'orange',
}

function Alert({ show = true, type, message, autoHide, closable, LeftIcon }: Props) {
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    if (autoHide) {
      const timer = setTimeout(() => setIsVisible(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, autoHide]);

  if (!isVisible) return null;

  return (
    <>
      <div
        id="alert-1"
        className={clsx(
          'flex p-4 mb-4 rounded-md mx-10',
          `bg-${COLORS[type]}-400 dark:bg-${COLORS[type]}-400`
        )}
        role="alert"
      >
        {!!LeftIcon && <LeftIcon />}
        <div className={clsx('ml-3 text-sm font-medium', `text-${COLORS[type]}-100`)}>
          {message}
        </div>
        {closable && (
          <button
            type="button"
            className="ml-auto -mx-1.5 -my-1.5 bg-indigo-100 text-indigo-500 rounded-lg focus:ring-2 focus:ring-indigo-400 p-1.5 hover:bg-indigo-200 inline-flex h-8 w-8 dark:bg-indigo-200 dark:text-indigo-600 dark:hover:bg-indigo-300"
            data-dismiss-target="#alert-1"
            aria-label="Close"
            onClick={() => setIsVisible(false)}
          >
            <span className="sr-only">Close</span>
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        )}
      </div>
    </>
  );
}

export default Alert;
