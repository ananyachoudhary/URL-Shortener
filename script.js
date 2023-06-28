const shortenForm = document.getElementById('shorten-form');
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const resultsDiv = document.getElementById('results');

// Function to shorten a URL
const shortenURL = async (note, url) => {
  try {
    const response = await fetch('/url', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ note, url }),
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
};

// Function to search for URLs
const searchURLs = async (keyword) => {
  try {
    const response = await fetch(`/url/analytics/${keyword}`);
    const data = await response.json();
    displayResults(data.analytics);
  } catch (error) {
    console.error('Error:', error);
  }
};

// Function to display search results
const displayResults = (urls) => {
  resultsDiv.innerHTML = '';

  if (urls.length === 0) {
    resultsDiv.innerHTML = '<p>No results found.</p>';
    return;
  }

  urls.forEach((url) => {
    const resultItem = document.createElement('div');
    resultItem.classList.add('result-item');

    const noteHeading = document.createElement('h3');
    noteHeading.textContent = `Note: ${url.note}`;
    resultItem.appendChild(noteHeading);

    const urlParagraph = document.createElement('p');
    urlParagraph.textContent = `URL: ${url.redirectURL}`;
    resultItem.appendChild(urlParagraph);

    resultsDiv.appendChild(resultItem);
  });
};

// Event listener for the shorten form submission
shortenForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const noteInput = document.getElementById('note-input');
  const urlInput = document.getElementById('url-input');

  const note = noteInput.value;
  const url = urlInput.value;

  shortenURL(note, url);
  noteInput.value = '';
  urlInput.value = '';
});

// Event listener for the search button click
searchButton.addEventListener('click', () => {
  const keyword = searchInput.value;
  searchURLs(keyword);
  searchInput.value = '';
});
