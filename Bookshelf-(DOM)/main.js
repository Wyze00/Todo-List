// Deklarasi global

const submit = document.getElementById("bookFormSubmit");
const search = document.getElementById("searchSubmit")
const complete = document.getElementById("completeBookList");
const incomplete = document.getElementById("incompleteBookList");

// Setup local storage

if(localStorage.getItem("bukuComplete") == null){
    localStorage.setItem("bukuComplete","[]");
}
if(localStorage.getItem("bukuUncomplete") == null){
    localStorage.setItem("bukuUncomplete","[]");
}

// Loop local storage nambah element

const bukuComplete = JSON.parse(localStorage.getItem("bukuComplete"));
const bukuUncomplete = JSON.parse(localStorage.getItem("bukuUncomplete"));

bukuComplete.forEach((e) => {
    tambahSelesai(e.judul,e.penulis,e.tahun,e.id);
})

bukuUncomplete.forEach((e) => {
    tambahBelumSelesai(e.judul,e.penulis,e.tahun,e.id);
})

// Button tambah buku baru

submit.addEventListener("click",(e) => {
    e.preventDefault();

    // Identitas

    const judul = document.getElementById("bookFormTitle").value;
    const penulis = document.getElementById("bookFormAuthor").value;
    const tahun = document.getElementById("bookFormYear").value;
    const selesaiDibaca = document.getElementById("bookFormIsComplete").checked;
    const id = Number(new Date());
    
    // Tambah element 

    if(selesaiDibaca){
        tambahSelesai(judul,penulis,tahun,id);
    } else {
        tambahBelumSelesai(judul,penulis,tahun,id);
    }

    document.getElementById("bookForm").reset()
})

// Button "search" 

search.addEventListener("click", (e) => {
    e.preventDefault();
    
    // Dapetin text input
    
    const text = document.getElementById("searchBookTitle").value;
    
    // Remove semua element 

    const tempComplete = complete.children.length;
    const tempIncomplete = incomplete.children.length;


    for(let i = 0; i<tempComplete; i++){
        
        complete.removeChild(complete.children[0]);
    }

    for(let i = 0; i<tempIncomplete; i++){
        incomplete.removeChild(incomplete.children[0]);
    }

    // Tampilkan element yang sesuai

    for(let i = 0; i<=bukuComplete.length; i++){

        if(bukuComplete[i]){
            
            const e = bukuComplete[i];

            if(e.judul.includes(text)) {
                tambahSelesai(e.judul,e.penulis,e.tahun,e.id);
            }
        }
    }
    
    for(let i = 0; i<=bukuUncomplete.length; i++){
        
        if(bukuUncomplete[i]){
        
            const e = bukuUncomplete[i];

            if(e.judul.includes(text)){

                tambahBelumSelesai(e.judul,e.penulis,e.tahun,e.id);
            }
        }
    }

    document.getElementById("searchBook").reset();
})

// Button "selesai dibaca"

complete.addEventListener("click", function(e){


    if(e.target.textContent == "Belum Selesai Dibaca"){

        // Menghapus local storage

        for(let i = 0; i<bukuComplete.length; i++){

            if(e.target.parentNode.parentNode.dataset["bookid"] == bukuComplete[i].id){

                bukuComplete.splice(i,1);
                localStorage.setItem("bukuComplete",JSON.stringify(bukuComplete));
            }
        }

        // Set lagi

        const parent = e.target.parentNode.parentNode.children;

        tambahBelumSelesai(parent[0].textContent,parent[1].textContent,parent[2].textContent,parent[0].parentNode.dataset["bookid"]);

        // Menghapus element

        complete.removeChild(e.target.parentNode.parentNode.parentNode);
    }

    if(e.target.textContent == "Hapus Buku"){

        // Menghapus local storage

        for(let i = 0; i<bukuComplete.length; i++){

            if(e.target.parentNode.parentNode.dataset["bookid"] == bukuComplete[i].id){

                bukuComplete.splice(i,1);
                localStorage.setItem("bukuComplete",JSON.stringify(bukuComplete));
            }
        }

        // Menghapus element

        complete.removeChild(e.target.parentNode.parentNode.parentNode);
    }

})

