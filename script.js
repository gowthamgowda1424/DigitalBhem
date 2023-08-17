const form = document.getElementById('registrationForm');
form.addEventListener('submit', calculateCosts);

function calculateCosts(event) {
  event.preventDefault();

  const totalDays = parseInt(document.getElementById('totalDays').value);
  const totalPersons = parseInt(document.getElementById('totalPersons').value);
  const roomType = document.getElementById('roomType').value;
  const amenities = Array.from(document.getElementsByName('amenities'))
    .filter(input => input.checked)
    .map(input => input.value);
  const advancePayment = parseInt(document.getElementById('advancePayment').value);
  const roomRate = getRoomRate(roomType);
  const roomCost = roomRate * totalDays;

  // Now Calculate total cost for amenities
  const amenitiesRate = getAmenitiesRate(amenities);
  const amenitiesCost = amenitiesRate * totalDays;

  // Here we Calculate extra persons cost
  const extraPersonsCost = calculateExtraPersonsCost(totalPersons);

  // here Calculate balance amount
  const totalAmount = roomCost + amenitiesCost + extraPersonsCost;
  const balanceAmount = totalAmount - advancePayment;

  document.getElementById('totalAmount').textContent = totalAmount;
  document.getElementById('roomCost').textContent = roomCost;
  document.getElementById('amenitiesCost').textContent = amenitiesCost;
  document.getElementById('extraPersonsCost').textContent = extraPersonsCost;
  document.getElementById('balanceAmount').textContent = balanceAmount;
}

function getRoomRate(roomType) {
  switch (roomType) {
    case 'delux':
      return 2500;
    case 'suite':
      return 4000;
    default:
      return 0;
  }
}

function getAmenitiesRate(amenities) {
  let rate = 0;
  for (const amenity of amenities) {
    switch (amenity) {
      case 'AC':
        rate += 1000;
        break;
      case 'Locker':
        rate += 300;
        break;
      default:
        break;
    }
  }
  return rate;
}

function calculateExtraPersonsCost(totalPersons) {
  if (totalPersons <= 2) {
    return 0;
  } else {
    const extraPersons = totalPersons - 2;
    return extraPersons * 1000;
  }
}

