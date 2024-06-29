
                const hslString = String(hsl);
                const hue = hslString.match(/hsl?a?\(([^],)}/);
                const saturation = hslString.match(/(\d+)%/);
                const lightness =  hslString.match(/(\d+)%/);