function generateLoanId(id) {

  const year = new Date().getFullYear();

  return `LN-${year}-${String(id).padStart(5, "0")}`;

}

module.exports = generateLoanId;