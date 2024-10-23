const button = document.getElementById('input-button');
const awal = document.querySelector('.tugas-awal');
const akhir = document.querySelector('.tugas-akhir');

let tmpAwal = '';
let tmpAkhir = '';

if(localStorage.getItem('tugasAwal') == null){

     localStorage.setItem('tugasAwal','[{"text":"test1","date":"1/1/1"}]');
}

if(localStorage.getItem('tugasAkhir') == null){

    localStorage.setItem('tugasAkhir','[{"text":"test2","date":"1/1/1"}]');
}

tmpAwal = JSON.parse(localStorage.getItem('tugasAwal'));
tmpAkhir = JSON.parse(localStorage.getItem('tugasAkhir'));

tmpAwal.forEach(e => {
    tambahAwal(e.text,e.date);
});

tmpAkhir.forEach(e => {
    tambahAkhir(e.text,e.date);
});


// Interaktif

button.addEventListener('click',() => {

    const text = document.getElementById('input-text').value;
    const date = document.getElementById('input-date').value.replace(/[-]/g,'/');

    document.getElementById('input-text').value = '';
    document.getElementById('input-date').value = '';

    tambahAwal(text,date);
})

awal.addEventListener('click',function(e){

    if(e.target.alt == 'check'){

        const text = e.target.parentNode.parentNode.firstChild.children[0].innerText;
        const date = e.target.parentNode.parentNode.firstChild.children[1].innerText;

        tambahAkhir(text,date);

        awal.removeChild(e.target.parentNode.parentNode);
    }
})

akhir.addEventListener('click',function(e){

    if(e.target.alt == 'trash'){

        akhir.removeChild(e.target.parentNode.parentNode);
    }

    if(e.target.alt == 'undo'){

        const text = e.target.parentNode.parentNode.firstChild.children[0].innerText;
        const date = e.target.parentNode.parentNode.firstChild.children[1].innerText;

        tambahAwal(text,date);

        akhir.removeChild(e.target.parentNode.parentNode);
    }   
})

function tambahAwal(text,date){
    const div = document.createElement('div');

    div.classList.add('time');
    div.innerHTML = `<div class="head">
                        <p>${text}</p>
                        <small>${date}</small>
                    </div>

                    <div class="image">
                        <img src="./src/check.svg" alt="check" width="40px">
                    </div>`
    
    awal.appendChild(div);
}

function tambahAkhir(text,date){

    const div = document.createElement('div');
    div.classList.add('time');

    div.innerHTML = `<div class="head">
                        <p>${text}</p>
                        <small>${date}</small>
                     </div>

                    <div class="image">
                        <img src="./src/trash.svg" alt="trash" width="40px">
                        <img src="./src/undo.svg" alt="undo" width="40px">
                     </div>`

    akhir.append(div);
}

