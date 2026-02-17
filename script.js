/**
 * TerraNode v2.5 - Professional Implementation
 */

const countryGrid = document.getElementById('country-grid');
const skeletonGrid = document.getElementById('skeleton-grid');
const searchInput = document.getElementById('search-input');
const regionFilter = document.getElementById('region-filter');
const favCountEl = document.getElementById('fav-count');
const showFavsBtn = document.getElementById('show-favorites');
const themeToggle = document.getElementById('theme-toggle');

// State
let allCountries = [];
let favorites = JSON.parse(localStorage.getItem('terra_favs')) || [];
let showingOnlyFavs = false;

// 1. Initial Data Fetch
async function init() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,cca3');
        if (!response.ok) throw new Error('Failed to reach API');
        
        const data = await response.json();
        allCountries = data.sort((a, b) => a.name.common.localeCompare(b.name.common));
        
        updateFavUI();
        renderCountries(allCountries);
        toggleLoading(false);
    } catch (err) {
        console.error(err);
        document.getElementById('error-msg').classList.remove('hidden');
        toggleLoading(false);
    }
}

// 2. Optimized Render
function renderCountries(countries) {
    countryGrid.innerHTML = '';
    const errorMsg = document.getElementById('error-msg');
    
    if (countries.length === 0) {
        errorMsg.classList.remove('hidden');
        return;
    }
    
    errorMsg.classList.add('hidden');
    const fragment = document.createDocumentFragment();

    countries.forEach(country => {
        const isFav = favorites.includes(country.cca3);
        const card = document.createElement('div');
        card.className = 'country-card bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm ring-1 ring-gray-200 dark:ring-gray-700';
        
        card.innerHTML = `
            <div class="relative h-40 group">
                <img src="${country.flags.svg}" alt="${country.name.common}" class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
                <button onclick="toggleFavorite('${country.cca3}')" 
                    class="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 dark:bg-gray-900/90 flex items-center justify-center shadow-lg hover:scale-110 active:scale-90 transition">
                    ${isFav ? '❤️' : '🤍'}
                </button>
            </div>
            <div class="p-6">
                <h3 class="font-bold text-lg mb-3 truncate">${country.name.common}</h3>
                <div class="space-y-1.5 text-sm opacity-70">
                    <p><span class="font-medium text-blue-600">Pop:</span> ${country.population.toLocaleString()}</p>
                    <p><span class="font-medium text-blue-600">Region:</span> ${country.region}</p>
                    <p><span class="font-medium text-blue-600">Capital:</span> ${country.capital?.[0] || 'N/A'}</p>
                </div>
            </div>
        `;
        fragment.appendChild(card);
    });

    countryGrid.appendChild(fragment);
}

// 3. Filtering Logic
function handleFilters() {
    const searchTerm = searchInput.value.toLowerCase();
    const regionTerm = regionFilter.value.toLowerCase();

    const filtered = allCountries.filter(c => {
        const matchesSearch = c.name.common.toLowerCase().includes(searchTerm);
        const matchesRegion = !regionTerm || c.region.toLowerCase() === regionTerm;
        const matchesFav = !showingOnlyFavs || favorites.includes(c.cca3);
        return matchesSearch && matchesRegion && matchesFav;
    });

    renderCountries(filtered);
}

// 4. Persistence (Favorites)
window.toggleFavorite = (id) => {
    favorites = favorites.includes(id) 
        ? favorites.filter(favId => favId !== id) 
        : [...favorites, id];
    
    localStorage.setItem('terra_favs', JSON.stringify(favorites));
    updateFavUI();
    handleFilters();
};

function updateFavUI() {
    favCountEl.innerText = favorites.length;
    document.getElementById('fav-icon').innerText = showingOnlyFavs ? '❤️' : '🤍';
}

showFavsBtn.addEventListener('click', () => {
    showingOnlyFavs = !showingOnlyFavs;
    showFavsBtn.classList.toggle('ring-2', showingOnlyFavs);
    showFavsBtn.classList.toggle('ring-red-500', showingOnlyFavs);
    updateFavUI();
    handleFilters();
});

// 5. Theme & Loading Helpers
themeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    document.getElementById('theme-icon').innerText = isDark ? '☀️' : '🌙';
});

function toggleLoading(isLoading) {
    skeletonGrid.classList.toggle('hidden', !isLoading);
    countryGrid.classList.toggle('hidden', isLoading);
}

// Initialize
init();
searchInput.addEventListener('input', handleFilters);
regionFilter.addEventListener('change', handleFilters);