// Button "belum selesai dibaca"

incomplete.addEventListener("click", function(e){

    if(e.target.textContent == "Selesai Dibaca"){

        // Menghapus local storage

        for(let i = 0; i<bukuUncomplete.length; i++){

            if(e.target.parentNode.parentNode.dataset["bookid"] == bukuUncomplete[i].id){

                bukuUncomplete.splice(i,1);
                localStorage.setItem("bukuUncomplete",JSON.stringify(bukuUncomplete));
            }
        }
        
        // Set lagi

        const parent = e.target.parentNode.parentNode.children;

        tambahSelesai(parent[0].textContent,parent[1].textContent,parent[2].textContent,parent[0].parentNode.dataset["bookid"]);

        // Menghapus element

        incomplete.removeChild(parent[0].parentNode.parentNode);
    }

    if(e.target.textContent == "Hapus Buku"){

        // Menghapus local storage

        for(let i = 0; i<bukuUncomplete.length; i++){

            if(e.target.parentNode.parentNode.dataset["bookid"] == bukuUncomplete[i].id){

                bukuUncomplete.splice(i,1);
                localStorage.setItem("bukuUncomplete",JSON.stringify(bukuUncomplete));
            }
        }

        // Menghapus elemnet

        incomplete.removeChild(e.target.parentNode.parentNode.parentNode);
    }

})

// Fungsi tambah buku selesai dibaca

function tambahSelesai(judul,penulis,tahun,id){

    // Nambah element

    const div = document.createElement("div");

    div.innerHTML = `<div data-bookid="${id}" data-testid="bookItem" class="box">
                      <h3 data-testid="bookItemTitle">${judul}</h3>
                     <p data-testid="bookItemAuthor">${penulis}</p>
                      <p data-testid="bookItemYear">${tahun}</p>
                     <div>
                          <button data-testid="bookItemIsCompleteButton">Belum Selesai Dibaca</button>
                          <button data-testid="bookItemDeleteButton">Hapus Buku</button>
                       <button data-testid="bookItemEditButton">Edit Buku</button>
                      </div>
                    </div>`;
    
    complete.appendChild(div);

    // Set local storge

    if(bukuComplete.length == 0){
        bukuComplete.push({
            judul,penulis,tahun,id
        })

    } else {
        
        for(let i = 0; i<bukuComplete.length; i++){

            if(bukuComplete[i].id == id){
                break;
            }

            if(i == bukuComplete.length-1 && bukuComplete[i].id != id){
                bukuComplete.push({
                    judul,penulis,tahun,id
                })
            }
        }
    }
    
    localStorage.setItem("bukuComplete",JSON.stringify(bukuComplete));
}

// Fungsi tambah buku belum selesai dibaca


function tambahBelumSelesai(judul,penulis,tahun,id ){

    const div = document.createElement("div");

    // Tambah element
    
    div.innerHTML = `<div data-bookid="${id}" data-testid="bookItem" class="box">
                      <h3 data-testid="bookItemTitle">${judul}</h3>
                     <p data-testid="bookItemAuthor">${penulis}</p>
                      <p data-testid="bookItemYear">${tahun}</p>
                     <div>
                          <button data-testid="bookItemIsCompleteButton">Selesai Dibaca</button>
                          <button data-testid="bookItemDeleteButton">Hapus Buku</button>
                       <button data-testid="bookItemEditButton">Edit Buku</button>
                      </div>
                    </div>`;
    
    incomplete.appendChild(div);

    // Set local storage

    if(bukuUncomplete.length == 0){
        bukuUncomplete.push({
            judul,penulis,tahun,id
        })

    } else {
        
        for(let i = 0; i<bukuUncomplete.length; i++){

            if(bukuUncomplete[i].id == id){
                break;
            }

            if(i == bukuUncomplete.length-1 && bukuUncomplete[i].id != id){
                bukuUncomplete.push({
                    judul,penulis,tahun,id
                })
            }
        }
    }

    localStorage.setItem("bukuUncomplete",JSON.stringify(bukuUncomplete));
}