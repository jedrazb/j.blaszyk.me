import requests
from bs4 import BeautifulSoup

# Define the URL you want to scrape
url = "https://www.elastic.co/guide/en/enterprise-search/master/build-connector.html"

# Send an HTTP GET request to the URL
response = requests.get(url)

# Check if the request was successful
if response.status_code == 200:
    # Parse the HTML content of the page using BeautifulSoup
    soup = BeautifulSoup(response.text, 'html.parser')

    # Find the unordered list (ul) with class "itemizedlist"
    ul = soup.find('ul', class_='itemizedlist')

    # Initialize a list to store the links and their corresponding text
    links_with_text = []

    # Iterate through the list items (li) within the unordered list
    for li in ul.find_all('li'):
        # Find the anchor tags (a) within each list item
        for a in li.find_all('a', href=True):
            link = a['href']  # Get the 'href' attribute of the anchor tag
            text = a.get_text()  # Get the text within the anchor tag
            links_with_text.append((text, link))

    # Print the list of links
    for text, link in links_with_text:
        print(f'- [Elasticsearch {text} Connector](https://www.elastic.co/guide/en/enterprise-search/current/{link})')
else:
    print("Failed to retrieve the web page. Status code:", response.status_code)
