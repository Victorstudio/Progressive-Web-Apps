// REGISTER SERVICE WORKER
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
       navigator.serviceWorker
          .register("service-worker.js")
          .then(function () {
             console.log("Pendaftaran ServiceWorker berhasil");
          })
          .catch(function () {
             console.log("Pendaftaran ServiceWorker gagal");
          });
    });
 } else {
 
    event.respondWith(
       caches.match(event.request, {
          ignoreSearch: true
       }).then(function (response) {
          return response || fetch(event.request);
       })
    )
 }


 document.addEventListener("DOMContentLoaded", function () {
    var urlParams = new URLSearchParams(window.location.search);
    var isFromSaved = urlParams.get("saved");
    var id = Number(urlParams.get("id"));
    var btnSave = document.getElementById("save");
    var btnDelete = document.getElementById("delete");
   
    // Ambil url lalu ambil nilai dari id
    var parsedUrl = new URL(window.location.href);
    var idParam = parsedUrl.searchParams.get("id");
 
    if (isFromSaved) {
       // Hide fav jika dimuat dari indexeddb
       btnSave.style.display = 'none';
 
       // ambil artikel lalu tampilkan
       getSavedTeamById();
 
       // Ubah link saat data dimuat dari indexeddb
       var btnBack = document.getElementById('btnBack');
       btnBack.setAttribute("href", "./index.html#saved");
 
      } else {
         btnDelete.style.display = 'none';
         var item = getTeamById();
      }
       checkFavorite(id);

      //Cek apakah tim masuk dalam fav, jika ya tombol love tidak akan muncul
      checkFavorite(id).then((msg) => {
         btnSave.style.display = "none";
         btnDelete.style.display = "block";
      }).catch((msg) => {
         btnSave.style.display = "block";
         btnDelete.style.display = "none";
      });

     
     
 
    // Simpan ke indexeddb
    btnSave.onclick = function () {
       this.style.display = "none";
       item.then(function (teams) {
          saveForLater(teams);
       });
    };
 
    // Hapus dari indexeddb
    btnDelete.onclick = function () {
       this.style.display = "none";
       deleteById(Number(idParam));
       btnSave.style.display = "block"
    };
 
 });