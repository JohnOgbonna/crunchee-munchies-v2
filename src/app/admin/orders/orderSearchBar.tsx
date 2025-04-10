
type OrderSearchBarProps = {
    searchTerm: string;
    onSearchChange: (term: string) => void;
  };
  
  const OrderSearchBar: React.FC<OrderSearchBarProps> = ({ searchTerm, onSearchChange }) => (
    <input
      type="text"
      placeholder="Search by name, email, or order ID..."
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      className="w-full max-w-sm px-4 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm"
    />
  );
  
  export default OrderSearchBar;