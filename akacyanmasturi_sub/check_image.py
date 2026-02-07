from PIL import Image
try:
    path = "media/data/media/20231011/media/getta/page/project/akachan-matsuri/akacyannmasturi （yoko）.png"
    img = Image.open(path)
    print(f"Format: {img.format}")
    print(f"Mode: {img.mode}")
    print(f"Size: {img.size}")
    if img.mode == "RGBA":
        extrema = img.getextrema()
        if extrema[3][0] < 255:
            print("Has transparency")
        else:
            print("No transparency (alpha channel exists but fully opaque)")
    else:
        print("No transparency")
except Exception as e:
    print(f"Error: {e}")
