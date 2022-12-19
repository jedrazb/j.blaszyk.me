import requests
import re
import html


# SITEMAP_URL = 'https://j.blaszyk.me/sitemap/sitemap-0.xml'
# r = requests.get(SITEMAP_URL)
# sitemap = r.text
# page_links = re.findall('<loc>(.*?)</loc>', sitemap, re.IGNORECASE)

links = []


# for page_link in page_links:
#     r = requests.get(page_link)
#     content = r.text
#     title = re.findall('<title data-react-helmet="true">(.*?)</title>', content, re.IGNORECASE)
#     page_title = html.unescape(title[0])
#     links.append((page_title, page_link))

links = [("Jedr's Blog", 'https://j.blaszyk.me/'), ("Through the Lens — Jedr's Blog", 'https://j.blaszyk.me/through-the-lens/'), ("Norway Bikepacking: Trondheim to Bergen — Jedr's Blog", 'https://j.blaszyk.me/norway-bikepacking-trondheim-to-bergen/'), ("Iceland 4x4 Roadtrip — Jedr's Blog", 'https://j.blaszyk.me/iceland-roadtrip/'), ("Fly-in hike around Isle of Wight — Jedr's Blog", 'https://j.blaszyk.me/fly-in-hike-isle-of-wight/'), ("Kattegat loop, Denmark and Sweden — Jedr's Blog", 'https://j.blaszyk.me/kattegat-loop-bikepacking/'), ("Bikepacking & wild camping in Sweden — Jedr's Blog", 'https://j.blaszyk.me/bikepacking-in-sweden/'), ("Geometric Deep Learning - an overview — Jedr's Blog", 'https://j.blaszyk.me/geometric-deep-learning-overview/'), ("My take on cycling in London — Jedr's Blog", 'https://j.blaszyk.me/cycling-in-london/'), ("Sussex Coastal Marathon — Jedr's Blog", 'https://j.blaszyk.me/sussex-coastal-marathon/'), ("Tenerife Pleasures - Through the Lens — Jedr's Blog", 'https://j.blaszyk.me/through-the-lens/tenerife-pleasures/'), ("Izery Mountains Bikepacking - Through the Lens — Jedr's Blog", 'https://j.blaszyk.me/through-the-lens/izery-mountains-bikepacking/'), ("Norway Bikepacking - Through the Lens — Jedr's Blog", 'https://j.blaszyk.me/through-the-lens/norway-bikepacking/'), ("Iceland Roadtrip - Through the Lens — Jedr's Blog", 'https://j.blaszyk.me/through-the-lens/iceland-4x4-roadtrip/'), ("Contact — Jedr's Blog", 'https://j.blaszyk.me/contact/')]

markdown = '# [j.blaszyk.me](https://j.blaszyk.me/)\n'
markdown += 'My personal blog.\n'
markdown += '### Content\n'
markdown += '\n'.join(['* [%s](%s)' % link for link in links])

with open('README.md', 'w') as f:
    f.write(markdown)





