 
document.getElementById('fileInput').addEventListener("change",function(){
    const file = this.files[0];
    const reader = new FileReader();
    reader.onload = function(){
        const fileData = reader.result;
        const canvas = document.getElementById('canvas');
        const ctx =  canvas.getContext('2d');
        const img = new Image(); 
        img.src = fileData;
        img.height = 500;
        img.width = 400;
        img.onload = function(){
            ctx.drawImage(img,0,0);
            const imageData =
             ctx.getImageData(0,0, img.width, img.height);
             const colors = [];
             const palettes = [
                {id: 'palette1', colors:[]},
                {id: 'palette2', colors:[]},
            ];
           
        
             for (let x = 0; x<img.width; x++){
                for(let y = 0; y<canvas.height; y++){
                const index = (x + y * canvas.width)* 4;
                const red = imageData.data[index];
                const green = imageData.data[index + 1];
                const blue = imageData.data[index + 2];
                const alpha = imageData.data[index + 3];
                const color = {r:red, g:green, b:blue, a:alpha};
                colors.push(color);
                const palette = palettes[Math.floor(index/4)% palettes.length];
                palette.colors.push(`${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`)
                }
             }
             palettes.forEach((palette)=>{
                const paletteElement = document.getElementById('palette1');
                const colorsElement = paletteElement.querySelector('.colors');
                const copyButton = paletteElement.querySelector('.copy-button');
                
                palette.colors.forEach((color)=>{
                    const colorDiv = document.createElement('div');
                    colorDiv.addEventListener("click",()=>{
                        navigator.clipboard.writeText('#'+color);
                        alert(`Copied color ${'#' +color}`);
                    })
                    colorDiv.style.backgroundColor = '#'+color;
                    colorDiv.classList = "newdiv";
                    colorDiv.textContent = '#'+color;
                    colorsElement.appendChild(colorDiv);
                });
                copyButton.addEventListener("click",()=>{
                    const text = palette.colors.join();
                    navigator.clipboard.writeText(text);
                    alert(`Copied colors ${"#" + text}`);
                });
             });
             const gradientCanvas = document.getElementById('image-gradient');
             const gradientCtx = gradientCanvas.getContext('2d');
             const gradient = gradientCtx.createLinearGradient(0, 0, gradientCanvas.width, gradientCanvas.height);
             

             for(let i = 0; i<colors.length; i++){
                gradient.addColorStop
                (i/(colors.length-1),
                `rgba(${colors[i].r},${colors[i].g},${colors[i].b},${colors[i].a})`);
             }
    
             gradientCtx.fillStyle = gradient;
             gradientCtx.fillRect(0, 0 ,gradientCanvas.width, gradientCanvas.height);
            
        };
    };
    reader.readAsDataURL(file);
});


