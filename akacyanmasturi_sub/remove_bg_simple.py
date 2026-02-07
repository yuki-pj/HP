import sys
from PIL import Image

def remove_white_background_and_make_white(input_path, output_path):
    try:
        img = Image.open(input_path)
        img = img.convert("RGBA")
        datas = img.getdata()
        
        newData = []
        for item in datas:
            # Change all white (also shades of whites) to transparent
            # And change everything else to White
            if item[0] > 240 and item[1] > 240 and item[2] > 240:
                newData.append((255, 255, 255, 0))
            else:
                # Make it white, preserving alpha if it was already transparent (though input is likely opaque)
                # If the pixel is not the background white, make it white opaque
                newData.append((255, 255, 255, 255))
        
        img.putdata(newData)
        img.save(output_path, "PNG")
        print(f"Successfully processed {input_path}")
    except Exception as e:
        print(f"Error processing image: {e}")
        sys.exit(1)

if __name__ == "__main__":
    remove_white_background_and_make_white(
        "/Users/bandoutakanori/Antigravity/HP/akacyanmasturi_sub/media/data/media/20231011/media/getta/page/project/akachan-matsuri/logo_sml2.png",
        "/Users/bandoutakanori/Antigravity/HP/akacyanmasturi_sub/media/data/media/20231011/media/getta/page/project/akachan-matsuri/logo_sml2.png"
    )
