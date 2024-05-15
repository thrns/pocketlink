import { Trash2, MapPin, Star, Check } from 'lucide-react';

const AddressCard = ({ address, isSelected, onSelect, onDelete }) => {
  const handleClick = () => {
    if (onSelect) {
      onSelect(address);
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(address.id);
    }
  };

  return (
    <div
      className={`relative cursor-pointer rounded-md border p-3 transition-all ${
        isSelected
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-200 border-gray-300'
      } `}
      onClick={handleClick}
      role="button"
      aria-pressed={isSelected}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
          e.preventDefault();
        }
      }}
    >
      <div className="flex items-start gap-2">
        {/* Selection indicator */}
        <div className="mt-0.5 flex-shrink-0">
          <div
            className={`flex h-4 w-4 items-center justify-center rounded-full border ${
              isSelected
                ? 'border-blue-500 bg-blue-500 text-white'
                : 'border-gray-300'
            }`}
          >
            {isSelected && <Check className="h-2 w-2" />}
          </div>
        </div>

        <div className="flex-grow">
          <div className="flex items-center text-sm">
            <div className="font-medium">{address.name}</div>
            {address.isDefault && (
              <div className="ml-1 flex items-center">
                <Star className="h-3 w-3 fill-blue-500 text-blue-500" />
              </div>
            )}
          </div>

          <div className="mt-0.5 text-xs text-gray-600">
            {address.line1}
            {address.line2 && <span>, {address.line2}</span>}
          </div>
          <div className="text-xs text-gray-600">
            {address.city}, {address.state} {address.postalCode}
          </div>
          <div className="text-xs text-gray-600">{address.phone}</div>
        </div>

        <button
          onClick={handleDelete}
          className="p-1 text-gray-400 text-red-500 transition-colors"
          title="Delete address"
          aria-label="Delete address"
        >
          <Trash2 className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
};

export default AddressCard;
