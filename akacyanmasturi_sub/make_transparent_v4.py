from PIL import Image
import os

input_path = "media/data/media/20231011/media/getta/page/project/akachan-matsuri/akacyannmasturi （yoko）.png"
output_path = "media/data/media/20231011/media/getta/page/project/akachan-matsuri/akacyannmasturi_transparent.png"

try:
    with Image.open(input_path) as img:
        img = img.convert("RGBA")
        datas = img.getdata()
        
        # Determine background color from top-left pixel
        bg_ref = datas[0] # (r, g, b, a)
        print(f"Background reference color: {bg_ref}")
        
        new_data = []
        tolerance = 60 # Check tolerance

        for item in datas:
            # Calculate difference
            diff = abs(item[0] - bg_ref[0]) + abs(item[1] - bg_ref[1]) + abs(item[2] - bg_ref[2])
            
            # Also check if it's generally white-ish
            is_white = item[0] > 200 and item[1] > 200 and item[2] > 200
            
            if diff < tolerance or is_white:
                new_data.append((255, 255, 255, 0))
            else:
                new_data.append(item)

        img.putdata(new_data)
        img.save(output_path, "PNG")
        print(f"Saved transparent image to: {output_path}")

except Exception as e:
    print(f"Error: {e}")
