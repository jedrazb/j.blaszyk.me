from os import listdir
from os.path import isfile, join, getmtime



def read_images(relative_path):
    images = [f for f in listdir(relative_path) if isfile(join(relative_path, f))]
    images = sorted(images)
    out = ['./photos/' + img for  img in images]
    return out

def read_images_2d(relative_path):
    imgs = read_images(relative_path)
    out = [[img] for img in imgs]
    print(out)




read_images_2d('content/through-the-lens/tenerife-pleasures/photos')
