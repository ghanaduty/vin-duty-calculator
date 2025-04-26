{\rtf1\ansi\ansicpg1252\cocoartf2821
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 function decodeVIN() \{\
    const vin = document.getElementById('vin').value.trim();\
\
    if (vin.length < 10) \{\
        alert("Please enter a valid VIN number.");\
        return;\
    \}\
\
    // Mock decode: basic lookup based on VIN (for now)\
    const makeModelYear = guessVehicleFromVIN(vin);\
    \
    document.getElementById('make').textContent = makeModelYear.make;\
    document.getElementById('model').textContent = makeModelYear.model;\
    document.getElementById('year').textContent = makeModelYear.year;\
    document.getElementById('msrp').value = makeModelYear.msrp;\
\
    document.getElementById('vehicle-info').style.display = 'block';\
\}\
\
function guessVehicleFromVIN(vin) \{\
    // Simple example guess (you can connect a real API later)\
    let year = 2021;\
    if (vin[9] === "M") year = 2021;\
    if (vin[9] === "L") year = 2020;\
    if (vin[9] === "K") year = 2019;\
\
    // Dummy make/model\
    let make = "Toyota";\
    let model = "Camry";\
\
    if (vin.startsWith("1N4")) \{\
        make = "Nissan";\
        model = "Altima";\
    \} else if (vin.startsWith("5YJ")) \{\
        make = "Tesla";\
        model = "Model 3";\
    \} else if (vin.startsWith("3FA")) \{\
        make = "Ford";\
        model = "Fusion";\
    \}\
\
    let msrp = 30000;\
    if (model === "Model 3") msrp = 40000;\
    if (model === "Altima") msrp = 27000;\
\
    return \{ make, model, year, msrp \};\
\}\
\
function calculateDuty() \{\
    const msrp = parseFloat(document.getElementById('msrp').value);\
    if (isNaN(msrp) || msrp <= 0) \{\
        alert("Please enter a valid MSRP amount.");\
        return;\
    \}\
\
    const exchangeRate = 15.4677; // as of 2024\
    const baseAmount = msrp * exchangeRate;\
\
    const duties = [\
        \{ code: "01", desc: "Import Duty", rate: 20 \},\
        \{ code: "02", desc: "Import VAT", rate: 15 \},\
        \{ code: "05", desc: "Processing Fee", rate: 0 \},\
        \{ code: "06", desc: "ECOWAS Levy", rate: 0.5 \},\
        \{ code: "16", desc: "Vehicle Certification", rate: 100 \},\
        \{ code: "31", desc: "Vehicle Examination Fee", rate: 1 \},\
        \{ code: "32", desc: "Network Charge", rate: 0.4 \},\
        \{ code: "33", desc: "Network Charge VAT", rate: 15 \},\
        \{ code: "39", desc: "Network Charge COVID-19 Health", rate\
}