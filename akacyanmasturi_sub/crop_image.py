from PIL import Image
import os

image_path = "media/data/media/20231011/media/getta/page/project/akachan-matsuri/akacyannmasturi （yoko）.png"
output_path = "media/data/media/20231011/media/getta/page/project/akachan-matsuri/akacyannmasturi_cropped.png"

try:
    with Image.open(image_path) as img:
        print(f"Original size: {img.size}")
        # GetBoundingBox
        bbox = img.getbbox()
        if bbox:
            print(f"Bounding box: {bbox}")
            # Crop
            cropped_img = img.crop(bbox)
            print(f"Cropped size: {cropped_img.size}")
            cropped_img.save(output_path)
            print(f"Saved cropped image to: {output_path}")
        else:
            print("Image is completely transparent or empty.")
except Exception as e:
    print(f"Error: {e}")
