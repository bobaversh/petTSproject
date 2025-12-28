import type { useStateFn } from "./calendar.types";

export interface SideBarProps {
    isOpen: boolean;
    setIsOpen: useStateFn<boolean>;
  }
  