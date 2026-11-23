import argparse
import sys

import qrcode
from qrcode.constants import ERROR_CORRECT_H
from qrcode.image.svg import SvgPathImage

URL_PREDEFINITO = "https://james-flosser.github.io/martinella_compleanno/"

def main():
    p = argparse.ArgumentParser(description="Genera il QR code del sito di compleanno.")
    p.add_argument("url", nargs="?", default=URL_PREDEFINITO, help="indirizzo del sito")
    p.add_argument("-o", "--output", default="qr_compleanno", help="nome file senza estensione")
    p.add_argument("--colore", default="#14213d", help="colore dei moduli (default blu notte)")
    p.add_argument("--sfondo", default="white", help="colore di sfondo (default bianco)")
    p.add_argument("--dimensione", type=int, default=20, help="pixel per modulo (default 20)")
    args = p.parse_args()

    # Correzione errori alta (H): il QR si legge anche se stampato male o un po' rovinato.
    qr = qrcode.QRCode(error_correction=ERROR_CORRECT_H, box_size=args.dimensione, border=4)
    qr.add_data(args.url)
    qr.make(fit=True)

    png = f"{args.output}.png"
    qr.make_image(fill_color=args.colore, back_color=args.sfondo).save(png)

    svg = f"{args.output}.svg"   # vettoriale: perfetto per la stampa
    qr.make_image(image_factory=SvgPathImage).save(svg)

    print(f"URL codificato : {args.url}")
    print(f"Creati         : {png}  e  {svg}")
    print("Prima di stamparlo, scansionalo con il telefono e prova il sito.")


if __name__ == "__main__":
    main()
