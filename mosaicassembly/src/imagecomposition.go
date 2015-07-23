package main

import (
"golang.org/x/image/draw"
"image"
"image/color"
"os"
"log"
"image/png"
"strconv"
"math"
"fmt"
)


func assembleMosaic(imagePos ImagePositions){
	dst := image.NewRGBA(image.Rect(0, 0, 400, 400))

    for _, pos := range imagePos{
        position, _ := strconv.Atoi(pos.Pos)
        x := (position * 10) % 4000;
        y := int(math.Floor(float64(position) / 400.0));
        fmt.Print(x, y)
        blue := color.RGBA{0, 0, 255, 255}
        draw.Draw(dst, image.Rect(x, y, x+5, y+5), &image.Uniform{blue}, image.ZP, draw.Src)
    }

	save("/commondata/Programming/Repositories/mosaic/mosaicassembly/src/out.png", dst)
}

func save(filename string, dst draw.Image){
	fDst, err := os.Create(filename)
    
    if err != nil {
        log.Fatal(err)
    }
    
    defer fDst.Close()
    
    err = png.Encode(fDst, dst)
    if err != nil {
        log.Fatal(err)
    }
}