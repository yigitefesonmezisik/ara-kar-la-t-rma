const cars = [
  {
    name: 'VW Golf',
    price: 1500000,
    features: 'eTSI Mild Hybrid, 10.3" Bilgi ve Eğlence Sistemi',
    image: 'https://cdn.motor1.com/images/mgl/3WvOWL/s1/volkswagen-golf-2024-restyling---foto.jpg',
  },
  {
    name: 'Toyota Corolla',
    price: 1100000,
    features: 'Adaptif Cruise Control, Hybrid Motor',
    image: 'https://ares.shiftdelete.net/2023/02/2023-Toyota-Corolla.jpg',
  },
  {
    name: 'Mercedes A-Serisi',
    price: 1700000,
    features: 'LED Farlar, Panoramik Cam Tavan',
    image: 'https://www.log.com.tr/wp-content/uploads/2019/03/Mercedes-Benz-A-Serisi.jpg',
  },
  {
    name: 'BMW 3 Serisi',
    price: 2400000,
    features: 'iDrive 8 Sistemi, Akıllı Sürüş Yardımcıları',
    image: 'https://cdn.motor1.com/images/mgl/P33J9G/s3/2022-bmw-3er-limousine.jpg',
  },
  {
    name: 'Audi A3',
    price: 1600000,
    features: 'Quattro Çekiş Sistemi, Sanal Kokpit',
    image: 'https://cdn.motor1.com/images/mgl/AebbV/s1/audi-a3-sportback-45-tfsi-e-2021.jpg',
  },
];

const carList = document.getElementById('carList');
const searchInput = document.getElementById('search');
const priceFilter = document.getElementById('priceFilter');
const compareButton = document.getElementById('compareButton');
const comparisonResult = document.getElementById('comparisonResult');
let selectedCars = [];

// Araçları listeleme
function displayCars(cars) {
  carList.innerHTML = '';
  cars.forEach((car) => {
    const carElement = document.createElement('div');
    carElement.classList.add('car');
    carElement.innerHTML = `
      <h3>${car.name}</h3>
      <p>Fiyat: ${car.price} TL</p>
      <p>Özellikler: ${car.features}</p>
      <img src="${car.image}" alt="${car.name}">
      <button onclick="selectCar('${car.name}')">Seç</button>
    `;
    carList.appendChild(carElement);
  });
}

// Araç seçme
function selectCar(carName) {
  const car = cars.find((c) => c.name === carName);
  if (selectedCars.includes(car)) {
    selectedCars = selectedCars.filter((c) => c !== car);
  } else {
    selectedCars.push(car);
  }
  console.log('Seçili Araçlar:', selectedCars);
}

// Karşılaştırma
compareButton.addEventListener('click', () => {
  if (selectedCars.length < 2) {
    comparisonResult.innerHTML = 'Lütfen en az iki araç seçin!';
    return;
  }

  let comparisonHTML = '<table><tr><th>Araç</th><th>Fiyat</th><th>Özellikler</th></tr>';
  selectedCars.forEach((car) => {
    comparisonHTML += `
      <tr>
        <td>${car.name}</td>
        <td>${car.price} TL</td>
        <td>${car.features}</td>
      </tr>
    `;
  });
  comparisonHTML += '</table>';
  comparisonResult.innerHTML = comparisonHTML;
});

// Fiyat filtreleme ve arama
searchInput.addEventListener('input', (e) => {
  const searchText = e.target.value.toLowerCase();
  const filteredCars = cars.filter((car) =>
    car.name.toLowerCase().includes(searchText)
  );
  displayCars(filteredCars);
});

priceFilter.addEventListener('change', (e) => {
  const value = e.target.value;
  let sortedCars = [...cars];
  if (value === 'low') {
    sortedCars.sort((a, b) => a.price - b.price);
  } else if (value === 'high') {
    sortedCars.sort((a, b) => b.price - a.price);
  }
  displayCars(sortedCars);
});

// Başlangıç
displayCars(cars);
