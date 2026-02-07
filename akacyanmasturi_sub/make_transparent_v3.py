from PIL import Image
import os

input_path = "media/data/media/20231011/media/getta/page/project/akachan-matsuri/akacyannmasturi （yoko）.png"
output_path = "media/data/media/20231011/media/getta/page/project/akachan-matsuri/akacyannmasturi_transparent.png"

try:
    with Image.open(input_path) as img:
        img = img.convert("RGBA")
        datas = img.getdata()

        new_data = []
        for item in datas:
            # White (240+, 240+, 240+) to Transparent
            if item[0] > 220 and item[1] > 220 and item[2] > 220:
                new_data.append((255, 255, 255, 0))
            else:
                new_data.append(item)

        img.putdata(new_data)
        img.save(output_path, "PNG")
        print(f"Saved transparent image to: {output_path}")

except Exception as e:
    print(f"Error: {e}")
