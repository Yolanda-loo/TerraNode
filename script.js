/**
 * TerraNode Logic
 * Handles API integration, UI rendering, and filtering.
 */

const countryGrid = document.getElementById('country-grid');
const skeletonGrid = document.getElementById('skeleton-grid');
const searchInput = document.getElementById('search-input');
const regionFilter = document.getElementById('region-filter');
const themeToggle = document.getElementById('theme-toggle');
const errorMsg = document.getElementById('error-msg');

let allCountries = []; // Global state to avoid multiple API calls

// 1. Initial Data Fetch
async function fetchCountries() {
    try {
        toggleLoading(true);
        const response = await fetch('https://restcountries.com/v3.1/all');
        
        if (!response.ok) throw new Error('Failed to fetch data');
        
        const data = await response.json();
        // Sort alphabetically by name
        allCountries = data.sort((a, b) => a.name.common.localeCompare(b.name.common));
        
        renderCountries(allCountries);
    } catch (error) {
        console.error("API Error:", error);
        showError();
    } finally {
        toggleLoading(false);
    }
}

// 2. Render UI
function renderCountries(countries) {
    countryGrid.innerHTML = '';
    errorMsg.classList.add('hidden');

    if (countries.length === 0) {
        errorMsg.classList.remove('hidden');
        return;
    }

    countries.forEach(country => {
        const card = document.createElement('div');
        card.className = 'country-card bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer';
        
        card.innerHTML = `
            <img src="${country.flags.svg}" alt="${country.name.common}" class="w-full h-40 object-cover border-b dark:border-gray-700">
            <div class="p-5">
                <h3 class="font-bold text-lg mb-3">${country.name.common}</h3>
                <p class="text-sm"><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                <p class="text-sm"><strong>Region:</strong> ${country.region}</p>
                <p class="text-sm"><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
            </div>
        `;
        
        countryGrid.appendChild(card);
    });
}

// 3. Search & Filter Logic
function handleFilters() {
    const searchTerm = searchInput.value.toLowerCase();
    const regionTerm = regionFilter.value.toLowerCase();

    const filtered = allCountries.filter(country => {
        const matchesSearch = country.name.common.toLowerCase().includes(searchTerm);
        const matchesRegion = regionTerm === "" || country.region.toLowerCase() === regionTerm;
        return matchesSearch && matchesRegion;
    });

    renderCountries(filtered);
}

// 4. Utility Functions
function toggleLoading(isLoading) {
    if (isLoading) {
        skeletonGrid.classList.remove('hidden');
        countryGrid.classList.add('hidden');
    } else {
        skeletonGrid.classList.add('hidden');
        countryGrid.classList.remove('hidden');
    }
}

function showError() {
    countryGrid.innerHTML = '';
    errorMsg.classList.remove('hidden');
}

// 5. Dark Mode Logic
themeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    document.getElementById('theme-icon').innerText = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// 6. Event Listeners
searchInput.addEventListener('input', handleFilters);
regionFilter.addEventListener('change', handleFilters);

// Check for saved theme
if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.classList.add('dark');
    document.getElementById('theme-icon').innerText = '☀️';
}

// Initialize
fetchCountries();