from os import listdir
from os.path import isfile, join, getmtime



def read_images(relative_path):
    images = [f for f in listdir(relative_path) if isfile(join(relative_path, f))]
    images = sorted(images)
    print(['./photos/' + img for  img in images])




read_images('content/through-the-lens/izery-mountains-bikepacking/photos')
