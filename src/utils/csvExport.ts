interface Transaction {
  id: string;
  customer: string;
  amount: string;
  liters: string;
  status: string;
  date: string;
  paymentMethod: string;
}

export const exportToCSV = (data: Transaction[], filename: string = 'transactions') => {
  // Define CSV headers
  const headers = ['Transaction ID', 'Customer', 'Amount', 'Liters', 'Status', 'Date', 'Payment Method'];
  
  // Convert data to CSV format
  const csvContent = [
    headers.join(','),
    ...data.map(transaction => [
      transaction.id,
      `"${transaction.customer}"`, // Quote customer names to handle commas
      transaction.amount.replace('KSh ', ''),
      transaction.liters.replace('L', ''),
      transaction.status,
      transaction.date,
      transaction.paymentMethod
    ].join(','))
  ].join('\n');

  // Create and download the file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};