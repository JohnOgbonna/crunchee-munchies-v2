import React from "react";

interface SubsectionsProps {
  sectionKey: string;
  subsections: NavSubsections;
  isExpanded?: boolean;
  isHovered?: boolean;
  onClose?: () => void;
}
type NavSubsections = Record<string, Record<string, { link: string }>>;

export const MobileSubsections: React.FC<SubsectionsProps> = ({
  sectionKey,
  subsections,
  isExpanded,
  onClose,
}) => {
  return (
    <ul
      className={`md:hidden overflow-hidden transition-max-height duration-500 ease-in-out ${
        isExpanded ? "max-h-96" : "max-h-0"
      }`}
    >
      {Object.entries(subsections).map(([subKey, subValue]) => (
        <li key={subKey} className="pl-4 py-1 text-sm text-gray-700">
          <a href={`/${subValue.link}`} onClick={onClose}>
            {subKey.replace(/_/g, " ")}
          </a>
        </li>
      ))}
    </ul>
  );
};

export const DesktopSubsections: React.FC<SubsectionsProps> = ({
  subsections,
  isHovered,
}) => {
  return (
    Object.keys(subsections).length > 0 &&
    <ul
      className={`hidden md:block absolute left-0 top-full bg-orange-200 shadow-lg rounded-md p-2 transition-all duration-300 ease-in-out ${
        isHovered
          ? "opacity-100 visible scale-100 max-h-[400px]"
          : "opacity-0 invisible scale-95 max-h-0 p-0"
      }`}
    >
      {Object.entries(subsections).map(([subKey, subValue]) => (
        <li
          key={subKey}
          className="py-1 px-3 text-sm text-gray-700 hover:bg-orange-300 rounded-md"
        >
          <a href={`/${subValue.link}`}>{subKey.replace(/_/g, " ")}</a>
        </li>
      ))}
    </ul>
  );
};
