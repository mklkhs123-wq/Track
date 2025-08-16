function calculateLoanEMI() {
    let productPrice = parseFloat(document.getElementById("productPrice").value) || 0;
    let marginMoney = parseFloat(document.getElementById("marginMoney").value) || 0;
    let annualRate = parseFloat(document.getElementById("interestRate").value) || 0;
    let years = parseInt(document.getElementById("loanYears").value) || 0;

    // Extra Charges
    let processingFee = parseFloat(document.getElementById("processingFee").value) || 0;
    let stampCharges = parseFloat(document.getElementById("stampCharges").value) || 0;
    let extraCharges = parseFloat(document.getElementById("extraCharges").value) || 0;
    let ownerCharges = parseFloat(document.getElementById("ownerCharges").value) || 0;

    // Step 1: Finance amount (after margin money)
    let financeAmount = productPrice - marginMoney;

    // Step 2: Add all charges
    let totalOtherCharges = processingFee + stampCharges + extraCharges + ownerCharges;

    // Final principal for EMI
    let principal = financeAmount + totalOtherCharges;

    // Step 3: Interest calculation
    let monthlyRate = annualRate / 12 / 100;
    let months = years * 12;

    let emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
              (Math.pow(1 + monthlyRate, months) - 1);

    // Totals
    let totalPayment = emi * months;
    let totalInterest = totalPayment - principal;

    // Show results
    document.getElementById("emiResult").innerHTML = `
        <p><b>Product Price:</b> ₹${productPrice.toFixed(2)}</p>
        <p><b>Margin Money:</b> ₹${marginMoney.toFixed(2)}</p>
        <p><b>Finance Amount:</b> ₹${financeAmount.toFixed(2)}</p>
        <p><b>Other Charges:</b> ₹${totalOtherCharges.toFixed(2)}</p>
        <p><b>Total Loan Amount (Finance + Charges):</b> ₹${principal.toFixed(2)}</p>
        <p><b>EMI:</b> ₹${emi.toFixed(2)}</p>
        <p><b>Total Interest:</b> ₹${totalInterest.toFixed(2)}</p>
        <p><b>Total Payment:</b> ₹${totalPayment.toFixed(2)}</p>
        <p><b>Tenure:</b> ${months} months</p>
    `;

    // Breakdown Table
    let table = `
        <table>
            <tr>
                <th>Month</th>
                <th>EMI</th>
                <th>Interest</th>
                <th>Principal</th>
                <th>Balance</th>
            </tr>
    `;
    let balance = principal;
    for (let m = 1; m <= months; m++) {
        let interestComp = balance * monthlyRate;
        let principalComp = emi - interestComp;
        balance -= principalComp;

        table += `
            <tr>
                <td>${m}</td>
                <td>₹${emi.toFixed(2)}</td>
                <td>₹${interestComp.toFixed(2)}</td>
                <td>₹${principalComp.toFixed(2)}</td>
                <td>₹${balance > 0 ? balance.toFixed(2) : "0.00"}</td>
            </tr>
        `;
    }
    table += "</table>";
    document.getElementById("breakdownTable").innerHTML = table;
}