interface StatusBadgeProps {
  status: "Confirmed" | "Pending" | "Cancelled" | "Completed" | "Ongoing";
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const styles = {
    Confirmed: "bg-green-100 text-green-700 border-green-200",
    Pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
    Cancelled: "bg-red-100 text-red-700 border-red-200",
    Completed: "bg-blue-100 text-blue-700 border-blue-200",
    Ongoing: "bg-purple-100 text-purple-700 border-purple-200"
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${styles[status]}`}>
      {status}
    </span>
  );
}
