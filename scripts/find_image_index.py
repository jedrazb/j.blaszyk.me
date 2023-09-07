
import argparse
from os import listdir
from os.path import isfile, join, getmtime

relative_path = 'content/blog/bikepacking-in-provence-france/photos'


def find_image_index(relative_path, substring_in_path):
    images = [f for f in listdir(relative_path) if isfile(join(relative_path, f))]
    images = sorted(images)

    for idx, image_path in enumerate(images):
        if substring_in_path in image_path:
            print((image_path, idx))


parser = argparse.ArgumentParser(description='Find image_paths with matching substring')

parser.add_argument('--substring-in-path', type=str, help='Substring in path')

args = parser.parse_args()

find_image_index(
    relative_path=relative_path,
    substring_in_path=args.substring_in_path
)

