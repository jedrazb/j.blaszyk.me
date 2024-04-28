import requests
import re


YANDEX_API_INDEXNOW = 'https://www.yandex.com/indexnow'
BING_API_INDEXNOW = 'https://www.bing.com/indexnow'

INDEXNOW_APIS = [
    YANDEX_API_INDEXNOW,
    BING_API_INDEXNOW
]


SITEMAP_URL = 'https://j.blaszyk.me/sitemap-0.xml'
r = requests.get(SITEMAP_URL)
sitemap = r.text
page_links = re.findall('<loc>(.*?)</loc>', sitemap, re.IGNORECASE)


request_payload = {
    "host": "j.blaszyk.me",
    "key": "a245c91c3f46428499f68414158a9440",
    "keyLocation": "https://j.blaszyk.me/a245c91c3f46428499f68414158a9440.txt",
    "urlList": page_links
}


for indexnow_api in INDEXNOW_APIS:
    response = requests.post(
        indexnow_api,
        json=request_payload
    )

    print(f'{indexnow_api} - response: {response}')
