import { useState } from 'react';

export default function useModal(defaultValue) {
  const [isOpen, setIsOpen] = useState(defaultValue || false);

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false);

  return [isOpen, open, close];
}
