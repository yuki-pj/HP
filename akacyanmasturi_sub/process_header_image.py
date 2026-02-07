from PIL import Image
import os

input_path = "media/data/media/20231011/media/getta/page/project/akachan-matsuri/akacyannmasturi （yoko）.png"
output_path = "media/data/media/20231011/media/getta/page/project/akachan-matsuri/header_logo_yoko.png"

def make_transparent(input_p, output_p):
    try:
        with Image.open(input_p) as img:
            img = img.convert("RGBA")
            datas = img.getdata()
            
            # Use top-left pixel as background reference
            bg_ref = datas[0] 
            print(f"Background reference color: {bg_ref}")
            
            new_data = []
            tolerance = 60 # Adjust tolerance as needed

            for item in datas:
                # Calculate difference from background (ignoring alpha for diff calculation if bg is opaque)
                diff = abs(item[0] - bg_ref[0]) + abs(item[1] - bg_ref[1]) + abs(item[2] - bg_ref[2])
                
                # Check for white-ish pixels explicitly if needed, but let's stick to bg_ref for now with tolerance
                # Also treat near-white as transparent since the logo is likely on white bg
                is_near_white = item[0] > 240 and item[1] > 240 and item[2] > 240

                if diff < tolerance or is_near_white:
                    new_data.append((255, 255, 255, 0)) # Fully transparent
                else:
                    new_data.append(item)

            img.putdata(new_data)
            
            # Trim/Crop empty space if needed?
            # User said "Layout Fix: Force 1 line" suggests size matters.
            # Let's crop to bounding box of non-transparent pixels.
            bbox = img.getbbox()
            if bbox:
                img = img.crop(bbox)
                print(f"Cropped to bounding box: {bbox}")

            img.save(output_p, "PNG")
            print(f"Saved transparent image to: {output_p}")
            
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    make_transparent(input_path, output_path)
