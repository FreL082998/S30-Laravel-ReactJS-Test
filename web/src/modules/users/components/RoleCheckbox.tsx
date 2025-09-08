import React from 'react';

interface Props {
  role: string;
  checked: boolean;
  onToggle: (role: string) => void;
}

const RoleCheckbox: React.FC<Props> = ({ role, checked, onToggle }) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={() => onToggle(role)}
        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
      />
      <span>{role}</span>
    </label>
  );
};

export default RoleCheckbox;
