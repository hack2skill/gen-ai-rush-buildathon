
const text=document.getElementById('Text');
const btn=document.getElementById('btn');
let result='';

btn.addEventListener('click',()=>{
    switch(result)
    {
        case 'aeroplane':
            btn.setAttribute('href','aeroplane.html');
            break;
        case 'chair':
            btn.setAttribute('href','chair.html');
            break;
        case 'truck':
            btn.setAttribute('href','truck.html');
            break;
        case 'lamborghini':
                btn.setAttribute('href','lamborghini.html');
                break;
        default:
            btn.setAttribute('href','cube.html');
            break;

    }
    
})

text.addEventListener('input',(e)=>{
    result=e.target.value;
})