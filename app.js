function decodeVIN() {
  const vin = document.getElementById('vin').value.trim();

  if (vin.length < 10) {
    alert("Please enter a valid VIN number.");
    return;
  }

  const makeModelYear = guessVehicleFromVIN(vin);

  document.getElementById('make').textContent = makeModelYear.make;
  document.getElementById('model').textContent = makeModelYear.model;
  document.getElementById('year').textContent = makeModelYear.year;
  document.getElementById('msrp').value = makeModelYear.msrp;

  document.getElementById('vehicle-info').style.display = 'block';
}

function guessVehicleFromVIN(vin) {
  let year = 2021;
  if (vin[9] === "M") year = 2021;
  if (vin[9] === "L") year = 2020;
  if (vin[9] === "K") year = 2019;

  let make = "Toyota";
  let model = "Camry";

  if (vin.startsWith("1N4")) {
    make = "Nissan";
    model = "Altima";
  } else if (vin.startsWith("5YJ")) {
    make = "Tesla";
    model = "Model 3";
  } else if (vin.startsWith("3FA")) {
    make = "Ford";
    model = "Fusion";
  }

  let msrp = 30000;
  if (model === "Model 3") msrp = 40000;
  if (model === "Altima") msrp = 27000;

  return { make, model, year, msrp };
}

function calculateDuty() {
  const msrp = parseFloat(document.getElementById('msrp').value);
  if (isNaN(msrp) || msrp <= 0) {
    alert("Please enter a valid MSRP amount.");
    return;
  }

  const exchangeRate = 15.4677; // As of 2024
  const baseAmount = msrp * exchangeRate;

  const duties = [
    { code: "01", desc: "Import Duty", rate: 20 },
    { code: "02", desc: "Import VAT", rate: 15 },
    { code: "05", desc: "Processing Fee", rate: 0 },
    { code: "06", desc: "ECOWAS Levy", rate: 0.5 },
    { code: "16", desc: "Vehicle Certification", rate: 0.5 },
    { code: "31", desc: "Vehicle Examination Fee", rate: 1 },
    { code: "32", desc: "Network Charge", rate: 0.4 },
    { code: "33", desc: "Network Charge VAT", rate: 15 },
    { code: "39", desc: "Network Charge COVID-19 Health", rate: 1 },
    { code: "45", desc: "Ghana Shippers Authority SNF Fee", rate: 1 },
    { code: "48", desc: "Import NHIL", rate: 2.5 },
    { code: "49", desc: "Import NHIL 2", rate: 2.5 },
    { code: "56", desc: "Network Charge NHIL", rate: 0 },
    { code: "72", desc: "Overage Penalty", rate: 0 },
    { code: "78", desc: "IRS Tax Deposit", rate: 100 },
    { code: "87", desc: "GHS Disinfection Fee", rate: 100 },
    { code: "99", desc: "COVID-19 Health Recovery Levy", rate: 1 }
  ];

  let output = "";
  let total = 0;

  duties.forEach(duty => {
    const payable = (baseAmount * (duty.rate / 100));
    total += payable;
    output += `<p><strong>${duty.code}</strong> ${duty.desc} (${duty.rate}%): GHS ${payable.toFixed(2)}</p>`;
  });

  output += `<hr><h3>Total Payable: GHS ${total.toFixed(2)}</h3>`;

  document.getElementById('breakdown').innerHTML = output;
  document.getElementById('results').style.display = 'block';
}
