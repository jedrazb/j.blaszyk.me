from os import listdir
from os.path import isfile, join, getmtime



def read_images(relative_path):
    images = [f for f in listdir(relative_path) if isfile(join(relative_path, f))]
    # images.sort(key=lambda x: getmtime(join(relative_path, x)))
    print(images)




read_images('content/pages/fly-in-hike-isle-of-wight/photos')
