import requests
import re
import html


SITEMAP_URL = 'https://j.blaszyk.me/sitemap/sitemap-0.xml'
r = requests.get(SITEMAP_URL)
sitemap = r.text
page_links = re.findall('<loc>(.*?)</loc>', sitemap, re.IGNORECASE)

links = []

for page_link in page_links:
    r = requests.get(page_link)
    content = r.text
    title = re.findall('<title data-react-helmet="true">(.*?)</title>', content, re.IGNORECASE)
    page_title = html.unescape(title[0])
    links.append((page_title, page_link))

markdown = '# [j.blaszyk.me](https://j.blaszyk.me/)\n'
markdown += 'My personal blog.\n'
markdown += '### Content\n'
markdown += '\n'.join(['* [%s](%s)' % link for link in links])

with open('README.md', 'w') as f:
    f.write(markdown)





